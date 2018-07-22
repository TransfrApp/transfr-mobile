// ./store/user.js
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
      UPDATE_USER: (state, payload) => {
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
    name: "user",
    state,
    actions,
    mutations,
    sagas
  }
  
  export default createContainer(module);