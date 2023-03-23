import joi from "joi";

const ordersSchema = joi.object({
    price: joi.number().required()
});

export default ordersSchema;