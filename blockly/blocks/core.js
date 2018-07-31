/**
 * @license
 * Visual Blocks Editor
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

goog.provide('Blockly.Blocks.core');

goog.require('Blockly.Blocks');


Blockly.Blocks['core_delay'] = {
  init: function() {
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField("Wait")
        .setCheck('Number');
    this.appendDummyInput()
        .appendField("ms");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};