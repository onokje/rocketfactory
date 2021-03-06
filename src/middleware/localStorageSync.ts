const localStorageSync = (store: any) => (next: any) => (action: any) => {
    let result = next(action);

    if (store.getState().player.initialized && action.type === 'production/productionTick') {
        localStorage.setItem('spaceClickerPlayerSession', JSON.stringify(store.getState()));
    }
    return result
};

export default localStorageSync;