import express  from 'express' 
import bodyParser from 'body-parser'

const app=express()
const PORT=8080
import {router,type IRouter} from './data'
import {user,type IUser} from './data'

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.listen(PORT,()=>{
  console.log('项目运行至'+PORT);
})

app.post('/user_router_list',(req,res)=>{
  const auth:IRouter[]=[]
  const {uid}=req.body
  const userInfo=user.find(item=>item.id===parseInt(uid))
  
  userInfo?.auth.map(rid=>{
    router.map((route)=>{
      if(route.id===rid){
        auth.push(route)
      }
    })
  })
  res.status(200).send({
    res:auth
  })
})
