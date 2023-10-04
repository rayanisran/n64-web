
import { N64Board } from "../../dist/controllerAPI.js";

let packet = new Int8Array(3);

/* Device variables */
var n64board;

self.addEventListener("message", async function (e) {
  /* listen to messages from the main script */

  /************ BEGIN SETUP CODE *****************/

  n64board = new N64Board();
  await n64board.init();

  /**********  BEGIN CONTROL LOOP CODE *********************/
  while (true) {

    packet = await n64board.receive();
    this.self.postMessage(packet);
    await new Promise(r => setTimeout(r, 1));
  }

  /**********  END CONTROL LOOP CODE *********************/
});




