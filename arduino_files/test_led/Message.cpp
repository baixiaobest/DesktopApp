//
//  Message.cpp
//  SerialProtocol
//
//  Created by Baixiao Huang on 6/22/18.
//  Copyright © 2018 Baixiao Huang. All rights reserved.
//

#include "Message.h"
#include "stdlib.h"
#include "string.h"

using namespace sp;

Message::Message(UnionData data, sp::DataType dataType) :
	m_dataType(dataType)
{
    m_data = data;
    if (m_dataType == STRING) {
        int strLength = strlen(data.CHAR_PTR);
        m_data.CHAR_PTR = (char*) malloc(strLength + 1);
        strcpy(m_data.CHAR_PTR, data.CHAR_PTR);
    }
}

Message::Message(const Message &other) {
    copy(other);
}

Message::~Message() {
    if (m_dataType == STRING && m_data.CHAR_PTR != nullptr) {
        free(m_data.CHAR_PTR);
    }
}

Message& Message::operator=(const Message &other) {
    if (&other == this) {
        return *this;
    }
    if (m_dataType == STRING && m_data.CHAR_PTR != nullptr) {
        free(m_data.CHAR_PTR);
    }
    copy(other);
    return *this;
}

////////////////Private Functions////////////////////////

void Message::copy(const Message& other) {
    m_dataType = other.m_dataType;
    m_data = other.m_data;
    if (m_dataType == STRING) {
        int strLength = strlen(other.m_data.CHAR_PTR);
        m_data.CHAR_PTR = (char*) malloc(strLength + 1);
        strcpy(m_data.CHAR_PTR, other.m_data.CHAR_PTR);
    }
}
