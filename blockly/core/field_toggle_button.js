/**
 * A field toggle button that can be toggled on or off.
 * This behaves very much like a checkbox.
 * author: Baixiao Huang 8/24/2018
 */

'use strict';

goog.provide('Blockly.FieldToggleButton');

goog.require('Blockly.Field');
goog.require('goog.math.Size');

const BUTTON_STYLES = {
    fill: 'red',
    stroke: 'black',
    stroke_width: '1',
    radius: '10',
    cx: '5',
    cy: '11'
};

const DIMENSION = {
    width: Number(BUTTON_STYLES.radius) + Number(BUTTON_STYLES.stroke_width) - 3,
    height: 2 * (Number(BUTTON_STYLES.radius) + Number(BUTTON_STYLES.stroke_width) 
        + Blockly.BlockSvg.INLINE_PADDING_Y) + 4
}

/** 
 * Constructor with initial state. 
 * @param {boolean} state initial state of this button.
 */
Blockly.FieldToggleButton = function(state) {
    // Set up the dimension of this button.
    this.size_ = new goog.math.Size(DIMENSION.width, DIMENSION.height);

    // set initial state.
    this.setValue(state);
}

goog.inherits(Blockly.FieldToggleButton, Blockly.Field);

Blockly.FieldToggleButton.fromJson = function(options) {
    // extract state info from option.
    return new Blockly.FieldToggleButton(this.getStateFromOption_(options['on']));
}

/** Parse the input into boolean. */
Blockly.FieldToggleButton.prototype.getStateFromOption_ = function(check) {
    if (typeof check !== 'boolean') {
        check = check.toUpperCase() === 'TRUE';
    }
    return check;
}

Blockly.FieldToggleButton.prototype.init = function() {
    if (this.fieldGroup_) {
        // Toggle button has already been initialized.
        return;
    }
    this.setValue(true);

    this.toggleButtonElement_ = this.drawToggleButton_();

    // TODO: set tool tip.

    // Handle click on toggle button.
    this.registerClick_();
}

/** 
 * Set the state of this button. 
 * Also change the display of the button.
 * @param {boolean} newState new state to set.
 */
Blockly.FieldToggleButton.prototype.setValue = function(newState) {
    if (typeof newState == 'string') {
        newState = (newState.toUpperCase() == 'TRUE');
    }
    this.state_ = newState;
    if (this.toggleButtonElement_) {
        this.toggleButtonElement_.setAttribute(
            'fill', 
            this.state_ ? BUTTON_STYLES.fill : '');
    }
}

/** Get current state of button. */
Blockly.FieldToggleButton.prototype.getValue = function() {
    return String(this.state_).toUpperCase();
}

/** Render a toggle button according to the current state. */
Blockly.FieldToggleButton.prototype.drawToggleButton_ = function() {
    // Create top level svg group.
    this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
    if (!this.visible_) {
        this.fieldGroup_.style.display = 'none';
    }

    // Create a circle svg with proper style.
    // and attach it to fieldGroup_.
    var buttonSvg = Blockly.utils.createSvgElement(
        'circle',
        {
            'r': BUTTON_STYLES.radius,
            'cx': BUTTON_STYLES.cx,
            'cy': BUTTON_STYLES.cy,
            'fill': this.state_ ? BUTTON_STYLES.fill : '',
            'stroke': BUTTON_STYLES.stroke,
            'stroke-width': BUTTON_STYLES.stroke_width
        },
        this.fieldGroup_
    );
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

    return buttonSvg;
}

/** Bind a click event with this button. */
Blockly.FieldToggleButton.prototype.registerClick_ = function() {
    this.mouseDownWrapper_ =
        Blockly.bindEventWithChecks_(
            this.fieldGroup_,
            'mousedown',
            this,
            this.onMouseDown_);
}

/** Callback function for click event. */
Blockly.FieldToggleButton.prototype.showEditor_ = function(e) {
    this.state_ = !this.state_;
    this.setValue(this.state_);
}

/**
 * Button is fixed width, no need to render.
 * @private
 */
Blockly.FieldToggleButton.prototype.render_ = function() {
    // NOP
};
  
/**
* Button is fixed width, no need to render even if forced.
*/
Blockly.FieldToggleButton.prototype.forceRerender = function() {
    // NOP
};
  
/**
* Button is fixed width, no need to update.
* @private
*/
Blockly.FieldToggleButton.prototype.updateWidth = function() {
    // NOP
};

Blockly.Field.register('field_toggle_button', Blockly.FieldToggleButton);
