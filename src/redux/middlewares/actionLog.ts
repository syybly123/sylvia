import { Middleware } from 'redux';

export const actionLog: Middleware= (store)=>(next)=>(action)=> {
    console.log("state:",store.getState());
    console.log("first action",action);
    next(action);
    console.log("state change:",store.getState())
}