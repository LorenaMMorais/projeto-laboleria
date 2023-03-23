import joi from "joi";

const clientsSchema = joi.object({
    name: joi.string().required().min(2),
    address: joi.string().required(),
    phone: joi.string().required().min(10).max(11)
});

export default clientsSchema;