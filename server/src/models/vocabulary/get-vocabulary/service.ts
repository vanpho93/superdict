import { defaultTo } from 'lodash'
import { ApiService, IUser, transformArrayParam, Vocabulary, Constants, Tables, isNotEmptyArray } from '../../../global-refs'
import { IGetVocabulariesInput } from './metadata'

export class GetVocabulariesService extends ApiService<IGetVocabulariesInput, {}> {
  private user: IUser
  protected getNormalizeInput() {
    const { lessonIds } = this.rawInput
    return {
      ...this.rawInput,
      lessonIds: transformArrayParam(lessonIds),
      fromLesson: defaultTo(this.rawInput.fromLesson, 0),
      toLesson: defaultTo(this.rawInput.fromLesson, Constants.MAXIMUM_INTEGER_4_BYTES),
      fromDate: defaultTo(this.rawInput.fromDate, 0),
      toDate: defaultTo(this.rawInput.toDate, Date.now()),
    }
  }

  public async process(): Promise<{}> {
    await super.process()
    return this.queryVocabulary()
  }

  private async queryVocabulary() {
    const { fromLesson, toLesson, fromDate, toDate, lessonIds } = this.input
    const vocabularies = await Vocabulary.findAll({}, builder => {
      builder.select(`${Tables.VOCABULARY}.*`, 'name')
      builder.join(Tables.WORD_TYPE, `${Tables.WORD_TYPE}.wordTypeId`, `${Tables.VOCABULARY}.wordTypeId`)
      builder.where({ userId: this.userContext.userId })
      builder.where('lessonId', '>=', fromLesson)
      builder.where('lessonId', '<=', toLesson)
      builder.where(`${Tables.VOCABULARY}.created`, '>=', new Date(fromDate))
      builder.where(`${Tables.VOCABULARY}.created`, '<=', new Date(toDate))
      if (isNotEmptyArray(lessonIds)) builder.whereIn('lessonId', lessonIds)
      return builder
    })
    return vocabularies
  }
}
