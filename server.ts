import App from './app'
import OrderController from './src/orders/order.controller'
import {
  OrderService
} from './src/orders/order.service'
import {
  Storage
} from './src/orders/order.storage'

const storage: Storage = new Storage()
const orderService: OrderService = new OrderService(storage)

const app = new App([
  new OrderController(orderService),
], 1337)

app.listen()
