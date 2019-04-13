import axios from 'axios';
import {MAIN_PATH, AUTHORIZATION_URL} from "../../Config";
import { getUserInfoSuccess } from "../Header/UserInfo/actions";

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

const authorizationUserUnsuccess = (error) => {
    return {
        type: AUTHORIZATION_UNSUCCESS,
        payload: error
    }
};

export const authorizationUser = (authData) => {
  return dispatch => {
      axios.post(MAIN_PATH+AUTHORIZATION_URL, authData)
          .then(res => {
                    console.log(res.data);
                    localStorage.setItem('token', res.data.accses_token);
                    dispatch(authorizationUserSuccess(res.data.accses_token));

                    const user = {
                        id: res.data.id,
                        email: res.data.email,
                        name: res.data.name,
                        lastName: res.data.lastName,
                        artworks: null
                    };

                    dispatch(getUserInfoSuccess(user));
                    window.location.reload();
              }
          )
          .catch(error => dispatch(authorizationUserUnsuccess(error)));
  }
};