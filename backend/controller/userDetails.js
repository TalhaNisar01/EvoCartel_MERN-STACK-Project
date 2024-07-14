async function userDetails(res,req){
    try{

    }catch(err){

        res.status(400).json(
            {
                message:err.message ||err,
                success:false,
                error:true
            }
        )
        
    }
}

module.exports={userDetails}