import t from 'tcomb';
import ActionType from './action-type';

const {maybe, struct, Bool, Str, Num} = t;

const Action = struct({
  type     : ActionType,
  abstract : maybe(Bool),
  proto    : maybe(Str),
});

const ImpulseAction = Action.extend({
  duration: Num,
  bus: Num,
  pin: Num,
});

Action.dispatch = function (obj) {
  if(obj.type === 'impulse') {
    return ImpulseAction;
  }
  throw new Error('unknown action type');
};

export default Action;