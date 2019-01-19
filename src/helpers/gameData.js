export const coalPowerPlantPrice = [
    {
        name: 'ironPlate',
        amount: 10
    },
    {
        name: 'steelPlate',
        amount: 5
    },
    {
        name: 'copperPlate',
        amount: 15
    },    
];

export const furnacePrices = {
    'stone': [
        {
            name: 'stone',
            amount: 10
        },
        {
            name: 'coal',
            amount: 8
        },
    ],
    'steel': [
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
    'electric': [
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
    ]
};

export const minePrices = {
    coal1: [
        {
            name: 'ironPlate',
            amount: 10
        },
        {   name: 'ironTube',
            amount: 4
        },
        {
            name: 'ironGear',
            amount: 2
        },
        {
            name: 'coal',
            amount: 4
        },
    ],
    electric1: [
        {
            name: 'steelPlate',
            amount: 4
        },
        {
            name: 'ironPlate',
            amount: 10
        },
        {
            name: 'ironGear',
            amount: 10
        },
        {
            name: 'greenChip',
            amount: 4
        }
    ]
};

export const assembler1Price = [
    {
        name: 'ironPlate',
        amount: 6
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
];


export const itemRecipes = {
    ironPlate: {
        type: 'smelting',
        resultAmount: 2,
        cost: [
            {
                name: 'iron',
                amount: 2
            }
        ]
    },
    copperPlate: {
        type: 'smelting',
        resultAmount: 2,
        cost: [
            {
                name: 'copper',
                amount: 2
            }
        ]
    },
    steelPlate: {
        type: 'smelting',
        resultAmount: 2,
        cost: [
            {
                name: 'ironPlate',
                amount: 5
            },
            {
                name: 'coal',
                amount: 2
            }
        ]
    },
    brick: {
        type: 'smelting',
        resultAmount: 1,
        cost: [
            {
                name: 'stone',
                amount: 1
            }
        ]
    },
    ironGear: {
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
    blueChip: {
        type: 'crafting',
        handcrafting: false,
        resultAmount: 1,
        cost: [
            {
                name: 'greenChip',
                amount: 20
            },
            {
                name: 'redChip',
                amount: 2
            },
            {
                name: 'acid',
                amount: 1
            }
        ]
    },
    inserter: {
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
        type: 'crafting',
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
    greyScience: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ammo2',
                amount: 1
            },
            {
                name: 'grenade',
                amount: 1
            },
            {
                name: 'gunTurret',
                amount: 1
            }
        ]
    },
    purpleScience: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'electricEngine',
                amount: 1
            },
            {
                name: 'furnaceParts',
                amount: 1
            }
        ]
    },
    yellowScience: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'battery',
                amount: 1
            },
            {
                name: 'blueChip',
                amount: 3
            },
            {
                name: 'speedModule',
                amount: 1
            },
            {
                name: 'copperWire',
                amount: 30
            }
        ]
    },
    battery: {
        type: 'crafting',
        handcrafting: true,
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
        type: 'crafting',
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
        type: 'crafting',
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
    ammo1: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'ironPlate',
                amount: 4
            },
            {
                name: 'copperPlate',
                amount: 1
            }
        ]
    },
    ammo2: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'copperPlate',
                amount: 2
            },
            {
                name: 'ammo1',
                amount: 1
            },
            {
                name: 'steelPlate',
                amount: 1
            }
        ]
    },
    grenade: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'coal',
                amount: 10
            },
            {
                name: 'ironPlate',
                amount: 5
            }
        ]
    },
    gunTurret: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
        cost: [
            {
                name: 'copperPlate',
                amount: 10
            },
            {
                name: 'ironPlate',
                amount: 20
            },
            {
                name: 'ironGear',
                amount: 10
            }
        ]
    },
    electricEngine: {
        type: 'crafting',
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
                name: 'lube',
                amount: 1
            }
        ]
    },
    furnaceParts: {
        type: 'crafting',
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
        type: 'crafting',
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
    }
};
