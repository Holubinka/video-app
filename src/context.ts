import { Request, Response } from 'express';
import { PrismaSelect } from '@paljs/plugins';

export const createContext = ({ req, res }): Context => {
  return {
    req,
    res,
    PrismaSelect,
  };
};

export interface Context {
  res: Response;
  req: Request;
  PrismaSelect: any;
}
