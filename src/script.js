// ############# DOM ELEMENTS #############
const settingsIcon = document.getElementById("settings-icon");
const settingsBox = document.getElementById("settings-box");
const algorithmSelect = document.getElementById("algorithm-select");
const mazeBox = document.getElementById("maze-box");
const mWidth = document.getElementById("mWidth");
const mHeight = document.getElementById("mHeight");
const cellType = document.querySelectorAll('input[name="cell-type"]');
const startBtn = document.getElementById("start-btn");
const speed = document.getElementById("speed");
const randomBtn = document.getElementById("random-btn");
const customBtn = document.getElementById("custom-btn");
const startStopWallsDiv = document.getElementById("start-stop-walls");

// ############ VARIABLES ############
const ALGORITHMS = {
	dijkstra: "Dijkstra's Algorithm",
};

var MAZE = [];
var START = null;
var END = null;
var WALLS = [];
var PATH = [];
var pathIndex = 0;
var customSetting = false;

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

// function to create the maze
const createMaze = (rows, columns) => {
	// clear the maze
	mazeBox.innerHTML = "";

	// create the maze
	mazeBox.classList.add("grid");
	mazeBox.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
	mazeBox.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

	// create the cells
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			const cell = document.createElement("div");
			cell.classList.add("cell", "border", "border-blue-800");
			cell.id = `cell-${i}-${j}`;
			mazeBox.appendChild(cell);
		}
	}

	// store the maze
	MAZE = Array.from({ length: rows }, () =>
		Array.from({ length: columns }, () => 0)
	);
};
createMaze(parseInt(mWidth.value), parseInt(mHeight.value));

// function to create random maze
const createRandomMaze = () => {
	if (WALLS.length) {
		for (const wall of WALLS) {
			wall.classList.remove("bg-gray-500");
		}
		WALLS = [];
	}

	for (let i = 0; i < MAZE.length; i++) {
		for (let j = 0; j < MAZE[0].length; j++) {
			if (Math.random() < 0.3) {
				const cell = document.getElementById(`cell-${i}-${j}`);
				cell.classList.add("bg-gray-500");
				WALLS.push(cell);
			}
		}
	}

	while (WALLS.includes(START) || WALLS.includes(END) || START === END) {
		if (START) {
			START.classList.remove("bg-green-500");
		}

		if (END) {
			END.classList.remove("bg-red-500");
		}

		START = document.getElementById(
			`cell-${Math.floor(Math.random() * MAZE.length)}-${Math.floor(
				Math.random() * MAZE[0].length
			)}`
		);

		END = document.getElementById(
			`cell-${Math.floor(Math.random() * MAZE.length)}-${Math.floor(
				Math.random() * MAZE[0].length
			)}`
		);

		START.classList.add("bg-green-500");
		END.classList.add("bg-red-500");
	}
};

// function to refresh the maze
const refreshMaze = () => {
	for (const cell of document.querySelectorAll(".cell")) {
		cell.classList.remove(
			"bg-gray-500",
			"bg-green-500",
			"bg-red-500",
			"bg-amber-300"
		);
	}

	WALLS = [];
	START = null;
	END = null;
	pathIndex = 0;
	PATH = [];
	createRandomMaze();
};
refreshMaze();

// ############### EVENT LISTENERS ###############
// settings
settingsIcon.addEventListener("click", () => {
	settingsIcon.classList.toggle("rotate-90");
	settingsBox.classList.toggle("hidden");
});

// maze width
mWidth.addEventListener("change", () => {
	createMaze(parseInt(mWidth.value), parseInt(mHeight.value));
});

// maze height
mHeight.addEventListener("change", () => {
	createMaze(parseInt(mWidth.value), parseInt(mHeight.value));
});

// change cell type
document.addEventListener("mousedown", (e) => {
	if (!e.target.classList.contains("cell") || !customSetting) {
		return;
	}

	if (cellType[0].checked) {
		if (START) {
			START.classList.remove("bg-green-500");
		}
		START = e.target;
		START.classList.add("bg-green-500");
	} else if (cellType[1].checked) {
		if (END) {
			END.classList.remove("bg-red-500");
		}
		END = e.target;
		END.classList.add("bg-red-500");
	} else if (cellType[2].checked) {
		if (WALLS.includes(e.target)) {
			WALLS = WALLS.filter((wall) => wall !== e.target);
			e.target.classList.remove("bg-gray-500");
			return;
		}
		WALLS.push(e.target);
		e.target.classList.add("bg-gray-500");
	}
});

// start button
startBtn.addEventListener("click", () => {
	settingsBox.classList.add("hidden");

	const start = START.id
		.split("-")
		.slice(1)
		.map((x) => parseInt(x));
	const end = END.id
		.split("-")
		.slice(1)
		.map((x) => parseInt(x));
	const maze = MAZE.map((row) => row.map((cell) => (cell === 0 ? 0 : 1)));

	for (const wall of WALLS) {
		const [i, j] = wall.id
			.split("-")
			.slice(1)
			.map((x) => parseInt(x));
		maze[i][j] = 1;
	}

	const dijkstra = new Dijkstra(maze, start, end);
	const path = dijkstra.searchPath();
	const optimalPath = [];

	let current = path[path.length - 1];
	while (current) {
		optimalPath.unshift(current);
		current = current.parent;
	}

	PATH = path;
	pathIndex = 0;
});

// speed button
speed.addEventListener("change", () => {
	interval = setInterval(() => {
		var interval = setInterval(() => {
			if (pathIndex >= PATH.length) {
				clearInterval(interval);
				return;
			}

			const current = PATH[pathIndex];
			const cell = document.getElementById(
				`cell-${current.i}-${current.j}`
			);
			cell.classList.add("bg-blue-500");
			pathIndex++;
		}, 1000 / parseInt(speed.value));
	}, 1000 / parseInt(speed.value));
});

// random button
randomBtn.addEventListener("click", () => {
	refreshMaze();
});

// custom button
customBtn.addEventListener("click", () => {
	startStopWallsDiv.classList.toggle("hidden");
	customSetting = !customSetting;
});

var interval = setInterval(() => {
	if (PATH.length === 0) {
		return;
	}
	if (pathIndex >= PATH.length) {
		for (const pth of PATH) {
			const cell = document.getElementById(`cell-${pth.i}-${pth.j}`);
			cell.classList.remove("bg-blue-500");
		}

		var last = PATH[PATH.length - 1];
		while (last) {
			const cell = document.getElementById(`cell-${last.i}-${last.j}`);
			if (cell !== START && cell !== END) {
				cell.classList.add("bg-amber-300");
			}

			last = last.parent;
		}

		clearInterval(interval);

		return;
	}

	const current = PATH[pathIndex];
	const cell = document.getElementById(`cell-${current.i}-${current.j}`);
	cell.classList.add("bg-blue-500");
	pathIndex++;
}, 1000 / parseInt(speed.value));

// ############### MAIN ###############
class Node {
	constructor(i, j, parent = null) {
		this.i = i;
		this.j = j;
		this.parent = parent;
	}
}

class SearchTemplate {
	constructor(maze, start, end) {
		this.maze = maze;
		this.start = start;
		this.end = end;
		this.rows = maze.length;
		this.columns = maze[0].length;
	}

	searchPath() {}
}

class Dijkstra extends SearchTemplate {
	constructor(maze, start, end) {
		super(maze, start, end);
	}

	searchPath() {
		const visited = Array.from({ length: this.rows }, () =>
			Array.from({ length: this.columns }, () => false)
		);
		const queue = [new Node(this.start[0], this.start[1])];
		const path = [];

		while (queue.length) {
			const current = queue.shift();
			const i = current.i;
			const j = current.j;

			if (
				i < 0 ||
				i >= this.rows ||
				j < 0 ||
				j >= this.columns ||
				visited[i][j] ||
				this.maze[i][j] === 1
			) {
				continue;
			}

			visited[i][j] = true;
			path.push(current);

			if (i === this.end[0] && j === this.end[1]) {
				break;
			}

			queue.push(new Node(i - 1, j, current));
			queue.push(new Node(i + 1, j, current));
			queue.push(new Node(i, j - 1, current));
			queue.push(new Node(i, j + 1, current));
		}

		return path;
	}
}
