import { QueryBuilder } from 'knex'
import { defaultTo } from 'lodash'
import { ApiService, IUser, transformArrayParam, Vocabulary, Tables, isNotEmptyArray } from '../../../global-refs'
import { IGetVocabulariesInput, IGetVocabulariesOutput } from './metadata'

export class GetVocabulariesService extends ApiService<IGetVocabulariesInput, IGetVocabulariesOutput> {
  private user: IUser
  protected getNormalizeInput() {
    const { lessonIds } = this.rawInput
    return {
      ...this.rawInput,
      lessonIds: transformArrayParam(lessonIds),
      fromDate: defaultTo(Number(this.rawInput.fromDate), 0),
      toDate: defaultTo(Number(this.rawInput.toDate), Date.now()),
      pageSize: Math.min(1000, defaultTo(this.rawInput.pageSize, 10)),
      page: defaultTo(this.rawInput.page, 1),
    }
  }

  public async process(): Promise<IGetVocabulariesOutput> {
    await super.process()
    const vocabularies = await this.getVocabularies()
    const total = await this.getTotal()
    return { total, vocabularies }
  }

  private applyDefaultBuilder(builder: QueryBuilder) {
    const { fromDate, toDate, lessonIds } = this.input
    builder
      .where({ userId: this.userContext.userId })
      .where(`${Tables.VOCABULARY}.created`, '>=', new Date(fromDate))
      .where(`${Tables.VOCABULARY}.created`, '<=', new Date(toDate))
    if (isNotEmptyArray(lessonIds)) builder.whereIn('lessonId', lessonIds)
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
