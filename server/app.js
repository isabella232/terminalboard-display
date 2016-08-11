require('./env')();
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

module.exports = function() {
  const app = express();

  app.get('/api/pipeline_statuses', function (req, res) {
    res.send(JSON.stringify([
    {
      pipelineName: 'some-pipeline',
        pipelineStatus: 'GREEN',
      currentlyRunning: true
    },
    {
      pipelineName: 'another-pipeline',
        pipelineStatus: 'RED',
      currentlyRunning: false
    }
    ]));
  });

  if (useWebpackDevMiddleware) {
    const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
    app.use(...webpackHotMiddleware());
    app.get('/config.js', function(req, res) {
      res.type('text/javascript').status(200)
        .send(`window.${config.globalNamespace} = {config: ${JSON.stringify(config)}, foo: "bar"}`);
    });
    app.get('*', webpackHotMiddleware.url('/index.html'));
  } else {
    app.use(express.static(path.join(__dirname, '..', 'public')));
  }

  return app;
};
