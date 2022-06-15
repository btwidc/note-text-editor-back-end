import ApiError from '../errors/ApiError';
import { Request, Response, NextFunction } from 'express';

const ApiErrorFunction = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res
      .status((err as ApiError).status)
      .json({ message: err.message, errors: err.errors });
  }
  console.log(err);
  return res.status(500).json({ message: 'Unexpected error' });
};

export default ApiErrorFunction;
