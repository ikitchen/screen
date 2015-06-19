import config from './config';
import Screen from './io/screen';
import express from 'express';
import serverConf from './server-conf';
import {createAction} from './io/action-factory';

const app = express();
const screenDataSource = new Screen();


app.set('conf', serverConf);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.post('/api/screen/action/:id', (req, res) => {
  console.log('ACTION:', req.params.id);
  screenDataSource.getControlById(req.params.id)
    .then((control) => {
      const actionConfig = control.action;
      const action = createAction(actionConfig);
      action.exec();
      res.send({
        done: true,
      });
    })
    .catch((err) => {
      console.error('error', err);
      res.sendStatus(500);
    });
});

app.get('/api/screen', (req, res) => {
  screenDataSource.get()
    .then(
      function (data) {
        res.send(data);
      },
      function (error) {
        console.error('error', error);
        res.sendStatus(500, error);
      }
    );
});

app.get('/', (req, res) => {
  res.render('index', {
    conf: app.set('conf'),
  });
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});