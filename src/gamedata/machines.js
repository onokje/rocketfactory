export const powerPlantPrices = {
    coal: [
        {
            name: 'ironPlate',
            amount: 10
        },
        {
            name: 'steelPlate',
            amount: 10
        },
        {
            name: 'copperWire',
            amount: 12
        },
        {
            name: 'belt',
            amount: 2
        },
    ],
    oil: [
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
            amount: 12
        },
    ]

};

export const machines = {
    stoneFurnace: {
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
        name: 'Electric Furnace',
        powerUsage: 60,
        resultMultiplier: 3,
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
        name: 'Assembler 1',
        powerUsage: 40,
        resultMultiplier: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 8
            },
            {
                name: 'ironGear',
                amount: 6
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
    refinary: {
        type: 'refinary',
        name: 'Oil refinary',
        powerUsage: 50,
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
        name: 'Chemical plant',
        powerUsage: 30,
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
    coal1: [
        {
            name: 'steelPlate',
            amount: 2
        },
        {   name: 'ironPlate',
            amount: 10
        },
        {
            name: 'belt',
            amount: 2
        }
    ],
    electric1: [
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
    pump: [
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
    ]
};

