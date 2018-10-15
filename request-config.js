
// Auto switch the API calls from prod to dev

const IS_DEV = true;
let BASE_URL = IS_DEV ? 'http://127.0.0.1:8000/' : 'https://transfr-node/';

export default BASE_URL;
