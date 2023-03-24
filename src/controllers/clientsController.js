import { insertClients, getClientsById, getOrdersByClientId } from "../repositories/clientsRepository.js";

export async function postClients(req, res){
    const { name, address, phone } = req.body;

    if(!name || !address || !phone) return res.sendStatus(400);

    try {
        await insertClients(name, address, phone);
        res.sendStatus(201);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getClientsOrder(req, res){
    const {id} = req.params;

    try {
        const clientsById = await getClientsById(id);

        if(!clientsById.rows[0]) return res.status(404).send("Usuário inexistente");

        const ordersByClientId = await getOrdersByClientId(id);

        if(!ordersByClientId.rows[0]) return res.status(404).send("Sem pedidos até o momento!");

        res.send(ordersByClientId.rows);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}