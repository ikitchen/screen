import ImpulseAction from './action/impulse';

const actionsMap = {
  impulse: ImpulseAction,
};

export function createAction(actionConfig) {
  const actionType = actionConfig.type;

  if(!actionsMap.hasOwnProperty(actionType)) {
    console.log('not found');
    throw new Error(`Action not found "${actionType}"`);
  }

  const ActionConstructor = actionsMap[actionType];
  const action = new ActionConstructor(actionConfig);

  return action;
}
