import axios from 'axios'
import { IRouter } from 'src/data'
import { createStore } from 'vuex'
import {SET_AUTH,SET_ROUTER_LIST, SET_UID} from './types/action_types'
import {fn} from '../libs/fn'
// 创建一个新的 store 实例
export interface IState{
  routeList:Array<IRouter>,
  auth:boolean,
  uid:number
}
export const store = createStore<IState>({
  state () {
    return {
      routeList:[],
      auth:false,
      uid:1
    }
  },
  mutations:{
    [SET_AUTH](state,playload){
      state.auth=playload
    },
    [SET_ROUTER_LIST](state,playload){
      state.routeList=playload
    },
    [SET_UID](state,playload){
      state.uid=playload
    }
  },
  actions: {
   async [SET_ROUTER_LIST]({commit},playload){
    const routeList= await axios.post('/api/user_router_list',{uid:Number(store.state.uid)})
    const f=fn(routeList.data.res)
    commit(SET_ROUTER_LIST,f)
    store.dispatch(SET_AUTH,true)
    },
    [SET_AUTH]({commit},playload){
      commit(SET_AUTH,playload)
    }
  }
})

