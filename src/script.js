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
const clearBtn = document.getElementById("clear-btn");
const noPathBox = document.getElementById("no-path-box");
const noPathCross = document.getElementById("no-path-cross");

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

class BFS extends SearchTemplate {
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

class DFS extends SearchTemplate {
	constructor(maze, start, end) {
		super(maze, start, end);
	}

	searchPath() {
		const visited = Array.from({ length: this.rows }, () =>
			Array.from({ length: this.columns }, () => {
				return false;
			})
		);

		const stack = [new Node(this.start[0], this.start[1])];
		const path = [];

		while (stack.length) {
			const current = stack.pop();
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

			const neighbors = [
				[i - 1, j],
				[i + 1, j],
				[i, j - 1],
				[i, j + 1],
			];

			for (const [ni, nj] of neighbors) {
				stack.push(new Node(ni, nj, current));
			}
		}

		return path;
	}
}

class AStar extends SearchTemplate {
	constructor(maze, start, end) {
		super(maze, start, end);
	}

	heuristic(a, b) {
		// Manhattan distance
		return Math.abs(a.i - b[0]) + Math.abs(a.j - b[1]);
	}

	searchPath() {
		const visited = Array.from({ length: this.rows }, () =>
			Array(this.columns).fill(false)
		);

		const openSet = [new Node(this.start[0], this.start[1])];
		const gScore = Array.from({ length: this.rows }, () =>
			Array(this.columns).fill(Infinity)
		);
		gScore[this.start[0]][this.start[1]] = 0;

		const fScore = Array.from({ length: this.rows }, () =>
			Array(this.columns).fill(Infinity)
		);
		fScore[this.start[0]][this.start[1]] = this.heuristic(
			new Node(this.start[0], this.start[1]),
			this.end
		);

		while (openSet.length > 0) {
			// Get node with lowest fScore
			openSet.sort(
				(a, b) =>
					fScore[a.i][a.j] - fScore[b.i][b.j]
			);
			const current = openSet.shift();
			const { i, j } = current;

			if (i === this.end[0] && j === this.end[1]) {
				// Reached the end
				const path = [];
				let node = current;
				while (node) {
					path.unshift(node);
					node = node.parent;
				}
				return path;
			}

			visited[i][j] = true;

			const neighbors = [
				[i - 1, j],
				[i + 1, j],
				[i, j - 1],
				[i, j + 1],
			];

			for (const [ni, nj] of neighbors) {
				if (
					ni < 0 ||
					ni >= this.rows ||
					nj < 0 ||
					nj >= this.columns ||
					visited[ni][nj] ||
					this.maze[ni][nj] === 1
				) {
					continue;
				}

				const tentativeG = gScore[i][j] + 1;

				if (tentativeG < gScore[ni][nj]) {
					gScore[ni][nj] = tentativeG;
					fScore[ni][nj] =
						tentativeG +
						this.heuristic(new Node(ni, nj), this.end);
					openSet.push(new Node(ni, nj, current));
				}
			}
		}

		return [];
	}
}

class Dijkstra extends SearchTemplate {
	constructor(maze, start, end) {
		super(maze, start, end);
	}

	searchPath() {
		const visited = Array.from({ length: this.rows }, () =>
			Array(this.columns).fill(false)
		);
		const distance = Array.from({ length: this.rows }, () =>
			Array(this.columns).fill(Infinity)
		);

		distance[this.start[0]][this.start[1]] = 0;
		const queue = [new Node(this.start[0], this.start[1])];

		while (queue.length) {
			queue.sort(
				(a, b) =>
					distance[a.i][a.j] - distance[b.i][b.j]
			);
			const current = queue.shift();
			const { i, j } = current;

			if (i === this.end[0] && j === this.end[1]) {
				const path = [];
				let node = current;
				while (node) {
					path.unshift(node);
					node = node.parent;
				}
				return path;
			}

			if (visited[i][j]) continue;
			visited[i][j] = true;

			const neighbors = [
				[i - 1, j],
				[i + 1, j],
				[i, j - 1],
				[i, j + 1],
			];

			for (const [ni, nj] of neighbors) {
				if (
					ni < 0 ||
					ni >= this.rows ||
					nj < 0 ||
					nj >= this.columns ||
					visited[ni][nj] ||
					this.maze[ni][nj] === 1
				) {
					continue;
				}

				const alt = distance[i][j] + 1;
				if (alt < distance[ni][nj]) {
					distance[ni][nj] = alt;
					queue.push(new Node(ni, nj, current));
				}
			}
		}

		return [];
	}
}


// ############ VARIABLES ############

var MAZE = [];
var START = null;
var END = null;
var WALLS = [];
var PATH = [];
var pathIndex = 0;
var customSetting = false;
var foundPath = false;

// ############ CONSTANTS ############

const ALGORITHMS = {
	BFS: BFS,
	DFS: DFS,
	AStar: AStar,
	Dijkstra: Dijkstra,
};

const PATH_COLOR = "bg-blue-500";
const WALL_COLOR = "bg-gray-500";
const START_COLOR = "bg-green-500";
const END_COLOR = "bg-red-500";
const OPTIMAL_PATH_COLOR = "bg-amber-300";

// ############ FUNCTIONS ############

// function to fill options in a select element
const fillSelectOptions = (selectElement, options) => {
	for (const option in options) {
		const optionElement = document.createElement("option");
		optionElement.value = option;
		optionElement.textContent = option;
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
	for (let i = 0; i < MAZE.length; i++) {
		for (let j = 0; j < MAZE[0].length; j++) {
			if (Math.random() < 0.1) {
				const cell = document.getElementById(`cell-${i}-${j}`);
				cell.classList.add(WALL_COLOR);
				WALLS.push(cell);
			}
		}
	}

	while (WALLS.includes(START) || WALLS.includes(END) || START === END) {
		if (START) {
			START.classList.remove(START_COLOR);
		}

		if (END) {
			END.classList.remove(END_COLOR);
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

		START.classList.add(START_COLOR);
		END.classList.add(END_COLOR);
	}
};

// function to refresh the maze
const refreshMaze = () => {
	for (const cell of document.querySelectorAll(".cell")) {
		cell.classList.remove(
			WALL_COLOR,
			START_COLOR,
			END_COLOR,
			OPTIMAL_PATH_COLOR
		);
	}

	noPathBox.classList.add("hidden");

	WALLS = [];
	START = null;
	END = null;
	pathIndex = 0;
	PATH = [];
};
refreshMaze();
createRandomMaze();

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
			START.classList.remove(START_COLOR);
		}
		START = e.target;
		START.classList.add(START_COLOR);
	} else if (cellType[1].checked) {
		if (END) {
			END.classList.remove(END_COLOR);
		}
		END = e.target;
		END.classList.add(END_COLOR);
	} else if (cellType[2].checked) {
		if (WALLS.includes(e.target)) {
			WALLS = WALLS.filter((wall) => wall !== e.target);
			e.target.classList.remove(WALL_COLOR);
			return;
		}
		WALLS.push(e.target);
		e.target.classList.add(WALL_COLOR);
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

	const searchAlgo = new ALGORITHMS[algorithmSelect.value](maze, start, end);
	const path = searchAlgo.searchPath();

	if (
		path[path.length - 1].i !== end[0] ||
		path[path.length - 1].j !== end[1]
	) {
		foundPath = false;
	} else {
		foundPath = true;
	}

	PATH = path;
	pathIndex = 0;
});

// random button
randomBtn.addEventListener("click", () => {
	refreshMaze();
	createRandomMaze();
});

// custom button
customBtn.addEventListener("click", () => {
	startStopWallsDiv.classList.toggle("hidden");
	customSetting = !customSetting;
});

// clear button
clearBtn.addEventListener("click", () => {
	refreshMaze();
});

// no path cross
noPathCross.addEventListener("click", () => {
	noPathBox.classList.add("hidden");
});

// algorithm select
algorithmSelect.addEventListener("change", () => {
	for (const pth of PATH) {
		const cell = document.getElementById(`cell-${pth.i}-${pth.j}`);
		cell.classList.remove(OPTIMAL_PATH_COLOR);
	}

	PATH = [];
});

// ############### MAIN LOOP ###############

var interval = setInterval(() => {
	if (PATH.length === 0) {
		return;
	}
	if (pathIndex >= PATH.length) {
		for (const pth of PATH) {
			const cell = document.getElementById(`cell-${pth.i}-${pth.j}`);
			cell.classList.remove("bg-blue-500");
		}

		if (!foundPath) {
			noPathBox.classList.remove("hidden");
			PATH = [];
			return;
		}

		var last = PATH[PATH.length - 1];
		while (last) {
			const cell = document.getElementById(`cell-${last.i}-${last.j}`);
			if (cell !== START && cell !== END) {
				cell.classList.add("bg-amber-300");
			}

			last = last.parent;
		}

		return;
	}

	const current = PATH[pathIndex];
	const cell = document.getElementById(`cell-${current.i}-${current.j}`);
	cell.classList.add("bg-blue-500");
	pathIndex++;
}, 1000 / parseInt(speed.value));
