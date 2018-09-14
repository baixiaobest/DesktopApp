#include "LEDArrayConnection.h"
#include "var.h"
#include "ModulesBaudRate.h"

LEDArrayConnection ledConnection;
void setup()
{
  Serial.begin(LED_ARRAY_BAUD_RATE);
  ledConnection.setSerial(&Serial);
}


void loop() {
  ledConnection.setLEDState(0b11001011);

}