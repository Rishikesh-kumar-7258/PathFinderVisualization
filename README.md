# PathFinderVisualization

A dynamic and interactive visualization of pathfinding algorithms in a maze. This project lets users generate mazes, select start/end points, place walls manually or randomly, and see classic search algorithms in action.

---

## Features

-   **Multiple Pathfinding Algorithms**: Visualize how **Breadth‑First Search (BFS)** and **Depth‑First Search (DFS)** explore a grid. _(Easily extensible—see “Adding New Algorithms” below)_
-   **Maze Customization**:
    -   **Random maze generation** for quick pattern testing.
    -   **Custom mode** for manually placing walls as well as selecting start and end points.
-   **Animated Search Process**: Watch the algorithm flood through the grid, then highlight the final path if one exists.
-   **User Interface Controls**:
    -   Choose maze dimensions (width & height).
    -   Pick the algorithm to visualize.
    -   Adjust animation speed for smoother demos.
    -   Reset or clear the current maze at any time.
    -   Intuitive feedback when no path is found.
-   **Visual Styling**: Utilizes Tailwind CSS classes for consistent and responsive cell coloring:
    -   Walls (`bg‑gray‑500`)
    -   Path traversal (`bg‑blue‑500`)
    -   Start node (`bg‑green‑500`)
    -   End node (`bg‑red‑500`)
    -   Final shortest path (`bg‑amber‑300`)

---

## Demo

While a live demo isn't included here, you can run the app locally. Here’s how:

```bash
git clone https://github.com/Rishikesh‑kumar‑7258/PathFinderVisualization.git
cd PathFinderVisualization
open index.html     # Or serve via a simple static server of your choice
```

Once open, you can:

1. Adjust the maze size.
2. Toggle between **Random** or **Custom** maze creation.
3. Select **BFS** or **DFS** from the algorithm dropdown.
4. Hit **Start** and enjoy the visualization!

---

## File Structure

```
PathFinderVisualization/
├── index.html
├── tailwind.config.js
├── README.md
└── src/
    └── [JavaScript files for maze logic, algorithms, and UI]
```

---

## How It Works

1. **Grid Creation**: The maze is represented as a grid of div elements—styled and controlled via CSS Grid.
2. **Cell Management**: JavaScript maintains cell states (empty, wall, start, end) and updates the UI accordingly.
3. **Algorithms**:

    - **BFS**: Explores level by level, ensuring the shortest path in unweighted grids.
    - **DFS**: Goes deep first—useful for exploration, but doesn’t guarantee shortest paths.

4. **Animation Loop**: A timed loop iterates over the discovered path, visualizing exploration and eventually highlighting the final route or showing a “no path” alert.

---

## Extending with More Algorithms

To add algorithms like A\* or Dijkstra:

1. Create a new class, e.g., `class AStar extends SearchTemplate { ... }`, implementing your algorithm's logic in the `searchPath()` method.

2. Add it to your `ALGORITHMS` map:

    ```js
    const ALGORITHMS = {
    	BFS: BFS,
    	DFS: DFS,
    	AStar: AStar, // newly added
    	Dijkstra: Dijkstra, // optional
    };
    ```

3. Use the built‑in visualization flow—your algorithm will automatically animate just like BFS and DFS.

---

## Customization Tips

-   **Animation Speed**: Adjust the cell highlighting pace with the slider control.
-   **Maze Generation Probability**: Modify the “wall scatter” randomness (currently \~10%) to create different obstacle densities.
-   **Grid Size**: Larger grids slow down animations but allow more complex demonstrations—and are perfect for educational purposes!

---

## Dependencies

-   **Tailwind CSS** for styling.
-   Plain **JavaScript (ES6+)**—no frameworks needed.

---

## Future Ideas

-   **Add Diagonal Movement** — let algorithms move in 8 directions.
-   **Weighted Costs & Visuals** — show A\* exploration with open/closed set overlays.
-   **Maze Generation Algorithms** — try implementing Prim’s or Recursive Division maze generation.
-   **User Controls** — add buttons to pause, step forward/backwards, or reset animations.

---

## License & Contributions

Feel free to fork, experiment, and contribute! This project is MIT‑licensed, so you're welcome to modify and distribute it. If you enhance the visualizer or add algorithm demonstrations, please consider submitting a Pull Request.

---

## Contact

Created by **Rishikesh Kumar**. Have feedback or ideas? Reach out via GitHub!

---

**Enjoy exploring pathfinding algorithms—one step at a time!**
