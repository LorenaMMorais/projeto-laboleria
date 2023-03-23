import db from "../db.js";
import cakesSchema from "../schemas/cakesSchema.js";

export async function postCakes(req, res){
    const { name, price, image, description } = req.body;
    const validation = cakesSchema.validate({ name, price, image, description }, {abortEarly: false});

    if(validation.error){
        const erro = validation.error.details.map((d) => d.message);
        res.status(422).send(erro);
        return
    }

    if(!name || !price || !image || !description) return res.sendStatus(400);

    try {
        await db.query(`INSERT INTO cakes ("name", "price", "image", "description") VALUES ($1, $2, $3, $4);`, [name, price, image, description]);
        res.sendStatus(201);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}