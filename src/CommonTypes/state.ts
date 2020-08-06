import {Item} from "./Item";

export type InventoryType = Item[];

export interface PlayerState {
    initialized: boolean,
    tab: string
}

export interface PowerPlant {
    techType: string,
    id: string,
    powered: boolean,
    on: boolean
}

export interface PowerState {
    powerPlants: PowerPlant[],
    powerProducedLastTick: number,
    powerUsedLastTick: number,
    powerLeft: number,
    bufferMax: number,
    bufferCurrent: number
}

export interface Mine {
    id: string,
    resourceType: string,
    techType: string,
    on: boolean,
    running: boolean,
    powered: boolean,
    progressTicks: number,
    ticksCost: number,
    x: number,
    y: number
}

export interface MiningState {
    mines: Mine[]
}

export interface Coords {
    x: number,
    y: number
}

export interface ResourcemapState {
    map: [],
    mapSelected: null | Coords,
    exploring: boolean,
    exploringProgressTicks: null | number,
    exploringProgressTicksTotal: number,
    exploringCoords: null | Coords
}

export interface ResearchState {
    researchComplete: string[],
    researching: boolean,
    researchingResearchId: null | string,
    researchingProgressTicks: null | number,
    researchingTicksCost: number,
    selectedResearch: null | string,
}

export interface Machine {
    id: string,
    on: boolean,
    powered: boolean,
    running: boolean,
    nextItem: string | null,
    currentItem: string | null,
    progressTicks: number,
    ticksCost: number,
    productionType: string,
    techType: string
}

export interface ProductionState {
    machines: Machine[],
    machineDialogOpen: boolean,
    machineDialogMachineId: null | string,
    machineDialogSelectorOpen: boolean
}

export interface RocketSiloState {
    powered: boolean,
    siloBuildProgressTicks: null | number, // ticks for silo itself, launchpad or car
    siloBuildProgressTotal: null | number,
    fuelProgressTicks: null | number, // fuel runs automatically if there are parts
    rocketPartProgressTicks: null | number, // rocket parts runs automatically if there are parts
    rocketParts: number, // max 100
    fuelParts: number, // max 100
    rocketPartsRunning: boolean,
    fuelPartsRunning: boolean,
    checklist: {
        silo: boolean,
        rocket: boolean,
        launchpad: boolean,
        fuel: boolean,
        payload: boolean
    },
    buildingNow: null | 'silo' | 'launchpad' | 'car',
    launched: boolean,
    launchedTicks: number
}

export interface ManualProductionState {
    handmining: boolean,
    handminingResource: null | string,
    handminingProgressTicks: number,
    handminingTicksCost: number,
    handcrafting: boolean,
    handcraftingItem: null | string,
    handcraftingProgressTicks: number,
    handcraftingTicksCost: number
}

export interface RootStateInterface {
    player: PlayerState,
    inventory: InventoryType,
    power: PowerState,
    mining: MiningState,
    resourcemap: ResourcemapState,
    research: ResearchState,
    production: ProductionState,
    rocketSilo: RocketSiloState,
    manualProduction: ManualProductionState
}