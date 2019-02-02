import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TimeIcon from "./TimeIcon";


storiesOf('TimeIcon', module)
    .add('with seconds', () => <TimeIcon time={"10s"}/>)
    .add('with minutes', () => <TimeIcon time={"5m"}/>);

