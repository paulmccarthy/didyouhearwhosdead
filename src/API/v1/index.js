const router = require('express').Router();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const advancedFormat = require('dayjs/plugin/advancedFormat');

dayjs.extend(utc);
dayjs.extend(advancedFormat);

let instance;

class API {
    constructor(wikiApi) {
        this.router = router;
        this.wikiApi = wikiApi;

        return this.init();
    }

    init() {
        this.router.get('/today/date', (req, res) => {
            const now = dayjs().utc();
            const todayString = now.clone().format('Do of MMMM');
            const day = now.clone().format('DD');
            const month = now.clone().format('MM');
            const msTime = now.clone().valueOf();

            res.json({
                todayString,
                day,
                month,
                msTime
            });
        });

        this.router.get('/deaths/:month/:day', async (req, res) => {
            const month = Number(req.params.month);
            const day = Number(req.params.day);

            try {
                const data = await this.wikiApi.getDeaths(month, day);

                res.json({
                    month,
                    day,
                    data,
                    error: null
                });
            } catch (err) {
                console.log(err);
                res.json({
                    month,
                    day,
                    data: null,
                    error: err.message
                });
            }
        });

        return router;
    }
}

module.exports = (wikiApi) => {
    if (!instance) {
        instance = new API(wikiApi);
    }

    return instance;
};
