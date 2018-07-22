import { createStore } from 'redux-box';
import { module as UserModule } from './user.js';
import { module as ResterauntModule } from './resteraunt.js';

export default createStore([
    UserModule,
    ResterauntModule
]);