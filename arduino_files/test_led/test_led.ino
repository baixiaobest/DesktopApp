#include "LEDArrayConnection.h"
#include "var.h"
#include "ModulesBaudRate.h"

var i;

LEDArrayConnection ledConnection;
void setup()
{
  Serial.begin(LED_ARRAY_BAUD_RATE);
  ledConnection.setSerial(&Serial);
}


void loop() {
  for (i = 1; i <= 8; i++) {
    ledConnection.setLEDStateWithVar(i, true);
    delay(1000);
  }

}