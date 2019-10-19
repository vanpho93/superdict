import { defaultTo } from 'lodash'

const STORAGE = 'EXAM_STORAGE'

export class ExamStorage {
  static getVocabularyIds() {
    try {
      return JSON.parse(defaultTo(localStorage.getItem(STORAGE), '[]'))
    } catch (error) {
      console.log(error)
      localStorage.removeItem(STORAGE)
      return []
    }
  }

  static setVocabularyIds(ids) {
    localStorage.setItem(STORAGE, JSON.stringify(ids))
  }
}
