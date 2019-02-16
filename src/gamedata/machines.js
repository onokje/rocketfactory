export const powerPlants = {
    coalPower: {
        text: 'Generates electricity using coal as fuel',
        type: 'power',
        name: 'Coal generator',
        powerGeneration: 500,
        cost: [
            {
                name: 'ironPlate',
                amount: 12
            },
            {
                name: 'copperWire',
                amount: 20
            },
            {
                name: 'belt',
                amount: 4
            },
        ],
        fuelCost: [{name: 'coal', amount: 1}],
        scienceRequired: null
    },
    oilPower: {
        text: 'Generates electricity using oil as fuel',
        type: 'power',
        name: 'Crude oil generator',
        powerGeneration: 600,
        cost: [
            {
                name: 'ironPlate',
                amount: 10
            },
            {
                name: 'steelPlate',
                amount: 8
            },
            {
                name: 'ironTube',
                amount: 16
            },
            {
                name: 'copperWire',
                amount: 20
            },
        ],
        fuelCost: [{name: 'oil', amount: 1}],
        scienceRequired: 'oil'
    }

};

export const machines = {
    stoneFurnace: {
        text: 'The stone furnace is the first tier of smelthing machines. It is slow, inefficient, but cheap to build.',
        type: 'smelting',
        name: 'Stone Furnace',
        powerUsage: 0,
        resultMultiplier: 1,
        cost: [
            {
                name: 'stone',
                amount: 10
            },
            {
                name: 'coal',
                amount: 8
            },
        ],
        fuelCost: [{name: 'coal', amount: 1}],
        scienceRequired: null
    },
    steelFurnace: {
        type: 'smelting',
        text: 'The steel furnace is an improved version of the stone furnace, increasing smeling speed.',
        name: 'Steel Furnace',
        powerUsage: 0,
        resultMultiplier: 2,
        cost: [
            {
                name: 'brick',
                amount: 10
            },
            {
                name: 'steelPlate',
                amount: 10
            },
            {
                name: 'ironPlate',
                amount: 6
            },
        ],
        fuelCost: [{name: 'coal', amount: 1}],
        scienceRequired: 'steel'
    },
    electricFurnace: {
        type: 'smelting',
        text: 'The electric version is even faster then the steel furnace, and uses electricity instead of coal as fuel, making it a lot more efficient.',
        name: 'Electric Furnace',
        powerUsage: 75,
        resultMultiplier: 4,
        cost: [
            {
                name: 'brick',
                amount: 10
            },
            {
                name: 'steelPlate',
                amount: 10
            },
            {
                name: 'ironPlate',
                amount: 6
            },
            {
                name: 'redChip',
                amount: 8
            }
        ],
        fuelCost: [],
        scienceRequired: 'advancedMaterials'
    },
    assembler1: {
        type: 'crafting',
        text: 'Basic crafting machine for all kinds of parts.',
        name: 'Assembler 1',
        powerUsage: 25,
        resultMultiplier: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 8
            },
            {
                name: 'inserter',
                amount: 2
            },
            {
                name: 'greenChip',
                amount: 2
            },
            {
                name: 'belt',
                amount: 2
            }
        ],
        fuelCost: [],
        scienceRequired: 'automation1'
    },
    assembler2: {
        type: 'crafting',
        text: 'Faster then assembler 1',
        name: 'Assembler 2',
        powerUsage: 45,
        resultMultiplier: 2,
        cost: [
            {
                name: 'inserter',
                amount: 4
            },
            {
                name: 'greenChip',
                amount: 4
            },
            {
                name: 'redChip',
                amount: 4
            },
            {
                name: 'belt',
                amount: 4
            },
            {
                name: 'steelPlate',
                amount: 12
            }
        ],
        fuelCost: [],
        scienceRequired: 'advancedElectronics'
    },
    assembler3: {
        type: 'crafting',
        text: 'Faster then assembler 2',
        name: 'Assembler 3',
        powerUsage: 80,
        resultMultiplier: 4,
        cost: [
            {
                name: 'inserter',
                amount: 10
            },
            {
                name: 'redChip',
                amount: 6
            },
            {
                name: 'speedModule',
                amount: 8
            },
            {
                name: 'belt',
                amount: 8
            },
            {
                name: 'steelPlate',
                amount: 20
            }

        ],
        fuelCost: [],
        scienceRequired: 'modules'
    },
    refinary: {
        type: 'refinary',
        text: 'Pumped oil needs to be refined until it can be used. The refinary does just that.',
        name: 'Oil refinary',
        powerUsage: 30,
        resultMultiplier: 1,
        cost: [
            {
                name: 'steelPlate',
                amount: 10
            },
            {
                name: 'ironTube',
                amount: 20
            },
            {
                name: 'greenChip',
                amount: 4
            }
        ],
        fuelCost: [],
        scienceRequired: 'oil'
    },
    chemicalPlant: {
        type: 'chemicalPlant',
        text: 'Used to craft several chemical products from refined oil',
        name: 'Chemical plant',
        powerUsage: 40,
        resultMultiplier: 1,
        cost: [
            {
                name: 'steelPlate',
                amount: 8
            },
            {
                name: 'ironTube',
                amount: 10
            },
            {
                name: 'greenChip',
                amount: 4
            },
            {
                name: 'ironPlate',
                amount: 10
            }
        ],
        fuelCost: [],
        scienceRequired: 'oil'
    }
};

export const minePrices = {
    coalMine: {
        type: 'mine',
        text: 'The coal-powered automated mining installation mines ore automatically. Can of course, also be used on coal deposits.',
        name: 'Coal-powered mining installation',
        powerUsage: 0,
        cost: [
            {
                name: 'brick',
                amount: 4
            },
            {
                name: 'ironPlate',
                amount: 12
            },
            {
                name: 'belt',
                amount: 2
            }
        ],
        fuelCost: [{name: 'coal', amount: 1}],
        scienceRequired: 'automation1'
    },
    electricMine: {
        type: 'mine',
        text: 'Uses electricity instead of coal, to automate ore mining.',
        name: 'Electric mining installation',
        powerUsage: 35,
        cost: [
            {
                name: 'steelPlate',
                amount: 6
            },
            {
                name: 'ironPlate',
                amount: 10
            },
            {
                name: 'belt',
                amount: 6
            },
            {
                name: 'greenChip',
                amount: 4
            }
        ],
        fuelCost: [],
        scienceRequired: 'automation1'
    },
    pump: {
        type: 'pump',
        text: 'The oil pump allows the extraction of oil.',
        name: 'Oil pump',
        powerUsage: 25,
        cost: [
            {
                name: 'steelPlate',
                amount: 2
            },
            {
                name: 'ironPlate',
                amount: 10
            },
            {
                name: 'ironTube',
                amount: 12
            },
            {
                name: 'greenChip',
                amount: 2
            }
        ],
        fuelCost: [],
        scienceRequired: 'oil'
    }
};

