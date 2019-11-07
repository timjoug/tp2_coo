import { 
    getAsync, setAsync, delAsync 
} from '../../utils/storage'

import {
    IOrder
} from "./order.interface";

class Storage {

    get(): Promise<IOrder[]> {
        return new Promise((resolve, reject) => {
            getAsync("orders").then((result: string) => {
                const orders: IOrder[] | [] = JSON.parse(result) || []
                resolve(orders);
            })
            .catch((error: Error) => {
                reject(error);
            })
        });
    }

    set(orders: IOrder[]): Promise<void> {
        return setAsync("orders", JSON.stringify(orders));
    }

    del(): Promise<void> {
        return delAsync("orders");
    }
}

export {Storage};