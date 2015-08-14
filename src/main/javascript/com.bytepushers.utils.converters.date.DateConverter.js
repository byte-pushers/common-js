var BytePushers = BytePushers || {};
BytePushers.converters = BytePushers.namespace("com.bytepushers.utils.converters");
BytePushers.converters.DateConverter = BytePushers.namespace("com.bytepushers.utils.converters.DateConverter");
BytePushers.converters.DateConverter.MMDDYYYY_DATE_FORMAT = 0;
BytePushers.converters.DateConverter.MMMDDYYYY_DATE_FORMAT = 1;
BytePushers.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT = 2;
BytePushers.converters.DateConverter.MDDYYYY_DATE_FORMAT = 3;
BytePushers.converters.DateConverter.convertToDate_MDDYYYY = function (d) {
    'use strict';
    var month, day, year, date = new Date();
    if (d.length !== 7) {
        throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MDDYYYY.");
    }
    if (BytePushers.NumberUtility.isNotANumber(d)) {
        throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
    }
    month = parseInt(d.substring(0, 2), "10");
    day = parseInt(d.substring(2, 4), "10");
    year = parseInt(d.substring(4), "10");
    date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
};
BytePushers.converters.DateConverter.convertToDate_MMDDYYYY = function (d) {
	'use strict';
	var month, day, year, date = new Date();
	if (d.length !== 8) {
		throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMDDYYYY.");
	}
	if (BytePushers.NumberUtility.isNotANumber(d)) {
		throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = parseInt(d.substring(0, 1), "10");
	day = parseInt(d.substring(1, 3), "10");
	year = parseInt(d.substring(3), "10");
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
BytePushers.converters.DateConverter.convertToDate_MMMDDYYYY = function (d) {
    "use strict";
	var month, day, year, date = new Date();
	if (d.length !== 9) {
		throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMMDDYYYY.");
	}
	if (BytePushers.NumberUtility.isNotANumber(d.substring(3))) {
		throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = parseInt(BytePushers.converters.DateConverter.getMonthIndex(d.substring(0, 3)), "10");
	day = parseInt(d.substring(3, 5), "10");
	year = parseInt(d.substring(5), "10");
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
BytePushers.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD = function (iso8601DateString) {
    "use strict";
    return BytePushers.converters.DateConverter.convertToISO8601Date(iso8601DateString);
};
BytePushers.converters.DateConverter.convertToISO8601Date = function (iso8601DateString) {
    "use strict";
    var regexp = new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"),
        d = iso8601DateString.match(new RegExp(regexp)),
        offset = 0,
        date,
        time;

    if (d === null) {
        throw new BytePushers.exceptions.InvalidParameterException("ISO 8601 Date String: " + d + " should be in ISO 8601 format YYYY-MM-DDThh:mm:ss:sTZD.");
    }


    date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(parseInt("0." + d[12], "10") * 1000); }
    if (d[14]) {
        offset = (parseInt(d[16], "10") * 60) + parseInt(d[17], "10");
        offset *= ((d[15] === '-') ? 1 : -1);
    }

    //offset -= date.getTimezoneOffset();
    //time = (date.getTime() + (offset * 60 * 1000));
    //date.setTime(time);
    return date;
};
BytePushers.converters.DateConverter.convertToDate = function (d, dateFormat) {
	'use strict';
	var date = null;
	switch (dateFormat) {
    case BytePushers.converters.DateConverter.MDDYYYY_DATE_FORMAT:
        date = BytePushers.converters.DateConverter.convertToDate_MDDYYYY(d);
        break;
    case BytePushers.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
        date = BytePushers.converters.DateConverter.convertToDate_MMDDYYYY(d);
        break;
    case BytePushers.converters.DateConverter.MMMDDYYYY_DATE_FORMAT:
        date = BytePushers.converters.DateConverter.convertToDate_MMMDDYYYY(d);
        break;
    case BytePushers.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT:
        date = BytePushers.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD(d);
        break;
	}
	return date;
};
/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
BytePushers.converters.DateConverter.getMonthIndex = function (abbr) {
    "use strict";
    var i = -1;
    BytePushers.converters.DateConverter.monthNames.forEach(function (monthName, index) {
        if (monthName.abbr === abbr) {
            i = index;
        }
    });
    return i;
};

/**
 * <p>Static field for the list of month.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
BytePushers.converters.DateConverter.monthNames = [
    {"name": "January", "abbr": "Jan", "getTotalDays": function (year) { "use strict"; return 31; } },
    {"name": "February", "abbr": "Feb", "getTotalDays": function (year) { "use strict"; if (year) { return (year % 4 === 0) ? 29 : 28; } else { throw ("Expected parameter(Year) is not defined."); } } },
    {"name": "March", "abbr": "Mar", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "April", "abbr": "Apr", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "May", "abbr": "May", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "June", "abbr": "Jun", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "July", "abbr": "Jul", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "August", "abbr": "Aug", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "September", "abbr": "Sep", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "October", "abbr": "Oct", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "November", "abbr": "Nov", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "December", "abbr": "Dec", "getTotalDays": function (year) { "use strict"; return 31; }}
];

//exports.BytePushers = BytePushers;