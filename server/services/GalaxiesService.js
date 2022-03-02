import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class GalaxiesService {
  async getAll(query = {}) {
    const galaxies = await dbContext.Galaxies.find(query).populate('creator', 'name')
    return galaxies
  }
  async getById(id) {
    const galaxy = await dbContext.Galaxies.findById(id).populate('creator', 'name')
    if (!galaxy) {
      throw new BadRequest('Galaxy does not exist')
    }
    return galaxy
  }

  async create(body) {
    const galaxy = await dbContext.Galaxies.create(body)
    await galaxy.populate('creator', 'name')
    return galaxy
  }
  async remove(id, userId) {
    const orig = await this.getById(id)
    if (orig.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot delete this galaxy!')
    }
    await dbContext.Galaxies.findOneAndRemove({ _id: id })
  }
}

export const galaxiesService = new GalaxiesService()