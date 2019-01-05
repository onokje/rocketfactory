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
