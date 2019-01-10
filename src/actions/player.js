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

export const handminingStart = (resource) => ({
    type: 'HANDMINING_START',
    resource
});

export const handminingFinish = (itemsProduced) => ({
    type: 'HANDMINING_FINISH',
    itemsProduced
});