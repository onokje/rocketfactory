import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";
import {MiningState} from "../CommonTypes/state";
import {Item} from "../CommonTypes/Item";

const findMineIdInPoweredMinesArray = (poweredMinesArray: string[], mineId: string) => {
    return !!poweredMinesArray.find(item => item === mineId);
};

interface BuildMinePayload {
    readonly id: string,
    readonly resourceType: string,
    readonly techType: string,
    readonly x: number,
    readonly y: number
}

const miningSlice = createSlice({
    name: 'mining',
    initialState: {
        mines: []
    } as MiningState,
    reducers: {
        buildMine(state, action: PayloadAction<BuildMinePayload>) {
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
        sellMine(state, action: PayloadAction<{id: string, techType: string}>) {
            const {id} = action.payload;
            state.mines = state.mines.filter(mine => mine.id !== id);
        },
        toggleMine(state, action: PayloadAction<{mineId: string, on: boolean}>) {
            const {mineId,on} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            if (!mine) {
                throw Error('trying to toggle a mine that does not exist');
            }
            mine.on = on;
        },
        miningProductionStart(state, action: PayloadAction<{mineId: string, itemCost: Item[]}>) {
            const {mineId} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            if (!mine) {
                throw Error('trying to toggle a mine that does not exist');
            }
            mine.running = true;
        },
        miningProductionFinish(state, action: PayloadAction<{mineId: string, itemsProduced: Item[]}>) {
            const {mineId} = action.payload;
            const mine = state.mines.find(mine => mine.id === mineId);
            if (!mine) {
                throw Error('trying to toggle a mine that does not exist');
            }
            mine.running = false;
            mine.progressTicks = 0;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadPlayer, (state, action) => action.payload.playerData.mining)
            .addCase(productionTick, (state: MiningState, action) => {
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
            });
    }

});

export const { buildMine, sellMine, toggleMine, miningProductionStart, miningProductionFinish } = miningSlice.actions;

export default miningSlice.reducer;