const axios = require('axios');
const utils = require('./utils');

class WikiAPI {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    async getDeaths(month, day) {
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/deaths/${month}/${day}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            const parsedDeaths = utils.parseDeaths(response.data.deaths);

            return parsedDeaths;
        } catch(e) {
            console.log(e);
            return [];
        }
    }
};

module.exports = WikiAPI;
