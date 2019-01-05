export const coalPowerPlantPrice = [
    {
        name: 'iron',
        amount: 10
    },
    {
        name: 'coal',
        amount: 5
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


export const itemRecipes = {
    ironPlate: {
        resultAmount: 5,
        cost: [
            {
                name: 'iron',
                amount: 5
            }
        ]
    },
    copperPlate: {
        resultAmount: 5,
        cost: [
            {
                name: 'copper',
                amount: 5
            }
        ]
    },
    steelPlate: {
        resultAmount: 2,
        cost: [
            {
                name: 'iron',
                amount: 5
            },
            {
                name: 'coal',
                amount: 2
            }
        ]
    }
};