var electron = require('electron');
var prompt = require('electron-prompt');

var finishLoadingToolBox = function(toolboxStr) {
  // var workspacePlayground = Blockly.inject('blocklyDiv',{toolbox: document.getElementById('toolbox')});
  var blockStart = document.getElementById('blockStart');
  var blocklyDiv = document.getElementById('blocklyDiv');
  workspace = Blockly.inject(blocklyDiv,
      {toolbox: toolboxStr});
  var workSpaceStartY = blockStart.getBoundingClientRect().top;

  var onresize = function(e) {
    const remote = electron.remote
    var bounds = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds()
    var width = bounds.width;
    var height = bounds.height;
    console.log("width: " + width + " Height: " + height);
    console.log("startY: " + workSpaceStartY);
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var x = 0;
    var y = 0;
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = 10 + 'px';
    blocklyDiv.style.top = workSpaceStartY + 'px';
    blocklyDiv.style.width = width - 20 + 'px';
    blocklyDiv.style.height = height - workSpaceStartY - 30 + 'px';
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);
}

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "./toolbox.xml",
    dataType: "text",
    success: function (toolbox) {
        finishLoadingToolBox(toolbox);
    }
  });
});

Blockly.prompt = function(msg, defaultValue, callback) {
  prompt({
    title: defaultValue,
    label: msg,
    type: 'input',
    value: defaultValue
  })
  .then((r) => {
    if (r !== null) {
      callback(r);
    }
  })
  .catch(console.error);
}