export const newPlayer = () => ({
    type: 'NEW_PLAYER'

});

export const loadPlayer = (playerData) => ({
    type: 'LOAD_PLAYER',
    playerData
});

export const switchTab = (tab) => ({
    type: 'SWITCH_TAB',
    tab
});