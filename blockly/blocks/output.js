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

goog.provide('Blockly.Blocks.output');

goog.require('Blockly.Blocks');

Blockly.Blocks['output_turn_on_num_leds'] = {
    init: function() {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField("Turn on");
      this.appendDummyInput()
          .appendField("LEDs");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(195);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };