import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {loadPlayer} from "./playerSlice";
import {ProductionState} from "../CommonTypes/state";
import {Item} from "../CommonTypes/Item";

const idExistsInArray = (arr: string[], id: string): boolean => {
    return !!arr.find(item => item === id);
};

interface ProductionTickAction {
    poweredMineIds: string[],
    poweredMachineIds: string[],
    totalPowerProduced: number,
    itemsUsed: Item[],
    poweredPowerplants: string[],
    newBufferSize: number,
    silo: {
        powered: boolean
    }
}

const productionSlice = createSlice({
    name: 'production',
    initialState: {
        machines: [],
        machineDialogOpen: false,
        machineDialogMachineId: null,
        machineDialogSelectorOpen: false
    } as ProductionState,
    reducers: {
        productionTick(state, action: PayloadAction<ProductionTickAction>) {
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
        buildMachine(state, action: PayloadAction<{id: string, productionType: string, techType: string}>) {
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
        sellMachine(state, action: PayloadAction<{id: string, techType: string}>) {
            state.machines = state.machines.filter(machine => machine.id !== action.payload.id);
        },
        toggleMachine(state, action: PayloadAction<{id: string, on: boolean, nextItem: string}>) {
            const {id, on, nextItem} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            if (!machine) {
                throw Error('trying to toggle a machine that doesnt exist');
            }
            machine.on = on;
            machine.nextItem = nextItem;
            machine.progressTicks = on ? machine.progressTicks : 0;
        },
        machineProductionStart(state, action: PayloadAction<{id: string, currentItem: string, itemCost: Item[]}>) {
            const {id, currentItem} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            if (!machine) {
                throw Error('production start on a machine that doesnt exist');
            }
            machine.currentItem = currentItem;
            machine.running = true;
        },
        machineProductionFinish(state, action: PayloadAction<{id: string, itemsProduced: Item[]}>) {
            const {id} = action.payload;
            const machine = state.machines.find(machine => id === machine.id);
            if (!machine) {
                throw Error('production finish on a machine that doesnt exist');
            }
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
    extraReducers: builder => {
        builder
            .addCase(loadPlayer, (state, action) => action.payload.playerData.production)
    }
});

export const {
    productionTick, buildMachine, sellMachine, toggleMachine, machineProductionStart, machineProductionFinish, openMachineDialog, closeMachineDialog, openMachineDialogSelector, closeMachineDialogSelector
} = productionSlice.actions;

export default productionSlice.reducer;