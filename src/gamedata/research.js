/**
 * time is in minutes
 *
 */

export const researchTicksMultiplier = 60;

export const researches = {
    steel: {
        name: 'Steel Processing',
        requiredResearch: [],
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
        requiredResearch: [],
        time: 3,
        cost: [
            {
                name: 'redScience',
                amount: 5
            }
        ]
    },
    automation1: {
        name: 'Automation 1',
        requiredResearch: [],
        time: 2,
        cost: [
            {
                name: 'redScience',
                amount: 5
            }
        ]
    },
    electricity: {
        name: 'Power Generation',
        requiredResearch: ['electronics', 'automation1'],
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
        requiredResearch: ['electronics', 'electricity'],
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
        requiredResearch: ['oil'],
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
        requiredResearch: ['advancedOil'],
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
        requiredResearch: ['steel'],
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
        requiredResearch: ['electronics','advancedOil'],
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
        requiredResearch: ['steel'],
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
        requiredResearch: ['electronics','engine'],
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
        requiredResearch: ['automation1', 'plastics'],
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
        requiredResearch: ['automation1', 'steel'],
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
        name: 'Rocket Research',
        requiredResearch: ['advancedElectronics', 'advancedMaterials', 'concrete'],
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
        requiredResearch: ['advancedElectronics'],
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