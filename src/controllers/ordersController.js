import dayjs from "dayjs";
import { selectClientsById, selectCakesById, insertOrders, ordersJoin, selectOrders, selectClient, selectCake } from "../repositories/ordersRepository.js";

export async function postOrder(req, res){
    const { clientId, cakeId, quantity } = req.body;

    const clientExist = await selectClientsById(clientId);

    if(!clientExist.rows[0]) return res.sendStatus(404);

    const cakeExist = await selectCakesById(cakeId);

    if(!cakeExist.rows[0]) return res.sendStatus(404);

    if(quantity < 0 || quantity > 5) return res.sendStatus(400);

    const totalPrice = (cakeExist.rows[0].price) * quantity;
    const createdAt = dayjs().format('YYYY-MM-DD');

    try {
        await insertOrders(clientId, cakeId, quantity, totalPrice, createdAt);
            
        res.sendStatus(201);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getOrders(req, res){
    try {
        const completeOrders = await ordersJoin();

        const allCompleteOrders = completeOrders.rows.map((element) => {

            const completeOrdersData = {
                client: {
                    id: element.clientId,
                    name: element.clientName,
                    address: element.address,
                    phone: element.phone,
                  },
                  cake: {
                    id: element.cakeId,
                    name: element.cakes,
                    price: element.price,
                    description: element.description,
                    image: element.image,
                  },
                  orderId: element.ordersId,
                  createdAt: element.createdAt,
                  quantity: element.quantity,
                  totalPrice: element.totalPrice,
            }

            return completeOrdersData;
        });

        if(!completeOrders.rows[0]){
            return res.status(404).send([])
        }

        res.status(200).send(allCompleteOrders);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getOrdersById(req, res){
    const { id } = req.params;
    
    try {
        const orderById = await selectOrders(id);

        if(!orderById.rows[0]) return res.sendStatus(404);

        const clientOrderId = await selectClient(orderById);
        const cakeOrderId = await selectCake(orderById);

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