var worker;
var button = 0;
var pos = new p5.Vector(0, 0);
var joystickSensitivity = 0.06;
let col;

/* World boundaries reference */
const worldPixelWidth = 1000;
const worldPixelHeight = 650;

var loc = new p5.Vector(0, 0);


function setup() {
  createCanvas(worldPixelWidth, worldPixelHeight);
}

function draw() {
  background(255);

  let joystickInputX = pos.x; /* Get joystick X value (-93 to 93) */
  let joystickInputY = -1 * pos.y; /* Get joystick Y value (-93 to 93) */

  // Calculate the new position based on joystick input
  loc.x += joystickInputX * joystickSensitivity;
  loc.y += joystickInputY * joystickSensitivity;

  // Ensure the circle stays within the canvas bounds
  loc.x = constrain(loc.x, 0, worldPixelWidth);
  loc.y = constrain(loc.y, 0, worldPixelHeight);

  if (button & BUTTON_GREEN) {
    col = color(0, 255, 0); // Green
  } else if (button & BUTTON_BLUE) {
    col = color(0, 0, 255); // Blue
  } else {
    col = color(255, 255, 255); // Default color
  }

  fill(col);
  ellipse(loc.x, loc.y, 50, 50);
}


async function workerSetup() {
  /* ask user to select the port where the device is connected */
  let port = await navigator.serial.requestPort();
  /* post generic message to the worker for the device to start functioning */
  worker.postMessage("test");
}

if (window.Worker) {
  // console.log("here");
  worker = new Worker("commsTestWorker.js", { type: "module" });
  /* connect function to click event in button */
  document.getElementById("button").addEventListener("click", workerSetup);
  /* listen to messages from the worker */
  worker.addEventListener("message", function (msg) {

    // console.log(msg.data[1]. msg.data[2]);
    //retrieve data from worker.js needed for update_animation()
    button = msg.data[2];
    pos.x = msg.data[0];
    pos.y = msg.data[1];
  });

}
else {
  console.log("oops!");
}

const BUTTON_BLUE = 1;
const BUTTON_GREEN = 2;