/*
 * MessageCharacters.h
 *
 *  Created on: Jun 20, 2018
 *      Author: baixiao
 */

#ifndef MESSAGECONSTANTS_H_
#define MESSAGECONSTANTS_H_

namespace sp {
    extern const char START_CHAR;
    extern const char END_CHAR;
    extern const char ESCAPE_CHAR;
    extern const char HEADER_SEPARATOR;
    extern const char DELIMITER;
    extern const unsigned int MAX_HEADER_SIZE;
    extern const unsigned int MAX_MESSAGE_BODY_SIZE;
    const unsigned int MAX_MESSAGE_SIZE = 164;
    
    enum DataType {
        INTEGER,
        FLOAT,
        DOUBLE,
        STRING,
        BOOL,
        UNSUPPORTED_TYPE
    };
    extern const unsigned int NUM_SUPPORTED_DATA_TYPE;
    extern const char* DATA_TYPE_STRINGS[];
}

#endif /* MESSAGECONSTANTS_H_ */
