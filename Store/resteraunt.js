// ./store/user.js
import { 
    createSagas, 
    createContainer,
    createActions, 
    using } from "redux-box";
    
  import { call, put } from "redux-saga/effects";

  const state = {
      resterauntNearby: [],
  }

  const actions = createActions({
      updateResteraunt: payload => ({type: "UPDATE_RESTERAUNT", payload}),
      syncFromDb: () => ({type: "SYNC_FROM_DB"})
  })

  const mutations = {
    UPDATE_RESTERAUNT: (state, payload) => {
        Object.entries(payload).forEach(([k,v]) => state[k] = v);
      },
  }

  const sagas = createSagas({
      SYNC_FROM_DB: function*(){
          try{

          } catch(e){
              console.log(e)
          }
      },

  })

  export const module = {
    name: "resteraunt",
    state,
    actions,
    mutations,
    sagas
  }
  
  export default createContainer(module);