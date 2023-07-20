import { Request, Response, NextFunction } from 'express';

import sendResponse from './responseHelper';

const tryCatchWrapper = (executable: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executable(req, res, next);
    return result;
  } catch (error: any) {
    console.log(error);
    sendResponse(res, {}, error.message);
  }
};

export default tryCatchWrapper;
