import { ADD_LOGIN_REQUEST } from "./actionType"

const init={
    isLoading:false,
    isAuth:false,
    token:"",
    senddata:{}


}

export const reducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:false}
        default:
            return {...store}
    }

}