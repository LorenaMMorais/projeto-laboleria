import db from "../db.js"

export async function getCakeByName(name) {
    return db.query(`SELECT * FROM cakes WHERE name = $1;`, [name]);
}

export function insertCake(name, price, image, description) {
    return db.query(`INSERT INTO cakes ("name", "price", "image", "description") VALUES ($1, $2, $3, $4);`, [name, price, image, description]);
}