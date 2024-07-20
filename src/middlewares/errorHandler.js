export const errorHandler = (err,req,res) =>{
    if(err){
        console.error({message: err.stack});
    }
}

