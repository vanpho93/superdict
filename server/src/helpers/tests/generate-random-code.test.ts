import { equal, throws } from 'assert'
import { generateRandomCode } from '../utility'

const TEST_TITLE = 'Helpers#generateRandomCode'

describe(TEST_TITLE, () => {
  it(`${TEST_TITLE} - Can generate random code`, () => {
    const code1 = generateRandomCode(31)
    equal(code1.length, 31)
    const code2 = generateRandomCode(30)
    equal(code2.length, 30)
    const code3 = generateRandomCode(10)
    equal(code3.length, 10)
  })

  it(`${TEST_TITLE} - Throw error when length is invalid`, () => {
    throws(() => generateRandomCode(NaN))
    throws(() => generateRandomCode(-1))
    throws(() => generateRandomCode(0))
  })
})
