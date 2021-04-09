/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1385e71f8442067b91a8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_helpers/authorize.ts":
/*!*******************************!*\
  !*** ./_helpers/authorize.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.authorize = void 0;\n// import secret from process.env.JWT_SECRET\nvar express_jwt_1 = __importDefault(__webpack_require__(/*! express-jwt */ \"express-jwt\"));\nvar models_1 = __webpack_require__(/*! ../models */ \"./models/index.ts\");\nvar secret = '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe';\nexports.authorize = function (roles) {\n    if (typeof roles == 'string') {\n        roles = [roles];\n    }\n    return [\n        // authenticate JWT token and attach user to request object (req.user)\n        express_jwt_1.default({ secret: secret, algorithms: ['HS256'] }),\n        // authorize based on user role\n        function (req, res, next) {\n            var user = req.user;\n            if (roles.length && !roles.includes(user.role)) {\n                // user's role is not authorized\n                return res.status(401).json({ message: 'Unauthorized' });\n            }\n            switch (req.user.role) {\n                case 'Admin':\n                    models_1.Admin.findOneByEmail(req.user.email).then(function (user) {\n                        if (user) {\n                            req.user = user;\n                            req.userType = 'Admin';\n                            // authentication and authorization successful\n                            next();\n                        }\n                        else {\n                            return res\n                                .status(404)\n                                .json({ message: 'User Not Found' });\n                        }\n                    });\n                    break;\n            }\n        }\n    ];\n};\n\n\n//# sourceURL=webpack:///./_helpers/authorize.ts?");

/***/ }),

/***/ "./_helpers/role.ts":
/*!**************************!*\
  !*** ./_helpers/role.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Admin = exports.Agent = void 0;\nexports.Agent = 'Agent';\nexports.Admin = 'Admin';\n\n\n//# sourceURL=webpack:///./_helpers/role.ts?");

/***/ }),

/***/ "./config/constants.ts":
/*!*****************************!*\
  !*** ./config/constants.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.RESPONSE_CODES = void 0;\nexports.RESPONSE_CODES = {\n    GET: 200,\n    POST: 201,\n    DELETE: 204,\n    NOT_FOUND: 404,\n    SERVER_ERROR: 500,\n    UNAUTHORIZED: 401,\n    BAD_REQUEST: 400\n};\n\n\n//# sourceURL=webpack:///./config/constants.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Required External Modules\n */\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar database_1 = __webpack_require__(/*! ./models/database */ \"./models/database.ts\");\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\nvar swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\"));\nvar swagger_json_1 = __importDefault(__webpack_require__(/*! ./swagger.json */ \"./swagger.json\"));\nvar admin_routes_1 = __webpack_require__(/*! ./src/routes/admin.routes */ \"./src/routes/admin.routes.ts\");\nvar agent_routes_1 = __webpack_require__(/*! ./src/routes/agent.routes */ \"./src/routes/agent.routes.ts\");\ndotenv.config();\n/**`\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(morgan_1.default('dev'));\napp.use(\"/admin\", admin_routes_1.adminRouter);\napp.use(\"/agent\", agent_routes_1.agentRouter);\napp.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));\napp.get('/', function (req, res) {\n    res.send('welcome in route');\n});\n/**\n * Database Coonection\n */\ndatabase_1.connect();\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./models/admin/admin.model.ts":
/*!*************************************!*\
  !*** ./models/admin/admin.model.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Admin = exports.ADMIN_SCHEMA = void 0;\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar mongoose_autopopulate_1 = __importDefault(__webpack_require__(/*! mongoose-autopopulate */ \"mongoose-autopopulate\"));\nexports.ADMIN_SCHEMA = new mongoose_1.Schema({\n    name: String,\n    email: String,\n    password: String,\n    passwordSalt: String\n});\nexports.ADMIN_SCHEMA.plugin(mongoose_autopopulate_1.default);\nexports.Admin = mongoose_1.model('Admin', exports.ADMIN_SCHEMA);\n\n\n//# sourceURL=webpack:///./models/admin/admin.model.ts?");

/***/ }),

/***/ "./models/admin/index.ts":
/*!*******************************!*\
  !*** ./models/admin/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.AdminModel = void 0;\nvar base_1 = __webpack_require__(/*! ../base */ \"./models/base.ts\");\nvar admin_model_1 = __webpack_require__(/*! ./admin.model */ \"./models/admin/admin.model.ts\");\n// Note: Do not extend this class, only BaseModel is allow to be extended from.\n// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated\nvar AdminModel = /** @class */ (function (_super) {\n    __extends(AdminModel, _super);\n    function AdminModel() {\n        return _super.call(this, admin_model_1.Admin, 'Admin', admin_model_1.ADMIN_SCHEMA) || this;\n    }\n    return AdminModel;\n}(base_1.BaseModel));\nexports.AdminModel = AdminModel;\n\n\n//# sourceURL=webpack:///./models/admin/index.ts?");

/***/ }),

/***/ "./models/agent/agent.model.ts":
/*!*************************************!*\
  !*** ./models/agent/agent.model.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Agent = exports.AGENT_SCHEMA = void 0;\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar mongoose_autopopulate_1 = __importDefault(__webpack_require__(/*! mongoose-autopopulate */ \"mongoose-autopopulate\"));\nexports.AGENT_SCHEMA = new mongoose_1.Schema({\n    name: String,\n    email: String,\n    phoneNumber: String,\n    avatar: String,\n    password: String,\n    loginAttempt: { type: Number, default: 0 },\n    passwordSalt: String\n});\nexports.AGENT_SCHEMA.plugin(mongoose_autopopulate_1.default);\nexports.Agent = mongoose_1.model('Agent', exports.AGENT_SCHEMA);\n\n\n//# sourceURL=webpack:///./models/agent/agent.model.ts?");

/***/ }),

/***/ "./models/agent/index.ts":
/*!*******************************!*\
  !*** ./models/agent/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.AgentModel = void 0;\nvar base_1 = __webpack_require__(/*! ../base */ \"./models/base.ts\");\nvar agent_model_1 = __webpack_require__(/*! ./agent.model */ \"./models/agent/agent.model.ts\");\n// Note: Do not extend this class, only BaseModel is allow to be extended from.\n// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated\nvar AgentModel = /** @class */ (function (_super) {\n    __extends(AgentModel, _super);\n    function AgentModel() {\n        return _super.call(this, agent_model_1.Agent, 'Agent', agent_model_1.AGENT_SCHEMA) || this;\n    }\n    return AgentModel;\n}(base_1.BaseModel));\nexports.AgentModel = AgentModel;\n\n\n//# sourceURL=webpack:///./models/agent/index.ts?");

/***/ }),

/***/ "./models/base.ts":
/*!************************!*\
  !*** ./models/base.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BaseModel = void 0;\nvar BaseModel = /** @class */ (function () {\n    function BaseModel(model, collection, schema) {\n        if (schema === void 0) { schema = {}; }\n        this.schema = schema;\n        this.collection = collection;\n        this.subscriberList = [];\n        this.parentCollectionId = null;\n        this.model = model;\n        if (!collection)\n            throw new Error(\"No 'collection' parameter provided in constructor.\");\n    }\n    //   generateData(id) {\n    //     return {\n    //       id: id,\n    //       ...this.schema,\n    //       createdAt: getTime(new Date()),\n    //       updatedAt: getTime(new Date()),\n    //       deletedAt: null,\n    //     };\n    //   }\n    BaseModel.prototype.create = function (data) {\n        return new this.model(data).save();\n    };\n    //   batchCreate(dataArray) {\n    //   }\n    //   fetch() {\n    //   }\n    BaseModel.prototype.findById = function (id) {\n        return this.model.findOne({ _id: id });\n    };\n    //   // for get all records from collection\n    BaseModel.prototype.find = function () {\n        return this.model.find({}, { __v: 0, password: 0, passwordSalt: 0 });\n    };\n    //   findOrCreateById(id, data) {\n    //   }\n    //   findOneByName(name) {\n    //    return this.model.findOne({name:name});\n    //   }\n    BaseModel.prototype.updateById = function (data, id) {\n        return this.model.updateOne({ _id: id }, { $set: data });\n    };\n    BaseModel.prototype.findOneByEmail = function (email) {\n        return this.model.findOne({ email: email });\n    };\n    //   updateByEmail(email, data) {\n    //   }\n    BaseModel.prototype.deleteById = function (id) {\n        return this.model.deleteOne({ _id: id });\n    };\n    return BaseModel;\n}());\nexports.BaseModel = BaseModel;\n\n\n//# sourceURL=webpack:///./models/base.ts?");

/***/ }),

/***/ "./models/database.ts":
/*!****************************!*\
  !*** ./models/database.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.disconnect = exports.connect = void 0;\nvar Mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar database;\nexports.connect = function () {\n    // add your own uri below\n    var uri = process.env.MONGOURL;\n    if (database) {\n        return;\n    }\n    Mongoose.connect(uri, {\n        useNewUrlParser: true,\n        useFindAndModify: true,\n        useUnifiedTopology: true,\n        useCreateIndex: true,\n    });\n    database = Mongoose.connection;\n    database.once(\"open\", function () { return __awaiter(void 0, void 0, void 0, function () {\n        return __generator(this, function (_a) {\n            console.log(\"Connected to database\");\n            return [2 /*return*/];\n        });\n    }); });\n    database.on(\"error\", function () {\n        console.log(\"Error connecting to database\");\n    });\n};\nexports.disconnect = function () {\n    if (!database) {\n        return;\n    }\n    Mongoose.disconnect();\n};\n\n\n//# sourceURL=webpack:///./models/database.ts?");

/***/ }),

/***/ "./models/index.ts":
/*!*************************!*\
  !*** ./models/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Admin = exports.Agent = void 0;\nvar agent_1 = __webpack_require__(/*! ./agent */ \"./models/agent/index.ts\");\nvar admin_1 = __webpack_require__(/*! ./admin */ \"./models/admin/index.ts\");\nexports.Agent = new agent_1.AgentModel();\nexports.Admin = new admin_1.AdminModel();\n\n\n//# sourceURL=webpack:///./models/index.ts?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/controllers/admin/admin.ts":
/*!****************************************!*\
  !*** ./src/controllers/admin/admin.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getAllAgents = exports.adminLogin = exports.adminRegister = void 0;\nvar constants_1 = __webpack_require__(/*! ../../../config/constants */ \"./config/constants.ts\");\nvar admin_1 = __webpack_require__(/*! ../../validators/admin */ \"./src/validators/admin.ts\");\nvar admin_2 = __webpack_require__(/*! ../../services/admin/admin */ \"./src/services/admin/admin.ts\");\nexports.adminRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, value, adminDetails, err_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                data = req.body.data;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                return [4 /*yield*/, admin_1.adminSignupValidator.validate(data)];\n            case 2:\n                value = _a.sent();\n                if (!(value.error && value.error.details.length > 0)) return [3 /*break*/, 3];\n                return [2 /*return*/, res.json({\n                        status: 'failed',\n                        message: value.error.details[0].message,\n                        code: constants_1.RESPONSE_CODES.BAD_REQUEST\n                    })];\n            case 3: return [4 /*yield*/, admin_2.adminSignup(data)];\n            case 4:\n                adminDetails = _a.sent();\n                return [2 /*return*/, res.json(adminDetails)];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                err_1 = _a.sent();\n                throw err_1;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, value, adminDetails, err_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                data = req.body.data;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                return [4 /*yield*/, admin_1.adminLoginValidator.validate(data)];\n            case 2:\n                value = _a.sent();\n                if (!(value.error && value.error.details.length > 0)) return [3 /*break*/, 3];\n                return [2 /*return*/, res.json({\n                        status: 'failed',\n                        message: value.error.details[0].message,\n                        code: constants_1.RESPONSE_CODES.BAD_REQUEST\n                    })];\n            case 3: return [4 /*yield*/, admin_2.adminSignin(data)];\n            case 4:\n                adminDetails = _a.sent();\n                return [2 /*return*/, res.json(adminDetails)];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                err_2 = _a.sent();\n                throw err_2;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.getAllAgents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var agents, err_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, admin_2.getAgents()];\n            case 1:\n                agents = _a.sent();\n                return [2 /*return*/, res.json(agents)];\n            case 2:\n                err_3 = _a.sent();\n                throw err_3;\n            case 3: return [2 /*return*/];\n        }\n    });\n}); };\n\n\n//# sourceURL=webpack:///./src/controllers/admin/admin.ts?");

/***/ }),

/***/ "./src/controllers/agent/agent.ts":
/*!****************************************!*\
  !*** ./src/controllers/agent/agent.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.agentDelete = exports.agentUpdate = exports.agentLogin = exports.agentRegister = void 0;\nvar constants_1 = __webpack_require__(/*! ../../../config/constants */ \"./config/constants.ts\");\nvar agent_1 = __webpack_require__(/*! ../../validators/agent */ \"./src/validators/agent.ts\");\nvar agent_2 = __webpack_require__(/*! ../../services/agent/agent */ \"./src/services/agent/agent.ts\");\nexports.agentRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, value, agentDetails, err_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                data = req.body.data;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                return [4 /*yield*/, agent_1.agentSignupValidator.validate(data)];\n            case 2:\n                value = _a.sent();\n                if (!(value.error && value.error.details.length > 0)) return [3 /*break*/, 3];\n                return [2 /*return*/, res.json({\n                        status: 'failed',\n                        message: value.error.details[0].message,\n                        code: constants_1.RESPONSE_CODES.BAD_REQUEST\n                    })];\n            case 3: return [4 /*yield*/, agent_2.agentSignup(data)];\n            case 4:\n                agentDetails = _a.sent();\n                return [2 /*return*/, res.json(agentDetails)];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                err_1 = _a.sent();\n                throw err_1;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.agentLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, value, agentDetails, err_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                data = req.body.data;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                return [4 /*yield*/, agent_1.agentLoginValidator.validate(data)];\n            case 2:\n                value = _a.sent();\n                if (!(value.error && value.error.details.length > 0)) return [3 /*break*/, 3];\n                return [2 /*return*/, res.json({\n                        status: 'failed',\n                        message: value.error.details[0].message,\n                        code: constants_1.RESPONSE_CODES.BAD_REQUEST\n                    })];\n            case 3: return [4 /*yield*/, agent_2.agentSignin(data)];\n            case 4:\n                agentDetails = _a.sent();\n                return [2 /*return*/, res.json(agentDetails)];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                err_2 = _a.sent();\n                throw err_2;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.agentUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, id, value, agentDetails, err_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                data = req.body.data;\n                id = req.params.id;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                return [4 /*yield*/, agent_1.agentUpdateValidator.validate(data)];\n            case 2:\n                value = _a.sent();\n                if (!(value.error && value.error.details.length > 0)) return [3 /*break*/, 3];\n                return [2 /*return*/, res.json({\n                        status: 'failed',\n                        message: value.error.details[0].message,\n                        code: constants_1.RESPONSE_CODES.BAD_REQUEST\n                    })];\n            case 3: return [4 /*yield*/, agent_2.modifyAgent(data, id)];\n            case 4:\n                agentDetails = _a.sent();\n                return [2 /*return*/, res.json(agentDetails)];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                err_3 = _a.sent();\n                throw err_3;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.agentDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, agentDetails, err_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = req.params.id;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, agent_2.deleteAgent(id)];\n            case 2:\n                agentDetails = _a.sent();\n                return [2 /*return*/, res.json(agentDetails)];\n            case 3:\n                err_4 = _a.sent();\n                throw err_4;\n            case 4: return [2 /*return*/];\n        }\n    });\n}); };\n\n\n//# sourceURL=webpack:///./src/controllers/agent/agent.ts?");

/***/ }),

/***/ "./src/routes/admin.routes.ts":
/*!************************************!*\
  !*** ./src/routes/admin.routes.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.adminRouter = void 0;\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar authorize_1 = __webpack_require__(/*! ../../_helpers/authorize */ \"./_helpers/authorize.ts\");\nvar role_1 = __webpack_require__(/*! ../../_helpers/role */ \"./_helpers/role.ts\");\nvar admin_1 = __webpack_require__(/*! ../controllers/admin/admin */ \"./src/controllers/admin/admin.ts\");\n/**\n * Controller Definitions\n */\nexports.adminRouter = express_1.default.Router();\nexports.adminRouter.post(\"/register\", admin_1.adminRegister);\nexports.adminRouter.post(\"/login\", admin_1.adminLogin);\nexports.adminRouter.get(\"/get-agents\", authorize_1.authorize(role_1.Admin), admin_1.getAllAgents);\n\n\n//# sourceURL=webpack:///./src/routes/admin.routes.ts?");

/***/ }),

/***/ "./src/routes/agent.routes.ts":
/*!************************************!*\
  !*** ./src/routes/agent.routes.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.agentRouter = void 0;\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar agent_1 = __webpack_require__(/*! ../controllers/agent/agent */ \"./src/controllers/agent/agent.ts\");\n/**\n * Controller Definitions\n */\nexports.agentRouter = express_1.default.Router();\nexports.agentRouter.post(\"/register\", agent_1.agentRegister);\nexports.agentRouter.post(\"/login\", agent_1.agentLogin);\nexports.agentRouter.put('/update/:id', agent_1.agentUpdate);\nexports.agentRouter.delete('/delete-agent/:id', agent_1.agentDelete);\n\n\n//# sourceURL=webpack:///./src/routes/agent.routes.ts?");

/***/ }),

/***/ "./src/services/admin/admin.ts":
/*!*************************************!*\
  !*** ./src/services/admin/admin.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getAgents = exports.adminSignin = exports.adminSignup = void 0;\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nvar models_1 = __webpack_require__(/*! ../../../models */ \"./models/index.ts\");\nvar crypto_1 = __webpack_require__(/*! ../../../utils/crypto */ \"./utils/crypto.ts\");\nvar constants_1 = __webpack_require__(/*! ../../../config/constants */ \"./config/constants.ts\");\nexports.adminSignup = function (data) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, adminEmail, admin, salt, hashPassword, newadmin, token, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 4, , 5]);\n                responce = {};\n                adminEmail = data.email.toLowerCase();\n                return [4 /*yield*/, models_1.Admin.findOneByEmail(adminEmail)];\n            case 1:\n                admin = _a.sent();\n                if (admin) {\n                    responce.status = 'failed';\n                    responce.message = \"admin with \" + adminEmail + \" is already exist in the system\";\n                    responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                    return [2 /*return*/, responce];\n                }\n                salt = crypto_1.genRandomString(16);\n                hashPassword = crypto_1.sha512(data.password, salt);\n                data.password = hashPassword.value;\n                data.passwordSalt = hashPassword.salt;\n                data.email = adminEmail;\n                return [4 /*yield*/, models_1.Admin.create(data)];\n            case 2:\n                newadmin = _a.sent();\n                return [4 /*yield*/, adminPayload(newadmin)];\n            case 3:\n                token = _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"admin created sucessfully\";\n                responce.data = token;\n                return [2 /*return*/, responce];\n            case 4:\n                error_1 = _a.sent();\n                throw error_1;\n            case 5: return [2 /*return*/];\n        }\n    });\n}); };\nexports.adminSignin = function (data) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, adminEmail, admin, salt, hashPassword, token, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 6, , 7]);\n                responce = {};\n                adminEmail = data.email.toLowerCase();\n                return [4 /*yield*/, models_1.Admin.findOneByEmail(adminEmail)];\n            case 1:\n                admin = _a.sent();\n                if (!!admin) return [3 /*break*/, 2];\n                responce.status = 'failed';\n                responce.message = \"admin with \" + adminEmail + \" is not exist in the system\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 2:\n                salt = admin.passwordSalt;\n                hashPassword = crypto_1.sha512(data.password, salt);\n                if (!(hashPassword.value !== admin.password)) return [3 /*break*/, 3];\n                responce.status = 'failed';\n                responce.message = \"The entered password for admin \" + adminEmail + \" is wrong\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 3: return [4 /*yield*/, adminPayload(admin)];\n            case 4:\n                token = _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"admin logged sucessfully\";\n                responce.data = token;\n                return [2 /*return*/, responce];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                error_2 = _a.sent();\n                throw error_2;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.getAgents = function () { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, agents, error_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                responce = {};\n                return [4 /*yield*/, models_1.Agent.find()];\n            case 1:\n                agents = _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"All agents\";\n                responce.data = agents;\n                return [2 /*return*/, responce];\n            case 2:\n                error_3 = _a.sent();\n                throw error_3;\n            case 3: return [2 /*return*/];\n        }\n    });\n}); };\nvar adminPayload = function (admin) {\n    var tokenPayload = {\n        id: admin._id,\n        email: admin.email,\n        name: admin.name,\n        role: 'Admin'\n    };\n    var token = jsonwebtoken_1.default.sign(tokenPayload, '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe', { expiresIn: 60 * 60 * 24 * 30 });\n    return token;\n};\n\n\n//# sourceURL=webpack:///./src/services/admin/admin.ts?");

/***/ }),

/***/ "./src/services/agent/agent.ts":
/*!*************************************!*\
  !*** ./src/services/agent/agent.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.deleteAgent = exports.modifyAgent = exports.agentSignin = exports.agentSignup = void 0;\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nvar models_1 = __webpack_require__(/*! ../../../models */ \"./models/index.ts\");\nvar crypto_1 = __webpack_require__(/*! ../../../utils/crypto */ \"./utils/crypto.ts\");\nvar constants_1 = __webpack_require__(/*! ../../../config/constants */ \"./config/constants.ts\");\nexports.agentSignup = function (data) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, agentEmail, agent, salt, hashPassword, newAgent, token, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 4, , 5]);\n                responce = {};\n                agentEmail = data.email.toLowerCase();\n                return [4 /*yield*/, models_1.Agent.findOneByEmail(agentEmail)];\n            case 1:\n                agent = _a.sent();\n                if (agent) {\n                    responce.status = 'failed';\n                    responce.message = \"agent with \" + agentEmail + \" is already exist in the system\";\n                    responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                    return [2 /*return*/, responce];\n                }\n                salt = crypto_1.genRandomString(16);\n                hashPassword = crypto_1.sha512(data.password, salt);\n                data.password = hashPassword.value;\n                data.passwordSalt = hashPassword.salt;\n                data.email = agentEmail;\n                return [4 /*yield*/, models_1.Agent.create(data)];\n            case 2:\n                newAgent = _a.sent();\n                return [4 /*yield*/, agentPayload(newAgent)];\n            case 3:\n                token = _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"agent created sucessfully\";\n                responce.data = token;\n                return [2 /*return*/, responce];\n            case 4:\n                error_1 = _a.sent();\n                throw error_1;\n            case 5: return [2 /*return*/];\n        }\n    });\n}); };\nexports.agentSignin = function (data) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, agentEmail, agent, salt, hashPassword, token, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 6, , 7]);\n                responce = {};\n                agentEmail = data.email.toLowerCase();\n                return [4 /*yield*/, models_1.Agent.findOneByEmail(agentEmail)];\n            case 1:\n                agent = _a.sent();\n                if (!!agent) return [3 /*break*/, 2];\n                responce.status = 'failed';\n                responce.message = \"agent with \" + agentEmail + \" is not exist in the system\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 2:\n                salt = agent.passwordSalt;\n                hashPassword = crypto_1.sha512(data.password, salt);\n                if (!(hashPassword.value !== agent.password)) return [3 /*break*/, 3];\n                responce.status = 'failed';\n                responce.message = \"The entered password for agent \" + agentEmail + \" is wrong\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 3: return [4 /*yield*/, agentPayload(agent)];\n            case 4:\n                token = _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"agent logged sucessfully\";\n                responce.data = token;\n                return [2 /*return*/, responce];\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                error_2 = _a.sent();\n                throw error_2;\n            case 7: return [2 /*return*/];\n        }\n    });\n}); };\nexports.modifyAgent = function (data, id) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, agent, error_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 5, , 6]);\n                responce = {};\n                return [4 /*yield*/, models_1.Agent.findById(id)];\n            case 1:\n                agent = _a.sent();\n                if (!!agent) return [3 /*break*/, 2];\n                responce.status = 'failed';\n                responce.message = \"agent with \" + agent.email + \" is not exist in the system\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 2: return [4 /*yield*/, models_1.Agent.updateById(data, id)];\n            case 3:\n                _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"agent update sucessfully\";\n                return [2 /*return*/, responce];\n            case 4: return [3 /*break*/, 6];\n            case 5:\n                error_3 = _a.sent();\n                throw error_3;\n            case 6: return [2 /*return*/];\n        }\n    });\n}); };\nexports.deleteAgent = function (id) { return __awaiter(void 0, void 0, void 0, function () {\n    var responce, agent, error_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 5, , 6]);\n                responce = {};\n                return [4 /*yield*/, models_1.Agent.findById(id)];\n            case 1:\n                agent = _a.sent();\n                if (!!agent) return [3 /*break*/, 2];\n                responce.status = 'failed';\n                responce.message = \"agent with \" + agent.email + \" is not exist in the system\";\n                responce.code = constants_1.RESPONSE_CODES.BAD_REQUEST;\n                return [2 /*return*/, responce];\n            case 2: return [4 /*yield*/, models_1.Agent.deleteById(id)];\n            case 3:\n                _a.sent();\n                responce.code = constants_1.RESPONSE_CODES.POST;\n                responce.status = 'sucess',\n                    responce.message = \"agent deleted sucessfully\";\n                return [2 /*return*/, responce];\n            case 4: return [3 /*break*/, 6];\n            case 5:\n                error_4 = _a.sent();\n                throw error_4;\n            case 6: return [2 /*return*/];\n        }\n    });\n}); };\nvar agentPayload = function (agent) {\n    var tokenPayload = {\n        id: agent._id,\n        email: agent.email,\n        name: agent.name,\n        role: 'Agent'\n    };\n    var token = jsonwebtoken_1.default.sign(tokenPayload, '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe', { expiresIn: 60 * 60 * 24 * 30 });\n    return token;\n};\n\n\n//# sourceURL=webpack:///./src/services/agent/agent.ts?");

/***/ }),

/***/ "./src/validators/admin.ts":
/*!*********************************!*\
  !*** ./src/validators/admin.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.adminLoginValidator = exports.adminSignupValidator = void 0;\nvar Joi = __webpack_require__(/*! joi */ \"joi\");\nexports.adminSignupValidator = Joi.object({\n    email: Joi.string()\n        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"email is a required field\"\n    }),\n    password: Joi.string()\n        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({\n        \"any.required\": \"password is a required field\"\n    }),\n    name: Joi.string()\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"name is a required field\"\n    }),\n});\nexports.adminLoginValidator = Joi.object({\n    email: Joi.string()\n        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"email is a required field\"\n    }),\n    password: Joi.string()\n        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({\n        \"any.required\": \"password is a required field\"\n    })\n});\n\n\n//# sourceURL=webpack:///./src/validators/admin.ts?");

/***/ }),

/***/ "./src/validators/agent.ts":
/*!*********************************!*\
  !*** ./src/validators/agent.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.agentUpdateValidator = exports.agentLoginValidator = exports.agentSignupValidator = void 0;\nvar Joi = __webpack_require__(/*! joi */ \"joi\");\nexports.agentSignupValidator = Joi.object({\n    email: Joi.string()\n        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"email is a required field\"\n    }),\n    password: Joi.string()\n        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({\n        \"any.required\": \"password is a required field\"\n    }),\n    name: Joi.string()\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"name is a required field\"\n    }),\n});\nexports.agentLoginValidator = Joi.object({\n    email: Joi.string()\n        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })\n        .min(3)\n        .max(30)\n        .required().messages({\n        \"any.required\": \"email is a required field\"\n    }),\n    password: Joi.string()\n        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({\n        \"any.required\": \"password is a required field\"\n    })\n});\nexports.agentUpdateValidator = Joi.object({\n    email: Joi.string()\n        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })\n        .min(3)\n        .max(30)\n        .messages({\n        \"any.required\": \"email is a required field\"\n    }),\n    name: Joi.string()\n        .min(3)\n        .max(30)\n        .messages({\n        \"any.required\": \"name is a required field\"\n    }),\n    phoneNumber: Joi.string()\n        .min(3)\n        .max(30)\n        .messages({\n        \"any.required\": \"name is a required field\"\n    }),\n    avatar: Joi.string()\n        .min(3)\n        .max(30)\n        .messages({\n        \"any.required\": \"name is a required field\"\n    }),\n});\n\n\n//# sourceURL=webpack:///./src/validators/agent.ts?");

/***/ }),

/***/ "./swagger.json":
/*!**********************!*\
  !*** ./swagger.json ***!
  \**********************/
/*! exports provided: swagger, info, schemes, consumes, produces, paths, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"swagger\\\":\\\"2.0\\\",\\\"info\\\":{\\\"host\\\":\\\"http://localhost:8082\\\",\\\"basePath\\\":\\\"/\\\"},\\\"schemes\\\":[\\\"http\\\"],\\\"consumes\\\":[\\\"application/json\\\"],\\\"produces\\\":[\\\"application/json\\\"],\\\"paths\\\":{\\\"/admin/register\\\":{\\\"post\\\":{\\\"summary\\\":\\\"register a new admin\\\",\\\"tags\\\":[\\\"Admin\\\"],\\\"parameters\\\":[{\\\"name\\\":\\\"body\\\",\\\"in\\\":\\\"body\\\",\\\"required\\\":true,\\\"type\\\":\\\"object\\\",\\\"schema\\\":{\\\"properties\\\":{\\\"data\\\":{\\\"properties\\\":{\\\"email\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"admin@gmail.com\\\"},\\\"password\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"12345\\\"},\\\"name\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"admin\\\"}}}}}}],\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"ok\\\"}}}},\\\"/admin/login\\\":{\\\"post\\\":{\\\"summary\\\":\\\"admin login\\\",\\\"tags\\\":[\\\"Admin\\\"],\\\"parameters\\\":[{\\\"name\\\":\\\"body\\\",\\\"in\\\":\\\"body\\\",\\\"required\\\":true,\\\"type\\\":\\\"object\\\",\\\"schema\\\":{\\\"properties\\\":{\\\"data\\\":{\\\"properties\\\":{\\\"email\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"admin@gmail.com\\\"},\\\"password\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"12345\\\"}}}}}}],\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"ok\\\"}}}},\\\"/admin/get-agents\\\":{\\\"get\\\":{\\\"summary\\\":\\\"get all agents\\\",\\\"tags\\\":[\\\"Admin\\\"],\\\"parameters\\\":[{\\\"name\\\":\\\"Authorization\\\",\\\"in\\\":\\\"header\\\",\\\"type\\\":\\\"string\\\",\\\"required\\\":true}],\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"ok\\\"}}}},\\\"/agent/register\\\":{\\\"post\\\":{\\\"summary\\\":\\\"register a new agent\\\",\\\"tags\\\":[\\\"Agent\\\"],\\\"parameters\\\":[{\\\"name\\\":\\\"body\\\",\\\"in\\\":\\\"body\\\",\\\"required\\\":true,\\\"type\\\":\\\"object\\\",\\\"schema\\\":{\\\"properties\\\":{\\\"data\\\":{\\\"properties\\\":{\\\"email\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"agent@gmail.com\\\"},\\\"password\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"12345\\\"},\\\"name\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"agent\\\"}}}}}}],\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"ok\\\"}}}},\\\"/agent/login\\\":{\\\"post\\\":{\\\"summary\\\":\\\"api for agent login\\\",\\\"tags\\\":[\\\"Agent\\\"],\\\"parameters\\\":[{\\\"name\\\":\\\"body\\\",\\\"in\\\":\\\"body\\\",\\\"required\\\":true,\\\"type\\\":\\\"object\\\",\\\"schema\\\":{\\\"properties\\\":{\\\"data\\\":{\\\"properties\\\":{\\\"email\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"agent@gmail.com\\\"},\\\"password\\\":{\\\"type\\\":\\\"string\\\",\\\"example\\\":\\\"12345\\\"}}}}}}],\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"ok\\\"}}}}}}\");\n\n//# sourceURL=webpack:///./swagger.json?");

/***/ }),

/***/ "./utils/crypto.ts":
/*!*************************!*\
  !*** ./utils/crypto.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.sha512 = exports.genRandomString = void 0;\nvar crypto_1 = __importDefault(__webpack_require__(/*! crypto */ \"crypto\"));\nexports.genRandomString = function (length) {\n    return crypto_1.default\n        .randomBytes(Math.ceil(length / 2))\n        .toString('hex')\n        .slice(0, length);\n};\nexports.sha512 = function (value, salt) {\n    var hash = crypto_1.default.createHmac('sha512', salt);\n    hash.update(value);\n    return {\n        salt: salt,\n        value: hash.digest('hex'),\n    };\n};\n\n\n//# sourceURL=webpack:///./utils/crypto.ts?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi webpack/hot/poll?100 ./index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./index.ts */\"./index.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-jwt\");\n\n//# sourceURL=webpack:///external_%22express-jwt%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-autopopulate":
/*!****************************************!*\
  !*** external "mongoose-autopopulate" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-autopopulate\");\n\n//# sourceURL=webpack:///external_%22mongoose-autopopulate%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"swagger-ui-express\");\n\n//# sourceURL=webpack:///external_%22swagger-ui-express%22?");

/***/ })

/******/ });