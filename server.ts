import App from './app'
import ExampleController from './src/example/orders.controller'

const app = new App([
  new ExampleController(),
], 1337)

app.listen()
