// Define the number of weeks in the schedule
const numWeeks = 6;

// Define the days of the week
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to generate a schedule for a given number of weeks
function generateSchedule(weeks) {
  // Initial set of bunks for each day
  let bunks = [3, 4, 5, 6, 7, 8];
  // Array to store the complete schedule
  let schedule = [];

  // Loop through each week
  for (let i = 0; i < weeks; i++) {
    // Array to store bunks for each day in a week
    let week = [];
    // Populate the week array with bunks for each day
    for (let j = 0; j < days.length; j++) {
      week.push(bunks[j]);
    }
    // Add the week to the schedule
    schedule.push(week);
    // Rotate the bunks for the next week
    bunks.push(bunks.shift());
  }

  // Return the generated schedule
  return schedule;
}

// Generate the schedule for the specified number of weeks
const schedule = generateSchedule(numWeeks);

// Select the container, weeks container, and days container from the HTML
const container = document.querySelector(".schedule");
const weeksContainer = container.querySelector(".weeks");
const daysContainer = container.querySelector(".days");

// Populate the weeks container with week numbers
for (let i = 0; i < numWeeks; i++) {
  const weekNumberDiv = document.createElement("div");
  weekNumberDiv.classList.add("week-number");
  // Display the week number in the leftmost column
  weekNumberDiv.textContent = i + 1;
  weeksContainer.appendChild(weekNumberDiv);
}

// Populate the days container with the schedule
for (let i = 0; i < days.length; i++) {
  // Create a div for each day
  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day");

  // Add day label to the day div
  const dayLabel = document.createElement("div");
  dayLabel.classList.add("day-label");
  dayLabel.textContent = days[i];
  dayDiv.appendChild(dayLabel);

  // Add bunks for each week to the day div
  const bunksDiv = document.createElement("div");
  bunksDiv.classList.add("bunks");
  for (let j = 0; j < numWeeks; j++) {
    const bunkDiv = document.createElement("div");
    bunkDiv.classList.add("bunk");
    // Display the bunk number for each day and week
    bunkDiv.textContent = `Bunk ${schedule[j][i]}`;
    bunksDiv.appendChild(bunkDiv);
  }

  // Append the bunks div to the day div
  dayDiv.appendChild(bunksDiv);

  // Append the day div to the days container
  daysContainer.appendChild(dayDiv);
}

// Function to highlight the current active bunk
const highlightCurrentBunk = () => {
  // Get the current date
  const today = new Date();
  // Get the index of the current day (0 is Sunday, 1 is Monday, and so on)
  const currentDayIndex = today.getDay();
  // Calculate the index of yesterday
  const yesterdayIndex = (currentDayIndex - 1 + days.length) % days.length;

  // Remove 'highlight' class from all bunks
  const allBunks = container.querySelectorAll(".bunk");
  allBunks.forEach((bunk) => bunk.classList.remove("highlight"));

  // Highlight the bunk of yesterday
  const yesterdayBunk = container.querySelector(
    ".day:nth-child(" + (yesterdayIndex + 1) + ") .bunk"
  );
  yesterdayBunk.classList.add("highlight");
};

// Example: Highlight the active bunk for yesterday
highlightCurrentBunk();
