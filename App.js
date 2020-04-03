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
import {AppNavigator} from "./app/shared/util/navigation";
import * as eva from '@eva-design/eva';
const App: () => React$Node = () => {
    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <AppNavigator/>
            </ApplicationProvider>
        </React.Fragment>
    )
};

export default App;
