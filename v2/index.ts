import {Run} from "./run";

var timerId: any;
var run: Run;

var init = () => {
    run = new Run();
};

var click = () => {
    timerId = setInterval(run.run.bind(run), 100);
};

var stop = () => {
    clearInterval(timerId);
};
