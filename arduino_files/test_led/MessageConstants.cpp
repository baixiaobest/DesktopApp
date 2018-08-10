/*
 * MessageCharacters.cpp
 *
 *  Created on: Jun 20, 2018
 *      Author: baixiao
 */
#include "MessageConstants.h"

namespace sp {
    const char START_CHAR = '<';
    const char END_CHAR = '\n';
    const char ESCAPE_CHAR = '\\';
    const char HEADER_SEPARATOR = '\r';
    const char DELIMITER = ',';
    const unsigned int MAX_HEADER_SIZE = 32;
    const unsigned int MAX_MESSAGE_BODY_SIZE = 128;
    
    const unsigned int NUM_SUPPORTED_DATA_TYPE = 5;
    const char* DATA_TYPE_STRINGS[NUM_SUPPORTED_DATA_TYPE] = {
        "INT",
        "FLOAT",
        "DOUBLE",
        "STR",
        "BOOL"
    };
}
