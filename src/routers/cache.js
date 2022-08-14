import ExpressExpeditious from "express-expeditious";
import expeditiousEngineRedis from "expeditious-engine-redis";

const defaultOptions = ({
    namespace: 'expresscache',
    // defaultTtl: '1 minute',
    defaultTtl: 60 * 1000,
    statusCodeExpires: {
        404: '5 minutes',
        500: 0 // 1 minute in miliseconds
    },
    engine: expeditiousEngineRedis({
        host: '127.0.0.1',
        port: 6379
    })
})

const cacheInit = ExpressExpeditious(defaultOptions);

module.exports = { cacheInit };
