export const productionTick = (
    poweredMineIds,
    poweredFurnaceIds,
    totalPowerProduced,
    itemsUsed,
    poweredPowerplants,
    poweredAssemblerIds,
    newBufferSize
) => ({
    type: 'PRODUCTION_TICK',
    poweredMineIds,
    poweredFurnaceIds,
    totalPowerProduced,
    itemsUsed,
    poweredPowerplants,
    poweredAssemblerIds,
    newBufferSize
});
