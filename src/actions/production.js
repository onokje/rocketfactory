export const productionTick = (
    poweredMineIds,
    totalPowerProduced,
    itemsUsed,
    poweredPowerplants,
    poweredMachineIds,
    newBufferSize
) => ({
    type: 'PRODUCTION_TICK',
    poweredMineIds,
    totalPowerProduced,
    itemsUsed,
    poweredPowerplants,
    poweredMachineIds,
    newBufferSize
});

export const buildMachine = (productionType, techType, id) => ({
    type: 'BUILD_MACHINE',
    productionType,
    techType,
    id
});

export const sellMachine = (techType, id) => ({
    type: 'SELL_MACHINE',
    techType,
    id
});

export const toggleMachine = (id, on, nextItem) => ({
    type: 'TOGGLE_MACHINE',
    id,
    on,
    nextItem
});

export const machineProductionStart = (id, currentItem, itemCost) => ({
    type: 'MACHINE_PRODUCTION_START',
    id,
    currentItem,
    itemCost
});

export const machineProductionFinish = (id, itemsProduced) => ({
    type: 'MACHINE_PRODUCTION_FINISH',
    id,
    itemsProduced
});