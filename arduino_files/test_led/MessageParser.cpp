/*
 * MessageParser.cpp
 *
 *  Created on: Jun 20, 2018
 *      Author: baixiao
 */

#include "MessageParser.h"
#include "MessageConstants.h"
#include "Message.h"
#include "stdlib.h"
#include "string.h"

using namespace sp;
using namespace std; // @suppress("Symbol is not resolved")

const unsigned int CHECKSUM_END_CHAR_SIZE = 1;

MessageParser::MessageParser() {
	m_message = nullptr;
	m_parsedMessage = Message();
	m_messageLength = 0;
}

bool MessageParser::parse(const char* message) {
	m_message = message;

    m_messageLength = calculateMessageLength();
	int headerEndIdx = getHeaderEndIdx();
	if (headerEndIdx == -1) {
		return false;
	}

	DataType dataType = getDataTypeFromHeader(m_message + headerEndIdx);
	if (dataType == UNSUPPORTED_TYPE) {
		return false;
	}

    return parseMessageBodyAndBuildMessage(m_message + headerEndIdx + 1, dataType);
}

Message MessageParser::getParsedMessage() {
	return m_parsedMessage;
}

//bool MessageParser::isCorrupted() {
//    const char* ptr = m_message;
//    char checksum = *ptr;
//    ptr++;
//    while (*(ptr-1) == ESCAPE_CHAR || *ptr != '\0') {
//        checksum ^= *ptr;
//        ptr++;
//    }
//    m_messageLength = ptr - m_message;
//    return *ptr != 0x00;
//}


////////////////Private Functions/////////////////

/** Returns the length of the message. */
unsigned int MessageParser::calculateMessageLength() {
    const char* ptr = m_message + 1;
    while (*(ptr-1) == ESCAPE_CHAR || *ptr != sp::END_CHAR) {
        ptr++;
    }
    return ptr - m_message + 1;
}

/**
 * returns: return the index to the end of message header, pointing at HEADER_SEPARATOR.
 * If HEADER_SEPARATOR cannot be found, return -1.
 */
int MessageParser::getHeaderEndIdx() {
	const char* ptr = m_message;
    int i = 0;
    for (; i<m_messageLength; i++) {
		if (ptr[i] == HEADER_SEPARATOR) {
			if (i > 0 && ptr[i - 1] == ESCAPE_CHAR) {
				continue;
			}
			break;
		}
	}
	return ptr[i] == '\0' ? -1 : i;
}

/**
 * headerEndPtr: pointer to the end of header.
 * returns: return DataType that header specify,
 * return UNSUPPORTED_TYPE when DataType is not supported.
 */
DataType MessageParser::getDataTypeFromHeader(const char* headerEndPtr) {
	const char* ptr;
	if (*m_message == START_CHAR) {
		ptr = m_message + 1;
	}
	else {
		ptr = m_message;
	}
	char header[MAX_HEADER_SIZE];
	unsigned int headerSize = headerEndPtr - ptr;

	// If we use tokenization, memory copy is required.
	memcpy(header, ptr, headerSize);
	header[headerSize] = '\0';

	// TODO: implement tokenization in the future.
	// for now, we don't need to tokenize.

	return str2DataType(header);
}

/**
 *  bodyStartPtr: pinter pointing at the start of the message body.
 *  dataType: dataType that we parse the data into.
 *  return: return bool, true on success.
 */
bool MessageParser::parseMessageBodyAndBuildMessage(const char* bodyStartPtr, DataType dataType) {
	size_t bodyLength = m_messageLength - (size_t)(bodyStartPtr - m_message) - CHECKSUM_END_CHAR_SIZE;
	char messageBody[MAX_MESSAGE_BODY_SIZE];

	memcpy(messageBody, bodyStartPtr, bodyLength);
	messageBody[bodyLength] = '\0';

    Message::UnionData unionData;

	switch (dataType) {
        case INTEGER:
            unionData.INTEGER = atoi(messageBody);
            m_parsedMessage = Message(unionData, dataType);
            break;
        case FLOAT:
            unionData.FLOAT = atof(messageBody);
            m_parsedMessage = Message(unionData, dataType);
            break;
        case DOUBLE:
            unionData.DOUBLE = atof(messageBody);
            m_parsedMessage = Message(unionData, dataType);
            break;
        case BOOL:
            unionData.BOOL = atoi(messageBody) == 1;
            m_parsedMessage = Message(unionData, dataType);
            break;
        case STRING:
            unionData.CHAR_PTR = messageBody;
            m_parsedMessage = Message(unionData, dataType);
            break;
        default:
            return false;
            break;
	}
	return true;
}

/**
 * str: input string that represents data type.
 * returns: return the data type.
 */
DataType MessageParser::str2DataType(const char* str) {
	for (int i=0; i<NUM_SUPPORTED_DATA_TYPE; i++) {
			if (strcmp(DATA_TYPE_STRINGS[i], str) == 0) {
				return (DataType) i;
			}
		}
	return sp::UNSUPPORTED_TYPE;
}
