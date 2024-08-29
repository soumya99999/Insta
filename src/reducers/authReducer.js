// src/reducers/authReducer.js
const initialState = {
    user: null,
    // other state properties
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
            };
        // Handle other actions
        default:
            return state;
    }
};

export default authReducer;