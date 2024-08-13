import { body } from "express-validator";

export const phoneNumberValidator = [
    body('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long')
        .isNumeric().withMessage('Phone number must contain only numbers')
        ,
    body("modelName")
    .notEmpty().withMessage("Model name is required")
    .isLength({ min:2})
    .withMessage('Mfg year must be more than 1 characters'),
    body("brandName")
    .notEmpty().withMessage("Brand name is required")
    .isLength({min:2})
    .withMessage('Brand name must be long than 1 characters'),
    body("mfgYear")
    .notEmpty().withMessage("Manufacturing year is required")
    .isLength({ max: 4 ,min:4})
    .withMessage('Mfg year must be 4 characters')
    ,
    body("price")
    .notEmpty().withMessage("Price is required")
    .isLength({ min: 5 }),
    body("password")
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')

];
