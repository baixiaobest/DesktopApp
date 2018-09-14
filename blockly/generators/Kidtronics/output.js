/**
 * author: Baixiao Huang 8/22/2018
 */
'use strict';

goog.provide('Blockly.Kidtronics.output');

goog.require('Blockly.Kidtronics');

var includes = require('../blockly/generators/Kidtronics/includes.js');

// Helper function that initiate LEDArrayConnection, 
// the communication class to LEDArray module.
var setupLedArrayConnection = function() {
  Blockly.Kidtronics.definitionsAndIncludes_['LEDArrayConnectionInclude'] = includes.LEDArrayConnection;
  Blockly.Kidtronics.definitionsAndIncludes_['LEDArrayConnectionDefinition'] = 
    'LEDArrayConnection ledConnection;'; 
  Blockly.Kidtronics.setups_['Serial'] = 'Serial.begin(LED_ARRAY_BAUD_RATE);';
  Blockly.Kidtronics.setups_['LEDArrayConnection'] = 'ledConnection.setSerial(&Serial);';
}

Blockly.Kidtronics['output_turn_on_num_leds'] = function(block) {
    var value_num = 
      Blockly.Kidtronics.valueToCode(block, 'NUM', Blockly.Kidtronics.ORDER_ATOMIC) || 0;
    var dropdown_direction_dropdown = block.getFieldValue('DIRECTION_DROPDOWN');
    var ledLightUpDirection = dropdown_direction_dropdown === 'LEFT' 
      ? 'LEDArrayConnection::LEFT'
      : 'LEDArrayConnection::RIGHT';

    setupLedArrayConnection();
    var code = 'ledConnection.setNumberOfLEDsOnWithVar(' 
      + value_num + ', ' + ledLightUpDirection + ');\n';
    return code;
  };

Blockly.Kidtronics['output_turn_on_led_at_index'] = function(block) {
  var value_led_index = 
    Blockly.Kidtronics.valueToCode(block, 'LED_INDEX', Blockly.Kidtronics.ORDER_ATOMIC) || 0;
  var value_led_state = 
    Blockly.Kidtronics.valueToCode(block, 'LED_STATE', Blockly.Kidtronics.ORDER_ATOMIC) || 'false';
  setupLedArrayConnection();
  var code = 'ledConnection.setLEDStateWithVar(' + value_led_index + ', ' + value_led_state + ');\n';
  return code;
};

Blockly.Kidtronics['output_led_array'] = function(block) {
  setupLedArrayConnection();
  var code = 'ledConnection.setLEDState(0b';
  for (var i=0; i<8; i++) {
    code += (block.getFieldValue('BUTTON_'+i) === 'TRUE' ? '1' : '0');
  }
  code += ');\n';
  return code;
};
  
Blockly.Kidtronics['output_digital_voltage'] = function(block) {
  var dropdown_voltage_dropdown = block.getFieldValue('VOLTAGE_DROPDOWN');
  var code = dropdown_voltage_dropdown;
  return [code, Blockly.Kidtronics.ORDER_ATOMIC];
};
  
Blockly.Kidtronics['output_on_off'] = function(block) {
  var dropdown_on_off_dropdown = block.getFieldValue('ON_OFF_DROPDOWN');
  var code = dropdown_on_off_dropdown === "ON" ? 'true' : 'false';
  return [code, Blockly.Kidtronics.ORDER_ATOMIC];
};