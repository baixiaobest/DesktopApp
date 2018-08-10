/*
 * StringVariable.cpp
 *
 *  Created on: Jun 20, 2018
 *      Author: baiyuhuang
 */

#include "SerializerUtils.h"
#include "MessageConstants.h"
#include "stdio.h"
#include "string.h"

using namespace std; // @suppress("Symbol is not resolved")
using namespace sp;

template <typename T>
void DataToString(char* buffer, T &input, DataType dataType)
{
    switch(dataType)
    {
        case DataType::INTEGER:
            snprintf(buffer, sp::MAX_MESSAGE_BODY_SIZE, "%d", input);
            break;
        case DataType::BOOL:
            buffer[0] = input+'0';
            buffer[1] = '\0';
            break;
        case DataType::FLOAT:
        case DataType::DOUBLE:
            snprintf(buffer, sp::MAX_MESSAGE_BODY_SIZE, "%f", input);
            break;
        case DataType::UNSUPPORTED_TYPE:
            break;
        default:
            break;
    }
}

template <typename T>
void Serialize(char* buffer, T input, DataType dataType)
{
    buffer[0] = START_CHAR;
    buffer[1] = '\0';
    
    strcat(buffer, DATA_TYPE_STRINGS[dataType]);
    strncat(buffer, &HEADER_SEPARATOR,1);
    char dataString[DATA_STRING_SIZE];
    DataToString(dataString, input, dataType);
    
    strncat(buffer, dataString, MAX_HEADER_SIZE);
    strncat(buffer, &END_CHAR, 1);
}

void SerializeString(char* buffer, char* input)
{
    buffer[0] = START_CHAR;
    buffer[1] = '\0';
    strncat(buffer, DATA_TYPE_STRINGS[DataType::STRING], MAX_HEADER_SIZE);
    strncat(buffer, &HEADER_SEPARATOR,1);
    strncat(buffer, input, MAX_MESSAGE_BODY_SIZE);
    strncat(buffer, &END_CHAR, 1);
}

char calculateCheckSum(char* str)
{
    char checksum = *str;
    str++;
    while(*str != '\0')
    {
        checksum ^= *str;
        str++;
    }
    return checksum;
}


template void Serialize<int>(char* buffer, int input, DataType dataType);
template void Serialize<bool>(char* buffer, bool input, DataType dataType);
template void Serialize<float>(char* buffer, float input, DataType dataType);
template void Serialize<double>(char* buffer, double input, DataType dataType);
