exports.id = "main";
exports.modules = {

/***/ "./_helpers/authorize.ts":
/*!*******************************!*\
  !*** ./_helpers/authorize.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.authorize = void 0;\n// import secret from process.env.JWT_SECRET\nvar express_jwt_1 = __importDefault(__webpack_require__(/*! express-jwt */ \"express-jwt\"));\nvar models_1 = __webpack_require__(/*! ../models */ \"./models/index.ts\");\nvar secret = '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe';\nexports.authorize = function (roles) {\n    if (typeof roles == 'string') {\n        roles = [roles];\n    }\n    return [\n        // authenticate JWT token and attach user to request object (req.user)\n        express_jwt_1.default({ secret: secret, algorithms: ['RS256'] }),\n        // authorize based on user role\n        function (req, res, next) {\n            var user = req.user;\n            if (roles.length && !roles.includes(user.role)) {\n                // user's role is not authorized\n                return res.status(401).json({ message: 'Unauthorized' });\n            }\n            switch (req.user.role) {\n                case 'Admin':\n                    models_1.Admin.findOneByEmail(req.user.email).then(function (user) {\n                        if (user) {\n                            req.user = user;\n                            req.userType = 'Admin';\n                            // authentication and authorization successful\n                            next();\n                        }\n                        else {\n                            return res\n                                .status(404)\n                                .json({ message: 'User Not Found' });\n                        }\n                    });\n                    break;\n            }\n        }\n    ];\n};\n\n\n//# sourceURL=webpack:///./_helpers/authorize.ts?");

/***/ }),

/***/ "./src/routes/admin.routes.ts":
/*!************************************!*\
  !*** ./src/routes/admin.routes.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.adminRouter = void 0;\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar authorize_1 = __webpack_require__(/*! ../../_helpers/authorize */ \"./_helpers/authorize.ts\");\nvar role_1 = __webpack_require__(/*! ../../_helpers/role */ \"./_helpers/role.ts\");\nvar admin_1 = __webpack_require__(/*! ../controllers/admin/admin */ \"./src/controllers/admin/admin.ts\");\n/**\n * Controller Definitions\n */\nexports.adminRouter = express_1.default.Router();\nexports.adminRouter.post(\"/register\", admin_1.adminRegister);\nexports.adminRouter.post(\"/login\", admin_1.adminLogin);\nexports.adminRouter.get(\"/get-agents\", authorize_1.authorize(role_1.Admin), admin_1.getAllAgents);\n\n\n//# sourceURL=webpack:///./src/routes/admin.routes.ts?");

/***/ })

};