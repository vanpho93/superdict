import { IApiRoute } from '../metadata'
// accounts
import { loginRoute } from '../models/user/login/route'
import { checkTokenRoute } from '../models/user/check-token/route'
// vocabularies
import { getVocabulariesRoute } from '../models/vocabulary/get-vocabulary/route'
import { createVocabularysRoute } from '../models/vocabulary/create-vocabulary/route'
import { assignLessonRoute } from '../models/vocabulary/assign-lesson/route'
// exam
import { submitExamResultRoute } from '../models/exam/submit-exam-result/route'
// lesson
import { getLessonsRoute } from '../models/lesson/get-lessons/route'
import { createLessonRoute } from '../models/lesson/create-lesson/route'
import { route as getGamesRoute } from '../models/game/route'

// tslint:disable-next-line: no-any
export const routes: IApiRoute<any>[] = [
  // user routes
  loginRoute,
  checkTokenRoute,
  // vocabulary
  getVocabulariesRoute,
  createVocabularysRoute,
  submitExamResultRoute,
  assignLessonRoute,
  // lesson
  getLessonsRoute,
  createLessonRoute,
  // games
  getGamesRoute,
]
