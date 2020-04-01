/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light } from '@eva-design/eva';
import {AppNavigator} from "./app/shared/util/navigation";

const App: () => React$Node = () => {
    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={light}>
                <AppNavigator/>
            </ApplicationProvider>
        </React.Fragment>
    )
};

export default App;
