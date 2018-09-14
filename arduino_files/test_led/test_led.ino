#include "var.h"
#include "ModulesBaudRate.h"

LEDArrayConnection ledConnection;
void setup()
{

}


void loop() {
  ledConnection.setLEDState(0b11001011);
}