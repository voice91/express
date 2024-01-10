"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';

// const swaggerDocument = YAML.load('docs/opencollection.yml');
var router = _express["default"].Router();
// router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = router;