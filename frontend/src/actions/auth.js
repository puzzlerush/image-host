const login = (data) => ({
    type: 'LOGIN',
    data
});

const logout = () => ({
    type: 'LOGOUT'
});

export { login, logout };