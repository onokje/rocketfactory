export const startScience = (scienceId, ticksCost) => ({
    type: 'START_SCIENCE',
    scienceId,
    ticksCost
});

export const finishScience = () => ({
    type: 'FINISH_SCIENCE'
});

export const selectScience = (scienceId) => ({
    type: 'SELECT_SCIENCE',
    scienceId,
});