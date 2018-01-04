// Rover Object Goes Here
// ======================
var myRover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [
    [0,0]
  ]
};
// Possible directions
// ===================
var directions = ["N","E","S","W"];

// Matrix obstacles
// ================
var obstacles = [
  [null, null, null, "O", null, null, null, null, "O", null],
  [null, "O", null, "O", null, null, "O", null, "O", null],
  ["O", null, null, null, null, "O", null, null, null, null],
  [null, "O", null, null, null, null, "O", null, null, null],
  [null, null, null, null, "O", null, null, null, null, "O"],
  [null, null, null, "O", null, null, null, null, "O", null],
  [null, "O", null, "O", null, null, "O", null, "O", null],
  ["O", null, null, null, null, "O", null, null, null, null],
  [null, "O", null, null, null, null, "O", null, null, null],
  [null, null, null, null, "O", null, null, null, null, "O"],
];

// Constructor enemy-rovers
// ========================
function EnemyRover(line,type) {
  this.type = type;
  this.line = line;
  if (this.type === "horizontal") {
    this.x = 0;
    this.y = this.line;
  } else if (type === "vertical") {
    this.y = 0;
    this.x = this.line;
  }
  this.counter = 0;
  this.moveHorizontal = function () {
    if (this.counter >= 18) {
      this.counter = 0;
    }
    if (this.counter < 9) {
      this.x += 1;
    } else if (this.counter >= 9 && this.counter < 18){
      this.x -= 1;
    }
    this.counter++;
  };
  this.moveVertical = function () {
    if (this.counter >= 18) {
      this.counter = 0;
    }
    if (this.counter < 9) {
      this.y += 1;
    } else if (this.counter >= 9 && this.counter < 18){
      this.y -= 1;
    }
    this.counter++;
  };
  this.movement = function () {
    if (this.type === "horizontal") {
      this.moveHorizontal();
    } else if (this.type === "vertical") {
      this.moveVertical();
    }
  };
}

// Create enemy-rovers
// ===================
var enemyRover1 = new EnemyRover(2,"horizontal");
var enemyRover2 = new EnemyRover(5,"vertical");

// Turn rover
// ==========
function turnLeft(rover){
  console.log("turnLeft was called!");
  console.log("Original rover direction: " + rover.direction);
  if (rover.direction === directions[0]) {
    rover.direction = directions[(directions.length-1)];
  } else {
    for (var i=1; i<(directions.length); i++) {
      if (rover.direction === directions[i]) {
        rover.direction = directions[i - 1];
      }
    }
  }
  console.log("New rover direction: " + rover.direction);
}

function turnRight(rover){
  console.log("turnRight was called!");
  console.log("Original rover direction: " + rover.direction);
  if (rover.direction === directions[(directions.length-1)]) {
    rover.direction = directions[0];
  } else {
    for (var i=(directions.length-2); i>=0; i--) {
      if (rover.direction === directions[i]) {
        rover.direction = directions[i + 1];
      }
    }
  }
  console.log("New rover direction: " + rover.direction);
}

// Check for enemy-rover
// =====================
function checkEnemies(x,y) {
  if ((enemyRover1.x === x) && (enemyRover1.y === y)) {
    return false; //there is an enemy 1
  } else if ((enemyRover2.x === x) && (enemyRover2.y === y)) {
    return false; //there is an enemy 2
  } else {
    return true; //no enemies
  }
}

// Check for obstacles
// ===================
function checkObstacles(x,y) {
  if (obstacles[y][x] === "O") {
    return false; //there is an obstacle
  } else if (obstacles[y][x] === null) {
    return true; //no obstacles
  }
}

// If nothing there, apply movement
// ================================
function applyMovement (rover,addX,addY) {
  var noObstacles = checkObstacles(rover.x+addX, rover.y+addY);
  var noOtherRover = checkEnemies(rover.x+addX, rover.y+addY);
  console.log ("Original position rover: [" + rover.x + " ," + rover.y + "]");
  console.log ("Rover moving towards: " + rover.direction);
  if (noObstacles) {
    if (noOtherRover) {
      rover.x += addX;
      rover.y += addY;
      rover.travelLog.push([rover.x,rover.y]);
    } else {
      console.log ("MyRover can't go there. There is other rover in [" + (rover.x+addX) + ", " + (rover.y+addY) + "].");
      console.log("Position enemies:");
      console.log("[" + enemyRover1.x + ", " + enemyRover1.y + "]");
      console.log("[" + enemyRover2.x + ", " + enemyRover2.y + "]");
    }
  } else {
      console.log ("MyRover can't go there. There is an obstacle in [" + (rover.x+addX) + ", " + (rover.y+addY) + "].");
  }
  console.log("New position rover: [" + rover.x + " ," + rover.y + "]");
}

// Movement rover
// ==============
function moveForward(rover){
  console.log("moveForward was called");
  var addX = 0;
  var addY = 0;
  switch (rover.direction) {
    case "N":
      if (rover.y <= 0 ) {
        console.log ("Wrong movement! You already reached the northern border of the board!");
      } else {
          addY -= 1;
      }
      break;
    case "S":
      if (rover.y >= 9 ) {
        console.log ("Wrong movement! You already reached the southern border of the board!");
      } else {
        addY += 1;
      }
      break;
    case "E":
      if (rover.x >= 9 ) {
        console.log ("Wrong movement! You already reached the eastern border of the board!");
      } else {
        addX += 1;
      }
      break;
    case "W":
      if (rover.x <= 0 ) {
        console.log ("Wrong movement! You already reached the western border of the board!");
      } else {
        addX -= 1;
      }
      break;
    default:
      break;
  }
  applyMovement(rover,addX,addY);
}

function moveBackward(rover){
  console.log("moveBackward was called");
  var addX = 0;
  var addY = 0;
  // console.log ("Original position: [" + rover.x + " ," + rover.y + "]");
  switch (rover.direction) {
    case "S":
      if (rover.y <= 0 ) {
        console.log ("Wrong movement! You already reached the northern border of the board!");
      } else {
      addY -= 1;
      }
      break;
    case "N":
      if (rover.y >= 9 ) {
        console.log ("Wrong movement! You already reached the southern border of the board!");
      } else {
      addY += 1;
      }
      break;
    case "W":
      if (rover.x >= 9 ) {
        console.log ("Wrong movement! You already reached the eastern border of the board!");
      } else {
      addX += 1;
      }
      break;
    case "E":
      if (rover.x <= 0 ) {
        console.log ("Wrong movement! You already reached the western border of the board!");
      } else {
      addX -= 1;
      }
      break;
    default:
      break;
  }
  applyMovement(rover,addX,addY);
}

// Move enemy-rover
// ================
function moveEnemy(i) {
  if (i % 2 === 0) {
    enemyRover1.movement();
  } else {
    enemyRover2.movement();
  }
}

// Give commands to rover
// ======================
function myCommands (commandList) {
  for (i=0 ; i<commandList.length ; i++) {
    moveEnemy(i);
    var command = commandList[i];
    switch (command) {
      case "l":
        turnLeft(myRover);
        break;
      case "r":
        turnRight(myRover);
        break;
      case "f":
        moveForward(myRover);
        break;
      case "b":
        moveBackward(myRover);
        break;
      default:
        break;
    }
    console.log("------------------------------");
  }
  console.log ("These are the coordinates of all the places myRover has been:");
  console.log (myRover.travelLog);
}

// TEST
// ====
myCommands("frfffrffrbbbfffbbbfffbbbfffbbbflfzzyb");
