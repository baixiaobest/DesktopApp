var electron = require('electron');
// var shell = require('shelljs');
//const smalltalk = require('smalltalk/native');
// shell.config.execPath = process.execPath;


function translateBlocksIntoCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    $('#codeArea').val(code);
}

$("#compile").click(function(){
    //var person = prompt("Please enter your name");
    // shell.exec('echo Start compiling and uploading',{async:true}).stdout;
    //shell.exec('make -C ./arduino_files/test_led/ ',{async:true}).stdout;
    // shell.exec('/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude -C/Applications/Arduino.app/Contents/Java/hardware/tools/avr/etc/avrdude.conf -v -pm328p -carduino -b115200  -P/dev/cu.usbmodem14311 -Uflash:w:../arduino_files/test_led/build-uno/test_led.hex:i -carduino',{async:true}).stdout;
    // shell.exec('echo upload successfully',{async:true}).stdout;

    translateBlocksIntoCode();    
});
