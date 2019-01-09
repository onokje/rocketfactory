export const buildFurnace = (furnaceType, name, id) => ({
    type: 'BUILD_FURNACE',
    furnaceType,
    id
});

export const toggleFurnace = (furnaceId, on, nextItem) => ({
    type: 'TOGGLE_FURNACE',
    furnaceId,
    on,
    nextItem
});

export const furnaceProductionStart = (furnaceId, currentItem, itemCost) => ({
    type: 'FURNACE_PRODUCTION_START',
    furnaceId,
    currentItem,
    itemCost
});

export const furnaceProductionFinish = (furnaceId, itemsProduced) => ({
    type: 'FURNACE_PRODUCTION_FINISH',
    furnaceId,
    itemsProduced
});