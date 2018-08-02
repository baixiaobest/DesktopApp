'use strict'

goog.provide('Blockly.Kidtronics');

goog.require('Blockly.Generator');

Blockly.Kidtronics = new Blockly.Generator('Kidtronics');

Blockly.Kidtronics.addReservedWords(
    'var,setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
);

Blockly.Kidtronics.DeveloperIncludes = {
    var: '#include "var.h"',
    ModulesBaudRate: '#include "ModulesBaudRate.h"'
}

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Kidtronics.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Kidtronics.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Kidtronics.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Kidtronics.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Kidtronics.ORDER_ADDITIVE = 4;       // + -
Blockly.Kidtronics.ORDER_SHIFT = 5;          // << >>
Blockly.Kidtronics.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Kidtronics.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Kidtronics.ORDER_BITWISE_AND = 8;    // &
Blockly.Kidtronics.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Kidtronics.ORDER_BITWISE_OR = 10;    // |
Blockly.Kidtronics.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Kidtronics.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Kidtronics.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Kidtronics.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Kidtronics.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Kidtronics.init = function(workspace) {
    // Variable definitions and include header.
    Blockly.Kidtronics.definitionsAndIncludes_ = Object.create(null);

    // Setups
    Blockly.Kidtronics.setups_ = Object.create(null);

    // a database of entity names (variables, functions, etc).
    if (!Blockly.Kidtronics.variableDB_) {
        Blockly.Kidtronics.variableDB_ =
            new Blockly.Names(Blockly.Kidtronics.RESERVED_WORDS_);
    }
    // empty the database, but reserved words are preserved.
    else 
    {
        Blockly.Kidtronics.variableDB_.reset();
    }

    // Store all the variables in the workspace to database.
    Blockly.Kidtronics.variableDB_.setVariableMap(workspace.getVariableMap())

    var defvars = [];
    // List of developers reserved variable (variable model).
    var devVarList = workspace.getAllVariables();
    devVarList.forEach(variable => {
        defvars.push('var ' + variable.name + ';\n');
    });
    Blockly.Kidtronics.definitionsAndIncludes_['variables'] = defvars.join('\n');
}

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Kidtronics.finish = function(code) {
    // Indent code
    code = '  ' + code.replace(/\n/g, '\n  ');
    code = code.replace(/\n\s+$/, '\n');
    code = 'void loop() {\n' + code + '\n}';

    // Separate out definitions and includes into two lists.
    var includes = [];
    var definitions = [];
    for (var name in Blockly.Kidtronics.definitionsAndIncludes_) {
        var def = Blockly.Kidtronics.definitionsAndIncludes_[name];
        if (def.match(/^#include/)) {
            includes.push(def);
        }
        else {
            definitions.push(def);
        }
    }

    // Add developer includes.
    for (var name in Blockly.Kidtronics.DeveloperIncludes) {
        includes.push(Blockly.Kidtronics.DeveloperIncludes[name]);
    }

    // Put setup dictionary into a list.
    var setups = [];
    for (var name in Blockly.Kidtronics.setups_) {
        setups.push(Blockly.Kidtronics.setups_[name]);
    }

    var allDefs = includes.join('\n') + '\n\n' + definitions.join('\n') + '\nvoid setup() \n{\n  '+setups.join('\n  ') + '\n}'+ '\n\n';
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
}

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Kidtronics.scrubNakedValue = function(line) {
    return line + ';\n';
  };

  /**
 * Encode a string as a properly escaped Kidtronics string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Kidtronics string.
 * @private
 */
Blockly.Kidtronics.quote_ = function(string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
    string = string.replace(/\\/g, '\\\\')
                   .replace(/\n/g, '\\\n')
                   .replace(/\$/g, '\\$')
                   .replace(/'/g, '\\\'');
    return '\"' + string + '\"';
  };

  /**
 * Common tasks for generating Kidtronics from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Kidtronics code created for this block.
 * @return {string} Kidtronics code with comments and subsequent blocks added.
 * @private
 */
Blockly.Kidtronics.scrub_ = function(block, code) {
    if (code === null) {
      // Block has handled code generation itself.
      return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
      // Collect comment for this block.
      var comment = block.getCommentText();
      if (comment) {
        commentCode += Blockly.Kidtronics.prefixLines(comment, '// ') + '\n';
      }
      // Collect comments for all value arguments.
      // Don't collect comments for nested statements.
      for (var x = 0; x < block.inputList.length; x++) {
        if (block.inputList[x].type == Blockly.INPUT_VALUE) {
          var childBlock = block.inputList[x].connection.targetBlock();
          if (childBlock) {
            var comment = Blockly.Kidtronics.allNestedComments(childBlock);
            if (comment) {
              commentCode += Blockly.Kidtronics.prefixLines(comment, '// ');
            }
          }
        }
      }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.Kidtronics.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  };