exports.id = "main";
exports.modules = {

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Required External Modules\n */\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar database_1 = __webpack_require__(/*! ./models/database */ \"./models/database.ts\");\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\nvar swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\"));\nvar swagger_json_1 = __importDefault(__webpack_require__(/*! ./swagger.json */ \"./swagger.json\"));\nvar admin_routes_1 = __webpack_require__(/*! ./src/routes/admin.routes */ \"./src/routes/admin.routes.ts\");\nvar agent_routes_1 = __webpack_require__(/*! ./src/routes/agent.routes */ \"./src/routes/agent.routes.ts\");\ndotenv.config();\n/**`\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(morgan_1.default('dev'));\napp.use(\"/admin\", admin_routes_1.adminRouter);\napp.use(\"/agent\", agent_routes_1.agentRouter);\napp.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));\napp.get('/', function (req, res) {\n    res.send('welcome in route');\n});\n/**\n * Database Coonection\n */\ndatabase_1.connect();\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./swagger.json":
/*!**********************!*\
  !*** ./swagger.json ***!
  \**********************/
/*! exports provided: swagger, info, schemes, consumes, produces, paths, /agent/update/{id}, default */
/***/ (function(module) {

eval("!(function webpackMissingModule() { var e = new Error(\"Cannot find module './swagger.json'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n//# sourceURL=webpack:///./swagger.json?");

/***/ })

};