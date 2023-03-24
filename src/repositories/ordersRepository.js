import db from "../db.js";

export async function selectClientsById(clientId) {
    return db.query('SELECT * FROM clients WHERE id = $1;', [clientId]);
}

export async function selectCakesById(cakeId) {
    return await db.query('SELECT * FROM cakes WHERE id = $1;', [cakeId]);
}

export async function insertOrders(clientId, cakeId, quantity, totalPrice, createdAt) {
    return await db.query(`INSERT INTO orders("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES($1, $2, $3, $4, $5);`, [clientId, cakeId, quantity, totalPrice, createdAt]);
}

export async function ordersJoin() {
    return await db.query(
        `SELECT orders.id AS "ordersId", orders."createdAt", orders.quantity, orders."totalPrice",
        cakes.id AS "cakeId", cakes.name AS "cakes", cakes.price, cakes.description, cakes.image,
        clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone 
        FROM orders
        JOIN clients ON "clientId" = clients.id
        JOIN cakes ON "cakeId" = cakes.id;`);
}

export async function selectOrders(id) {
    return await db.query('SELECT * FROM orders WHERE id = $1;', [id]);
}

export async function selectClient({rows:[{clientId}]}) {
    return await db.query('SELECT * FROM clients WHERE id = $1;', [clientId]);
}

export async function selectCake({rows:[{cakeId}]}) {
    return await db.query('SELECT * FROM cakes WHERE id = $1;', [cakeId]);
}