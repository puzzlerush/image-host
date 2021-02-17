import { createStore } from 'redux';
import authReducer from '../reducers/auth';
import { defaultAuthState } from '../reducers/auth';

const loadState = () => {
    try {
        const state = JSON.parse(localStorage.getItem('imageHubState'));
        return state || defaultAuthState;
    } catch (e) {
        return defaultAuthState;
    }
}

const initialState = loadState();

const configureStore = () => {
    const store = createStore(
        authReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    store.subscribe(() => {
        localStorage.setItem('imageHubState', JSON.stringify(store.getState()));
    })
    return store;
}

export default configureStore;