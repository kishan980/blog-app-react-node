export const showError = (errorData, name) =>{

    const exist = errorData?.find(err => err.param === name);
    if(exist){
        return exist.msg
    }else {
        return false
    }
}