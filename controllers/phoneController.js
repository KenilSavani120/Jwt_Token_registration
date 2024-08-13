import phones from "../Model/model.js";
import { hashPassword, comparePassword, generateToken } from "../Authentication/authUtils.js";


export const addPhones = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Check if the phone number already exists
        const numberExist = await phones.findOne({ phoneNumber });
        if (numberExist) {
            return res.status(400).send({
                message: "Phone number exists, try a different phone number"
            });
        }

        // Ensure the password is provided
        if (!password) {
            return res.status(400).send({
                message: "Password is required"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create and save the new phone entry
        const newPhone = await phones.create({ ...req.body, password: hashedPassword });
        return res.status(200).json({
            data: newPhone,
            message: "Phone added successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Add Phone function"
        });
    }
};

export const getPhones = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not provided
        const skipIndex = (page - 1) * limit; // Calculate how many documents to skip

        if (id) {
            const fetchPhone = await phones.findById(id); // Assuming id is the MongoDB _id

            if (!fetchPhone) {
                return res.status(404).send({
                    message: "Phone does not exist"
                });
            }

            return res.status(200).json({
                data: fetchPhone,
                message: "Phone fetched successfully"
            });
        }

        const fetchPhones = await phones.find().limit(limit).skip(skipIndex);

        return res.status(200).json({
            data: fetchPhones,
            message: "Phones fetched successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in getPhones function"
        });
    }
};


export const deletePhone = async(req,res)=>{
    try {
        const {id} = req.params
        const phoneExists = await phones.findOne(id)
        if(!phoneExists){
            return res.status(404).send({
                message:"User does not exist"
            })
        }
        await phones.findOneAndDelete(id)
        return res.status(200).send({
            message: "Phone deleted successfully"
        });

    } catch (error) {
        console.log(error);
       return res.status(500).send({
            message : "Error in Delete Phone function"
        })
        
    }
}

export const updatePhone = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body; 

        // Check if the phone exists
        const phoneExists = await phones.findById(id);
        if (!phoneExists) {
            return res.status(404).send({
                message: "Phone does not exist"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        const updatedPhone = await phones.findByIdAndUpdate(
            id,
            { ...req.body, password: hashedPassword }, // Update fields
            { new: true } // Options
        );
        return res.status(200).json({
            data: updatedPhone,
            message: "Phone updated successfully"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Update Phone function"
        });
    }
};
