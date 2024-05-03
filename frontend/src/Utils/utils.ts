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

    return monthMap[month];
};

/**
 * Takes in string of last 10 games returns count of wins/losses in a row, most recent first
 * @param lastTen string - "W-W-L-L-W-W-W-W-W-L" format
 * @returns W/L streak - W2
 */
export const countStreak = (lastTen: string) => {
    let count: number = 1
    let winOrLoss: string

    const lastTenSplit = lastTen.split("-")

    lastTenSplit[0] === "W" ? winOrLoss = "W" : winOrLoss = "L"

    for (let i = 1; i < lastTenSplit.length; i++) {
        if (lastTenSplit[i] === winOrLoss) {
            count++
        } else {
            return `${winOrLoss}${count}`
        }
    }

    return `${winOrLoss}${count}`
}

/**
 * Takes in a team's id and returns their shortened team name
 * @param team_id team's id from database
 * @returns team's shortened name. 0 -> Hawks, 1 -> Celtics, etc.
 */
export const shortenTeamName = (team_id: number) => {

    const mascot_dict: { [key: number]: string } = {
        0: "Hawks",
        1: "Celtics",
        2: "Nets",
        3: "Hornets",
        4: "Bulls",
        5: "Cavaliers",
        6: "Mavericks",
        7: "Nuggets",
        8: "Pistons",
        9: "Warriors",
        10: "Rockets",
        11: "Pacers",
        12: "Clippers",
        13: "Lakers",
        14: "Grizzlies",
        15: "Heat",
        16: "Bucks",
        17: "Timberwolves",
        18: "Pelicans",
        19: "Knicks",
        20: "Thunder",
        21: "Magic",
        22: "76ers",
        23: "Suns",
        24: "Trail Blazers",
        25: "Kings",
        26: "Spurs",
        27: "Raptors",
        28: "Jazz",
        29: "Wizards"
    }

    return mascot_dict[team_id]
}


/**
 * Generates a string representation of a range of years based on an array of years.
 * If the range ends with 2024, the end year is labeled as "Current".
 * @param years An array of years to be shortened into ranges.
 * @returns A string representing the shortened years along with the number of seasons.
 */

export const shortenYears = (years: number[]) => {
    let displayYears: string[] = [];
    let startYear = years[0];
    let endYear = years[0];

    for (let i = 1; i < years.length; i++) {
        if (years[i] === endYear + 1) {
            // If the current year is subsequent to the previous year, update the end year
            endYear = years[i];
        } else {
            // If the current year is not subsequent, push the range if it's more than one year, otherwise push the single year
            if (startYear === endYear) {
                displayYears.push(`${startYear}`);
            } else {
                const endLabel = (endYear + 1) === 2024 ? "Current" : (endYear + 1).toString();
                displayYears.push(`${startYear}-${endLabel}`);
            }
            // Reset start and end years for the next range
            startYear = endYear = years[i];
        }
    }

    // Push the last range or single year
    const endLabel = (endYear + 1) === 2024 ? "Current" : (endYear + 1).toString();
    if (startYear === endYear) {
        displayYears.push(`${startYear}-${endLabel}`);
    } else {
        displayYears.push(`${startYear}-${endLabel}`);
    }

    console.log(displayYears.join(", ")); // Output: "2005-2006, 2009-Current"
    return `${displayYears.join(", ")} (${years.length} Seasons)`;
};