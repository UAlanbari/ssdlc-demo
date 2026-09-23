import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { createStore } from './store.js';

const credentialsSchema = z.object({
  email: z.string().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(128)
});
const taskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).default(''),
  done: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium')
}).strict();

function publicTask(task) {
  return { id: task.id, title: task.title, description: task.description, done: task.done, priority: task.priority };
}

export function createApp({ store = createStore(), jwtSecret, allowedOrigin = false } = {}) {
  if (!jwtSecret || jwtSecret.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres');
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: allowedOrigin || false, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
  app.use(express.json({ limit: '16kb' }));
  app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false }));

  const authenticate = (req, res, next) => {
    const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Autenticación requerida' });
    try {
      req.user = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
      return next();
    } catch {
      return res.status(401).json({ error: 'Token inválido o caducado' });
    }
  };

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.post('/api/auth/register', async (req, res, next) => {
    try {
      const data = credentialsSchema.parse(req.body);
      if (store.findUserByEmail(data.email)) return res.status(409).json({ error: 'La cuenta ya existe' });
      const user = store.addUser({ email: data.email, passwordHash: await bcrypt.hash(data.password, 12) });
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (error) { return next(error); }
  });
  app.post('/api/auth/login', async (req, res, next) => {
    try {
      const data = credentialsSchema.parse(req.body);
      const user = store.findUserByEmail(data.email);
      if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ error: 'Credenciales inválidas' });
      const token = jwt.sign({ sub: user.id }, jwtSecret, { algorithm: 'HS256', expiresIn: '15m', issuer: 'practica-ssdlc' });
      return res.json({ token, tokenType: 'Bearer', expiresIn: 900 });
    } catch (error) { return next(error); }
  });
  app.get('/api/tasks', authenticate, (req, res) => res.json(store.listTasks(req.user.sub).map(publicTask)));
  app.post('/api/tasks', authenticate, (req, res, next) => {
    try {
      const data = taskSchema.parse(req.body);
      const task = store.addTask({ ownerId: req.user.sub, ...data });
      return res.status(201).json(publicTask(task));
    } catch (error) { return next(error); }
  });
  app.patch('/api/tasks/:id', authenticate, (req, res, next) => {
    try {
      const task = store.findTask(req.params.id);
      if (!task || task.ownerId !== req.user.sub) return res.status(404).json({ error: 'Tarea no encontrada' });
      const data = taskSchema.partial().parse(req.body);
      Object.assign(task, data);
      return res.json(publicTask(task));
    } catch (error) { return next(error); }
  });
  app.delete('/api/tasks/:id', authenticate, (req, res) => {
    const task = store.findTask(req.params.id);
    if (!task || task.ownerId !== req.user.sub) return res.status(404).json({ error: 'Tarea no encontrada' });
    store.removeTask(task);
    return res.status(204).send();
  });
  app.use((error, _req, res, _next) => {
    if (error instanceof z.ZodError) return res.status(400).json({ error: 'Solicitud no válida', fields: error.flatten().fieldErrors });
    console.error('Error no controlado', error);
    return res.status(500).json({ error: 'Error interno' });
  });
  return app;
}
