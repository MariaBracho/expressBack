import { badRequest } from '@hapi/boom';

// function with clousure to validate the request body

export default function validatorHandler(
  schema: any,
  property: 'body' | 'params' | 'query'
) {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      next(badRequest(error));
    } else {
      next();
    }
  };
}
