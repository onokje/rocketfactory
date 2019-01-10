export const buildMine = (resourceType, techType, id) => ({
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

export const miningProductionStart = (mineId, itemCost) => ({
    type: 'MINING_PRODUCTION_START',
    mineId,
    itemCost
});

export const miningProductionFinish = (mineId, itemsProduced) => ({
    type: 'MINING_PRODUCTION_FINISH',
    mineId,
    itemsProduced
});