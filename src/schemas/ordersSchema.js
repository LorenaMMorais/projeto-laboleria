import joi from "joi";

const ordersSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required().min(1).max(5),
    totalPrice: joi.number().required()
});

export default ordersSchema;