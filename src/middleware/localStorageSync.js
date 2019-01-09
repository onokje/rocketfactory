const localStorageSync = store => next => action => {
    let result = next(action);

    if (store.getState().player.initialized && action.type === 'PRODUCTION_TICK') {
        localStorage.setItem('spaceClickerPlayerSession', JSON.stringify(store.getState()));
    }
    return result
};

export default localStorageSync;