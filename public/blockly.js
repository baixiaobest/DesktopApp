const electron = require('electron');

// var workspacePlayground = Blockly.inject('blocklyDiv',{toolbox: document.getElementById('toolbox')});

  var blockStart = document.getElementById('blockStart');
  var blocklyDiv = document.getElementById('blocklyDiv');
  var workspacePlayground = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});
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
  Blockly.svgResize(workspacePlayground);