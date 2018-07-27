var electron = require('electron');
// var shell = require('shelljs');
//const smalltalk = require('smalltalk/native');
const prompt = require('electron-prompt');


// shell.config.execPath = process.execPath;


document.getElementById('compile').addEventListener("click", testClick);


function testClick(){
    console.log("Click");
    //var person = prompt("Please enter your name");
    // shell.exec('echo Start compiling and uploading',{async:true}).stdout;
    //shell.exec('make -C ./arduino_files/test_led/ ',{async:true}).stdout;
    // shell.exec('/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude -C/Applications/Arduino.app/Contents/Java/hardware/tools/avr/etc/avrdude.conf -v -pm328p -carduino -b115200  -P/dev/cu.usbmodem14311 -Uflash:w:../arduino_files/test_led/build-uno/test_led.hex:i -carduino',{async:true}).stdout;
    // shell.exec('echo upload successfully',{async:true}).stdout;
}



