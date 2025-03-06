import { ValidationError } from 'sequelize';
// TODO: Create a function to handle sequelize errors

// TODO: AL REPETIR EL USER ID EN EL CUSTOMER ID, SE DEBE MOSTRAR UN MENSAJE DE ERROR CON CODIGO 409

export const sequielizeError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.errors[0].message,
    });
  } else {
    next(err);
  }
};
