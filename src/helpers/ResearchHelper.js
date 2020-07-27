export function playerHasResearch(playerResearch, research) {
    if (!research) {
        return true;
    }
    return !!playerResearch.find(item => item === research);
}

export function playerHasAllResearches(playerResearch, researchIds) {
    for (const researchId of researchIds) {
        if (!playerHasResearch(playerResearch, researchId)) {
            return false;
        }
    }
    return true;
}