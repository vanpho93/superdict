import { map, find, isNil } from 'lodash'
import { ApiService, Vocabulary, SM2 } from '../../../global-refs'
import { ISubmitExamResultInput } from './metadata'

export class SubmitExamResultService extends ApiService<ISubmitExamResultInput, void> {
  public async process(): Promise<void> {
    await super.process()
    const vocabularies = await Vocabulary.findAll({}, builder => {
      return builder.whereIn('vocabularyId', map(this.input, 'vocabularyId'))
    })
    for (let index = 0; index < this.input.length; index++) {
      const { vocabularyId, performanceRating } = this.input[index]
      const vocabulary = find(vocabularies, { vocabularyId })
      if (isNil(vocabulary)) continue
      // pass Date.now into new Date() for testing purpose
      const result = SM2.calculate(vocabulary, performanceRating, new Date(Date.now()))
      await Vocabulary.findByIdAndUpdate(vocabularyId, result)
    }
  }
}
