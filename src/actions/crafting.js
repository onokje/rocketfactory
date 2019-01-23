export const buildAssembler = (techType, id) => ({
    type: 'BUILD_ASSEMBLER',
    techType,
    id
});

export const sellAssembler = (techType, id) => ({
    type: 'SELL_ASSEMBLER',
    techType,
    id
});

export const toggleAssembler = (id, on, nextItem) => ({
    type: 'TOGGLE_ASSEMBLER',
    id,
    on,
    nextItem
});

export const assemblerProductionStart = (id, currentItem, itemCost) => ({
    type: 'ASSEMBLER_PRODUCTION_START',
    id,
    currentItem,
    itemCost
});

export const assemblerProductionFinish = (id, itemsProduced) => ({
    type: 'ASSEMBLER_PRODUCTION_FINISH',
    id,
    itemsProduced
});