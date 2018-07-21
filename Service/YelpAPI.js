import axios from 'axios';

const apiKey = "XV1n2RgyiK0wlEEzGlmrBTuTLVu-PmXI9sZZD9IR2Qeu1OAV6dcJHNZXDKBDVbbWp80etjfKzNpJl_p77_RRnxorvI8_I7c5PmL0KRxqo6nlbe0RYVEri5zQ2VdSW3Yx";
const clientID = "6QIbWXkbo1TJU-ZsduT12g"
// Zomator Credentials
const userKey = "ee546729d7d04ec37a3c7b36bc0fbf01";

const findResteraunts = findResteraunts = (lat, long) => {
    const url = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`

    axios({
        method: "GET",
        url,
        headers: {"user-key": userKey, Accept: "application/json"}
    }).then(res => {
        const resteraunts = res.data.nearby_restaurants;
        console.log("Resteraunts from Function", resteraunts);
        return resteraunts;
    }).catch(e => console.log(e));
}


const ResterauntAPI = {
    findResteraunts
}

export default ResterauntAPI;