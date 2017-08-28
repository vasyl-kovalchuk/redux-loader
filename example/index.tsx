
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UserProfile from './UserProfileContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { userProfile } from './reducers';
import { UserStoreState } from './types';

// import './index.css';

const store = createStore<UserStoreState>(userProfile);

ReactDOM.render(
    <Provider store={store}>
        <UserProfile userName{"vasyl-kovalchuk"}/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);