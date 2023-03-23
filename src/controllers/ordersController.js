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
    try {
        const allOrders = await db.query(`SELECT * FROM orders;`);

        if(!allOrders.rows[0]) return res.status(400).send([]);

        return res.status(200).send(allOrders.rows);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getOrdersById(req, res){
    const { id } = req.params;
    
    try {
        const ordersById = await db.query(`SELECT * FROM orders WHERE id = $1;`, [Id]);

        if(!ordersById.rows[0]) return res.sendStatus(404);

        const clientOrderId = await db.query(`SELECT * FROM clients WHERE id = $1;`, [ordersById.rows[0].clientId]);
    
        const cakeOrderId = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [ordersById.rows[0].cakeId]);

        const ordersData = {
            client:{
                id: clientOrderId.rows[0].id,
                name: clientOrderId.rows[0].name,
                address: clientOrderId.rows[0].address,
                phone: clientOrderId.rows[0].phone
            },
            cake:{
                id: cakeOrderId.rows[0].id,
                name: cakeOrderId.rows[0].name,
                price: cakeOrderId.rows[0].price,
                image: cakeOrderId.rows[0].image,
                description: cakeOrderId.rows[0].description
            },
            orderId: orderById.rows[0].id,
            createdAt: orderById.rows[0].createdAt,
            quantity: orderById.rows[0].quantity,
            totalPrice: orderById.rows[0].totalPrice
        }
        return res.status(200).send(ordersData);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}