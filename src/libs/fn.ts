import { IRouter } from "src/data"
import { SET_AUTH, SET_ROUTER_LIST } from "../store/types/action_types"
import { Router, RouteRecordRaw } from "vue-router"
import {Store} from 'vuex'
import {IState} from '../store/index'
export function fn(data:IRouter[]){
  const parents=data.filter(item=>item.pid===0)
  const childs=data.filter(item=>item.pid!==0)
  deep(parents,childs)
  return parents
  
function deep(parents:IRouter[],childs:IRouter[]) {
    parents.map(p=>{
      for(let i=0;i<childs.length;i++){
        if(childs[i].pid===p.id){
          if(p.children){
            p.children.push(childs[i])
          }
          else{
            p.children=[childs[i]]
          }
          deep([childs[i]],childs)
        }
      }
    })
  }
}
function createRouter(tree:IRouter[]){
  let routes=tree.map(route=>{
    let _route:RouteRecordRaw={
      path:route.path,
      name:route.name,
      component:()=>import(`./src/view/${route.name}.vue`),
      children:[]
    }
    if(route.children){
      _route.children=createRouter(route.children)
    }
    return _route
  })
  return routes
}

export function beforeRouter(router:Router,store:Store<IState>){
  
  router.beforeEach(async(to,from,next)=>{

    if(!store.state.auth){
      
      await store.dispatch(SET_ROUTER_LIST)
      const routerTree= store.state.routeList
      store.dispatch(SET_AUTH,true)
      const routes=createRouter(routerTree)
      routes.forEach(route=>{
      router.addRoute(route)
      })
      next(to.path)
     }else{
      next()
     }
    
    
   })
}


