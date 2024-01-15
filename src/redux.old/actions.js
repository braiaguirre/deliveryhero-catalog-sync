import {
    SEND_UPDATE,
    SET_ALERT
} from '../actions-types';

import axios from 'axios';

const URL = 'http://localhost:3001';

export const sendUpdate = (updateData) => {
    const endpoint = `${ URL }/update`;

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: SET_ALERT,
                payload: data
            });
        } catch (err) {
            return dispatch({
                type: SET_ALERT,
                payload: err.response.data
            });
        };
    };
};