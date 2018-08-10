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
  for (i = 0; i <= 8; i++) {
    ledConnection.setNumberOfLEDsOn((unsigned int)i);
    delay(500);
  }
  for (i = 8; i >= 0; i--) {
    ledConnection.setNumberOfLEDsOn((unsigned int)i);
    delay(500);
  }

}