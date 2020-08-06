import {Item} from "../CommonTypes/Item";
import {itemRecipes} from "./items";
import {machines, minePrices, powerPlants} from "./machines";
import {researches} from "./research";

export interface ItemRecipeInterface {
    readonly name: string,
    readonly type: string,
    readonly researchRequired: null | string,
    readonly resultAmount?: number,
    readonly cost?: Item[],
    readonly handcrafting?: boolean
}

interface ItemRecipesInterface {
    [propName: string]: ItemRecipeInterface
}

export interface MachineRecipeInterface {
    readonly text: string,
    readonly type: string,
    readonly name: string,
    readonly powerGeneration?: number,
    readonly powerUsage?: number,
    readonly cost?: Item[],
    readonly fuelCost?: Item[],
    readonly researchRequired: null | string,
    readonly resultMultiplier?: number
}

interface MachineRecipesInterface {
    [propName: string]: MachineRecipeInterface
}

export interface ResearchInterface {
    readonly name: string,
    readonly requiredResearch: string[],
    readonly time: number,
    readonly cost: Item[]
}

interface ResearchesInterface {
    [propName: string]: ResearchInterface
}

export function getItemRecipe(itemKey: string): ItemRecipeInterface {
    const recipes: ItemRecipesInterface = itemRecipes;
    return recipes[itemKey];
}

export function getMachineRecipe(machineKey: string): MachineRecipeInterface {
    const recipes: MachineRecipesInterface = machines;
    return recipes[machineKey];
}

export function getPowerPlantRecipe(machineKey: string): MachineRecipeInterface {
    const recipes: MachineRecipesInterface = powerPlants;
    return recipes[machineKey];
}

export function getMineRecipe(machineKey: string): MachineRecipeInterface {
    const recipes: MachineRecipesInterface = minePrices;
    return recipes[machineKey];
}

export function getResearch(researchKey: string): ResearchInterface {
    const recipes: ResearchesInterface = researches;
    return recipes[researchKey];
}