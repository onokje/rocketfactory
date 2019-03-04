export const rocketSiloData = {
    text: 'This is the rocket silo. It allows the construction of your rocket.',
    type: 'rocket',
    name: 'Rocket Silo',
    powerUsage: 1500,
    ticksCost: 30,
    cost: [
        {
            name: 'concrete',
            amount: 1500
        },
        {
            name: 'steelPlate',
            amount: 1000
        },
        {
            name: 'copperWire',
            amount: 500
        },
        {
            name: 'redChip',
            amount: 100
        }

    ],
    scienceRequired: 'rocketScience'
};

export const launchPad = {
    text: 'The launchpad is required to actually launch your rocket.',
    type: 'rocket',
    name: 'Launchpad',
    powerUsage: 500,
    ticksCost: 30,
    cost: [
        {
            name: 'concrete',
            amount: 1000
        },
        {
            name: 'steelPlate',
            amount: 500
        }
    ],
    scienceRequired: 'rocketScience'
};

export const rocketFuel = {
    type: 'rocket',
    name: 'Rocket fuel',
    ticksCost: 10,
    cost: [
        {
            name: 'rp1',
            amount: 10
        }
    ],
    scienceRequired: 'rocketScience'
};

export const rocketPart = {
    type: 'rocket',
    name: 'Rocket part',
    ticksCost: 10,
    cost: [
        {
            name: 'rocketHull',
            amount: 1,
        },
        {
            name: 'rocketElectronics',
            amount: 1,
        },
        {
            name: 'rocketEngine',
            amount: 1,
        }
    ],
    scienceRequired: 'rocketScience'
};

export const car = {
    type: 'rocket',
    name: 'Rocket payload: Cherry-red electric sportscar',
    ticksCost: 20,
    cost: [
        {
            name: 'electricEngine',
            amount: 3
        },
        {
            name: 'steelPlate',
            amount: 15
        },
        {
            name: 'redChip',
            amount: 10
        },
        {
            name: 'battery',
            amount: 10
        },
    ],
    scienceRequired: 'rocketScience'
};