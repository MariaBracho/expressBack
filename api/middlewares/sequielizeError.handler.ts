import { NextFunction, Response } from 'express';
import { ValidationError } from 'sequelize';

export const sequielizeError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.errors[0].message,
    });
  } else {
    next(err);
  }
};
