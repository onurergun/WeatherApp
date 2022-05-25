function getCurrentDate() {
    return new Date().toDateString();
}

function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

function getCurrentDateTime() {
    return {
        date: getCurrentDate(),
        time: getCurrentTime()
    };
}

function updateDateTime(dateId, timeId) {
    const date_time = getCurrentDateTime();
    // console.log("Current Date:" + date_time.date);
    // console.log("Current Time:" + date_time.time);

    $(dateId).text(date_time.date);
    $(timeId).text(date_time.time);
}

function getCurrentYear() {
    var year = new Date();
    return year.getFullYear();
}

function updateFooterYear(footer_id) {
    $(footer_id)[0].innerHTML = getCurrentYear();
}

export {getCurrentDate, getCurrentTime, updateDateTime, getCurrentYear, updateFooterYear}