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

export const assemblerPrices = {
    assembler1: [
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
    ]
};

export const itemRecipes = {
    ironPlate: {
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
    blueChip: {
        type: 'crafting',
        scienceRequired: 'advancedElectronics2',
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
    greyScience: {
        type: 'crafting',
        scienceRequired: 'military',
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
        scienceRequired: 'advancedElectronics',
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
        scienceRequired: 'advancedElectronics2',
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
        scienceRequired: 'battery',
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
    ammo1: {
        type: 'crafting',
        scienceRequired: 'military',
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
        scienceRequired: 'military',
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
        scienceRequired: 'military',
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
        scienceRequired: 'military',
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
                name: 'lube',
                amount: 1
            }
        ]
    },
    furnaceParts: {
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
    }
};
