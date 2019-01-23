export function playerHasScience(playerScience, science) {
    return !!playerScience.find(item => item === science);
}