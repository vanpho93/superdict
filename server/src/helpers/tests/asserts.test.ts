import { doesNotThrow, throws } from 'assert'
import { makeSure, mustExist, mustMatchReg, ServerError } from '../asserts'

const TEST_TITLE = 'Helpers#AssetFunctions'

describe(TEST_TITLE, () => {
  it(`${TEST_TITLE} - Asset functions run well`, () => {
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    doesNotThrow(() => {
      const doNothing = (_: unknown) => _
      makeSure(1 === 1)
      mustExist({})
      mustMatchReg('ThisIsValid93!', PASSWORD_REGEX)
      doNothing(new ServerError('INVALID_SOMETHING'))
    })
    throws(() => makeSure(1 > 2))
    throws(() => mustExist(null))
    throws(() => mustMatchReg('INVALIDPASSWORD', PASSWORD_REGEX))
  })
})
