import { badRequest } from '@hapi/boom';
import type { NextFunction, Request, Response } from 'express';
import type { AnyObject } from 'yup';

export default function validatorHandler(
  schema: AnyObject,
  property: keyof Request
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      next(badRequest(error));
    } else {
      next();
    }
  };
}
