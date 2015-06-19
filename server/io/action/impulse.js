export default class ImpulseAction {

  constructor(conf) {
    this.conf = conf;
  }

  exec() {
    this.set1();
    setTimeout(this.set0.bind(this), this.conf.duration);
  }

  _set0() {

  }

  _set1() {
    
  }


}