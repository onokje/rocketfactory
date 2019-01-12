export const productionTick = (poweredMineIds, poweredFurnaceIds, totalPowerProduced, powerLeft, itemsUsed, poweredPowerplants) => ({
    type: 'PRODUCTION_TICK',
    poweredMineIds,
    poweredFurnaceIds,
    totalPowerProduced,
    powerLeft,
    itemsUsed,
    poweredPowerplants
});
