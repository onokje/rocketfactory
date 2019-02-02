import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Machine from "./Machine";

storiesOf('Machine', module)
    .add('Stone furnace, just build', () => <Machine machine={{
        id: "12345",
        on: false,
        powered: false,
        running: false,
        nextItem: null,
        currentItem: null,
        progressTicks: 0,
        ticksCost: 10,
        productionType: 'smelting',
        techType: 'stoneFurnace'
    }} science={{sciences: []}} toggleMachine={() => {}} sellMachine={() => {}}/>)
;

