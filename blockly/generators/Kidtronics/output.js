/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

goog.provide('Blockly.Kidtronics.output');

goog.require('Blockly.Kidtronics');

var includes = require('../blockly/generators/Kidtronics/includes.js');

Blockly.Kidtronics['output_turn_on_num_leds'] = function(block) {
    var value_num = Blockly.Kidtronics.valueToCode(block, 'NUM', Blockly.Kidtronics.ORDER_ATOMIC) || 0;
    Blockly.Kidtronics.definitionsAndIncludes_['LEDArrayConnectionInclude'] = includes.LEDArrayConnection;
    Blockly.Kidtronics.definitionsAndIncludes_['LEDArrayConnectionDefinition'] = 'LEDArrayConnection ledConnection;'; 
    Blockly.Kidtronics.setups_['Serial'] = 'Serial.begin(LED_ARRAY_BAUD_RATE);';
    Blockly.Kidtronics.setups_['LEDArrayConnection'] = 'ledConnection.setSerial(&Serial);';
    var code = 'ledConnection.setNumberOfLEDsOn((unsigned int)' + value_num + ');\n';
    return code;
  };