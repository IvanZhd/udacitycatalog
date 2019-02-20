import printMe from './print.js';
import './styles.css';
import {
  cube
} from './math.js';

function component() {
  let element = document.createElement('pre');
  var btn = document.createElement('button');

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe modul!');
    printMe();
  })
}