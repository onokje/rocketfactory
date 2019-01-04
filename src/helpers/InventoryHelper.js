export const canAfford = (priceObject, resources, items) => {

    for(let requiredResource in priceObject.resources) {
        if(priceObject.resources.hasOwnProperty(requiredResource)) {
            const requiredValue = priceObject.resources[requiredResource];
            if (!resources || !resources[requiredResource] || resources[requiredResource] < requiredValue) {
                return false;
            }

        }
    }

    for(let requiredItem in priceObject.items) {
        if(priceObject.items.hasOwnProperty(requiredItem)) {
            const requiredValue = priceObject.items[requiredItem];
            if (!items || !items[requiredItem] || items[requiredItem] < requiredValue) {
                return false;
            }

        }
    }

    return true;
};

export const payResources = (priceObject, resources) => {

    const newResourcesObj = {
        resourceStorage: resources.resourceStorage
    };

    for(let requiredResource in priceObject.resources) {
        if(priceObject.resources.hasOwnProperty(requiredResource)) {
            const requiredValue = priceObject.resources[requiredResource];

            newResourcesObj[requiredResource] = resources[requiredResource] - requiredValue;

        }
    }

    return newResourcesObj;
};