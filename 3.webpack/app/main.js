/*
const greetr = require('./Greeter.js');//注意：greetr是函数体
document.querySelector('#root').appendChild(greetr());*/
import React from 'react';
import {render} from 'react-dom'
import Greeter from './Greeter';

render(<Greeter/>,document.getElementById('root'));
