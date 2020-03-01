import { ApiService, Tipster } from '../../../global-refs'
import { IInput, IOutput } from './metadata'

export class Service extends ApiService<IInput, IOutput> {
  public async process(): Promise<IOutput> {
    await super.process()
    return Tipster.findAll({}, builder => builder.whereIn('name', this.input.names))
  }
}
