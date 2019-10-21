import { IVocabulary, Constants, TimeHelper } from '../global-refs'

const WORST = 0
const CORRECT = 0.6
const BEST = 1

export interface ISM2Output {
  difficulty: number
  intervalTime: number
  percentOverdue: number
  dueDate: Date
}

export class SM2 {
  static limitNumber (value: number, min: number, max: number) {
    if (value < min) return min
    if (value > max) return max
    return value
  }

  static getPercentOverdue (vocabulary: IVocabulary, now: Date) {
    // intervalTime is in seconds
    return Math.min((now.getTime() - vocabulary.lastReviewed.getTime()) / (vocabulary.intervalTime * 1000), 2)
  }

  static calculate (vocabulary: IVocabulary, performanceRating: number, now: Date): ISM2Output {
    const percentOverdue = this.getPercentOverdue(vocabulary, now)
    const difficultyAddition = (8 - 9 * performanceRating) * percentOverdue / 17
    const difficulty = this.limitNumber(vocabulary.difficulty + difficultyAddition, 0, 1)
    const difficultyWeight = 3 - 1.7 * difficulty
    const intervalTime = performanceRating >= CORRECT ?
      (1 + (difficultyWeight - 1) * percentOverdue) * Constants.ONE_DAY_IN_MILLISECOND :
      Math.max((1 / difficultyWeight / difficultyWeight), 1) * Constants.ONE_DAY_IN_MILLISECOND
    return {
      difficulty,
      intervalTime,
      percentOverdue,
      dueDate: TimeHelper.after(intervalTime, now),
    }
  }
}
