export function playerHasScience(playerScience, science) {
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