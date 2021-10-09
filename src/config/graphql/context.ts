import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

// LC상 Incomming Request ~ 최상단의 흐름
// - 그 다음 middleware ~ guard ~ interceptor pipe ~ controller ~ service ~ interceptor ~ exception filter ~ response
interface OriginHeaderInterface extends IncomingHttpHeaders {
  'x-api-token': string;
  'x-api-refreshtoken': string;
  'x-api-key': string;
  'x-device-type'?: string;
  'x-device-version'?: string;
  'x-device-uuid'?: string;
  'x-device-id'?: string;
  'x-device-pid'?: string;
  'x-api-hospitalid'?: string;
  'Content-Type': 'application/json';
}

type Header = {
  deviceType?: string;
  deviceVersion?: string;
  deviceUUID?: string;
};

export const createContext = async ({ req }: { req: Request }) => {
  try {
    const { headers } = req;
    const originHeader = headers as OriginHeaderInterface;
    const header: Header = {
      deviceType: originHeader['x-device-type'],
      deviceVersion: originHeader['x-device-version'],
      deviceUUID: originHeader['x-device-uuid'],
    };

    return {
      headers: header,
      operationName: req.body.operationName,
      token: 'fake token string',
    };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
