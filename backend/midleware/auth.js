import jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    try {
        const token = req.header("Authorization")
        console.log(token);
        if(!token) return res.status(400).json({msg: "Invalid authenication 1"})

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=> {
            if(err) return res.status(400).json({msg: "Invalid authenication 2"})

            req.user=user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export default auth;