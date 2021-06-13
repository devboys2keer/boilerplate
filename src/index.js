import _ from 'lodash';
import './style.scss';
import printMe from './print.js';

/* 
Error desktop|mobile.scss not exist? 
Comment the imports below and compile again without.
Files are generated now
Imports work again
*/
if (window.innerWidth >= 768) {
    import(/* webpackChunkName: 'style-desktop' */ '../dist/style-desktop.css');
}

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    
    btn.innerHTML = 'Click and see what will happen.';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());