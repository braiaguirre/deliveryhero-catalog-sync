import {
    SEND_UPDATE,
    SET_ALERT
} from '../actions-types';

const initialState = {
    alert: {
        message: ''
    }
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        default: 
            return {
                ...state
            }
    }
}

export default reducer;