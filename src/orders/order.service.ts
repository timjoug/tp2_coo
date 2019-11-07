import{
    IOrder
} from './order.interface'

import {
    Storage
} from './order.storage'

import { 
    OrderBuilder 
} from './order.builder'

class OrderService{

    private orderRepository: Storage;

    constructor(orderRepository: Storage) {
        this.orderRepository = orderRepository;
    }

    public async getAll(): Promise<IOrder[]> {
        return new Promise(async (resolve, reject) => {
            const orders: IOrder[] = await this.orderRepository.get();

            if(orders !== undefined) {
                // let fakeData: IOrder[] = []
                // orders.forEach((order) => {
                //     fakeData.push(
                //         new OrderBuilder()
                //         .setId(order.id)
                //         .setCreatedAt(order.createdAt)
                //         .setPackages(order.packages)
                //         .setCarrier(order.carrier)
                //         .build()
                //     );
                //   });
                // resolve(fakeData);
                resolve(orders);
            } else {
                reject();
            }
        })
    }

    public async getOne(id: number): Promise<IOrder> {
        return new Promise(async (resolve, reject) => {
            const orders: IOrder[] = await this.orderRepository.get();
            // tslint:disable-next-line: triple-equals
            const foundOrder: IOrder = orders.find((order) => order.id === Number(id))   

            if(!foundOrder) {
                reject();
            } else {
                resolve(foundOrder);
            }
        })
    }

    public async create(order: IOrder): Promise<IOrder> {
        return new Promise(async (resolve, reject) => {
            const orders: IOrder[] = await this.orderRepository.get();

            const sortedOrders: IOrder[] | [] = orders.sort((previous: IOrder, current: IOrder) => {
            return current.id - previous.id
            })
            // tslint:disable-next-line: radix
            const lastId: number = sortedOrders.length > 0 ? sortedOrders[0].id : 0

            // Generate automatic data
            const orderToSave: IOrder = {
            ...order,
            id: lastId + 1,
            createdAt: new Date(),
            }

            const newOrders: IOrder[] = [...orders, orderToSave]
            await this.orderRepository.set(newOrders)
            
            resolve(orderToSave);
        })
    }

    public async delete(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const orders: IOrder[] = await this.orderRepository.get();

            // tslint:disable-next-line: triple-equals
            const orderToDelete: IOrder | null = orders.find((order) => order.id === Number(id))
    
            if (!orderToDelete) {
                reject();
            }
    
            const newOrders: IOrder[] = orders.filter((order) => order.id !== orderToDelete.id)
            await this.orderRepository.set(newOrders);

            resolve();
        });
    }

    public async deleteAll(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.orderRepository.del();
            resolve();
        });
    }

    public async update(id: number, order: IOrder): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const orders = await this.orderRepository.get();

            // tslint:disable-next-line: triple-equals
            const orderToUpdate = orders.find((order: IOrder) => order.id === Number(id))
        
            if (!orderToUpdate) {
                reject();
            }
        
            const updated = {
            ...orderToUpdate,
            ...order,
            }
        
            // tslint:disable-next-line: triple-equals
            const newOrders = orders.map((order: IOrder) => order.id === updated.id ? updated : order)
        
            await this.orderRepository.set(newOrders);

            resolve();
        });
    }   
}

export {OrderService}