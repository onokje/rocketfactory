export const buildFurnace = (furnaceType, name, id) => ({
    type: 'BUILD_FURNACE',
    furnaceType,
    name,
    id
});

export const toggleFurnace = (furnaceId, on, item) => ({
    type: 'TOGGLE_FURNACE',
    furnaceId,
    on,
    item
});

export const furnaceProductionStart = (furnaceId, itemCost) => ({
    type: 'FURNACE_PRODUCTION_START',
    furnaceId,
    itemCost
});

export const furnaceProductionFinish = (furnaceId, itemsProduced) => ({
    type: 'FURNACE_PRODUCTION_FINISH',
    furnaceId,
    itemsProduced
});