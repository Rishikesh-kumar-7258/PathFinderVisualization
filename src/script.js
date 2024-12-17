// ############# DOM ELEMENTS #############
const settingsIcon = document.getElementById("settings-icon");
const settingsBox = document.getElementById("settings-box");
const algorithmSelect = document.getElementById("algorithm-select");

// ############ VARIABLES ############
const ALGORITHMS = {
	dijkstra: "Dijkstra's Algorithm",
};

// ############ FUNCTIONS ############

// function to fill options in a select element
const fillSelectOptions = (selectElement, options) => {
	for (const option in options) {
		const optionElement = document.createElement("option");
		optionElement.value = option;
		optionElement.textContent = options[option];
		selectElement.appendChild(optionElement);
	}
};
fillSelectOptions(algorithmSelect, ALGORITHMS);

// ############### EVENT LISTENERS ###############
settingsIcon.addEventListener("click", () => {
	settingsIcon.classList.toggle("rotate-90");
	settingsBox.classList.toggle("hidden");
});
