export const newPlayer = (name) => ({
    type: 'NEW_PLAYER',
    name
});

export const loadPlayer = (playerData) => ({
    type: 'LOAD_PLAYER',
    playerData
});

export const switchTab = (tab) => ({
    type: 'SWITCH_TAB',
    tab
});