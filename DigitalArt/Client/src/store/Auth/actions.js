import axios from 'axios';
import {MAIN_PATH, AUTHORIZATION_URL} from "../../Config";

export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_UNSUCCESS = 'AUTHORIZATION_UNSUCCESS';
export const IS_REDIRECTED = 'IS_REDIRECTED';

export const authorizationUserSuccess = (token) => {
    return {
        type: AUTHORIZATION_SUCCESS,
        payload: {
            token,
            massage: 'Вы вошли успешно! :)'
        }
    }
};

const authorizationUserUnsuccess = () => {
    return {
        type: AUTHORIZATION_UNSUCCESS,
        payload: "Неверный логин или пароль!"
    }
};

export const authorizationUser = (authData, isRemember) => {
  return dispatch => {
      axios.post(MAIN_PATH+AUTHORIZATION_URL, authData)
          .then(res => {
                    console.log(res.data);

                    console.log(isRemember);
                    if (isRemember)
                        localStorage.setItem('token', res.data.accses_token);
                    else
                        sessionStorage.setItem('token', res.data.accses_token);

                    dispatch(authorizationUserSuccess(res.data.accses_token));
                    window.location.reload();
              }
          )
          .catch(() => dispatch(authorizationUserUnsuccess()));
  }
};