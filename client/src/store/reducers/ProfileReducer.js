import { RESET_UPDATE_IMAGE_ERRORS, SET_PROFILE_ERROR } from './../types/PostTypes';
const initState ={
    loading:false,
    updateErrors:[]
}

export const updateNameProfile =(state=initState, action) =>{
    const {type, payload} = action;
    if(type === SET_PROFILE_ERROR){
        return {
            ...state,
            updateErrors:payload
        }
    } else if(type=== RESET_UPDATE_IMAGE_ERRORS){
        return {
            ...state,
            updateErrors:[]
        }
    }    
    else {
        return state
    }
}