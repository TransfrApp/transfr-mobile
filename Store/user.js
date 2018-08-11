// ./store/user.js
import UserLocation from '../Service/Location.js';
import {Permissions, Location} from 'expo';
import { 
    createSagas, 
    createContainer,
    createActions, 
    using } from "redux-box";
    
  import { call, put } from "redux-saga/effects";

  const state = {
      name: "",
      location: null,
  }

  const actions = createActions({
      updateUser: payload => ({type: "UPDATE_USER", payload}),
      syncFromDb: () => ({type: "SYNC_FROM_DB"})
  })

  const mutations = {
      UPDATE_USER: (state, {payload}) => {
        Object.entries(payload).forEach(([k,v]) => state[k] = v);
      },
  }

  const sagas = createSagas({
      SYNC_FROM_DB: function*() {
          try {
            // Need to figure out why this isn't firing
            const userLocation = yield(UserLocation.getLocation());

            const updateObj = {
                location: userLocation
            }
            // Updates the store with computed values
            yield put(actions.updateUser(updateObj));

          } catch (e) {
              console.log(e);
          }
      },
  })

  export const module = {
    name: "user",
    state,
    actions,
    mutations,
    sagas
  }
  
  export default createContainer(module);