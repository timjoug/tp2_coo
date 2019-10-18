import {
  Request,
  Response,
  Router,
} from 'express'

import { getAsync } from '../../utils/storage'

export default class ExampleController {
  public path = '/example'
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAll)
  }

  public getAll = async (request: Request, response: Response) => {
    response.json(await getAsync('orders'))
  }
}
