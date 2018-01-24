## Spear Stickman with Variations

### Background

Spear Stickman is an interactive, time-sensitive, physics game, that increases with difficulty the further in the game you progress.  The concept for this game comes from the classic stickman-archer game, where the goal is to shoot an apple off of the dummy's head without hitting the dummy.  In this variation, the player's stickman (placed on the left side) throws spears at enemies (that spawn on the right side) of the game's field. The player shoots spears at the AI enemies, which in turn is/are throwing spears at the player.  A player can kill the AI by hitting the AI in the head (1 shot kill) or by hitting the AI in the body (3 shot kill).  As the player takes down more enemies, enemies will be able to shoot faster and spawn in multiples to increase difficulty.  

### Functionality & MVP

In this game, users will be able to:

- [ ] Start, pause, and reset game, as well as disable sound.
- [ ] Click and pull mouse to initiate the throwing of a spear with velocity and direction.
- [ ] Be able to kill enemies with 1 head-shot or 3 body-shots
- [ ] Have enemies spawn at different heights with better AI as levels progress
- [ ] Keep track of score with levels completed, spears thrown, best score, etc..
- [ ] Have multiple enemies spawn with increased levels
- [ ] A production Readme

### Wireframe Concept

This app will consist of a single screen, game controls, and nav links to the Github and my LinkedIn.  Game controls will include Start, Stop, and Reset buttons (top right).  On the left, the user's spearman will be positioned vertically-centered.  On the right, there will one (or more) enemies that will be tossing spears at the user, at different locations both horizontally and vertically.


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for rendering and grid for game,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`view_field.js`: this script will handle the logic for creating and updating the necessary viewed elements and rendering them to the DOM.

`game.js`: this script will handle the logic behind the scenes. The game object will hold two (or more) stickman objects, one being the user and the rest being the AI stickman.

`stickman.js`: this script will house visualization of the stickman as well as the physics for both user and AI stickmen.


### Physics Implementation

Spears will follow a realistic flight pattern based on projectile physics.  Formulas I intend to use are:
- projectile displacement
  - x = v0t * cos(theta)
  - y = v0t * sin(theta) - 1/2 gt^2

- initial velocity
  - v0 = v0x * i + v0x * j


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `HTML5 Canvas`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `HTML5 Canvas` to render a user and AI stickmen.

**Day 2**: First, build out the `Stickman` object to connect to the `ViewField` object.  Then, use `game.js` to create and render at least the user and AI stickmen.  Goals for the day:

- Complete the `stickman.js` module (constructor, update functions)
- Render a square grid to the `Canvas`
- Allow for ability to click, hold, and shoot spears

**Day 3**: Create the game logic backend.  Build out modular functions for handling game levels and difficulty.  Incorporate the game logic into the `view_field.js` rendering.  Goals for the day:

- Export an `Game` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

There are many directions this game could eventually go.  Some anticipated updates are:

- [ ] Add different weapons besides spears, maybe an evolution game of sorts starting with rocks, and going to lasers
- [ ] Add boss levels
- [ ] Have moving objects
