import type { Boom } from '@hapi/boom';
import type { Request, Response, NextFunction } from 'express';

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(err);
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomHandler = (
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err?.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};
