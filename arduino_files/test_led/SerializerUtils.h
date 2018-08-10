/*
 * StringVariable.h
 *
 *  Created on: Jun 20, 2018
 *      Author: baiyuhuang
 */

#ifndef STRINGVARIABLE_H_
#define STRINGVARIABLE_H_
#include "SerializerUtils.h"
#include "MessageConstants.h"
#include "stdlib.h"
#include "stdio.h"
#include "string.h"

const int DATA_STRING_SIZE = 11;


//input a variable and it will serialize it
template <typename T>
void Serialize(char* buffer, T input, sp::DataType dataType);

//serialize a string
void SerializeString(char* buffer, char* input);

//checksum
static char calculateCheckSum(char* str);

//return data in string
template<typename T>
void DataToString(char* buffer, T &input, sp::DataType dataType);



#endif /* STRINGVARIABLE_H_ */
