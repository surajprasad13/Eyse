import moment from 'moment';

export const getLimit = (date, limit) => {
  return moment(date).set({
    hour: limit,
    minutes: 0,
    seconds: 0,
  });
};

export const seperateSlot = (_slots, selected_date) => {
  const morning = [];
  const night = [];
  const afternoon = [];
  const evening = [];

  _slots.map(item => {
    const date = item.date?.[0]?.slot_start;
    if (moment(date).isSame(moment(selected_date), 'day')) {
      const morningStart = getLimit(date, 7);
      const morningEnd = getLimit(date, 12);
      const afternoonStart = getLimit(date, 12);
      const afternoonEnd = getLimit(date, 16);
      const eveningStart = getLimit(date, 16);
      const eveningEnd = getLimit(date, 20);
      const nightStart = getLimit(date, 20);
      const nightEnd = getLimit(date, 24);
      const isMorning = moment(date).isBetween(morningStart, morningEnd);
      const isAfternoon = moment(date).isBetween(afternoonStart, afternoonEnd);
      const isEvening = moment(date).isBetween(eveningStart, eveningEnd);
      const isNight = moment(date).isBetween(nightStart, nightEnd);
      if (isMorning) morning.push(item);
      else if (isAfternoon) afternoon.push(item);
      else if (isEvening) evening.push(item);
      else if (isNight) night.push(item);
    }
  });
  return {morning, night, evening, afternoon};
};
