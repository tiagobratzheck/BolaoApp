import * as Actions from "./action";

const initialstate = {};

const user = function (state = initialstate, action) {
    switch (action.type) {
        case Actions.USER_ACCESS: {
            return {
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default user;
