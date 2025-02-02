// generic wrapper for GETing JSON data from a URL
const getJSON = async (url) => {
    let result = {};

    if (!url || !url.length) {
        return result;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return {};
        }

        const data = await response.json();
        return data;

    } catch (e) {
        return {};
    }
};

// get today's date
const getTodayDate = async () => getJSON('/api/today/date');

const updatePageWithDate = async (month, day) => {
    let date;

    if (!month || !day) {
        date = await getTodayDate();
    } else {
        date = {
            month,
            day
        };
    }

    const dateEl = document.getElementById('todaysDate');
    dateEl.innerText += date.todayString;

    const response = await fetch(`/api/deaths/${date.month}/${date.day}`);

    if (response.ok) {
        const deaths = await response.json();
        addData(deaths);
    }
};

/*
Uses document.createElement instead of raw HTML because I want to play around with it!
*/
const addData = (deaths) => {
    const wrapper = document.getElementById('content'); // our HTML will be appended to this

    for (let i = 0; i < deaths.data.length; i += 1) {
        const person = deaths.data[i];

        const personRow = document.createElement('div');
        personRow.setAttribute('class', 'row mb-5');

        // year of death
        const personYearOfDeath = document.createElement('div');
        personYearOfDeath.setAttribute('class', 'col-sm-1 text-left');
        personYearOfDeath.innerText = person.yearOfDeath;
        personRow.appendChild(personYearOfDeath);

        // name with link
        const personName = document.createElement('div');
        personName.setAttribute('class', 'col-sm-3 text-left');

        const a = document.createElement('a');
        a.setAttribute('href', person.link);
        a.setAttribute('target', '_blank');
        a.innerText = person.text;
        personName.appendChild(a);
        personRow.appendChild(personName);

        // extract
        const personExtract = document.createElement('div');
        personExtract.setAttribute('class', 'col-sm-8 text-left');
        personExtract.innerText = person.extract;
        personRow.appendChild(personExtract);

        // attach the row to the parent
        wrapper.appendChild(personRow);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updatePageWithDate();
});
