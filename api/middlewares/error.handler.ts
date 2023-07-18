export const logErrors = (err: any, req: any, res: any, next: any) => {
  next(err);
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};

export const boomHandler = (err: any, req: any, res: any, next: any) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};
