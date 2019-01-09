export const buildMine = (resourceType, techType, name, id) => ({
    type: 'BUILD_MINE',
    resourceType,
    techType,
    id
});

export const toggleMine = (mineId, on) => ({
    type: 'TOGGLE_MINE',
    mineId,
    on
});