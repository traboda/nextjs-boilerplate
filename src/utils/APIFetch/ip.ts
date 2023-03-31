import { Ipware } from '@fullerstack/nax-ipware';

// eslint-disable-next-line import/no-unused-modules
export const getIPFromRequest = (request: any) => {
  const IP = new Ipware();
  const ip = IP.getClientIP(request, {
    requestHeadersOrder: [
      'CF-CONNECTING-IP',
      'TRUE-CLIENT-IP',
      'X_FORWARDED_FOR',
      'HTTP_CLIENT_IP',
      'X_FORWARDED_FOR',
      'X-REAL-IP',
    ],
  });
  if(ip)
    return ip.ip;
};
