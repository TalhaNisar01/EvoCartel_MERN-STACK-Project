const userModel =require('../models/userModel')

async function userDetails(res,req){
    try{
         console.log("User ID:",req.userId)

         


       const user=await userModel.findById(req.userId)


       res.status(200).json({
        data:user,
        success:true,
        error:false
      })
       console.log("User:",user)
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