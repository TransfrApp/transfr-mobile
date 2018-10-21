import axios from 'axios';
import baseUrl from '../request-config';

const fetchUser = (email, password) => {
    return axios.post(`${baseUrl}/user/login`, {
        email,
        password,
    }).then(res => {
        const { token, user } = res.data;
        const { email, name, password } = user;
        const camelCase = { "businessName": user.business_name, email, password, name, userId: user.id }
        const items = { camelCase, token };
        return items;
    }).catch(err => {
        alert("Seems like there was an issue...please try again.");
        console.log(err);
    });
}

const fetchInventory = (id) => {
    return axios.post(`${baseUrl}/inventory/get`, {
        id,
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}


const syncFromDB = {
    fetchUser,
    fetchInventory
}

export default syncFromDB;