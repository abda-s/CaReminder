// helpers/recurrence.js
const moment = require('moment');

function generateOccurrences(event, startDate, endDate) {
  const occurrences = [];
  const recurrenceDays = event.recurrencePattern.split(','); // ['Sun', 'Mon']

  let current = moment(startDate);
  const end = moment(endDate);

  while (current.isBefore(end) || current.isSame(end)) {
    if (recurrenceDays.includes(current.format('ddd'))) {
      Object.keys(event.schule).forEach(time => {
        occurrences.push({
          date: current.format('YYYY-MM-DD'),
          time: time,
          pills: event.schule[time],
          eventId: event.id,
        });
      });
    }
    current.add(1, 'days');
  }

  return occurrences;
}

module.exports = { generateOccurrences };
