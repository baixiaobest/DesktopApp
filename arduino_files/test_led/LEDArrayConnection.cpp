/*
 * LEDArrayConnection.cpp
 *
 *  Created on: Jul 17, 2018
 *      Author: baixiao
 */
#include "LEDArrayConnection.h"
#include "ModulesBaudRate.h"
#include "SerializerUtils.h"
#include "MessageConstants.h"

using namespace sp;

const unsigned int NUMBER_LEDS = 8;

LEDArrayConnection::LEDArrayConnection() {
	m_serial = nullptr;
	m_LEDState = 0x00;
}

LEDArrayConnection::LEDArrayConnection(HardwareSerial* serial) {
	m_serial = serial;
	if (m_serial != nullptr) {
		m_serial->begin(LED_ARRAY_BAUD_RATE);
	}
	m_LEDState = 0x00;
}

void LEDArrayConnection::setSerial(HardwareSerial* serial) {
	m_serial = serial;
	if (m_serial != nullptr) {
		m_serial->begin(LED_ARRAY_BAUD_RATE);
	}
}

bool LEDArrayConnection::setLEDState(unsigned int pinNum, bool state) {
	if (pinNum >= NUMBER_LEDS) {
		return false;
	}

	if (state) {
		m_LEDState |= (1 << pinNum);
	}
	else {
		m_LEDState &= ~(1 << pinNum);
	}
	return sendLEDState();
}

bool LEDArrayConnection::setLEDArrayState(char arrayState) {
	m_LEDState = arrayState;
	return sendLEDState();
}

bool LEDArrayConnection::setNumberOfLEDsOn(unsigned int numLedsOn) {
	if (numLedsOn > NUMBER_LEDS) {
		numLedsOn = NUMBER_LEDS;
	}
	m_LEDState = 0x00;
	for (int i=0; i<numLedsOn; i++) {
		setLEDState(i, true);
	}
	return sendLEDState();
}

bool LEDArrayConnection::sendLEDState() {
	if (m_serial == nullptr) {
		return false;
	}

	char buffer[MAX_MESSAGE_SIZE];
	Serialize(buffer, (int) m_LEDState, INTEGER);
	m_serial->print(buffer);
	return true;
}
