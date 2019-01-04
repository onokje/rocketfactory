export const mineResource = (resourceType) => ({
    type: 'MINE_RESOURCE',
    resourceType
});

export const sellIron = (amount, itemPrice) => ({
    type: 'SELL_IRON',
    amount,
    itemPrice
});
