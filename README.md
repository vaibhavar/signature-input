# signature-input
A re-usable control for adding interactive signature input to your forms

# Screenshot
![image](https://user-images.githubusercontent.com/7377491/39981826-d653f96c-576f-11e8-991c-4326fcdcf1c7.png)

# Usage
> Classic HTML Way
 - Import the script tag
 `<script type="text/Javascript" src="dist/js/signature-input.js"></script>`
 
 - Import the style
 `<link rel="stylesheet" href="dist/css/signature-input.css"/>`
 
 - Create a div to hold the signature input
 `<div id="signature"></div>`
 
 - Instantiate the signature input on your HTML page
 `<script type="text/Javascript">
  signatureInputApi.init({
    selector: "#signature"
  });
 </script>`

# Configuration
Config object supports :
- selector: HTML selector of the element to render signature input
- width: Width of Signature input field
- height: Height of Signature input field
- color: Color of pen
- input: "Name" of the input field for capturing image data on submission of form

# Codepen

https://codepen.io/vaibhavarora/pen/jxKQda
