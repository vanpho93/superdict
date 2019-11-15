import { ApiService, Lesson, makeSure, ILesson } from '../../../global-refs'

export class GetLessonsService extends ApiService<void, ILesson[]> {
  public async process(): Promise<ILesson[]> {
    await super.process()
    makeSure(this.userContext.isUser, 'MUST_BE_USER')
    return Lesson.findAll({ userId: this.userContext.userId })
  }
}
