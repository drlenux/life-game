import {Map} from "./Map";
import * as JQuery from 'jquery';

let start = JQuery("#start");
let stop = JQuery("#stop");
let init = JQuery("#init");

var timerId: any;
var map: any;

init.on('click', function () {
    map = new Map();
});

start.on('click', function () {
    timerId = setInterval(map.next.bind(map), 10);
});

stop.on('click', function () {
    clearInterval(timerId);
});
