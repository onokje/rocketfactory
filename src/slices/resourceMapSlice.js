import {createSlice} from '@reduxjs/toolkit';
import createGrid from "../helpers/MapGenerator";
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";

const resourceMapSlice = createSlice({
    name: 'resourceMap',
    initialState: {
        map: [],
        mapSelected: null,
        exploring: false,
        exploringProgressTicks: null,
        exploringProgressTicksTotal: 60,
        exploringCoords: null
    },
    reducers: {
        createMap(state) {
            state.map = createGrid();
        },
        exploreStart(state, action) {
            const {x,y} = action.payload;
            return {
                ...state,
                exploringProgressTicks: 0,
                exploringProgressTicksTotal: 60,
                exploring: true,
                exploringCoords: {x,y}
            };
        },
        selectCell(state, action) {
            const {x,y} = action.payload;
            state.mapSelected = {x,y};
        },
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.resourcemap,
        [productionTick]: (state) => {
            if (state.exploring) {
                if (state.exploringProgressTicks === state.exploringProgressTicksTotal) {
                    const cell = state.map.find(cell => cell.x === state.exploringCoords.x && cell.y === state.exploringCoords.y);
                    cell.explored = true;

                    state.exploringProgressTicks = 0;
                    state.exploring = false;
                    state.exploringCoords = null;
                } else {
                    state.exploringProgressTicks += 1;
                }
            }
        }
    }
});

export const { createMap, exploreStart, selectCell } = resourceMapSlice.actions;

export default resourceMapSlice.reducer;