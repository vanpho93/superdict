const WORST = 0;
const CORRECT = 0.6;
const BEST = 1;

const limitNumber = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const getPercentOverdue = (word, today) => {
  return Math.min((today - word.update) / word.interval, 2)
};

const calculate = (word, performanceRating, today) => {
  const percentOverDue = getPercentOverdue(word, today);

  const difficulty = limitNumber(word.difficulty + (8 - 9 * performanceRating) * percentOverDue / 17, 0, 1);
  const difficultyWeight = 3 - 1.7 * difficulty;
  let interval;
  if (performanceRating < CORRECT) {
    interval = Math.round(1 / difficultyWeight / difficultyWeight) || 1;
  } else {
    interval = 1 + Math.round((difficultyWeight - 1) * percentOverDue);
    console.log({ difficulty, difficultyWeight, interval, percentOverDue })
  }

  return {
    difficulty,
    interval,
    dueDate: today + interval,
    update: today,
    word: word.word,
  };
};

const TODAY = 1000000;

const initialRecord = {
  interval: 1,
  dueDate: TODAY,
  update: TODAY - 1,
};

const simulate = (difficulty, thrashHold) => {
  let record = {
    ...initialRecord,
    difficulty,
    dueDate: TODAY,
    update: TODAY - 1,
  };
  let index = 1;
  let day;
  while (record.difficulty >= thrashHold) {
    day = record.dueDate - TODAY;
    console.info(`day: ${day} index: ${index} difficulty:${record.difficulty}`);
    record = calculate(record, BEST, record.dueDate);
    index += 1;
  }

  console.info(`day: ${day} index: ${index} difficulty:${record.difficulty}`);
};

module.exports = {
  simulate,
  calculate,
  getPercentOverdue,
  WORST,
  CORRECT,
  BEST,
};

simulate(0.3, 0.1)
