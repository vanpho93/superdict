import { IUserContext } from './user-context'

export abstract class ApiService<Input = void, Output = void> {
  input: Input
  constructor(protected readonly userContext: IUserContext, protected readonly rawInput: Input) {}

  protected getNormalizeInput() {
    return this.rawInput
  }

  protected async isPermitted(): Promise<unknown> {
    return
  }

  public async process(): Promise<Output> {
    this.input = this.getNormalizeInput()
    await this.isPermitted()
    await this.validateInput()
    return
  }

  protected async validateInput(): Promise<unknown> {
    return
  }
}
