module.exports.parseDeaths = (data = []) => {
    const parsedData = [];

    for (let i = 0; i < data.length; i += 1) {
        const person = data[i];

        const text = person.text;
        const yearOfDeath = person.year;
        const extract = person.pages[0].extract;
        const thumbnail = person.pages[0].thumbnail;
        const link = person.pages[0].content_urls.desktop.page;

        parsedData.push({
            text,
            yearOfDeath,
            extract,
            thumbnail,
            link
        });
    }

    return parsedData;
};
