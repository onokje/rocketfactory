const initialProductionState = {
    machines: [],
    machineDialogOpen: false,
    machineDialogMachineId: null,
    machineDialogSelectorOpen: false
};

const findIdArray = (arr, id) => {
    return !!arr.find(item => item === id);
};

const production = (state = initialProductionState, action) => {
    let machines;
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.production;
        case 'BUILD_MACHINE':

            machines = state.machines.slice(0);
            machines.push({
                id: action.id,
                on: false,
                powered: false,
                running: false,
                nextItem: null,
                currentItem: null,
                progressTicks: 0,
                ticksCost: 10,
                productionType: action.productionType,
                techType: action.techType
            });
            return {...state, machines: machines};
        case 'SELL_MACHINE':
            return {...state, machines: state.machines.filter(machine => machine.id !== action.id)};
        case 'TOGGLE_MACHINE':
            machines = state.machines.map(machine => {
                return action.id === machine.id ? {
                    ...machine,
                    on: action.on,
                    nextItem: action.nextItem,
                    progressTicks: action.on ? machine.progressTicks : 0
                } : machine
            });

            return {...state, machines: machines, machineDialogSelectorOpen: false};
        case 'PRODUCTION_TICK':
            machines = state.machines.map(machine => {
                if (machine.on) {
                    const powered = findIdArray(action.poweredMachineIds, machine.id);
                    return machine.running && powered? {
                        ...machine,
                        powered: true,
                        progressTicks: machine.progressTicks + 1
                    } : {...machine, powered: powered}
                }
                return machine;
            });

            return {...state, machines: machines};
        case 'MACHINE_PRODUCTION_START':
            machines = state.machines.map(machine => {
                return machine.id === action.id ? {
                    ...machine,
                    currentItem: action.currentItem,
                    running: true,
                } : machine
            });

            return {...state, machines: machines};
        case 'MACHINE_PRODUCTION_FINISH':
            machines = state.machines.map(machine => {
                return machine.id === action.id ? {
                    ...machine,
                    running: false,
                    currentItem: null,
                    progressTicks: 0
                } : machine
            });

            return {...state, machines: machines};
        case 'OPEN_MACHINE_DIALOG':
            return {...state, machineDialogOpen: true, machineDialogMachineId: action.id, machineDialogSelectorOpen: false};
        case 'CLOSE_MACHINE_DIALOG':
            return {...state, machineDialogOpen: false, machineDialogSelectorOpen: false};
        case 'OPEN_MACHINE_DIALOG_SELECTOR':
            return {...state, machineDialogSelectorOpen: true};
        case 'CLOSE_MACHINE_DIALOG_SELECTOR':
            return {...state, machineDialogSelectorOpen: false};
        default:
            return state;
    }
};

export default production;