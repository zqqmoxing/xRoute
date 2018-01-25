import 'babel-polyfill';
import {Route} from 'plugins/Router/router.js';
import 'scss/common.scss';

let mainTpl = require('art-tpl/main.art');
let pageTpl = require('art-tpl/page.art');

var route = new Route();
route.addPath('/',mainTpl,{title:'首页'});
route.addPath('/page',pageTpl,{page:'页面'});