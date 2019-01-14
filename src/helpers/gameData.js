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

export const stoneFurnacePrice = [
    {
        name: 'stone',
        amount: 10
    },
    {
        name: 'coal',
        amount: 5
    },
];

export const coalMine1Price = [
    {
        name: 'ironPlate',
        amount: 10
    },
    {
        name: 'stone',
        amount: 10
    },
    {
        name: 'coal',
        amount: 5
    },
];

export const electricMine1Price = [
    {
        name: 'steelPlate',
        amount: 10
    },
    {
        name: 'copperPlate',
        amount: 10
    }
];

export const assembler1Price = [
    {
        name: 'ironPlate',
        amount: 5
    },
    {
        name: 'ironGear',
        amount: 3
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
        resultAmount: 5,
        cost: [
            {
                name: 'iron',
                amount: 5
            }
        ]
    },
    copperPlate: {
        type: 'smelting',
        resultAmount: 5,
        cost: [
            {
                name: 'copper',
                amount: 5
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
    copperWire: {
        type: 'crafting',
        handcrafting: true,
        resultAmount: 1,
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
                name: 'ironGear',
                amount: 1
            },
            {
                name: 'copperWire',
                amount: 2
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

};
