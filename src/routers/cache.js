import ExpressExpeditious from "express-expeditious";
import expeditiousEngineRedis from "expeditious-engine-redis";
import config from "./../config.js";

const defaultOptions = ({
    namespace: 'expresscache',
    defaultTtl: '1 minute', // 60 * 1000 minute in miliseconds
    // statusCodeExpires: {
    //     404: '5 minutes',
    //     500: 0 // 1 minute in miliseconds
    // },
    engine: expeditiousEngineRedis({
        host: config.redis_host,
        port: config.redis_port
    })
})

const cacheInit = ExpressExpeditious(defaultOptions);
export default cacheInit;
// module.exports = cacheInit;
