import { generateResponse } from "../config/openRouter.js"
import extractJSON from "../utils/extractJSON.js"

export const getCurrentUser = async(req,res) => {
    try {
        if(!req.user) {
            return res.json({user:null})
        }
        return res.json(req.user)
    } catch (error) {
        console.log("Error in user controller")
        return res.status(500).json({message:`Get current user error ${error}`})
    }
}

export const generateDemo = async(req,res)=>{
    try {
        const result = await generateResponse("hi")
        const data = await extractJSON(result)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
