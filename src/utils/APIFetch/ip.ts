import { Ipware } from '@fullerstack/nax-ipware';

export const get_ip_from_req = (req) => {
    const IP = new Ipware();
    const ip = IP.getClientIP(req, {
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
        return ip['ip'];
};

export default get_ip_from_req;
