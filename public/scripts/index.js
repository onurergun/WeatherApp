import {updateFooterYear, updateDateTime} from "./common.js"

updateFooterYear("#footer-year");
updateDateTime("#current-date", "#current-time");
setInterval(function () {updateDateTime("#current-date", "#current-time") }, 1000);