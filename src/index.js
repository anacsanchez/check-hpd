require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const graphqlServer = require('./graphql/');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require(path.resolve(__dirname, '..', 'client', 'webpack.dev.js'));
  const compiler = webpack(webpackConfig);
  const publicPath = process.env.DOCKER ? `http://${process.env.HOST}/` : webpackConfig.output.publicPath;
  app.use(require("webpack-dev-middleware")(compiler, { publicPath }));
  app.use(require('webpack-hot-middleware')(compiler));
}

const graphqlApi = graphqlServer();

graphqlApi.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
