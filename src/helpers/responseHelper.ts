import RESPONSE_CODES from '../constants/responseCodes';
import { Response } from 'express';

const sendResponse = (res: Response, data?: any, error?: string | null, responseCode?: number | null) => {
  if (error) {
    res.send({
      payload: {},
      message: error,
      response_code: responseCode || RESPONSE_CODES.serverError,
    });
  } else {
    res.send({ payload: data || {}, response_code: RESPONSE_CODES.ok });
  }
};

export default sendResponse;
