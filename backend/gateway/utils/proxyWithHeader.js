import proxy from "express-http-proxy";
export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqBodyDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user) {
                proxyReqOpts.headers = proxyReqOpts.headers || {};
                proxyReqOpts.headers["X-User-Id"] = srcReq.user.userId;
            }
            return proxyReqOpts;
        }
    });
};