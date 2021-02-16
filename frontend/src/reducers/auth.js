export const defaultAuthState = {
    user: {},
    token: null
};

const authReducer = (state = defaultAuthState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return defaultAuthState;
        default:
            return state;
    }
};

export default authReducer;