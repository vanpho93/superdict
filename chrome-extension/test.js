const MAXIMUM_TIPSTER_COUNT = 300

const output = []

for (let index = 1; index < MAXIMUM_TIPSTER_COUNT; index++) {
  try {
    const tr = $('.altrow tr')[index]
    const no = processNo($(tr).find('td').eq(0).text().split('\n')[1])
    const name = $(tr).find('font').eq(2).text().trim()

    // get id
    const link = $(tr).find('a').eq(0).attr('href')
    const fromIndex = link.lastIndexOf('=')
    const tipsterId = link.substring(fromIndex + 1)

    const winCount = Number($(tr).find('td').eq(2).text().trim())
    const drawCount = Number($(tr).find('td').eq(3).text().trim())
    const loseCount = Number($(tr).find('td').eq(4).text().trim())

    const winRate = $(tr).find('td').eq(5).text().trim()
    const bigBetWinRate = $(tr).find('td').eq(6).text().trim()
    const yield = $(tr).find('td').eq(7).text().trim()
    const balance = $(tr).find('td').eq(10).text().trim()

    const tipster = {
      tipsterId: Number(tipsterId),
      no,
      name,
      balance: Number(removeComma(balance)),
      winCount,
      drawCount,
      loseCount,

      winRate: processRate(winRate),
      bigBetWinRate: processRate(bigBetWinRate),
      yield: processRate(yield),
      balance: processBalance(balance),
    }
    output.push(tipster)
  } catch (error) {
    console.log('Cannot read')
  }
}

function removeComma(str) {
  while(str.includes(',')) str = str.replace(',', '');
  return str
}

function processRate(rate) {
  return parseFloat(rate) / 100
}

function processBalance(balance) {
  return removeComma(balance.substring(4).trim())
}

function processNo(no) {
  const dotIndex = no.indexOf('.')
  return Number(no.substring(0, dotIndex))
}
