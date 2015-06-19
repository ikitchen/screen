import configParser from './config-parser';
import Screen from './io/screen';

function log(obj) {
  return console.log(JSON.stringify(obj, false, 2));
}

const scr = new Screen();

scr.get().then(log);
