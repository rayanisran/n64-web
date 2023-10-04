#include <N64Controller.h>

struct Packet {
  uint8_t delim;
  int8_t xaxis;
  int8_t yaxis;
  uint8_t buttonStatus;
};

Packet data;

// for button status
byte combinedByte = 0;

N64Controller player1(12);  // this controller for player one is on PIN 12

void setup() {
  Serial.begin(230400);
  player1.begin();  // Initialisation
}

void loop() {
  //delay(30);
  player1.update();              // read key state
                                 //if (player1.A() && player1.D_down()
                                 //    || player1.Start()) { // has no deeper meaning ;)
  int xaxis = player1.axis_x();  // can be negative oder positive
  int yaxis = player1.axis_y();

  int keyA = player1.A();
  int keyB = player1.B();
  int cLeft = player1.C_left();
  int cRight = player1.C_right();
  int cDown = player1.C_down();
  int cUp = player1.C_up();
  int keyR = player1.R();
  int keyL = player1.L();
  int keyZ = player1.Z();
  // //int checksum = keyA + keyB + keyZ + keyR + keyL + xaxis + yaxis;
  combinedByte = 0;

  combinedByte |= keyA;
  combinedByte |= (keyB << 1);
  combinedByte |= (keyZ << 2);
  combinedByte |= (keyR << 3);
  combinedByte |= (keyL << 4);

  data.delim = 255;
  data.buttonStatus = combinedByte;
  data.xaxis = xaxis;
  data.yaxis = yaxis;

  Serial.write((uint8_t*)&data, sizeof(data));

}