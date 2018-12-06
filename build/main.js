/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/map-content-to-topper.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

var themeImageRatio = {
	'split-text-center': 'split',
	'split-text-left': 'split',
	'full-bleed-image-center': 'full-bleed',
	'full-bleed-image-left': 'full-bleed',
	'full-bleed-offset': 'full-bleed'
};

var isNews = function isNews(content) {
	return content.annotations && content.annotations.find(function (a) {
		return a.prefLabel === 'News';
	});
};

var getTopperSettings = function getTopperSettings(content) {
	content.topper = content.topper || {};
	//live blogs and news packages
	if (content.realtime && content.liveBlog || content['package'] && isNews(content['package']) && content['package'].contains[0].id === content.id || content.type === 'package' && isNews(content)) {

		var designTheme = content['package'] && content['package'].design.theme || content.design && content.design.theme;
		var isStandaloneLiveBlog = !content['package'] && content.realtime && content.liveBlog;

		var isLoud = designTheme === 'extra' || isStandaloneLiveBlog;

		return {
			layout: null,
			backgroundColour: isLoud ? 'crimson' : 'wheat',
			modifiers: ['news-package'],
			themeImageRatio: 'split',
			includesImage: true,
			isExperimental: true
		};

		//Articles within a package get a slate offset topper if the package has the 'extra' theme
	} else if (content.containedIn && content.containedIn.length && content['package'] && content['package'].design.theme.includes('extra') && !isNews(content['package'])) {
		return {
			layout: 'full-bleed-offset',
			largeHeadline: true,
			backgroundColour: 'slate',
			modifiers: ['full-bleed-offset', 'package-extra'],
			includesImage: true
		};

		//package landing pages
	} else if (content.type === 'package' && content.design && content.design.theme) {
		var themeMap = {
			'basic': {
				bgColour: 'wheat',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'special-report': {
				bgColour: 'claret',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'extra': {
				bgColour: 'slate',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'extra-wide': {
				bgColour: 'slate',
				layout: 'split-text-left',
				largeHeadline: true
			}
		};

		var selectedTheme = themeMap[content.design.theme];
		var modifiers = [selectedTheme.layout, 'package', 'package-' + content.design.theme];

		return {
			layout: selectedTheme.layout,
			largeHeadline: selectedTheme.largeHeadline,
			backgroundColour: selectedTheme.bgColour,
			modifiers: modifiers,
			includesImage: true
		};

		//otherwise use the editorially selected topper if it exists
	} else if (content.topper && content.topper.layout && themeImageRatio.hasOwnProperty(content.topper.layout)) {
		var hasImage = content.topper.layout !== 'full-bleed-text';
		var backgroundColour = void 0;

		//converts old palette colours to new palette colours from Methode
		if (content.topper.layout === 'full-bleed-offset') {
			backgroundColour = 'paper';
		} else if (content.topper.backgroundColour === 'pink') {
			backgroundColour = 'paper';
		} else if (content.topper.backgroundColour === 'blue') {
			backgroundColour = 'oxford';
		} else {
			backgroundColour = content.topper.backgroundColour || 'paper';
		}

		return {
			layout: content.topper.layout,
			largeHeadline: true,
			backgroundColour: backgroundColour,
			modifiers: [content.topper.layout],
			includesImage: hasImage
		};

		//Branded regular toppers
	} else if (content.brandConcept || content.topper && content.topper.isBranded || content.genreConcept && content.genreConcept.id === '6da31a37-691f-4908-896f-2829ebe2309e') {
		var fthead = Array.isArray(content.authorConcepts) && content.authorConcepts.reduce(function (attrs) {
			var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    attributes = _ref.attributes;

			return attrs.concat(attributes);
		}, []).find(function () {
			var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    key = _ref2.key;

			return key === 'headshot';
		});

		fthead = fthead ? fthead.value : '';
		var _modifiers = fthead ? ['branded', 'has-headshot'] : ['branded'];

		var _backgroundColour = void 0;
		var headshotTint = void 0;
		var isOpinion = false;

		if (content.genreConcept && content.genreConcept.id === '6da31a37-691f-4908-896f-2829ebe2309e') {
			// opinion
			_backgroundColour = content.containedIn && content.containedIn.length ? 'wheat' : 'sky';
			_modifiers.push('opinion');
			headshotTint = '054593,d6d5d3';
			isOpinion = true;
		} else {
			_backgroundColour = 'wheat';
		}

		if (content.topper && content.topper.backgroundColour) {
			_backgroundColour = content.topper.backgroundColour;
		}

		return {
			layout: 'branded',
			backgroundColour: _backgroundColour,
			includesTeaser: true,
			modifiers: _modifiers,
			isOpinion: isOpinion,
			headshotTint: headshotTint,
			fthead: fthead
		};

		//everything else gets a regular topper
	} else {
		return {
			layout: null,
			backgroundColour: 'paper',
			includesTeaser: true,
			modifiers: ['basic']
		};
	}
};

var hasDarkBackground = function hasDarkBackground(backgroundColour) {
	var darkBackgrounds = ['black', 'slate', 'oxford', 'claret', 'crimson'];
	return darkBackgrounds.indexOf(backgroundColour) > -1;
};

module.exports = function (content) {
	var topper = content.topper || {};
	var settings = getTopperSettings(content);
	return Object.assign({}, topper, {
		headline: topper.headline || content.title,
		standfirst: content.descriptionHTML || topper.standfirst || content.standfirst,
		themeImageRatio: themeImageRatio[settings.layout]
	}, settings, { hasDarkBackground: hasDarkBackground(settings.backgroundColour) });
};


/***/ }),

/***/ "./main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

exports.mapContentToTopper = __webpack_require__("./js/map-content-to-topper.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDM2YmViYzBkNDFlZmI1OWFmZGI5IiwiLi9qcy9tYXAtY29udGVudC10by10b3BwZXIuanMiLCIuL21haW4uanMiXSwibmFtZXMiOlsidGhlbWVJbWFnZVJhdGlvIiwiaXNOZXdzIiwiY29udGVudCIsImFubm90YXRpb25zIiwiZmluZCIsImEiLCJwcmVmTGFiZWwiLCJnZXRUb3BwZXJTZXR0aW5ncyIsInRvcHBlciIsInJlYWx0aW1lIiwibGl2ZUJsb2ciLCJjb250YWlucyIsImlkIiwidHlwZSIsImRlc2lnblRoZW1lIiwiZGVzaWduIiwidGhlbWUiLCJpc1N0YW5kYWxvbmVMaXZlQmxvZyIsImlzTG91ZCIsImxheW91dCIsImJhY2tncm91bmRDb2xvdXIiLCJtb2RpZmllcnMiLCJpbmNsdWRlc0ltYWdlIiwiaXNFeHBlcmltZW50YWwiLCJjb250YWluZWRJbiIsImxlbmd0aCIsImluY2x1ZGVzIiwibGFyZ2VIZWFkbGluZSIsInRoZW1lTWFwIiwiYmdDb2xvdXIiLCJzZWxlY3RlZFRoZW1lIiwiaGFzT3duUHJvcGVydHkiLCJoYXNJbWFnZSIsImJyYW5kQ29uY2VwdCIsImlzQnJhbmRlZCIsImdlbnJlQ29uY2VwdCIsImZ0aGVhZCIsIkFycmF5IiwiaXNBcnJheSIsImF1dGhvckNvbmNlcHRzIiwicmVkdWNlIiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwiY29uY2F0Iiwia2V5IiwidmFsdWUiLCJoZWFkc2hvdFRpbnQiLCJpc09waW5pb24iLCJwdXNoIiwiaW5jbHVkZXNUZWFzZXIiLCJoYXNEYXJrQmFja2dyb3VuZCIsImRhcmtCYWNrZ3JvdW5kcyIsImluZGV4T2YiLCJtb2R1bGUiLCJleHBvcnRzIiwic2V0dGluZ3MiLCJPYmplY3QiLCJhc3NpZ24iLCJoZWFkbGluZSIsInRpdGxlIiwic3RhbmRmaXJzdCIsImRlc2NyaXB0aW9uSFRNTCIsIm1hcENvbnRlbnRUb1RvcHBlciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7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QUNOakQsTUFETSxFQUVOO0FBQ0NrRCxZQUFVbEQsT0FBT2tELFFBQVAsSUFBbUJ4RCxRQUFReUQsS0FEdEM7QUFFQ0MsY0FBWTFELFFBQVEyRCxlQUFSLElBQTJCckQsT0FBT29ELFVBQWxDLElBQWdEMUQsUUFBUTBELFVBRnJFO0FBR0M1RCxtQkFBaUJBLGdCQUFnQnVELFNBQVNwQyxNQUF6QjtBQUhsQixFQUZNLEVBT05vQyxRQVBNLEVBUU4sRUFBRUwsbUJBQW1CQSxrQkFBa0JLLFNBQVNuQyxnQkFBM0IsQ0FBckIsRUFSTSxDQUFQO0FBU0EsQ0FaRCxDOzs7Ozs7Ozs7Ozs7OztBQ3BLQWtDLFFBQVFRLGtCQUFSLEdBQTZCQyxtQkFBT0EsQ0FBQywrQkFBUixDQUE3QixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbWFpbi5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNmJlYmMwZDQxZWZiNTlhZmRiOSIsImNvbnN0IHRoZW1lSW1hZ2VSYXRpbyA9IHtcblx0J3NwbGl0LXRleHQtY2VudGVyJzogJ3NwbGl0Jyxcblx0J3NwbGl0LXRleHQtbGVmdCc6ICdzcGxpdCcsXG5cdCdmdWxsLWJsZWVkLWltYWdlLWNlbnRlcic6ICdmdWxsLWJsZWVkJyxcblx0J2Z1bGwtYmxlZWQtaW1hZ2UtbGVmdCc6ICdmdWxsLWJsZWVkJyxcblx0J2Z1bGwtYmxlZWQtb2Zmc2V0JzogJ2Z1bGwtYmxlZWQnXG59O1xuXG5jb25zdCBpc05ld3MgPSBjb250ZW50ID0+IGNvbnRlbnQuYW5ub3RhdGlvbnMgJiYgY29udGVudC5hbm5vdGF0aW9ucy5maW5kKGEgPT4gYS5wcmVmTGFiZWwgPT09ICdOZXdzJyk7XG5cbmNvbnN0IGdldFRvcHBlclNldHRpbmdzID0gY29udGVudCA9PiB7XG5cdGNvbnRlbnQudG9wcGVyID0gY29udGVudC50b3BwZXIgfHwge307XG5cdC8vbGl2ZSBibG9ncyBhbmQgbmV3cyBwYWNrYWdlc1xuXHRpZiAoY29udGVudC5yZWFsdGltZSAmJiBjb250ZW50LmxpdmVCbG9nIHx8XG5cdFx0Y29udGVudC5wYWNrYWdlICYmIGlzTmV3cyhjb250ZW50LnBhY2thZ2UpICYmIGNvbnRlbnQucGFja2FnZS5jb250YWluc1swXS5pZCA9PT0gY29udGVudC5pZCB8fFxuXHRcdGNvbnRlbnQudHlwZSA9PT0gJ3BhY2thZ2UnICYmIGlzTmV3cyhjb250ZW50KSkge1xuXG5cdFx0Y29uc3QgZGVzaWduVGhlbWUgPSBjb250ZW50LnBhY2thZ2UgJiYgY29udGVudC5wYWNrYWdlLmRlc2lnbi50aGVtZSB8fCBjb250ZW50LmRlc2lnbiAmJiBjb250ZW50LmRlc2lnbi50aGVtZTtcblx0XHRjb25zdCBpc1N0YW5kYWxvbmVMaXZlQmxvZyA9ICFjb250ZW50LnBhY2thZ2UgJiYgY29udGVudC5yZWFsdGltZSAmJiBjb250ZW50LmxpdmVCbG9nO1xuXG5cdFx0Y29uc3QgaXNMb3VkID0gZGVzaWduVGhlbWUgPT09ICdleHRyYScgfHwgaXNTdGFuZGFsb25lTGl2ZUJsb2c7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGF5b3V0OiBudWxsLFxuXHRcdFx0YmFja2dyb3VuZENvbG91cjogaXNMb3VkID8gJ2NyaW1zb24nIDogJ3doZWF0Jyxcblx0XHRcdG1vZGlmaWVyczogWyduZXdzLXBhY2thZ2UnXSxcblx0XHRcdHRoZW1lSW1hZ2VSYXRpbzogJ3NwbGl0Jyxcblx0XHRcdGluY2x1ZGVzSW1hZ2U6IHRydWUsXG5cdFx0XHRpc0V4cGVyaW1lbnRhbDogdHJ1ZSxcblx0XHR9O1xuXG5cblx0Ly9BcnRpY2xlcyB3aXRoaW4gYSBwYWNrYWdlIGdldCBhIHNsYXRlIG9mZnNldCB0b3BwZXIgaWYgdGhlIHBhY2thZ2UgaGFzIHRoZSAnZXh0cmEnIHRoZW1lXG5cdH0gZWxzZSBpZiAoY29udGVudC5jb250YWluZWRJbiAmJiBjb250ZW50LmNvbnRhaW5lZEluLmxlbmd0aCAmJiBjb250ZW50LnBhY2thZ2UgJiYgY29udGVudC5wYWNrYWdlLmRlc2lnbi50aGVtZS5pbmNsdWRlcygnZXh0cmEnKSAmJiAhaXNOZXdzKGNvbnRlbnQucGFja2FnZSkpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGF5b3V0OiAnZnVsbC1ibGVlZC1vZmZzZXQnLFxuXHRcdFx0bGFyZ2VIZWFkbGluZTogdHJ1ZSxcblx0XHRcdGJhY2tncm91bmRDb2xvdXI6ICdzbGF0ZScsXG5cdFx0XHRtb2RpZmllcnM6IFsnZnVsbC1ibGVlZC1vZmZzZXQnLCAncGFja2FnZS1leHRyYSddLFxuXHRcdFx0aW5jbHVkZXNJbWFnZTogdHJ1ZVxuXHRcdH07XG5cblx0Ly9wYWNrYWdlIGxhbmRpbmcgcGFnZXNcblx0fSBlbHNlIGlmIChjb250ZW50LnR5cGUgPT09ICdwYWNrYWdlJyAmJiBjb250ZW50LmRlc2lnbiAmJiBjb250ZW50LmRlc2lnbi50aGVtZSkge1xuXHRcdGNvbnN0IHRoZW1lTWFwID0ge1xuXHRcdFx0J2Jhc2ljJzoge1xuXHRcdFx0XHRiZ0NvbG91cjogJ3doZWF0Jyxcblx0XHRcdFx0bGF5b3V0OiAnc3BsaXQtdGV4dC1sZWZ0Jyxcblx0XHRcdFx0bGFyZ2VIZWFkbGluZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdzcGVjaWFsLXJlcG9ydCc6IHtcblx0XHRcdFx0YmdDb2xvdXI6ICdjbGFyZXQnLFxuXHRcdFx0XHRsYXlvdXQ6ICdzcGxpdC10ZXh0LWxlZnQnLFxuXHRcdFx0XHRsYXJnZUhlYWRsaW5lOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0J2V4dHJhJzoge1xuXHRcdFx0XHRiZ0NvbG91cjogJ3NsYXRlJyxcblx0XHRcdFx0bGF5b3V0OiAnc3BsaXQtdGV4dC1sZWZ0Jyxcblx0XHRcdFx0bGFyZ2VIZWFkbGluZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdleHRyYS13aWRlJzoge1xuXHRcdFx0XHRiZ0NvbG91cjogJ3NsYXRlJyxcblx0XHRcdFx0bGF5b3V0OiAnc3BsaXQtdGV4dC1sZWZ0Jyxcblx0XHRcdFx0bGFyZ2VIZWFkbGluZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb25zdCBzZWxlY3RlZFRoZW1lID0gdGhlbWVNYXBbY29udGVudC5kZXNpZ24udGhlbWVdO1xuXHRcdGNvbnN0IG1vZGlmaWVycyA9IFtzZWxlY3RlZFRoZW1lLmxheW91dCwgJ3BhY2thZ2UnLCBgcGFja2FnZS0ke2NvbnRlbnQuZGVzaWduLnRoZW1lfWBdO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGxheW91dDogc2VsZWN0ZWRUaGVtZS5sYXlvdXQsXG5cdFx0XHRsYXJnZUhlYWRsaW5lOiBzZWxlY3RlZFRoZW1lLmxhcmdlSGVhZGxpbmUsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyOiBzZWxlY3RlZFRoZW1lLmJnQ29sb3VyLFxuXHRcdFx0bW9kaWZpZXJzLFxuXHRcdFx0aW5jbHVkZXNJbWFnZTogdHJ1ZVxuXHRcdH07XG5cblx0XHQvL290aGVyd2lzZSB1c2UgdGhlIGVkaXRvcmlhbGx5IHNlbGVjdGVkIHRvcHBlciBpZiBpdCBleGlzdHNcblx0fSBlbHNlIGlmKGNvbnRlbnQudG9wcGVyICYmIGNvbnRlbnQudG9wcGVyLmxheW91dCAmJiB0aGVtZUltYWdlUmF0aW8uaGFzT3duUHJvcGVydHkoY29udGVudC50b3BwZXIubGF5b3V0KSkge1xuXHRcdGNvbnN0IGhhc0ltYWdlID0gY29udGVudC50b3BwZXIubGF5b3V0ICE9PSAnZnVsbC1ibGVlZC10ZXh0Jztcblx0XHRsZXQgYmFja2dyb3VuZENvbG91cjtcblxuXHRcdC8vY29udmVydHMgb2xkIHBhbGV0dGUgY29sb3VycyB0byBuZXcgcGFsZXR0ZSBjb2xvdXJzIGZyb20gTWV0aG9kZVxuXHRcdGlmIChjb250ZW50LnRvcHBlci5sYXlvdXQgPT09ICdmdWxsLWJsZWVkLW9mZnNldCcpIHtcblx0XHRcdGJhY2tncm91bmRDb2xvdXIgPSAncGFwZXInO1xuXHRcdH0gZWxzZSBpZiAoY29udGVudC50b3BwZXIuYmFja2dyb3VuZENvbG91ciA9PT0gJ3BpbmsnKSB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyID0gJ3BhcGVyJztcblx0XHR9IGVsc2UgaWYgKGNvbnRlbnQudG9wcGVyLmJhY2tncm91bmRDb2xvdXIgPT09ICdibHVlJykge1xuXHRcdFx0YmFja2dyb3VuZENvbG91ciA9ICdveGZvcmQnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyID0gY29udGVudC50b3BwZXIuYmFja2dyb3VuZENvbG91ciB8fCAncGFwZXInO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRsYXlvdXQ6IGNvbnRlbnQudG9wcGVyLmxheW91dCxcblx0XHRcdGxhcmdlSGVhZGxpbmU6IHRydWUsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyLFxuXHRcdFx0bW9kaWZpZXJzOiBbY29udGVudC50b3BwZXIubGF5b3V0XSxcblx0XHRcdGluY2x1ZGVzSW1hZ2U6IGhhc0ltYWdlXG5cdFx0fTtcblxuXHRcdC8vQnJhbmRlZCByZWd1bGFyIHRvcHBlcnNcblx0fSBlbHNlIGlmKGNvbnRlbnQuYnJhbmRDb25jZXB0IHx8IChjb250ZW50LnRvcHBlciAmJiBjb250ZW50LnRvcHBlci5pc0JyYW5kZWQpIHx8IChjb250ZW50LmdlbnJlQ29uY2VwdCAmJiBjb250ZW50LmdlbnJlQ29uY2VwdC5pZCA9PT0gJzZkYTMxYTM3LTY5MWYtNDkwOC04OTZmLTI4MjllYmUyMzA5ZScpKSB7XG5cdFx0bGV0IGZ0aGVhZCA9IEFycmF5LmlzQXJyYXkoY29udGVudC5hdXRob3JDb25jZXB0cykgJiZcblx0XHRcdGNvbnRlbnQuYXV0aG9yQ29uY2VwdHMucmVkdWNlKFxuXHRcdFx0XHQoYXR0cnMsIHthdHRyaWJ1dGVzfSA9IHt9KSA9PiBhdHRycy5jb25jYXQoYXR0cmlidXRlcyksXG5cdFx0XHRcdFtdXG5cdFx0XHQpLmZpbmQoXG5cdFx0XHRcdCh7a2V5fSA9IHt9KSA9PiBrZXkgPT09ICdoZWFkc2hvdCdcblx0XHRcdCk7XG5cblx0XHRmdGhlYWQgPSBmdGhlYWQgPyBmdGhlYWQudmFsdWUgOiAnJztcblx0XHRjb25zdCBtb2RpZmllcnMgPSBmdGhlYWQgPyBbJ2JyYW5kZWQnLCAnaGFzLWhlYWRzaG90J10gOiBbJ2JyYW5kZWQnXTtcblxuXHRcdGxldCBiYWNrZ3JvdW5kQ29sb3VyO1xuXHRcdGxldCBoZWFkc2hvdFRpbnQ7XG5cdFx0bGV0IGlzT3BpbmlvbiA9IGZhbHNlO1xuXG5cdFx0aWYoY29udGVudC5nZW5yZUNvbmNlcHQgJiYgY29udGVudC5nZW5yZUNvbmNlcHQuaWQgPT09ICc2ZGEzMWEzNy02OTFmLTQ5MDgtODk2Zi0yODI5ZWJlMjMwOWUnKSB7IC8vIG9waW5pb25cblx0XHRcdGJhY2tncm91bmRDb2xvdXIgPSBjb250ZW50LmNvbnRhaW5lZEluICYmIGNvbnRlbnQuY29udGFpbmVkSW4ubGVuZ3RoID8gJ3doZWF0JyA6ICdza3knO1xuXHRcdFx0bW9kaWZpZXJzLnB1c2goJ29waW5pb24nKTtcblx0XHRcdGhlYWRzaG90VGludCA9ICcwNTQ1OTMsZDZkNWQzJztcblx0XHRcdGlzT3BpbmlvbiA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJhY2tncm91bmRDb2xvdXIgPSAnd2hlYXQnO1xuXHRcdH1cblxuXHRcdGlmIChjb250ZW50LnRvcHBlciAmJiBjb250ZW50LnRvcHBlci5iYWNrZ3JvdW5kQ29sb3VyKSB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyID0gY29udGVudC50b3BwZXIuYmFja2dyb3VuZENvbG91cjtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGF5b3V0OiAnYnJhbmRlZCcsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3VyLFxuXHRcdFx0aW5jbHVkZXNUZWFzZXI6IHRydWUsXG5cdFx0XHRtb2RpZmllcnMsXG5cdFx0XHRpc09waW5pb24sXG5cdFx0XHRoZWFkc2hvdFRpbnQsXG5cdFx0XHRmdGhlYWQsXG5cdFx0fTtcblxuXHQvL2V2ZXJ5dGhpbmcgZWxzZSBnZXRzIGEgcmVndWxhciB0b3BwZXJcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGF5b3V0OiBudWxsLFxuXHRcdFx0YmFja2dyb3VuZENvbG91cjogJ3BhcGVyJyxcblx0XHRcdGluY2x1ZGVzVGVhc2VyOiB0cnVlLFxuXHRcdFx0bW9kaWZpZXJzOiBbJ2Jhc2ljJ10sXG5cdFx0fTtcblx0fVxufTtcblxuY29uc3QgaGFzRGFya0JhY2tncm91bmQgPSAoYmFja2dyb3VuZENvbG91cikgPT4ge1xuXHRjb25zdCBkYXJrQmFja2dyb3VuZHMgPSBbXG5cdFx0J2JsYWNrJyxcblx0XHQnc2xhdGUnLFxuXHRcdCdveGZvcmQnLFxuXHRcdCdjbGFyZXQnLFxuXHRcdCdjcmltc29uJ1xuXHRdO1xuXHRyZXR1cm4gKGRhcmtCYWNrZ3JvdW5kcy5pbmRleE9mKGJhY2tncm91bmRDb2xvdXIpID4gLTEpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50ID0+IHtcblx0Y29uc3QgdG9wcGVyID0gY29udGVudC50b3BwZXIgfHwge307XG5cdGNvbnN0IHNldHRpbmdzID0gZ2V0VG9wcGVyU2V0dGluZ3MoY29udGVudCk7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LFxuXHRcdHRvcHBlcixcblx0XHR7XG5cdFx0XHRoZWFkbGluZTogdG9wcGVyLmhlYWRsaW5lIHx8IGNvbnRlbnQudGl0bGUsXG5cdFx0XHRzdGFuZGZpcnN0OiBjb250ZW50LmRlc2NyaXB0aW9uSFRNTCB8fCB0b3BwZXIuc3RhbmRmaXJzdCB8fCBjb250ZW50LnN0YW5kZmlyc3QsXG5cdFx0XHR0aGVtZUltYWdlUmF0aW86IHRoZW1lSW1hZ2VSYXRpb1tzZXR0aW5ncy5sYXlvdXRdXG5cdFx0fSxcblx0XHRzZXR0aW5ncyxcblx0XHR7IGhhc0RhcmtCYWNrZ3JvdW5kOiBoYXNEYXJrQmFja2dyb3VuZChzZXR0aW5ncy5iYWNrZ3JvdW5kQ29sb3VyKSB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tYXAtY29udGVudC10by10b3BwZXIuanMiLCJleHBvcnRzLm1hcENvbnRlbnRUb1RvcHBlciA9IHJlcXVpcmUoJy4vanMvbWFwLWNvbnRlbnQtdG8tdG9wcGVyJyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==