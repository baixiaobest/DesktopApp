/*
 * MessageParser.h
 *
 *  Created on: Jun 20, 2018
 *      Author: baixiao
 */

#ifndef MESSAGEPARSER_H_
#define MESSAGEPARSER_H_

#include "Message.h"
#include "MessageConstants.h"

class MessageParser {
private:
	const char* m_message;
	Message m_parsedMessage;
    unsigned int m_messageLength;

	int getHeaderEndIdx();
	sp::DataType getDataTypeFromHeader(const char* headerEndPtr);
	sp::DataType str2DataType(const char* str);
	bool parseMessageBodyAndBuildMessage(const char* bodyStartPtr, sp::DataType dataType);
    unsigned int calculateMessageLength();
public:
	/** Constructor that takes message from Serial port, message will NOT be copied. */
	MessageParser();

	/**
	 * Error check the message and parse it into headers and data.
	 * returns true if parsing was successful, and false otherwise.
	 */
	bool parse(const char* message);

	/** Get parsed message. */
	Message getParsedMessage();

	/** Check if the data is corrupted. */
//    bool isCorrupted();
};



#endif /* MESSAGEPARSER_H_ */
