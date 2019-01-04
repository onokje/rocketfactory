import {payResources} from "../helpers/InventoryHelper";
import {coalPowerPlantPrice} from "../helpers/gameData";

const initialResourcesState = {
    iron: 0,
    coal: 0,
    resourceStorage: 50
};

const resources = (state = initialResourcesState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return {...state, ...action.playerData.resources};
        case 'MINE_RESOURCE':
            switch (action.resourceType) {
                case 'iron':
                    if (state.iron >= state.resourceStorage) {
                        return state;
                    } else {
                        return {...state, iron: state.iron + 1}
                    }
                case 'coal':
                    if (state.coal >= state.resourceStorage) {
                        return state;
                    } else {
                        return {...state, coal: state.coal + 1}
                    }
                default:
                    return state;
            }
        case 'BUILD_POWER_PLANT':
            switch (action.powerType) {
                case 'coal':

                    return payResources(coalPowerPlantPrice, state);

                default:
                    return state;
            }
        case 'SELL_IRON':

            let newValue = state.ironAmount - action.amount;
            newValue = newValue < 0 ? 0 : newValue;
            return {...state, ironAmount: newValue};

        default:
            return state;
    }
};

export default resources;