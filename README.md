# PathFinderVisualization

A dynamic and interactive visualization of pathfinding algorithms in a maze. This project lets users generate mazes, select start/end points, place walls manually or randomly, and see classic search algorithms in action.

---

##  Features

- **Multiple Pathfinding Algorithms**: Visualize how **Breadth‑First Search (BFS)** and **Depth‑First Search (DFS)** explore a grid. *(Easily extensible—see “Adding New Algorithms” below)*
- **Maze Customization**:
  - **Random maze generation** for quick pattern testing.
  - **Custom mode** for manually placing walls as well as selecting start and end points.
- **Animated Search Process**: Watch the algorithm flood through the grid, then highlight the final path if one exists.
- **User Interface Controls**:
  - Choose maze dimensions (width & height).
  - Pick the algorithm to visualize.
  - Adjust animation speed for smoother demos.
  - Reset or clear the current maze at any time.
  - Intuitive feedback when no path is found.
- **Visual Styling**: Utilizes Tailwind CSS classes for consistent and responsive cell coloring:
  - Walls (`bg‑gray‑500`)
  - Path traversal (`bg‑blue‑500`)
  - Start node (`bg‑green‑500`)
  - End node (`bg‑red‑500`)
  - Final shortest path (`bg‑amber‑300`)

---

##  Demo
live demo [link](https://rishikesh-kumar-7258.github.io/PathFinderVisualization/)

run the app locally. Here’s how:

```bash
git clone https://github.com/Rishikesh‑kumar‑7258/PathFinderVisualization.git
cd PathFinderVisualization
open index.html     # Or serve via a simple static server of your choice
