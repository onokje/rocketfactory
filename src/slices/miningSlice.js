import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";

const findMineIdInPoweredMinesArray = (poweredMinesArray, mineId) => {
    return !!poweredMinesArray.find(item => item === mineId);
};

const miningSlice = createSlice({
    name: 'mining',
    initialState: {
        mines: []
    },
    reducers: {
        buildMine(state, action) {
            const {id, resourceType, techType, x, y} = action.payload;
            if (!resourceType || !techType) {
                console.log(action);
                throw Error('Error building mine!');
            }

            state.mines.push({
                id,
                resourceType,
                techType,
                on: false,
                running: false,
                powered: false,
                progressTicks: 0,
                ticksCost: 10,
                x,
                y
            });
        },
        sellMine(state, action) {
            const {id} = action.payload;
            state.mines = state.mines.filter(mine => mine.id !== id);
        },
        toggleMine(state, action) {
            const {mineId,on} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            mine.on = on;
        },
        miningProductionStart(state, action) {
            const {mineId} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            mine.running = true;
        },
        miningProductionFinish(state, action) {
            const {mineId} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            mine.running = false;
            mine.progressTicks = 0;
        },
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.mining,
        [productionTick]: (state, action) => {
            const {poweredMineIds} = action.payload;
            state.mines.forEach(mine => {
                if (mine.on) {
                    const powered = findMineIdInPoweredMinesArray(poweredMineIds, mine.id);
                    mine.powered = powered;
                    if (mine.running && powered) {
                        mine.progressTicks += 1;
                    }
                }
            });
        }
    }
});

export const { buildMine, sellMine, toggleMine, miningProductionStart, miningProductionFinish } = miningSlice.actions;

export default miningSlice.reducer;