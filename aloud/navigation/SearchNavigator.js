import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SearchStack from './SearchTabNavigator';

export default createAppContainer(
 SearchStack
);