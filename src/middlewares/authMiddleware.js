const auth = (schema, userSchema) => schema.validate(userSchema, { abortEarly: false });

export const validation = schema => (req, res, next) => {
    const userSchema = req.body;
    const { error } = auth(schema, userSchema);

    if(error){
        const erro = error.details.map((d) => d.message);
        return res.status(422).send({
            message: "Unprocessable Entity",
            erro,
        });
    }
    next();
}