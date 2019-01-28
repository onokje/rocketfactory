export const startScience = (scienceId, ticksCost) => ({
    type: 'START_SCIENCE',
    scienceId,
    ticksCost
});

export const finishScience = (scienceId) => ({
    type: 'FINISH_SCIENCE',
    scienceId,
});