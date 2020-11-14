// guardar login > user name y token
export const authenticate = (response, next) => {
    if(window !== 'undefined') {
        sessionStorage.setItem('token', JSON.stringify(response.data.token));
        sessionStorage.setItem('user', JSON.stringify(response.data.name));
    }
    next();
};

// accesar al token
export const getToken = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        } else {
            return false;
        }
    }
};

// accesar el user
export const getUser = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

// quitar el token para logout
export const logout = next => {
    if(window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
};