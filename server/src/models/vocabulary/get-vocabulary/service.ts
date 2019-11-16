import { QueryBuilder } from 'knex'
import { defaultTo, isEmpty } from 'lodash'
import { ApiService, transformArrayParam, Vocabulary, Tables, isNotEmptyArray, makeSure } from '../../../global-refs'
import { IGetVocabulariesInput, IGetVocabulariesOutput } from './metadata'

export class GetVocabulariesService extends ApiService<IGetVocabulariesInput, IGetVocabulariesOutput> {
  protected getNormalizeInput() {
    const { lessonIds, vocabularyIds, isFindUnknownLesson } = this.rawInput
    return {
      ...this.rawInput,
      lessonIds: transformArrayParam(lessonIds),
      vocabularyIds: transformArrayParam(vocabularyIds),
      fromDate: defaultTo(Number(this.rawInput.fromDate), 0),
      toDate: defaultTo(isEmpty(this.rawInput.toDate) ? null : Number(this.rawInput.toDate), Date.now()),
      pageSize: Math.min(1000, defaultTo(this.rawInput.pageSize, 10)),
      page: defaultTo(this.rawInput.page, 1),
      // tslint:disable-next-line: no-any
      isFindUnknownLesson: (isFindUnknownLesson as any) === 'true',
    }
  }

  public async process(): Promise<IGetVocabulariesOutput> {
    await super.process()
    makeSure(this.userContext.isUser, 'MUST_BE_USER')
    const vocabularies = await this.getVocabularies()
    const total = await this.getTotal()
    return { total, vocabularies }
  }

  private applyDefaultBuilder(builder: QueryBuilder) {
    const { fromDate, toDate, lessonIds, vocabularyIds, isFindUnknownLesson } = this.input
    builder
      .where({ userId: this.userContext.userId })
      .where(`${Tables.VOCABULARY}.created`, '>=', new Date(fromDate))
      .where(`${Tables.VOCABULARY}.created`, '<=', new Date(toDate))
    if (isNotEmptyArray(lessonIds)) builder.whereIn('lessonId', lessonIds)
    if (isFindUnknownLesson) builder.whereNull('lessonId')
    if (isNotEmptyArray(vocabularyIds)) builder.whereIn('vocabularyId', vocabularyIds)
    return builder
  }

  private async getVocabularies() {
    const { page, pageSize } = this.input
    const fromIndex = (page - 1) * pageSize
    const vocabularies = await Vocabulary.findAll({}, builder => {
      builder.select(`${Tables.VOCABULARY}.*`, 'name as type')
      builder.join(Tables.WORD_TYPE, `${Tables.WORD_TYPE}.wordTypeId`, `${Tables.VOCABULARY}.wordTypeId`)
      this.applyDefaultBuilder(builder)
      builder.limit(pageSize)
      builder.orderBy('dueDate')
      builder.offset(fromIndex)
      return builder
    })
    // tslint:disable-next-line: no-any
    return vocabularies as any
  }

  private async getTotal() {
    return Vocabulary.count({}, builder => {
      this.applyDefaultBuilder(builder)
      return builder
    })
  }
}
