import {createSlice} from '@reduxjs/toolkit'
import {loadPlayer} from "./playerSlice";

const idExistsInArray = (arr, id) => {
    return !!arr.find(item => item === id);
};

const productionSlice = createSlice({
    name: 'production',
    initialState: {
        machines: [],
        machineDialogOpen: false,
        machineDialogMachineId: null,
        machineDialogSelectorOpen: false
    },
    reducers: {
        productionTick(state, action) {
            const {poweredMachineIds} = action.payload;
            state.machines.forEach(machine => {
                if (machine.on) {
                    const powered = idExistsInArray(poweredMachineIds, machine.id);
                    machine.powered = powered;
                    if (machine.running && powered) {
                        machine.progressTicks += 1;
                    }
                }
            });
        },
        buildMachine(state, action) {
            const {id, productionType, techType} = action.payload;
            state.machines.push({
                id,
                on: false,
                powered: false,
                running: false,
                nextItem: null,
                currentItem: null,
                progressTicks: 0,
                ticksCost: 10,
                productionType,
                techType
            });
        },
        sellMachine(state, action) {
            state.machines = state.machines.filter(machine => machine.id !== action.payload.id);
        },
        toggleMachine(state, action) {
            const {id, on, nextItem} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            machine.on = on;
            machine.nextItem = nextItem;
            machine.progressTicks = on ? machine.progressTicks : 0;
        },
        machineProductionStart(state, action) {
            const {id, currentItem} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            machine.currentItem = currentItem;
            machine.running = true;
        },
        machineProductionFinish(state, action) {
            const {id} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            machine.running = false;
            machine.currentItem = null;
            machine.progressTicks = 0;
        },
        openMachineDialog(state, action) {
            return {...state, machineDialogOpen: true, machineDialogMachineId: action.payload.id, machineDialogSelectorOpen: false};
        },
        closeMachineDialog(state) {
            return {...state, machineDialogOpen: false, machineDialogSelectorOpen: false};
        },
        openMachineDialogSelector(state) {
            state.machineDialogSelectorOpen = true;
        },
        closeMachineDialogSelector(state) {
            state.machineDialogSelectorOpen = false;
        },
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.production
    }
});

export const {
    productionTick, buildMachine, sellMachine, toggleMachine, machineProductionStart, machineProductionFinish, openMachineDialog, closeMachineDialog, openMachineDialogSelector, closeMachineDialogSelector
} = productionSlice.actions;

export default productionSlice.reducer;