import { defaultTo } from 'lodash'
import { ApiService, Lesson, exist, Vocabulary, makeSure, mustExist, transformArrayParam } from '../../../global-refs'
import { IAssignLessonInput, EAssignLessonError } from './metadata'

export class AssignLessonService extends ApiService<IAssignLessonInput, void> {
  protected getNormalizeInput() {
    const { vocabularyIds, lessonId } = this.rawInput
    return {
      ...this.rawInput,
      vocabularyIds: transformArrayParam(vocabularyIds),
      lessonId: defaultTo(lessonId, null),
    }
  }

  public async process(): Promise<void> {
    await super.process()
    makeSure(this.userContext.isUser, 'MUST_BE_USER')
    await Vocabulary.updateMany(
      { userId: this.userContext.userId },
      { lessonId: this.input.lessonId },
      builder => builder.whereIn('vocabularyId', this.input.vocabularyIds)
    )
  }

  async validateInput() {
    if (exist(this.input.lessonId)) {
      const lesson = await Lesson.findOne({
        userId: this.userContext.userId,
        lessonId: this.input.lessonId,
      })
      mustExist(lesson, EAssignLessonError.CANNOT_FIND_LESSON)
    }
  }
}
