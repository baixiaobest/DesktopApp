const electron = require('electron');
var shell = require('shelljs');



shell.config.execPath = process.execPath;


document.getElementById('compile').addEventListener("click", testClick);

function testClick(){
    console.log("Click");
    shell.exec('echo Start compiling and uploading',{async:true}).stdout;
    shell.exec('make -C ./arduino_files/test_led/ upload',{async:true}).stdout;
    shell.exec('echo upload successfully',{async:true}).stdout;
}