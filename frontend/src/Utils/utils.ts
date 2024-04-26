/**
 * Some players can play guard/forward or forward/center.
 * This function checks for those strings and returns the position with a slash between
 * @param position string 
 * @returns string converted to G/F || F/C or original position variable
 */

export const convertPlayerPosition = (position: string) => {
    if (position === "GF" || position === "FC") {
        return `${position.split("")[0]}/${position.split("")[1]}`
    }

    return position
}

/**
 * This function takes a player's rank in a certain category, converts it to a string and returns the appropriate suffix that goes with that number
 * @param rank string 
 * @returns suffix that works with passed in rank (i.e. 131 -> st, 132 -> nd, etc.)
 */
export const determineSuffix = (rank: string) => {

    // convert rank to int
    const numberRank = +rank

    if (numberRank % 100 >= 11 && numberRank % 100 <= 13) {
        return "th";
    }

    switch (numberRank % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

/**
 * Takes in date and day of week and formats them for game log table
 * @param day_of_week string - Monday, Tuesday, etc
 * @param date string - YYYY-MM-DD format
 * @returns date and day of week converted into GameLog date format: Thu 2/17
 */
export const convertDateGameLog = (day_of_week: string, date: string): string => {
    // Extracting month and day from the date string
    const [year, month, day] = date.split('-');

    // Convert day of week to abbreviation
    const dayAbbreviation = day_of_week.slice(0, 3);

    // Format the date as MM/DD
    const formattedDate = `${month[0] === "0" ? month[1] : month}/${day[0] === "0" ? day[1] : day}`;

    // Constructing the final formatted string
    return `${dayAbbreviation} ${formattedDate}`;
};


/**
 * Takes in date returns month in string form
 * @param date string - YYYY-MM-DD format
 * @returns Month as a string
 */
export const convertNumberToFullMonth = (month: number): string => {

    // Mapping month number to month abbreviation
    const monthMap: { [key: number]: string } = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    
    return `${monthMap[month]}`;
};
    
