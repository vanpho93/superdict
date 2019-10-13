import { defaultTo } from 'lodash'

const STORAGE = 'EXAM_STORAGE'

export class ExamStorage {
  static count() {
    return this.getVocabularyIds().length
  }

  static getVocabularyIds() {
    try {
      return JSON.parse(defaultTo(localStorage.getItem(STORAGE), '[]'))
    } catch (error) {
      console.log(error)
      localStorage.removeItem(STORAGE)
      return []
    }
  }

  static addVocabularies(vocabularies) {
    const currentIds = this.getVocabularyIds()
    vocabularies.forEach(({ vocabularyId }) => {
      if (currentIds.includes(vocabularyId)) return
      currentIds.push(vocabularyId)
    })
    localStorage.setItem(STORAGE, JSON.stringify(currentIds))
  }

  static removeVocabularies(vocabularies) {
    const currentIds = this.getVocabularyIds()
    const newIds = currentIds.filter(id => {
      return vocabularies.every(vocabulary => vocabulary.vocabularyId !== id)
    })
    localStorage.setItem(STORAGE, JSON.stringify(newIds))
  }

  static removeAll() {
    localStorage.setItem(STORAGE, '[]')
  }
}
