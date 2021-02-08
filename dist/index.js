'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _character = require('./routes/character');

var _character2 = _interopRequireDefault(_character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('server:debug');


_mongoose2.default.connect(_config2.default.get('database'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// callback when connection to mongodb is open
_mongoose2.default.connection.once("open", function () {
  debug("MongoDB database connection established successfully");
});

const app = (0, _express2.default)();
// support json encoded bodies in the req
app.use(_bodyParser2.default.urlencoded({ extended: true }));

//sets the limit of json bodies in the req body.
app.use(_bodyParser2.default.json());
app.use('/api/v1/', _character2.default);

const listen = app.listen(_config2.default.get('port'), () => {
  debug(`server is running on port ${_config2.default.get('port')} and in ${_config2.default.get('name')} mode`);
});

module.exports = app;
module.exports.port = listen.address().port;
//# sourceMappingURL=index.js.map