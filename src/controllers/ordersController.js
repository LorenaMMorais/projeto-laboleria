import joi from "joi";
import db from "../db.js";
import dayjs from "dayjs";
import ordersSchema from "../schemas/ordersSchema.js";

export async function postOrder(req, res){
    const { clientId, cakeId, quantity } = req.body;
    const validation = ordersSchema.validate({ clientId, cakeId, quantity }, { abortEarly: false });

    if(validation.error){
        const erro = validation.error.details.map((d) => d.message)
        res.status(422).send(erro);
        return
    }

    const clientExist = await db.query(`SELECT * FROM clients WHERE id = $1;`, [clientId]);

    if(!clientExist.rows[0]) return res.sendStatus(404);

    const cakeExist = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [cakeId]);

    if(!cakeExist.rows[0]) return res.sendStatus(404);

    if(quantity < 0 || quantity > 5) return res.sendStatus(400);

    const totalPrice = (cakeExist.rows[0].price) * quantity;
    const createdAt = dayjs().format('YYYY-MM-DD');

    try {
        await db.query(`INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5);`, [clientId, cakeId, quantity, totalPrice, createdAt]);
    
        res.sendStatus(201);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getOrders(req, res){

}

export async function getOrdersById(req, res){

}