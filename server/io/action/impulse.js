

export default class ImpulseAction {

  constructor(conf) {
    this.conf = conf;
  }

  exec() {
    this.set1();
    setTimeout(this.set0.bind(this), this.conf.duration);
  }

  set0() {
    const {bus, pin} = this.conf;
    console.log(`set0: bus=${bus}, pin=${pin}`);
  }

  set1() {
    const {bus, pin} = this.conf;
    console.log(`set1: bus=${bus}, pin=${pin}`);
  }


}