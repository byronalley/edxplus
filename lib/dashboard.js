const filters = {
  started: "Current",
  starts: "Upcoming",
  ended: "Ended",
  expired: "Expired",
};

const buttonClass = 'edxplus-button';
const courseClass = 'edxplus-course';
const buttonSelectedClass = 'edxplus-selected';

const getFilterClass = (courseStatus) => `edxplus-${courseStatus}`;

const setSelected = (e) => {
  e.classList.add(buttonSelectedClass);
}

const setUnselected = (e) => {
  e.classList.remove(buttonSelectedClass);
}

const hideCourses = (className) => {
  const elements = [...document.getElementsByClassName(className)];
  elements.forEach((e) => {
      e.style.display = 'none';
    });
}

const showCourses = (className) => {
  const elements = [...document.getElementsByClassName(className)];
  elements.forEach((e) => {
    e.style.display = "";
  });
}

const selectFilter = (targetButton, className) => {
  hideCourses(courseClass);
  [...document.getElementsByClassName(buttonClass)]
    .forEach((button) => {
      if (button.innerText === targetButton.innerText) {
        setSelected(button);
      } else {
        setUnselected(button);
      }
    });
  showCourses(className);
}

// Create one button in the filterUI button bar
const createFilterButton = (text, className) => {
  const button = document.createElement("a");
  button.classList.add(buttonClass);
  button.innerText = text;

  button.addEventListener("click", () => {
    selectFilter(button, className);
  });

  return button;
}

// Create the button bar for filtering course listings
const createFilterUI = (header) => {
  if (header === null) {
    return null;
  }

  // Remove current filterUI if it exists
  document.querySelectorAll('#edxplus-filter-ui').forEach((e) => e.remove());

  const filterUI = document.createElement("nav");
  filterUI.id = 'edxplus-filter-ui';

  const allButton = createFilterButton('All', courseClass);
  allButton.classList.add(buttonSelectedClass);
  filterUI.appendChild(allButton);

  Object.keys(filters).forEach((filter) => {
    const className = getFilterClass(filter);
    const button = createFilterButton(filters[filter], className);
    filterUI.appendChild(button);
  });
  header.appendChild(filterUI);
  return filterUI;
};

// Set up the helper CSS classes used to manipulate the course list
const addHelperClasses = () => {
  document.querySelectorAll(".course-item").forEach((courseItem) => {
    const block = courseItem.querySelector(".info-date-block");
    if (block !== null) {
      const text = block.innerText;
      
      const courseStatus = Object.keys(filters).find(
        (s) => text.toLowerCase().indexOf(s) > -1
      );

      if (typeof courseStatus === "string") {
        courseItem.classList.add(courseClass);
        const filterClass = getFilterClass(courseStatus);
        courseItem.classList.add(filterClass);
      }
    }
  });
};
