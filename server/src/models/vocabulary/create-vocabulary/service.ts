import { ApiService, WordType, exist, Vocabulary } from '../../../global-refs'
import { ICreateVocabularyInput } from './metadata'

export class CreateVocabularyService extends ApiService<ICreateVocabularyInput, void> {
  public async process(): Promise<void> {
    await super.process()
    if (await this.isVocabularyDuplicate()) return
    const { word, pronunciation, americanSound, britishSound, meaning, examples } = this.input
    const wordTypeId = await this.getWordTypeId()
    await Vocabulary.create({
      word, pronunciation, americanSound, britishSound, meaning, examples, wordTypeId,
    })
  }

  async getWordTypeId() {
    const wordType = await WordType.findOne({ name: this.input.wordType })
    if (exist(wordType)) return wordType.wordTypeId
    const newWordType = await WordType.create({ name: this.input.wordType })
    return newWordType.wordTypeId
  }

  async isVocabularyDuplicate() {
    return exist(await Vocabulary.findOne({ word: this.input.word, meaning: this.input.meaning }))
  }
}
