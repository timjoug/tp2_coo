import App from './app'
import OrderController from './src/orders/orders.controller'

const app = new App([
  new OrderController(),
], 1337)

app.listen()
