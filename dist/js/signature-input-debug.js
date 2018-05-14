/**
 * Plugin SignatureInput
 * author: Vaibhav Arora (github.com/vaibhavar)
 */
(function(){
let SignatureInput = function(oConfig) {
  let sSelector = oConfig.selector;
  // Storing config
  this.oConfig = oConfig;
  // Caching dom
  this.oSelector = document.querySelector(sSelector);
  if (this.oSelector) {
    this.render();
    this.attachEvents();
  }
};

SignatureInput.prototype.drawOnCanvas = function(x,y) {
  let prevX, prevY;
  prevX = this.currX;
  prevY = this.currY;
  this.currX = x;
  this.currY = y;

  this.oCtx.beginPath();
  this.oCtx.moveTo(prevX, prevY);
  this.oCtx.lineTo(this.currX, this.currY);
  this.oCtx.lineWidth = 2;
  this.oCtx.strokeStyle = "#000000";
  this.oCtx.stroke();
  this.oCtx.closePath();
};

SignatureInput.prototype.copyToInput = function() {
  const sImageData = this.oCanvas.toDataURL();
  this.oInput.value = sImageData;
};

SignatureInput.prototype.attachEvents = function() {
  let oBoundRect = this.oSelector.getBoundingClientRect();
  let offsetX = oBoundRect.left;
  let offsetY = oBoundRect.top;

  this.oCanvas.addEventListener(
    "mousemove",
    function(ev) {
      if (this.active) {
        let x = ev.clientX - offsetX;
        let y = ev.clientY - offsetY;
        this.drawOnCanvas(x,y);
      }
    }.bind(this),
    false
  );
  
  this.oCanvas.addEventListener(
    "touchmove",
    function(ev) {
      if (this.active) {
        let x = ev.targetTouches[0].clientX - offsetX;
        let y = ev.targetTouches[0].clientY - offsetY;
        this.drawOnCanvas(x,y);
      }
    }.bind(this),
    false
  );
  
  this.oCanvas.addEventListener(
    "mousedown",
    function(ev) {
      this.active = true;
      this.currX = ev.layerX;
      this.currY = ev.layerY;
    }.bind(this),
    false
  );
  
  this.oCanvas.addEventListener(
    "touchstart",
    function(ev) {
      this.active = true;
      this.currX = ev.layerX;
      this.currY = ev.layerY;
    }.bind(this),
    false
  );
  
  this.oCanvas.addEventListener(
    "mouseup",
    function() {
      this.active = false;
      this.copyToInput();
    }.bind(this),
    false
  );
  this.oCanvas.addEventListener(
    "touchend",
    function() {
      this.active = false;
      this.copyToInput();
    }.bind(this),
    false
  );
  this.oCanvas.addEventListener(
    "mouseout",
    function() {
      this.active = false;
      this.copyToInput();
    }.bind(this),
    false
  );
  
  this.oClearBtn.addEventListener('click', this.clearCanvas.bind(this), false);
};

SignatureInput.prototype.clearCanvas = function(){
  this.oCtx.clearRect(0,0, this.oConfig.width, this.oConfig.height);
};

SignatureInput.prototype.render = function() {
  let oClearBtn = document.createElement("button");
  oClearBtn.innerText = 'Clear';
  oClearBtn.type = "button";
  
  let oCanvas = document.createElement("canvas");
  oCanvas.width = this.oConfig.width;
  oCanvas.height = this.oConfig.height;

  oCanvas.className = "SignatureInputCanvas";
  let oSigInputHidden = document.createElement("input");
  oSigInputHidden.name = this.oConfig.inputName || "signature-input";
  oSigInputHidden.type = "hidden";
  // Caching for attaching events
  this.oCanvas = oCanvas;
  this.oClearBtn = oClearBtn;
  // Caching for change events
  this.oInput = oSigInputHidden;
  // Context for drawing
  this.oCtx = oCanvas.getContext("2d");
  
  this.oSelector.appendChild(oCanvas);
  this.oSelector.appendChild(oClearBtn);
  this.oSelector.appendChild(oSigInputHidden);
  
};

let SignatureInputApi = function(){

};

SignatureInputApi.prototype.init = function(oConfig){
  new SignatureInput(oConfig);
};

// Global object
signatureInputApi = new SignatureInputApi();

})();
