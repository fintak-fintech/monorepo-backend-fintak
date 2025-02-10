import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limite de 10 solicitudes por IP
  message: 'Too many login attempts from this IP, please try again later',
})