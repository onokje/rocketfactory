import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import store from "./../src/services/configureStore";
import React from "react";

const req = require.context('../src/Components', true, /\.stories\.js$/);

addDecorator(story => <Provider store={store}>{story()}</Provider>);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
