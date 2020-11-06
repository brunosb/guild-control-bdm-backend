import AppError from '@shared/erros/AppError';
import { Request, Response, NextFunction } from 'express';

// Must call this middleware after call ensureAuthenticated middleware.

export default function ensureLeadersAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { permission } = request.user;
  if (permission === 'Master' || permission === 'Officer') {
    next();
  } else {
    throw new AppError('Not leader authenticated');
  }
}
