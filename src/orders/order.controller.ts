import {
  Request,
  Response,
  Router,
} from 'express'

import {
  IOrder
} from './order.interface'

import {
  OrderService
} from './order.service'

export default class OrderController {
  public path: string = '/orders'
  public pathId: string = '/orders/:id'
  public router = Router()
  public orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
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
    this.orderService.getAll().then((orders) =>{
      response.json(orders)
    })
    .catch(() => {
      response.sendStatus(500)
    })
  }

  public getOne = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    this.orderService.getOne(id).then((order) =>{
      response.json(order)
    })
    .catch(() => {
      response.sendStatus(404)
    })
  }

  public create = async (request: Request, response: Response) => {
    const orderInformation: IOrder = request.body
    this.orderService.create(orderInformation).then((order) =>{
      response.status(201).json(order)
    })
    .catch(() => {
      response.sendStatus(500)
    })
  }

  public delete = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    this.orderService.delete(id).then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(404)
    }) 
  }

  public deleteAll = async (request: Request, response: Response) => {
    this.orderService.deleteAll().then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(500)
    }) 
  }

  public update = async (request: Request, response: Response) => {
    const updateInformation: IOrder = request.body
    const id = Number(request.params.id)
    this.orderService.update(id, updateInformation).then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(404)
    }) 
  }
}
