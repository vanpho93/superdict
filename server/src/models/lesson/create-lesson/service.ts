import { trim } from 'lodash'
import { ApiService, Lesson, makeSure, ILesson } from '../../../global-refs'
import { ICreateLessonInput, ECreateLessonError } from './metadata'

export class CreateLessonService extends ApiService<ICreateLessonInput, ILesson> {
  getNormalizeInput() {
    return {
      ...this.input,
      name: trim(this.rawInput.name),
    }
  }

  public async process(): Promise<ILesson> {
    makeSure(this.userContext.isUser, 'MUST_BE_USER')
    await super.process()
    return Lesson.create({ userId: this.userContext.userId, name: this.input.name })
  }

  protected async validateInput(): Promise<void> {
    makeSure(
      0 < this.input.name.length && this.input.name.length <= 30,
      ECreateLessonError.INVALID_NAME
    )
  }
}
