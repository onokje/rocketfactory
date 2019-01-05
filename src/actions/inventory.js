export const mineResource = (resourceType) => ({
    type: 'MINE_RESOURCE',
    resourceType
});

export const productionFinish = (items) => ({
    type: 'PRODUCTION_FINISH',
    items
});

export const productionStart = (itemCost) => ({
    type: 'PRODUCTION_START',
    itemCost
});