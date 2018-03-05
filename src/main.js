import 'babel-polyfill';
import $ from 'plugins/jquery/jquery-vendor.js';
import {Route} from 'plugins/Router/router.js';
import 'scss/common.scss';

let mainTpl = require('tpl/main.art');
let pageTpl = require('tpl/page.art');

var route = new Route();
route.addPath('/',mainTpl,{title:'首页'});
route.addPath('/page',pageTpl,{page:'页面'});