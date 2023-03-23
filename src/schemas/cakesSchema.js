import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required(),
    image: joi.string().required().uri(),
    description: joi.string().required()
});

export default cakesSchema;