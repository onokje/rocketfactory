export const itemRecipes = {
    coal: {
        name: 'Coal',
        type: 'resource',
        scienceRequired: null
    },
    iron: {
        name: 'Iron ore',
        type: 'resource',
        scienceRequired: null
    },
    copper: {
        name: 'Copper ore',
        type: 'resource',
        scienceRequired: null
    },
    stone: {
        name: 'Stone',
        type: 'resource',
        scienceRequired: null
    },
    oil: {
        name: 'Raw oil',
        type: 'resource',
        scienceRequired: null
    },
    ironPlate: {
        name: 'Iron plate',
        type: 'smelting',
        scienceRequired: null,
        resultAmount: 2,
        cost: [
            {
                name: 'iron',
                amount: 2
            }
        ]
    },
    copperPlate: {
        name: 'Copper plate',
        type: 'smelting',
        scienceRequired: null,
        resultAmount: 2,
        cost: [
            {
                name: 'copper',
                amount: 2
            }
        ]
    },
    steelPlate: {
        name: 'Steel plate',
        type: 'smelting',
        scienceRequired: 'steel',
        resultAmount: 2,
        cost: [
            {
                name: 'ironPlate',
                amount: 2
            },
            {
                name: 'coal',
                amount: 1
            }
        ]
    },
    brick: {
        name: 'Stone brick',
        type: 'smelting',
        scienceRequired: null,
        resultAmount: 1,
        cost: [
            {
                name: 'stone',
                amount: 1
            }
        ]
    },
    ironGear: {
        name: 'Iron gear',
        type: 'crafting',
        scienceRequired: null,
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 1
            }
        ]
    },
    ironTube: {
        name: 'Iron tube',
        type: 'crafting',
        scienceRequired: null,
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 1
            }
        ]
    },
    copperWire: {
        name: 'Copper wire',
        type: 'crafting',
        scienceRequired: 'electronics',
        handcrafting: true,
        resultAmount: 2,
        cost: [
            {
                name: 'copperPlate',
                amount: 1
            }
        ]
    },
    belt: {
        name: 'Transport belt',
        type: 'crafting',
        scienceRequired: null,
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 1
            },
            {
                name: 'ironGear',
                amount: 1
            }
        ]
    },
    greenChip: {
        name: 'Electronics',
        type: 'crafting',
        scienceRequired: 'electronics',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 1
            },
            {
                name: 'copperWire',
                amount: 3
            }
        ]
    },
    redChip: {
        name: 'Advanced electronics',
        type: 'crafting',
        scienceRequired: 'advancedElectronics',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'greenChip',
                amount: 2
            },
            {
                name: 'plastic',
                amount: 2
            },
            {
                name: 'copperWire',
                amount: 6
            }
        ]
    },
    inserter: {
        name: 'Production robot arm',
        type: 'crafting',
        scienceRequired: 'automation1',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironGear',
                amount: 1
            },
            {
                name: 'ironPlate',
                amount: 1
            },
            {
                name: 'greenChip',
                amount: 1
            }
        ]
    },
    redScience: {
        name: 'Red science package',
        type: 'crafting',
        scienceRequired: null,
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironGear',
                amount: 1
            },
            {
                name: 'copperPlate',
                amount: 2
            }
        ]
    },
    greenScience: {
        name: 'Green science package',
        type: 'crafting',
        scienceRequired: 'automation1',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'inserter',
                amount: 1
            },
            {
                name: 'belt',
                amount: 1
            }
        ]
    },
    blueScience: {
        name: 'Blue science package',
        type: 'crafting',
        scienceRequired: 'advancedElectronics',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'miningDrill',
                amount: 1
            },
            {
                name: 'redChip',
                amount: 1
            },
            {
                name: 'engine',
                amount: 1
            }
        ]
    },
    yellowScience: {
        name: 'Yellow science package',
        type: 'crafting',
        scienceRequired: 'modules',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'battery',
                amount: 1
            },
            {
                name: 'speedModule',
                amount: 1
            },
            {
                name: 'electricEngine',
                amount: 2
            }
        ]
    },
    battery: {
        name: 'Battery',
        type: 'chemicalPlant',
        scienceRequired: 'battery',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'copperPlate',
                amount: 1
            },
            {
                name: 'ironPlate',
                amount: 1
            },
            {
                name: 'acid',
                amount: 1
            }
        ]
    },
    miningDrill: {
        name: 'Mining equipment',
        type: 'crafting',
        scienceRequired: 'electronics',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'greenChip',
                amount: 1
            },
            {
                name: 'ironGear',
                amount: 5
            },
            {
                name: 'ironPlate',
                amount: 10
            }
        ]
    },
    engine: {
        name: 'Internal combution engine',
        type: 'crafting',
        scienceRequired: 'engine',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironGear',
                amount: 1
            },
            {
                name: 'ironTube',
                amount: 2
            },
            {
                name: 'steelPlate',
                amount: 1
            }
        ]
    },
    electricEngine: {
        name: 'Electric motor',
        type: 'crafting',
        scienceRequired: 'electricEngine',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'greenChip',
                amount: 2
            },
            {
                name: 'engine',
                amount: 1
            },
            {
                name: 'copperWire',
                amount: 8
            }
        ]
    },
    furnaceParts: {
        name: 'Smelting equipment',
        type: 'crafting',
        scienceRequired: 'advancedElectronics',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'redChip',
                amount: 5
            },
            {
                name: 'steelPlate',
                amount: 10
            },
            {
                name: 'brick',
                amount: 10
            }
        ]
    },
    speedModule: {
        name: 'Speed module',
        type: 'crafting',
        scienceRequired: 'modules',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'redChip',
                amount: 5
            },
            {
                name: 'greenChip',
                amount: 5
            }
        ]
    },
    refinedOil: {
        name: 'Refined oil',
        type: 'refinary',
        scienceRequired: 'oil',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'oil',
                amount: 1
            }
        ]
    },
    acid: {
        name: 'Sulferic acid',
        type: 'chemicalPlant',
        scienceRequired: 'battery',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'refinedOil',
                amount: 1
            },
            {
                name: 'ironPlate',
                amount: 1
            }
        ]
    },
    rp1: {
        name: 'Refined kerosine (RP1)',
        type: 'chemicalPlant',
        scienceRequired: 'rocketScience',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'refinedOil',
                amount: 1
            }
        ]
    },
    plastic: {
        name: 'Plastic',
        type: 'chemicalPlant',
        scienceRequired: 'plastics',
        handcrafting: false,
        resultAmount: 2,
        cost: [
            {
                name: 'refinedOil',
                amount: 2
            },
            {
                name: 'coal',
                amount: 1
            }
        ]
    },
    concrete: {
        name: 'Concrete',
        type: 'crafting',
        scienceRequired: 'concrete',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'stone',
                amount: 4
            },
            {
                name: 'steelPlate',
                amount: 1
            }
        ]
    },
    rocketHull: {
        name: 'Rocket hull part',
        type: 'crafting',
        scienceRequired: 'rocketScience',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'steelPlate',
                amount: 10
            },
            {
                name: 'plastic',
                amount: 2
            }
        ]
    },
    rocketElectronics: {
        name: 'Rocket electronics',
        type: 'crafting',
        scienceRequired: 'rocketScience',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'redChip',
                amount: 5
            },
            {
                name: 'speedModule',
                amount: 1
            },
            {
                name: 'plastic',
                amount: 1
            },
            {
                name: 'copperWire',
                amount: 5
            }
        ]
    },
    rocketEngine: {
        name: 'Rocket engine part',
        type: 'crafting',
        scienceRequired: 'rocketScience',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'engine',
                amount: 2
            },
            {
                name: 'steelPlate',
                amount: 1
            },
            {
                name: 'copperPlate',
                amount: 2
            },
            {
                name: 'ironTube',
                amount: 5
            }
        ]
    }

};
