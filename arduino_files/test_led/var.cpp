//
//  var.cpp
//  DynamicTypedVariable
//
//  Created by Baixiao Huang on 7/29/18.
//  Copyright © 2018 Baixiao Huang. All rights reserved.
//

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "var.h"

const int INTEGER_CHAR_LENGTH = 11;

/** Variable default to int. */
var::var() {
    m_integerValue = 0;
    m_currentType = VarType::INTEGER;
    m_stringValue = nullptr;
}

var::var(int integer) {
    m_integerValue = integer;
    m_currentType = VarType::INTEGER;
    m_stringValue = nullptr;
}

/** Allocate string buffer for storage. */
var::var(const char* string) {
    size_t length = strlen(string);
    m_stringValue = (char*) malloc(length);
    strncpy(m_stringValue, string, length);
    m_stringValue[length] = '\0';
    m_currentType = VarType::STRING;
}

var::var(const var& other) {
    copy(other);
}

var::var(bool boolean) {
    m_integerValue = int(boolean);
    m_currentType = INTEGER;
}

/** Free up allocated string. */
var::~var() {
    if (m_stringValue != nullptr) {
        free(m_stringValue);
    }
}

/** Copy the information about variable from other. */
var& var::operator=(const var& other) {
    if (&other != this) {
        if (m_stringValue != nullptr) {
            free(m_stringValue);
        }
        copy(other);
    }
    return *this;
}

/** Compare two variable if they are equal. Only same type can be compared. */
bool operator==(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return false;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) == 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue == rhs.m_integerValue;
        default:
            return false;
    }
}

bool operator!=(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return true;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) != 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue != rhs.m_integerValue;
        default:
            return false;
    }
}

bool operator>(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return false;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) > 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue > rhs.m_integerValue;
        default:
            return false;
    }
}

bool operator>=(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return false;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) >= 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue >= rhs.m_integerValue;
        default:
            return false;
    }
}

bool operator<(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return false;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) < 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue < rhs.m_integerValue;
        default:
            return false;
    }
}

bool operator<=(const var& lhs, const var& rhs) {
    if (lhs.m_currentType != rhs.m_currentType) {
        return false;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
            return strcmp(lhs.m_stringValue, rhs.m_stringValue) <= 0;
        case var::VarType::INTEGER:
            return lhs.m_integerValue <= rhs.m_integerValue;
        default:
            return false;
    }
}

/** Merge two strings into one string and return new string. */
char* combineTwoStrings(char* lstr, char* rstr){
    size_t lhsLength = strlen(lstr);
    size_t rhsLength = strlen(rstr);
    char* buffer = (char*) malloc(lhsLength + rhsLength);
    buffer[0] = '\0';
    strncat(buffer, lstr, lhsLength);
    strncat(buffer, rstr, rhsLength);
    return buffer;
}

/** Add two variable.
 * When both are strings, it is appending two strings.
 * When both are integers, it add two integers.
 * When two are of different types, convert them into string and append them.
 */
var operator+(var lhs, const var& rhs) {
    // convert both variables to string.
    if (lhs.m_currentType != rhs.m_currentType) {
        char intStr[INTEGER_CHAR_LENGTH];
        char* buffer;
        if (rhs.m_currentType == var::VarType::STRING) {
            snprintf(intStr, sizeof(intStr), "%d", lhs.m_integerValue);
            buffer = combineTwoStrings(intStr, rhs.m_stringValue);
        }
        else {
            snprintf(intStr, sizeof(intStr), "%d", rhs.m_integerValue);
            buffer = combineTwoStrings(lhs.m_stringValue, intStr);
        }
        var newVar(buffer);
        free(buffer);
        return newVar;
    }
    switch(lhs.m_currentType) {
        case var::VarType::STRING:
        {
            char* buffer = combineTwoStrings(lhs.m_stringValue, rhs.m_stringValue);
            var newVar(buffer);
            free(buffer);
            return newVar;
        }
        case var::VarType::INTEGER:
            return var(lhs.m_integerValue + rhs.m_integerValue);
        default:
            return lhs;
    }
}

var operator-(var lhs, const var& rhs) {
    if (lhs.m_currentType == var::VarType::INTEGER
        && rhs.m_currentType == var::VarType::INTEGER)
    {
        return var(lhs.m_integerValue - rhs.m_integerValue);
    }
    else {
        return lhs;
    }
}

var& var::operator++() {
    if (m_currentType == VarType::INTEGER) {
        m_integerValue += 1;
    }
    return *this;
}

var var::operator++(int) {
    var tmp(*this);
    operator++();
    return tmp;
}

var& var::operator--() {
    if (m_currentType == VarType::INTEGER) {
        m_integerValue -= 1;
    }
    return *this;
}

var var::operator--(int) {
    var tmp(*this);
    operator--();
    return tmp;
}

var::operator int() const {
    if (m_currentType == INTEGER) {
        return m_integerValue;
    }
    return 0;
}

var::operator unsigned int() const {
    if (m_currentType == INTEGER) {
        return (unsigned int) m_integerValue;
    }
    return 0;
}

var::operator bool() const {
    if (m_currentType == INTEGER) {
        return m_integerValue != 0;
    }
    return false;
}

void var::copy(const var& other) {
    if (other.m_currentType == VarType::STRING) {
        size_t length = strlen(other.m_stringValue);
        m_stringValue = (char*) malloc(length);
        strncpy(m_stringValue, other.m_stringValue, length);
        m_stringValue[length] = '\0';
    }
    else {
        m_integerValue = other.m_integerValue;
    }
    m_currentType = other.m_currentType;
}
