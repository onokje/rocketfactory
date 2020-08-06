import React from 'react';
import "./ItemList.scss";
import ItemIcon from "../ItemIcon/ItemIcon";
import TimeIcon from "../TimeIcon/TimeIcon";
import {Item} from "../../CommonTypes/Item";

type ItemListProps = {
    items: Item[],
    label: string,
    showToolTips?: boolean,
    time?: string,
    showAvailable?: boolean,
    smallIcons?: boolean
}

export default function ItemList(props: ItemListProps) {

    const {items, label, showToolTips = true, time, showAvailable = true, smallIcons = false} = props;

    return (
        <>
            {label ? <div className="ItemListLabel">{label}</div> : ''}
            <div className="horizontalItemList">
                {time ? <TimeIcon time={time}/> : ''}
                {items.map(item => <ItemIcon
                    extraClasses={smallIcons ? ' itemIconSmall' : ''}
                    key={item.name}
                    item={item.name}
                    amount={item.amount}
                    showAvailable={showAvailable}
                    toolTip={showToolTips}/>)}
            </div>
        </>
    );
}
