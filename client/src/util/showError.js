export const showError = (errorData, name) =>{
    console.log(errorData,"jiiiiiiiiiiii")
    const exist = errorData?.find(err => err.param === name);
    if(exist){
        return exist.msg
    }else {
        return false
    }
}