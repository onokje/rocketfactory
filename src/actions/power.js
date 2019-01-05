export const buildPowerPlant = (powerType) => ({
    type: 'BUILD_POWER_PLANT',
    powerType
});

export const powerProductionTick = (powerProduced, itemCost) => ({
    type: 'POWER_PRODUCTION_TICK',
    powerProduced,
    itemCost
});