import axios from 'axios';
import { MAIN_PATH, REGISTRATION_URL } from "../../Config";

import { getUserInfoSuccess} from "../Header/UserInfo/actions";
import { authorizationUserSuccess } from "../Auth/actions";

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_UNSUCCESS = 'REGISTRATION_UNSUCCESS';

export const registrationUserSuccess = () => {
    return {
        type: REGISTRATION_SUCCESS,
        payload: 'Вы зарегистрировались успешно!'
    };
};

export const registrationUserUnsuccess = (error) => {
    return {
        type: REGISTRATION_UNSUCCESS,
        payload: 'Пользователь с таким email уже существует!'
    };
};

export const registrationUser = (user) => {
    return dispatch => {
        axios.post(MAIN_PATH + REGISTRATION_URL, user)
            .then(res => {
                    console.log(res.data);
                    dispatch(registrationUserSuccess());

                    const user = {
                        id: res.data.id,
                        email: res.data.email,
                        name: res.data.name,
                        lastName: res.data.lastName,
                        artworks: null
                    };

                    localStorage.setItem('token', res.data.token);
                    dispatch(authorizationUserSuccess(res.data.token));
                    dispatch(getUserInfoSuccess(user));
                    window.location.reload();
                }
            )
            .catch(error => dispatch(registrationUserUnsuccess(error)))
    }
};




