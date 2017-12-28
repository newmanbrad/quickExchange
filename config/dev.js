module.exports = {

    database: {
        connectionString: 'mongodb://localhost:27017/quickExchange',
        secret: 'the secret'
    },

    binanceConfigObj: {
        key: 'api-key', // Get this from your account on binance.com
        secret: 'api-secret', // Same for this
        timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
        recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
        disableBeautification: false
        /*
         * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
         * default those keys will be replaced with more descriptive, longer ones.
         */
    }

};