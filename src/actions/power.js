export const buildPowerPlant = (techType, id) => ({
    type: 'BUILD_POWER_PLANT',
    techType,
    id
});

export const sellPowerPlant = (techType, id) => ({
    type: 'SELL_POWER_PLANT',
    techType,
    id
});

export const togglePowerplant = (powerPlantId, on) => ({
    type: 'TOGGLE_POWERPLANT',
    powerPlantId,
    on
});