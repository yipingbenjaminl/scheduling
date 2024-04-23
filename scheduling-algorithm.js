// scheduling-algorithm.js

function scheduleWeek(people, option) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schedule = {};

  // Initialize each day with an empty array
  days.forEach(day => {
    schedule[day] = [];
  });

  // Shuffle the people array
  const shuffledPeople = people.slice().sort(() => Math.random() - 0.5);

  let currentIndex = 0;

  // Assign people to weekdays in a round-robin fashion
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < Math.ceil(people.length / 5); j++) {
      const person = shuffledPeople[currentIndex];
      schedule[days[i]].push(person);
      currentIndex = (currentIndex + 1) % people.length;
    }
  }

  // Assign people to weekends based on the option
  if (option === 1) {
    // Option 1: Everyone gets the same number of weekend shifts, but ensure at least one person per weekend day
    const weekendShifts = Math.max(2, Math.floor(2 * people.length / 7));
    let weekendIndex = 0;

    for (let i = 5; i < 7; i++) {
      for (let j = 0; j < weekendShifts; j++) {
        const person = shuffledPeople[weekendIndex];
        schedule[days[i]].push(person);
        weekendIndex = (weekendIndex + 1) % people.length;
      }
    }
  } else if (option === 2) {
    // Option 2: People with weekend shifts get fewer overall shifts
    const weekendShifts = Math.ceil(2 * people.length / 7);
    const weekendPeople = shuffledPeople.slice(0, weekendShifts);
    const weekdayPeople = shuffledPeople.slice(weekendShifts);

    for (let i = 5; i < 7; i++) {
      schedule[days[i]] = weekendPeople;
    }

    let currentWeekdayIndex = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < weekdayPeople.length; j++) {
        const person = weekdayPeople[currentWeekdayIndex];
        schedule[days[i]].push(person);
        currentWeekdayIndex = (currentWeekdayIndex + 1) % weekdayPeople.length;
      }
    }
  }

  return schedule;
}

// Expose the scheduleWeek function to the global scope
window.scheduleWeek = scheduleWeek;