/**
 * author: Baixiao Huang 8/22/2018
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
          .appendField("LEDs from")
          .appendField(new Blockly.FieldDropdown([["left","LEFT"], ["right","RIGHT"]]), "DIRECTION_DROPDOWN");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['output_turn_on_led_at_index'] = {
    init: function() {
      this.appendValueInput("LED_INDEX")
          .setCheck("Number")
          .appendField("Set LED at");
      this.appendValueInput("LED_STATE")
          .setCheck("Boolean")
          .appendField("to");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['output_digital_voltage'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["HIGH","HIGH"], ["LOW","LOW"]]), "VOLTAGE_DROPDOWN");
      this.setOutput(true, "Boolean");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['output_on_off'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["ON","ON"], ["OFF","OFF"]]), "ON_OFF_DROPDOWN");
      this.setOutput(true, "Boolean");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };