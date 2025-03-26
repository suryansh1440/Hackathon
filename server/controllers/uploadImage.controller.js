import uploadImageCloudnary from "../utils/uploadImageCloudnary.js";

export const uploadImages = async (req, res) => {
    try {
        // Get image from req.file instead of req.body since using multer
        const image = req.file;
        if (!image) {
            return res.status(400).json({ 
                success: false, 
                error: true, 
                message: "No image file provided" 
            });
        }

        const imageUrl = await uploadImageCloudnary(image);
        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Image uploaded successfully", 
            data: imageUrl 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message 
        });
    }
}

export default uploadImages;