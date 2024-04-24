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


