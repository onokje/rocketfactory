/**
 * time is in minutes
 *
 */

export const scienceTicksMuliplier = 60;

export const sciences = {
    steel: {
        name: 'Steel Processing',
        requiredScience: [],
        time: 2,
        cost: [
            {
                name: 'redScience',
                amount: 10
            }
        ]
    },
    electronics: {
        name: 'Electronics',
        requiredScience: [],
        time: 2,
        cost: [
            {
                name: 'redScience',
                amount: 10
            }
        ]
    },
    automation1: {
        name: 'Automation 1',
        requiredScience: ['electronics'],
        time: 2,
        cost: [
            {
                name: 'redScience',
                amount: 12
            },
            {
                name: 'greenScience',
                amount: 2
            }
        ]
    },
    oil: {
        name: 'Oil processing',
        requiredScience: ['electronics'],
        time: 4,
        cost: [
            {
                name: 'redScience',
                amount: 12
            },
            {
                name: 'greenScience',
                amount: 5
            }
        ]
    },
    plastics: {
        name: 'Plastics',
        requiredScience: ['oil'],
        time: 5,
        cost: [
            {
                name: 'redScience',
                amount: 20
            },
            {
                name: 'greenScience',
                amount: 15
            }
        ]
    },
    military: {
        name: 'Military',
        requiredScience: ['steel'],
        time: 5,
        cost: [
            {
                name: 'redScience',
                amount: 15
            },
            {
                name: 'greenScience',
                amount: 10
            }
        ]
    },
    concrete: {
        name: 'Concrete',
        requiredScience: ['steel'],
        time: 5,
        cost: [
            {
                name: 'redScience',
                amount: 20
            },
            {
                name: 'greenScience',
                amount: 20
            },
            {
                name: 'greyScience',
                amount: 20
            }
        ]
    },
    battery: {
        name: 'Battery Equipment',
        requiredScience: ['electronics','oil'],
        time: 6,
        cost: [
            {
                name: 'redScience',
                amount: 25
            },
            {
                name: 'greenScience',
                amount: 25
            }
        ]
    },
    engine: {
        name: 'Engine',
        requiredScience: 'steel',
        time: 6,
        cost: [
            {
                name: 'redScience',
                amount: 20
            },
            {
                name: 'greenScience',
                amount: 20
            },
            {
                name: 'greyScience',
                amount: 20
            }
        ]
    },
    sulfur: {
        name: 'Sulfur Processing',
        requiredScience: 'oil',
        time: 8,
        cost: [
            {
                name: 'redScience',
                amount: 25
            },
            {
                name: 'greenScience',
                amount: 25
            },
            {
                name: 'greyScience',
                amount: 25
            }
        ]
    },
    electricEngine: {
        name: 'Electric Engine',
        requiredScience: ['electronics','oil','engine'],
        time: 6,
        cost: [
            {
                name: 'redScience',
                amount: 25
            },
            {
                name: 'greenScience',
                amount: 25
            },
            {
                name: 'greyScience',
                amount: 25
            }
        ]
    },
    advancedElectronics: {
        name: 'Advanced Electronics',
        requiredScience: ['electronics'],
        time: 10,
        cost: [
            {
                name: 'redScience',
                amount: 25
            },
            {
                name: 'greenScience',
                amount: 25
            },
            {
                name: 'greyScience',
                amount: 25
            }
        ]
    },
    advancedElectronics2: {
        name: 'Advanced Electronics 2',
        requiredScience: ['advancedElectronics'],
        time: 15,
        cost: [
            {
                name: 'redScience',
                amount: 50
            },
            {
                name: 'greenScience',
                amount: 50
            },
            {
                name: 'greyScience',
                amount: 50
            },
            {
                name: 'blueScience',
                amount: 50
            },
            {
                name: 'purpleScience',
                amount: 50
            }
        ]
    }
};