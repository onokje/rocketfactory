export function playerHasScience(playerScience, science) {
    if (!science) {
        return true;
    }
    return !!playerScience.find(item => item === science);
}

export function playerHasAllSciences(playerScience, scienceIds) {
    for (const scienceId of scienceIds) {
        if (!playerHasScience(playerScience, scienceId)) {
            return false;
        }
    }
    return true;
}