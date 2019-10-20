import { IVocabulary } from '../global-refs'

const WORST = 0
const CORRECT = 0.6
const BEST = 1

export interface ISM2Output {
  difficulty: number
  intervalTime: number
  percentOverdue: number
}

export class SM2 {
  static limitNumber (value: number, min: number, max: number) {
    if (value < min) return min
    if (value > max) return max
    return value
  }

  static getPercentOverdue (vocabulary: IVocabulary, now: Date) {
    return Math.min(((now.getTime() / 1000) - vocabulary.lastReviewed.getTime()) / vocabulary.intervalTime, 2)
  }

  static calculate (vocabulary: IVocabulary, performanceRating: number, now: Date): ISM2Output {
    const percentOverdue = this.getPercentOverdue(vocabulary, now)

    const difficultyAddition = (8 - 9 * performanceRating) * percentOverdue / 17
    const difficulty = this.limitNumber(vocabulary.difficulty + difficultyAddition, 0, 1)
    const difficultyWeight = 3 - 1.7 * difficulty
    let intervalTime: number
    if (performanceRating <= CORRECT) {
      intervalTime = Math.min(Math.round(1 / difficultyWeight / difficultyWeight), 1)
    } else {
      intervalTime = 1 + (difficultyWeight - 1) * percentOverdue
    }

    return {
      difficulty,
      intervalTime,
      percentOverdue,
    }
  }
}
