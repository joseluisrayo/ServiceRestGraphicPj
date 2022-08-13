import ExpressExpeditious from "express-expeditious";

const defaultOptions = ({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    statusCodeExpires: {
        404: '5 minutes',
        500: 0 // 1 minute in miliseconds
    }
})

const cacheInit = ExpressExpeditious(defaultOptions);

module.exports = {cacheInit}