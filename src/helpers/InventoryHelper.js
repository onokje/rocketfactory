export const inventoryHasItem = (inventory, itemName, amount) => {
    return inventory.find((item) => {
        return item.name === itemName && item.amount >= amount;
    });
};

export const canAfford = (inventory, priceItemsArray) => {
    for (let item of priceItemsArray) {
        if (!inventoryHasItem(inventory, item.name, item.amount)) {
            return false;
        }
    }
    return true;
};

export const findItemInPriceItemsArray = (priceItemsArray, itemName) => {
    return priceItemsArray.find((item) => {
        return item.name === itemName;
    });
};

export const multiplyItemsInItemsArray = (items, multiplier) => {
    return items.map(item => {
        return {name: item.name, amount: (item.amount * multiplier)}
    });
};

export const removeItemFromInventory = (inventorySlice, itemName, itemAmount) => {
    inventorySlice.forEach(inventoryItem => {
        if (itemName === inventoryItem.name) {
            inventoryItem.amount -= itemAmount;
        }
    });
};

export const removeItemsFromInventory = (inventorySlice, priceItemsArray) => {
    if (inventorySlice && priceItemsArray) {
        for (let priceItem of priceItemsArray) {
            removeItemFromInventory(inventorySlice, priceItem.name, priceItem.amount);
        }
    }

};

export const addItemToInventory = (inventorySlice, itemName, itemAmount) => {
    let found = false;
    inventorySlice.forEach(inventoryItem => {
        if (inventoryItem.name === itemName) {
            found = true;
            inventoryItem.amount += itemAmount;
        }
    });
    if (!found) {
        inventorySlice.push({name: itemName, amount: itemAmount});
    }
};

export const addItemsToInventory = (inventory, itemsArray) => {
    for (let itemObj of itemsArray) {
        addItemToInventory(inventory, itemObj.name, itemObj.amount);
    }
};

export const getItemAmountByName = (inventory, itemName) => {
    const item = inventory.find((item) => {
        return item.name === itemName ;
    });
    return item ? item.amount : 0;
};