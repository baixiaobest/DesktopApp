/*
 * LEDArrayConnection.h
 *
 * This class is used by programming module.
 * It creates a connection with LED Array Module and this class
 * has some helper functions to send information to LED array module.
 *
 *  Created on: Jul 17, 2018
 *      Author: baixiao
 */

#ifndef SRC_LEDARRAYCONNECTION_H_
#define SRC_LEDARRAYCONNECTION_H_

#include <Arduino.h>

class LEDArrayConnection {
private:
	HardwareSerial* m_serial;
	char m_LEDState;
	bool sendLEDState();
public:
	LEDArrayConnection();
	/** Provide the serial to which the programming module connects.*/
	LEDArrayConnection(HardwareSerial* serial);
	/** Set the serial. */
	void setSerial(HardwareSerial* serial);
	/**
	 * This sets the LED number to state of either on or off
	 * and send state data over serial.
	 * return true on success. false on failure.
	 */
	bool setLEDState(unsigned int pinNum, bool state);
	/**
	 * This sets all 8 bits of LED at the same time
	 * and then send the state data over serial.
	 */
	bool setLEDArrayState(char ArrayState);
	/**
	 * This sets number of LED get lit up from left to right.
	 * It is used as a light bar.
	 */
	bool setNumberOfLEDsOn(unsigned int numLedsOn);
};



#endif /* SRC_LEDARRAYCONNECTION_H_ */
