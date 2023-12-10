const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


const strConfig = `../config/webpack.development.js`;
const webpack = require('webpack');
const configWebpack = require(strConfig);
const compiler = webpack(configWebpack);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, configWebpack.devServer);
const webpackHotMiddlware = require('webpack-hot-middleware')(compiler, configWebpack.devServer);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddlware);

console.log('Webpack Middleware enabled');
const staticMiddleware = express.static('dist');
app.set('views', path.join(__dirname, 'views'));

app.use(staticMiddleware);
app.use(bodyParser.json());

//API routes
require('./router')(app);

app.get('/*', function (req, res) {
    res.sendFile('dist/index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
