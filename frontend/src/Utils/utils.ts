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

