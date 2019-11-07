import {
  Request,
  Response,
  Router,
} from 'express'

import { getAsync, setAsync, delAsync } from '../../utils/storage'

import {
  IOrder
} from './Order'

export default class OrderController {
  public path: string = '/orders'
  public pathId: string = '/orders/:id'
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.get(this.pathId, this.getOne)
    this.router.post(this.path, this.create)
    this.router.delete(this.path, this.deleteAll)
    this.router.delete(this.pathId, this.delete)
    this.router.put(this.pathId, this.update)
  }

  public getAll = async (request: Request, response: Response) => {
    response.json(await getAsync('orders'))
  }

  public getOne = async (request: Request, response: Response) => {
    const id: number = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []

    // tslint:disable-next-line: triple-equals
    const foundOrder: IOrder = orders.find((order) => order.id === id)

    if (!foundOrder) {
      return response.sendStatus(404)
    }

    response.json(foundOrder)
  }

  public delete = async (request: Request, response: Response) => {
    const id: number = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToDelete: IOrder = orders.find((order) => order.id === id)

    if (!orderToDelete) {
      return response.sendStatus(404)
    }

    const newOrders: IOrder[] = orders.filter((order: IOrder) => order.id !== orderToDelete.id)
    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  }

  public update = async(request: Request, response: Response) =>{
    const updateInformations: IOrder = request.body
    const id: number = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToUpdate: IOrder = orders.find((order: IOrder) => order.id === id)

    if (!orderToUpdate) {
      return response.sendStatus(404)
    }

    const newOrders: IOrder[] = orders.map((order) => {
      if (order.id === orderToUpdate.id) {
        return {
          ...order,
          ...updateInformations,
        }
      }
    })
    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  } 

  public create = async (request: Request, response: Response) => {
      let orderToSave: IOrder = request.body
      const rawOrders: string = await getAsync('orders')
      const orders: IOrder[] | [] = JSON.parse(rawOrders) || []

      const sortedOrders: IOrder[] | [] = orders.sort((previous: IOrder, current: IOrder) => {
          return current.id - previous.id
      })

      const lastId: number = 0
      if (sortedOrders.length !=0 && sortedOrders[0].id > 0){
        sortedOrders[0].id
      }

      let orderToSaveBis: IOrder = {
          ...orderToSave,
          id: lastId + 1,
          createdAt: new Date(),  
      }

      let newOrders: IOrder[] = [...orders, orderToSaveBis]
      await setAsync('orders', JSON.stringify(newOrders))

      response.status(201).json(orderToSave)

  }

  public deleteAll = async (request: Request, response: Response) => {
    await delAsync('orders')
    response.status(200)
    response.end()
  }
}
