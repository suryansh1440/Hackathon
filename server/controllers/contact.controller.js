import ContactModel from "../models/contact.model.js";


export const createContact = async (req, res) => {
    try {

        if (!req.body.name ||!req.body.email ||!req.body.subject ||!req.body.message) {
            return res.status(400).json({ 
                message: "All fields are required",
                success: false,
                error: true,
             });

        }
        const contact = new ContactModel(req.body);
        
        const data = await contact.save();
        res.status(201).json({
            message: "Contact created successfully",
            data: data,
            success: true,
            error: false,
            });
    } catch (error) {
        res.status(400).json({ 
            message: error.message ,
            success: false,
            error: true,
        });
    }
};
export const getAllMail = async(req, res) =>{
    try{
        const data = await ContactModel.find({isReplyed: false}).sort({createdAt: -1});
        res.status(200).json({
            message: "All Contact",
            data: data,
            success: true,
            error: false,
        });
    }
    catch(error){
        res.status(400).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}


export const deleteMailById = async(req, res) =>{
    try{
        const data = await ContactModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            message: "Contact Deleted",
            data: data,
            success: true,
            error: false,
        });
    }
    catch(error){
        res.status(400).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

export const replyMailById = async (req, res) => {
    try {
        const data = await ContactModel.findByIdAndUpdate(
            req.body.id,
            { reply: req.body.content, isReplyed: true },
            { new: true }
        );
        res.status(200).json({
            message: "Replied successfully",
            data: data,
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
};


