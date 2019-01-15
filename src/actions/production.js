export const productionTick = (poweredMineIds, poweredFurnaceIds, totalPowerProduced, powerLeft, itemsUsed, poweredPowerplants, poweredAssemblerIds) => ({
    type: 'PRODUCTION_TICK',
    poweredMineIds,
    poweredFurnaceIds,
    totalPowerProduced,
    powerLeft,
    itemsUsed,
    poweredPowerplants,
    poweredAssemblerIds
});
