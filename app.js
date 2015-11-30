'use strict';

const monument = require('monument')
    , defaultPort = 3000;

require('./data/leaders');
require('./modules/sendEmail');

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || defaultPort
});
