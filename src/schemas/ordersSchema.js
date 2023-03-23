import joi from "joi";

export const ordersSchema = joi.object({
    price: joi.number().required()
});