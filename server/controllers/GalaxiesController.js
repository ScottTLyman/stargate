import { Auth0Provider } from "@bcwdev/auth0provider";
import { galaxiesService } from "../services/GalaxiesService";
import BaseController from "../utils/BaseController";

export class GalaxiesController extends BaseController {
  constructor() {
    super('api/galaxies')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const galaxies = await galaxiesService.getAll()
      return res.send(galaxies)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const galaxy = await galaxiesService.getById(req.params.id)
      return res.send(galaxy)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const galaxy = await galaxiesService.create(req.body)
      return res.send(galaxy)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await galaxiesService.remove(req.params.id, req.userInfo.id)
      return res.send('Galaxy Destroyed!')
    } catch (error) {
      next(error)
    }
  }
}