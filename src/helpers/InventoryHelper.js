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

export const removeItemFromInventory = (inventory, itemName, itemAmount) => {
    return inventory.map(inventoryItem => {
        if (itemName === inventoryItem.name) {
            return {name: inventoryItem.name, amount: inventoryItem.amount - itemAmount}
        } else {
            return inventoryItem;
        }
    });
};

export const removeItemsFromInventory = (inventory, priceItemsArray) => {
    for (let priceItem of priceItemsArray) {
        inventory = removeItemFromInventory(inventory, priceItem.name, priceItem.amount);
    }
    return inventory;
};

export const addItemToInventory = (inventory, itemName, itemAmount) => {
    let found = false;
    const newInventory = inventory.map(inventoryItem => {
        if (inventoryItem.name === itemName) {
            found = true;
            return {name: inventoryItem.name, amount: inventoryItem.amount + itemAmount}
        } else {
            return inventoryItem;
        }
    });
    if (!found) {
        newInventory.push({name: itemName, amount: itemAmount});
    }
    return newInventory;
};

export const addItemsToInventory = (inventory, itemsArray) => {
    for (let itemObj of itemsArray) {
        inventory = addItemToInventory(inventory, itemObj.name, itemObj.amount);
    }
    return inventory;
};

export const getItemAmountByName = (inventory, itemName) => {
    const item = inventory.find((item) => {
        return item.name === itemName ;
    });
    return item ? item.amount : 0;
};