import t from 'tcomb';

const Message = t.struct({
  id: t.Num,
  text: t.Str,
});

export default Message; 