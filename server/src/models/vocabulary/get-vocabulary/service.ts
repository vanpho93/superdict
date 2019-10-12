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
      fromDate: defaultTo(Number(this.rawInput.fromDate), 0),
      toDate: defaultTo(Number(this.rawInput.toDate), Date.now()),
      limit: Math.min(1000, defaultTo(this.rawInput.limit, 10)),
    }
  }

  public async process(): Promise<{}> {
    await super.process()
    return this.queryVocabulary()
  }

  private async queryVocabulary() {
    const { fromDate, toDate, lessonIds, limit } = this.input
    const vocabularies = await Vocabulary.findAll({}, builder => {
      builder.select(`${Tables.VOCABULARY}.*`, 'name as type')
        .join(Tables.WORD_TYPE, `${Tables.WORD_TYPE}.wordTypeId`, `${Tables.VOCABULARY}.wordTypeId`)
        .where({ userId: this.userContext.userId })
        .where(`${Tables.VOCABULARY}.created`, '>=', new Date(fromDate))
        .where(`${Tables.VOCABULARY}.created`, '<=', new Date(toDate))
        .limit(limit)
        .orderBy('vocabularyId')
      if (isNotEmptyArray(lessonIds)) builder.whereIn('lessonId', lessonIds)
      return builder
    })
    return vocabularies
  }
}
