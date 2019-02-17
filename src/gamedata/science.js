/**
 * time is in minutes
 *
 */

export const scienceTicksMuliplier = 60;

export const sciences = {
    steel: {
        name: 'Steel Processing',
        requiredScience: [],
        time: 3,
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
                amount: 5
            }
        ]
    },
    automation1: {
        name: 'Automation 1',
        requiredScience: ['electronics'],
        time: 3,
        cost: [
            {
                name: 'redScience',
                amount: 5
            }
        ]
    },
    oil: {
        name: 'Oil drilling',
        requiredScience: ['electronics'],
        time: 4,
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
    advancedOil: {
        name: 'Oil processing',
        requiredScience: ['oil'],
        time: 4,
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
    plastics: {
        name: 'Plastics',
        requiredScience: ['advancedOil'],
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
                name: 'blueScience',
                amount: 20
            }
        ]
    },
    battery: {
        name: 'Battery Equipment',
        requiredScience: ['electronics','advancedOil'],
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
        requiredScience: ['steel'],
        time: 6,
        cost: [
            {
                name: 'redScience',
                amount: 20
            },
            {
                name: 'greenScience',
                amount: 20
            }
        ]
    },
    electricEngine: {
        name: 'Electric drivetrain technology',
        requiredScience: ['electronics','engine'],
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
                name: 'blueScience',
                amount: 25
            }
        ]
    },
    advancedElectronics: {
        name: 'Advanced Electronics',
        requiredScience: ['automation1', 'plastics'],
        time: 10,
        cost: [
            {
                name: 'redScience',
                amount: 35
            },
            {
                name: 'greenScience',
                amount: 35
            }
        ]
    },
    advancedMaterials: {
        name: 'Advanced Material Processing',
        requiredScience: ['automation1', 'steel'],
        time: 10,
        cost: [
            {
                name: 'redScience',
                amount: 30
            },
            {
                name: 'greenScience',
                amount: 30
            },
            {
                name: 'blueScience',
                amount: 30
            }
        ]
    },
    rocketScience: {
        name: 'Rocket Science',
        requiredScience: ['advancedElectronics', 'advancedMaterials', 'concrete'],
        time: 15,
        cost: [
            {
                name: 'redScience',
                amount: 100
            },
            {
                name: 'greenScience',
                amount: 100
            },
            {
                name: 'blueScience',
                amount: 100
            },
            {
                name: 'yellowScience',
                amount: 100
            }
        ]
    },
    modules: {
        name: 'Modules',
        requiredScience: ['advancedElectronics'],
        time: 8,
        cost: [
            {
                name: 'redScience',
                amount: 30
            },
            {
                name: 'greenScience',
                amount: 30
            },
            {
                name: 'blueScience',
                amount: 30
            }
        ]
    }
};