import db from "../db.js";
import clientsSchema from "../schemas/clientsSchema.js";

export async function postClients(req, res){
    const { name, address, phone } = req.body;
/*     const validation = clientsSchema.validate({ name, address, phone }, { abortEarly: false });

    if(validation.error){
        const erro = validation.error.details.map((d) => d.message);
        res.status(422).send(erro);
        return
    } */

    if(!name || !address || !phone) return res.sendStatus(400);

    try {
        await db.query(`INSERT INTO clients ("name", "address", "phone") VALUES ($1, $2, $3);`, [name, address, phone]);
        res.sendStatus(201);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getClientsOrder(req, res){
    const {id} = req.params;

    try {
        const clientsById = await db.query(`SELECT * FROM clients WHERE "clientId" = $1`, [id]);

        if(!clientsById.rows[0]) return res.status(404).send("Usuário inexistente");

        const ordersByClientId = await db.query(`SELECT * FROM orders WHERE "clientId" = $1`, [id]);

        if(!ordersByClientId.rows[0]) return res.status(404).send("Sem pedidos até o momento!");

        res.send(ordersByClientId.rows);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}