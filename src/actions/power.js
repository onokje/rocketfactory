export const buildPowerPlant = (powerType, name, id) => ({
    type: 'BUILD_POWER_PLANT',
    powerType,
    name,
    id
});

export const powerProductionTick = (powerProduced, itemCost) => ({
    type: 'POWER_PRODUCTION_TICK',
    powerProduced,
    itemCost
});

export const togglePowerplant = (powerPlantId, on) => ({
    type: 'TOGGLE_POWERPLANT',
    powerPlantId,
    on
});