import crypto from 'crypto';

export default function parseConfig(obj) {
  const {
    actions: packedActions,
    controls: packedControls,
  } = obj;

  const actions = unpackActions(packedActions);
  const controls = unpackControls(actions, packedControls);

  return {actions, controls};
}

function getHash(value) {
  var shasum = crypto.createHash('sha1');
  shasum.update(JSON.stringify(value));
  return shasum.digest('hex');
}

function unpackControl(actions, control) {
  const controlWithoutId = Object.assign({}, control, {
    action: actions[control.action],
  });

  return Object.assign({}, controlWithoutId, {
    id: getHash(controlWithoutId),
  })
}

function unpackControls(actions, packedControls) {
  const unpack = unpackControl.bind(null, actions);
  return packedControls.map(control => unpack(control));
}

function getActionById(actions, actionId) {
  if (!actions.hasOwnProperty(actionId)) {
    throw new Error(`action not found: ${actionId}`);
  }
  return actions[actionId];
}

function mergeAction(proto, action) {
  return Object.assign({},
    proto,
    action, {
      abstract: !!action.abstract
    });
}

function unpackActions(packedActions) {
  const unpack = unpackAction.bind(null, packedActions);
  return Object.keys(packedActions)
    .reduce((actions, id) => {
      actions[id] = unpack(id);
      return actions;
    }, {});
}

function unpackAction(actions, actionId) {
  const action = getActionById(actions, actionId);

  if (action.proto) {
    return mergeAction(unpackAction(actions, action.proto), action);
  } else {
    return mergeAction({}, action);
  }
}