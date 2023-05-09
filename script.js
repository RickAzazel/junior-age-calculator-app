const form = document.getElementById('form');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const currentDate = new Date();
const inputDate = new Date(year.value, month.value - 1, day.value);

// Check if day from 1 to 31
day.addEventListener('input', e => {
	checkInput(day, 'Must be a valid day');
});

// Check if month from 1 to 12
month.addEventListener('input', e => {
	checkInput(month, 'Must be a valid month');
});

// Check if year is less than or equal to current year
year.addEventListener('input', e => {
	checkInput(year, 'Must be in the past');
});

// Check if inputs are valid, calculate age and show the result.
form.addEventListener('submit', e => {
	e.preventDefault();

	if (validateInputs()) {
		showResult(calculatedAge());
	}
});

/* 
 *  This method paints the boundaries of the given input in red 
 *  and displays the error text.
 * 
 *  @param element - given input.
 *  @param message - error text to display.
*/
const setErrorOnInput = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error-text');

	errorDisplay.innerText = message;
	inputControl.classList.add('error');
}

/* 
 *  This method restores the  border's native color on the
 *  given input and removes the error text.
 * 
 *  @param element - given input.
*/
const setSuccessOnInput = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error-text');

	errorDisplay.innerText = '';
	inputControl.classList.remove('error');
}

/* 
 *  This method paints the boundaries of all the inputs in red 
 *  and displays the error text.
 * 
 *  @param message - error text to display.
*/
const setErrorOnForm = (message) => {
	const errorDisplay = document.getElementById('form-error');
	errorDisplay.innerText = message;

	form.classList.add('error');
}

/* 
 *  This method restores the  border's native color of all
 *  the inputs and removes the error text.
*/
const setSuccessOnForm = () => {
	const errorDisplay = document.getElementById('form-error');
	errorDisplay.innerText = '';

	form.classList.remove('error');
}

/* 
 *  This method takes one of the elements from the given input 
 *  (day, month or year) and checks that the day is from 1 to 31, 
 *  the month is from 1 to 12 and the year must be no more than 
 *  or equal to the current one.
 *  
 *  @param element - given input.
*/
const isValidRecord = (element) => {
	const dayValue = day.value;
	const monthValue = month.value;
	const yearValue = year.value;
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	if (element === day) {
		return dayValue > 0 && dayValue < 32;
	}
	else if (element === month) {
		return monthValue > 0 && monthValue < 13;
	}
	else {
		return currentYear >= yearValue - 1;
	}
}

/* 
 *  This method checks if the input data is valid. 
 *  If it's not valid, then its borders are painted red 
 *  and an error text appears.
 *  
 *  @param element - given input.
 *  @param message - error message to display.
*/
const checkInput = (element, message) => {
	setSuccessOnForm();

	if (!isValidRecord(element)) {
		setErrorOnInput(element, message);
	}
	else {
		setSuccessOnInput(element);
	}
}

/* 
 *  This method checks if submitted is valid. 
 *  If it's not valid, then its borders are painted red, 
 *  an error text appears and the method returns false.
 *  Othewise the method returns true.
 *  
 *  @return - true or false, depends on valid data or not.
*/
const validateInputs = () => {
	const dayValue = parseInt(day.value);
	const monthValue = parseInt(month.value) - 1;
	const yearValue = parseInt(year.value);

	const inputDate = new Date(yearValue, monthValue, dayValue);
	const inputDay = inputDate.getDate();
	const inputMonth = inputDate.getMonth();
	const inputYear = inputDate.getFullYear();

	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	if (dayValue === '') {
		setErrorOnInput(day, 'This field is required');
	}
	else if (dayValue !== inputDay) {
		setSuccessOnInput(day);
		setErrorOnForm('Must be a valid date');
	}
	else {
		setSuccessOnInput(day);
		setSuccessOnForm();
	}

	if (monthValue === '') {
		setErrorOnInput(month, 'This field is required');
	}
	else if (monthValue !== inputMonth) {
		setSuccessOnInput(month);
		setErrorOnForm('Must be a valid date');
	}
	else {
		setSuccessOnInput(month);
		setSuccessOnForm();
	}

	if (yearValue === '') {
		setErrorOnInput(year, 'This field is required');
	}
	else if (yearValue !== inputYear) {
		setSuccessOnInput(year);
		setErrorOnForm('Must be a valid date');
	}
	else {
		setSuccessOnInput(year);
		setSuccessOnForm();
	}

	// compares the entered date with the current date
	if ((yearValue < currentYear) ||
		(yearValue === currentYear && monthValue < currentMonth) ||
		(yearValue === currentYear && monthValue === currentMonth && dayValue < currentDay)) {
		return true;
	}
	else {
		setErrorOnForm('Must be a valid date');
		return false;
	}
};

/* 
 *  This method counts the number of days, months, and years 
 *  and returns it all in an array.
 *  
 *  @return - the array with calculated days, months and years.
*/
const calculatedAge = () => {
	const currentDate = new Date()
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();
	const dayValue = parseInt(day.value);
	const monthValue = parseInt(month.value);
	const yearValue = parseInt(year.value);
	const daysInYear = {
		1: 31, 2: 28, 3: 31, 4: 30, 5: 31,
		6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
	};

	if (yearValue % 4 === 0) {
		daysInYear[2] = 29;
		console.log(daysInYear);
	}

	let calculatedYear = currentYear - yearValue;
	let calculatedMonth = currentMonth - monthValue;
	let calculatedDay = 0;

	if (monthValue > currentMonth) {
		calculatedYear -= 1;
		calculatedMonth = 12 + calculatedMonth;
	}

	if (dayValue !== currentDay && dayValue <= currentDay) {
		calculatedDay = currentDay - dayValue;
	}
	else if (dayValue !== currentDay && dayValue > currentDay) {
		const daysInGivenMonth = daysInYear[monthValue - 1];
		calculatedMonth -= 1;
		calculatedDay = daysInGivenMonth + (currentDay - dayValue);
	}
	return [calculatedDay, calculatedMonth, calculatedYear];
};

/* 
 *  This method takes an array with calculated days, months and 
 *  years and displays the data on the screen. 
 *  
 *  @param calculatedData - the array with calculated days, months and years.
*/
const showResult = (calculatedData) => {
	const displayDays = document.getElementById('record-number__days');
	const displayMonth = document.getElementById('record-number__months');
	const displayYears = document.getElementById('record-number__years');

	displayDays.innerText = calculatedData[0];
	displayMonth.innerText = calculatedData[1];
	displayYears.innerText = calculatedData[2];
}




