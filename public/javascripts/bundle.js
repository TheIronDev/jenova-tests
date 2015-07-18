/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	// Using WebPack
	var jenova = __webpack_require__(1);

	var initialBoard = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 1, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];

	function generateBoard(board, canvas) {

		var ctx = canvas.getContext('2d'),
			width = canvas.width,
			height = canvas.height,
			cellHeight = height/ board.length,
			cellWidth = width / board[0].length;

		// Loop through the board and draw each cell
		board.forEach(function(row, rowIndex) {
			row.forEach(function(col, colIndex) {
				ctx.fillStyle = col ? '#ccc' : '#fff';
				ctx.fillRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
				ctx.strokeRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
			});
		});

		console.log(jenova.compress(board));

		// Finally Generate a new board, with a callback to redraw it
		jenova.next(board, function(newBoard) {
			setTimeout(generateBoard.bind(this, newBoard, canvas), 200);
		});
	}

	window.requestAnimationFrame(generateBoard.bind(this, initialBoard, document.getElementById('myCanvas')));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var compress = __webpack_require__(2),
		expand = __webpack_require__(29),
		next = __webpack_require__(30);

	module.exports = {
		compress: compress,
		expand: expand,
		next: next
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aa = __webpack_require__(3);

	/**
	 * Given a board array, return a compressed value
	 * @param boardArray {Matrix} game of life board
	 * @returns {number?/String?} compressed game of life board
	 */
	function compress(boardArray) {

		var boardString =  boardArray.reduce(function(memo, row) {
			memo += row.join('');
			return memo;
		}, '');

		return {
			height: boardArray.length || 0,
			width: boardArray[0] && boardArray[0].length || 0,
			compressed: aa.compress(boardString, {outputEncoding: 'BinaryString'})
		};
	}

	module.exports = compress;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer, setImmediate) {/*
	 LZ-UTF8 v0.2.2

	 Copyright (c) 2014-2015, Rotem Dan <rotemdan@gmail.com> 
	 Released under the MIT license.

	 Build date: 2015-07-18 
	*/
	var LZUTF8;
	(function (LZUTF8) {
	    function runningInNodeJS() {
	        return ((typeof process === "object") && (typeof process.versions === "object") && (typeof process.versions.node === "string"));
	    }
	    LZUTF8.runningInNodeJS = runningInNodeJS;
	    if (runningInNodeJS()) {
	        module.exports = LZUTF8;
	    }
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var StringBuilder = (function () {
	        function StringBuilder() {
	            this.outputBuffer = new Array(1024);
	            this.outputPosition = 0;
	            this.outputString = "";
	        }
	        StringBuilder.prototype.append = function (charCode) {
	            this.outputBuffer[this.outputPosition++] = charCode;
	            if (this.outputPosition === 1024)
	                this.flushBufferToOutputString();
	        };
	        StringBuilder.prototype.appendCodePoint = function (codePoint) {
	            if (codePoint <= 0xFFFF) {
	                this.append(codePoint);
	            }
	            else if (codePoint <= 0x10FFFF) {
	                this.append(0xD800 + ((codePoint - 0x10000) >>> 10));
	                this.append(0xDC00 + ((codePoint - 0x10000) & 1023));
	            }
	            else
	                throw new RangeError("StringBuilder.appendCodePoint: A code point of " + codePoint + " cannot be encoded in UTF-16");
	        };
	        StringBuilder.prototype.toString = function () {
	            this.flushBufferToOutputString();
	            return this.outputString;
	        };
	        StringBuilder.prototype.flushBufferToOutputString = function () {
	            if (this.outputPosition === 1024)
	                this.outputString += String.fromCharCode.apply(null, this.outputBuffer);
	            else
	                this.outputString += String.fromCharCode.apply(null, this.outputBuffer.slice(0, this.outputPosition));
	            this.outputPosition = 0;
	        };
	        return StringBuilder;
	    })();
	    LZUTF8.StringBuilder = StringBuilder;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var ArraySegment = (function () {
	        function ArraySegment() {
	        }
	        ArraySegment.prototype.get = function (index) {
	            return this.container[this.startPosition + index];
	        };
	        ArraySegment.prototype.getInReversedOrder = function (reverseIndex) {
	            return this.container[this.startPosition + this.length - 1 - reverseIndex];
	        };
	        ArraySegment.prototype.set = function (index, value) {
	            this.container[this.startPosition + index] = value;
	        };
	        return ArraySegment;
	    })();
	    LZUTF8.ArraySegment = ArraySegment;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var ArrayTools = (function () {
	        function ArrayTools() {
	        }
	        ArrayTools.copyElements = function (source, sourceIndex, destination, destinationIndex, count) {
	            while (count--)
	                destination[destinationIndex++] = source[sourceIndex++];
	        };
	        ArrayTools.zeroElements = function (collection, index, count) {
	            while (count--)
	                collection[index++] = 0;
	        };
	        ArrayTools.find = function (collection, itemToFind) {
	            for (var i = 0; i < collection.length; i++)
	                if (collection[i] === itemToFind)
	                    return i;
	            return -1;
	        };
	        ArrayTools.compareSequences = function (sequence1, sequence2) {
	            var lengthMatched = true;
	            var elementsMatched = true;
	            if (sequence1.length !== sequence2.length) {
	                console.log("Sequence length did not match: sequence 1 length is " + sequence1.length + ", sequence 2 length is " + sequence2.length);
	                lengthMatched = false;
	            }
	            for (var i = 0; i < Math.min(sequence1.length, sequence2.length); i++)
	                if (sequence1[i] !== sequence2[i]) {
	                    console.log("Sequence elements did not match: sequence1[" + i + "] === " + sequence1[i] + ", sequence2[" + i + "] === " + sequence2[i]);
	                    elementsMatched = false;
	                    break;
	                }
	            return lengthMatched && elementsMatched;
	        };
	        ArrayTools.countNonzeroValuesInArray = function (array) {
	            var result = 0;
	            for (var i = 0; i < array.length; i++)
	                if (array[i])
	                    result++;
	            return result;
	        };
	        ArrayTools.truncateStartingElements = function (array, truncatedLength) {
	            if (array.length <= truncatedLength)
	                throw new RangeError("truncateStartingElements: Requested length should be smaller than array length");
	            var sourcePosition = array.length - truncatedLength;
	            for (var i = 0; i < truncatedLength; i++)
	                array[i] = array[sourcePosition + i];
	            array.length = truncatedLength;
	        };
	        ArrayTools.doubleByteArrayCapacity = function (array) {
	            var newArray = LZUTF8.newByteArray(array.length * 2);
	            newArray.set(array);
	            return newArray;
	        };
	        ArrayTools.joinByteArrays = function (byteArrays) {
	            var totalLength = 0;
	            for (var i = 0; i < byteArrays.length; i++) {
	                totalLength += byteArrays[i].length;
	            }
	            var result = LZUTF8.newByteArray(totalLength);
	            var currentOffset = 0;
	            for (var i = 0; i < byteArrays.length; i++) {
	                result.set(byteArrays[i], currentOffset);
	                currentOffset += byteArrays[i].length;
	            }
	            return result;
	        };
	        ArrayTools.splitByteArray = function (byteArray, maxPartLength) {
	            var result = [];
	            for (var offset = 0; offset < byteArray.length;) {
	                var blockLength = Math.min(maxPartLength, byteArray.length - offset);
	                result.push(byteArray.subarray(offset, offset + blockLength));
	                offset += blockLength;
	            }
	            return result;
	        };
	        return ArrayTools;
	    })();
	    LZUTF8.ArrayTools = ArrayTools;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    function newByteArray(param) {
	        if (LZUTF8.runningInNodeJS()) {
	            return convertToByteArray(new Buffer(param));
	        }
	        else if (typeof Uint8Array == "function") {
	            return new Uint8Array(param);
	        }
	        else {
	            if (typeof param == "number")
	                return convertToByteArray(new Array(param));
	            else if (param instanceof Array)
	                return convertToByteArray(param.slice(0));
	            else
	                throw new TypeError("newByteArray: Invalid parameter");
	        }
	    }
	    LZUTF8.newByteArray = newByteArray;
	    function convertToByteArray(array) {
	        if (array == null)
	            return array;
	        if (LZUTF8.runningInNodeJS()) {
	            if (array instanceof Buffer) {
	                array["set"] = bufferSetFunctionPolyfill;
	                array["subarray"] = genericArraySubarrayFunctionPolyfill;
	                return array;
	            }
	            else if (array instanceof Uint8Array || array instanceof Array) {
	                return newByteArray(array);
	            }
	            else
	                throw new TypeError("convertToByteArray: invalid input array type");
	        }
	        else if (typeof Uint8Array == "function") {
	            if (array instanceof Uint8Array) {
	                return array;
	            }
	            else if (array instanceof Array) {
	                return new Uint8Array(array);
	            }
	            else
	                throw new TypeError("convertToByteArray: invalid input array type");
	        }
	        else if (array instanceof Array) {
	            array["set"] = genericArraySetFunctionPolyfill;
	            array["subarray"] = genericArraySubarrayFunctionPolyfill;
	            return array;
	        }
	        else
	            throw new TypeError("convertToByteArray: invalid input array type");
	    }
	    LZUTF8.convertToByteArray = convertToByteArray;
	    function bufferSetFunctionPolyfill(source, offset) {
	        if (offset === void 0) { offset = 0; }
	        if (source instanceof Buffer) {
	            var sourceAsBuffer = source;
	            sourceAsBuffer.copy(this, offset);
	        }
	        else if (source instanceof Uint8Array || source instanceof Array) {
	            genericArraySetFunctionPolyfill(source, offset);
	        }
	        else
	            throw new TypeError("bufferSetFunctionPolyfill polyfill: Invalid source");
	    }
	    function genericArraySetFunctionPolyfill(source, offset) {
	        if (offset === void 0) { offset = 0; }
	        for (var i = 0, copyCount = Math.min(this.length - offset, source.length); i < copyCount; i++)
	            this[i + offset] = source[i];
	    }
	    function genericArraySubarrayFunctionPolyfill(start, end) {
	        if (end === undefined)
	            end = this.length;
	        return convertToByteArray(this.slice(start, end));
	    }
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var CompressionCommon = (function () {
	        function CompressionCommon() {
	        }
	        CompressionCommon.getCroppedBuffer = function (buffer, cropStartOffset, cropLength, additionalCapacity) {
	            if (additionalCapacity === void 0) { additionalCapacity = 0; }
	            var croppedBuffer = LZUTF8.newByteArray(cropLength + additionalCapacity);
	            croppedBuffer.set(buffer.subarray(cropStartOffset, cropStartOffset + cropLength));
	            return croppedBuffer;
	        };
	        CompressionCommon.getCroppedAndAppendedBuffer = function (buffer, cropStartOffset, cropLength, bufferToAppend) {
	            return LZUTF8.ArrayTools.joinByteArrays([buffer.subarray(cropStartOffset, cropStartOffset + cropLength), bufferToAppend]);
	        };
	        CompressionCommon.detectCompressionSourceEncoding = function (input) {
	            if (typeof input == "string")
	                return "String";
	            else
	                return "ByteArray";
	        };
	        CompressionCommon.encodeCompressedBytes = function (compressedBytes, outputEncoding) {
	            switch (outputEncoding) {
	                case "ByteArray":
	                    return compressedBytes;
	                case "BinaryString":
	                    return LZUTF8.encodeBinaryString(compressedBytes);
	                case "Base64":
	                    return LZUTF8.encodeBase64(compressedBytes);
	                default:
	                    throw new TypeError("encodeCompressedBytes: invalid output encoding requested");
	            }
	        };
	        CompressionCommon.decodeCompressedData = function (compressedData, inputEncoding) {
	            if (inputEncoding == "ByteArray" && typeof compressedData == "string")
	                throw new TypeError("decodeCompressedData: receieved input was string when encoding was set to a ByteArray");
	            switch (inputEncoding) {
	                case "ByteArray":
	                    return LZUTF8.convertToByteArray(compressedData);
	                case "BinaryString":
	                    return LZUTF8.decodeBinaryString(compressedData);
	                case "Base64":
	                    return LZUTF8.decodeBase64(compressedData);
	                default:
	                    throw new TypeError("decodeCompressedData: invalid input encoding requested");
	            }
	        };
	        CompressionCommon.encodeDecompressedBytes = function (decompressedBytes, outputEncoding) {
	            switch (outputEncoding) {
	                case "ByteArray":
	                    return decompressedBytes;
	                case "String":
	                    return LZUTF8.decodeUTF8(decompressedBytes);
	                default:
	                    throw new TypeError("encodeDecompressedBytes: invalid output encoding requested");
	            }
	        };
	        return CompressionCommon;
	    })();
	    LZUTF8.CompressionCommon = CompressionCommon;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var EventLoop = (function () {
	        function EventLoop() {
	        }
	        EventLoop.enqueueImmediate = function (func) {
	            if (LZUTF8.runningInNodeJS()) {
	                setImmediate(func);
	            }
	            else if ((typeof window === "object") && (window.postMessage !== undefined)) {
	                if (!EventLoop.instanceToken)
	                    EventLoop.registerWindowMessageHandler();
	                EventLoop.queuedFunctions.push(func);
	                window.postMessage(EventLoop.instanceToken, window.location.href);
	            }
	            else {
	                setTimeout(func, 0);
	            }
	        };
	        EventLoop.registerWindowMessageHandler = function () {
	            var _this = this;
	            EventLoop.instanceToken = "EventLoop.enqueueImmediate-" + Math.random();
	            EventLoop.queuedFunctions = [];
	            window.addEventListener("message", function (event) {
	                if (event.data != EventLoop.instanceToken || _this.queuedFunctions.length === 0)
	                    return;
	                var queuedFunction = EventLoop.queuedFunctions.shift();
	                try {
	                    queuedFunction.call(undefined);
	                }
	                catch (exception) {
	                    if (typeof exception == "object")
	                        console.log("enqueueImmediate exception: " + JSON.stringify(exception));
	                    else
	                        console.log("enqueueImmediate exception: " + exception);
	                }
	            });
	        };
	        return EventLoop;
	    })();
	    LZUTF8.EventLoop = EventLoop;
	    LZUTF8.enqueueImmediate = EventLoop.enqueueImmediate;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var AsyncCompressor = (function () {
	        function AsyncCompressor() {
	        }
	        AsyncCompressor.compressAsync = function (input, options, callback) {
	            var timer = new LZUTF8.Timer();
	            var compressor = new LZUTF8.Compressor();
	            if (typeof input == "string") {
	                input = LZUTF8.encodeUTF8(input);
	            }
	            else {
	                try {
	                    input = LZUTF8.convertToByteArray(input);
	                }
	                catch (e) {
	                    callback(undefined, e);
	                    return;
	                }
	            }
	            var sourceBlocks = LZUTF8.ArrayTools.splitByteArray(input, options.blockSize);
	            var compressedBlocks = [];
	            var compressBlocksStartingAt = function (index) {
	                if (index < sourceBlocks.length) {
	                    try {
	                        var compressedBlock = compressor.compressBlock(sourceBlocks[index]);
	                    }
	                    catch (e) {
	                        callback(undefined, e);
	                        return;
	                    }
	                    compressedBlocks.push(compressedBlock);
	                    if (timer.getElapsedTime() <= 20) {
	                        compressBlocksStartingAt(index + 1);
	                    }
	                    else {
	                        LZUTF8.enqueueImmediate(function () { return compressBlocksStartingAt(index + 1); });
	                        timer.restart();
	                    }
	                }
	                else {
	                    var joinedCompressedBlocks = LZUTF8.ArrayTools.joinByteArrays(compressedBlocks);
	                    LZUTF8.enqueueImmediate(function () {
	                        try {
	                            var result = LZUTF8.CompressionCommon.encodeCompressedBytes(joinedCompressedBlocks, options.outputEncoding);
	                        }
	                        catch (e) {
	                            callback(undefined, e);
	                            return;
	                        }
	                        LZUTF8.enqueueImmediate(function () { return callback(result); });
	                    });
	                }
	            };
	            LZUTF8.enqueueImmediate(function () { return compressBlocksStartingAt(0); });
	        };
	        AsyncCompressor.createCompressionStream = function () {
	            var compressor = new LZUTF8.Compressor();
	            var NodeStream = __webpack_require__(11);
	            var compressionStream = new NodeStream.Transform({ decodeStrings: true, highWaterMark: 65536 });
	            compressionStream._transform = function (data, encoding, done) {
	                try {
	                    var buffer = compressor.compressBlock(LZUTF8.convertToByteArray(data));
	                }
	                catch (e) {
	                    compressionStream.emit("error", e);
	                    return;
	                }
	                compressionStream.push(buffer);
	                done();
	            };
	            return compressionStream;
	        };
	        return AsyncCompressor;
	    })();
	    LZUTF8.AsyncCompressor = AsyncCompressor;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var ObjectTools = (function () {
	        function ObjectTools() {
	        }
	        ObjectTools.extendObject = function (obj, newProperties) {
	            if (newProperties != null) {
	                for (var property in newProperties)
	                    obj[property] = newProperties[property];
	            }
	            return obj;
	        };
	        ObjectTools.findPropertyInObject = function (propertyToFind, object) {
	            for (var property in object)
	                if (object[property] === propertyToFind)
	                    return property;
	            return null;
	        };
	        return ObjectTools;
	    })();
	    LZUTF8.ObjectTools = ObjectTools;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var AsyncDecompressor = (function () {
	        function AsyncDecompressor() {
	        }
	        AsyncDecompressor.decompressAsync = function (input, options, callback) {
	            var timer = new LZUTF8.Timer();
	            try {
	                input = LZUTF8.CompressionCommon.decodeCompressedData(input, options.inputEncoding);
	            }
	            catch (e) {
	                callback(undefined, e);
	                return;
	            }
	            var decompressor = new LZUTF8.Decompressor();
	            var sourceBlocks = LZUTF8.ArrayTools.splitByteArray(input, options.blockSize);
	            var decompressedBlocks = [];
	            var decompressBlocksStartingAt = function (index) {
	                if (index < sourceBlocks.length) {
	                    try {
	                        var decompressedBlock = decompressor.decompressBlock(sourceBlocks[index]);
	                    }
	                    catch (e) {
	                        callback(undefined, e);
	                        return;
	                    }
	                    decompressedBlocks.push(decompressedBlock);
	                    if (timer.getElapsedTime() <= 20) {
	                        decompressBlocksStartingAt(index + 1);
	                    }
	                    else {
	                        LZUTF8.enqueueImmediate(function () { return decompressBlocksStartingAt(index + 1); });
	                        timer.restart();
	                    }
	                }
	                else {
	                    var joinedDecompressedBlocks = LZUTF8.ArrayTools.joinByteArrays(decompressedBlocks);
	                    LZUTF8.enqueueImmediate(function () {
	                        try {
	                            var result = LZUTF8.CompressionCommon.encodeDecompressedBytes(joinedDecompressedBlocks, options.outputEncoding);
	                        }
	                        catch (e) {
	                            callback(undefined, e);
	                            return;
	                        }
	                        LZUTF8.enqueueImmediate(function () { return callback(result); });
	                    });
	                }
	            };
	            LZUTF8.enqueueImmediate(function () { return decompressBlocksStartingAt(0); });
	        };
	        AsyncDecompressor.createDecompressionStream = function () {
	            var decompressor = new LZUTF8.Decompressor();
	            var NodeStream = __webpack_require__(11);
	            var decompressionStream = new NodeStream.Transform({ decodeStrings: true, highWaterMark: 65536 });
	            decompressionStream._transform = function (data, encoding, done) {
	                try {
	                    var buffer = decompressor.decompressBlock(LZUTF8.convertToByteArray(data));
	                }
	                catch (e) {
	                    decompressionStream.emit("error", e);
	                    return;
	                }
	                decompressionStream.push(buffer);
	                done();
	            };
	            return decompressionStream;
	        };
	        return AsyncDecompressor;
	    })();
	    LZUTF8.AsyncDecompressor = AsyncDecompressor;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Timer = (function () {
	        function Timer(timestampFunc) {
	            if (timestampFunc)
	                this.getTimestamp = timestampFunc;
	            else
	                this.getTimestamp = Timer.getHighResolutionTimestampFunction();
	            this.restart();
	        }
	        Timer.prototype.restart = function () {
	            this.startTime = this.getTimestamp();
	        };
	        Timer.prototype.getElapsedTime = function () {
	            return this.getTimestamp() - this.startTime;
	        };
	        Timer.prototype.getElapsedTimeAndRestart = function () {
	            var elapsedTime = this.getElapsedTime();
	            this.restart();
	            return elapsedTime;
	        };
	        Timer.prototype.logAndRestart = function (title, logToDocument) {
	            if (logToDocument === void 0) { logToDocument = false; }
	            var message = title + ": " + this.getElapsedTime().toFixed(3);
	            console.log(message);
	            if (logToDocument && typeof document == "object")
	                document.body.innerHTML += message + "<br/>";
	            this.restart();
	        };
	        Timer.prototype.getTimestamp = function () {
	            return undefined;
	        };
	        Timer.getHighResolutionTimestampFunction = function () {
	            if (typeof chrome == "object" && chrome.Interval) {
	                var chromeIntervalObject = new chrome.Interval();
	                chromeIntervalObject.start();
	                return function () { return chromeIntervalObject.microseconds() / 1000; };
	            }
	            else if (typeof window == "object" && window.performance && window.performance.now) {
	                return function () { return window.performance.now(); };
	            }
	            else if (typeof process == "object" && process.hrtime) {
	                return function () {
	                    var timeStamp = process.hrtime();
	                    return (timeStamp[0] * 1000) + (timeStamp[1] / 1000000);
	                };
	            }
	            else if (Date.now) {
	                return function () { return Date.now(); };
	            }
	            else {
	                return function () { return (new Date()).getTime(); };
	            }
	        };
	        return Timer;
	    })();
	    LZUTF8.Timer = Timer;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Compressor = (function () {
	        function Compressor(useCustomHashTable) {
	            if (useCustomHashTable === void 0) { useCustomHashTable = true; }
	            this.MinimumSequenceLength = 4;
	            this.MaximumSequenceLength = 31;
	            this.MaximumMatchDistance = 32767;
	            this.PrefixHashTableSize = 65537;
	            this.inputBufferStreamOffset = 1;
	            this.reusableArraySegmentObject = new LZUTF8.ArraySegment();
	            if (useCustomHashTable && typeof Uint32Array == "function")
	                this.prefixHashTable = new LZUTF8.CompressorCustomHashTable(this.PrefixHashTableSize);
	            else
	                this.prefixHashTable = new LZUTF8.CompressorSimpleHashTable(this.PrefixHashTableSize);
	        }
	        Compressor.prototype.compressBlock = function (input) {
	            if (input === undefined || input === null)
	                throw new TypeError("compressBlock: undefined or null input received");
	            if (typeof input == "string")
	                input = LZUTF8.encodeUTF8(input);
	            return this.compressByteArrayBlock(input);
	        };
	        Compressor.prototype.compressByteArrayBlock = function (utf8Bytes) {
	            if (!utf8Bytes || utf8Bytes.length == 0)
	                return LZUTF8.newByteArray(0);
	            utf8Bytes = LZUTF8.convertToByteArray(utf8Bytes);
	            var bufferStartingReadOffset = this.cropAndAddNewBytesToInputBuffer(utf8Bytes);
	            var inputBuffer = this.inputBuffer;
	            var inputBufferLength = this.inputBuffer.length;
	            this.outputBuffer = LZUTF8.newByteArray(utf8Bytes.length);
	            this.outputBufferPosition = 0;
	            var latestMatchEndPosition = 0;
	            for (var readPosition = bufferStartingReadOffset; readPosition < inputBufferLength; readPosition++) {
	                var inputValue = inputBuffer[readPosition];
	                var withinAMatchedRange = readPosition < latestMatchEndPosition;
	                if (readPosition > inputBufferLength - this.MinimumSequenceLength) {
	                    if (!withinAMatchedRange)
	                        this.outputRawByte(inputValue);
	                    continue;
	                }
	                var targetBucketIndex = this.getBucketIndexForPrefix(readPosition);
	                if (!withinAMatchedRange) {
	                    var matchLocator = this.findLongestMatch(readPosition, targetBucketIndex);
	                    if (matchLocator !== null) {
	                        this.outputPointerBytes(matchLocator.length, matchLocator.distance);
	                        latestMatchEndPosition = readPosition + matchLocator.length;
	                        withinAMatchedRange = true;
	                    }
	                }
	                if (!withinAMatchedRange)
	                    this.outputRawByte(inputValue);
	                var inputStreamPosition = this.inputBufferStreamOffset + readPosition;
	                this.prefixHashTable.addValueToBucket(targetBucketIndex, inputStreamPosition);
	            }
	            return this.outputBuffer.subarray(0, this.outputBufferPosition);
	        };
	        Compressor.prototype.findLongestMatch = function (matchedSequencePosition, bucketIndex) {
	            var bucket = this.prefixHashTable.getArraySegmentForBucketIndex(bucketIndex, this.reusableArraySegmentObject);
	            if (bucket == null)
	                return null;
	            var input = this.inputBuffer;
	            var longestMatchDistance;
	            var longestMatchLength;
	            for (var i = 0; i < bucket.length; i++) {
	                var testedSequencePosition = bucket.getInReversedOrder(i) - this.inputBufferStreamOffset;
	                var testedSequenceDistance = matchedSequencePosition - testedSequencePosition;
	                if (longestMatchDistance === undefined)
	                    var lengthToSurpass = this.MinimumSequenceLength - 1;
	                else if (longestMatchDistance < 128 && testedSequenceDistance >= 128)
	                    var lengthToSurpass = longestMatchLength + (longestMatchLength >>> 1);
	                else
	                    var lengthToSurpass = longestMatchLength;
	                if (testedSequenceDistance > this.MaximumMatchDistance ||
	                    lengthToSurpass >= this.MaximumSequenceLength ||
	                    matchedSequencePosition + lengthToSurpass >= input.length)
	                    break;
	                if (input[testedSequencePosition + lengthToSurpass] !== input[matchedSequencePosition + lengthToSurpass])
	                    continue;
	                for (var offset = 0;; offset++) {
	                    if (matchedSequencePosition + offset === input.length ||
	                        input[testedSequencePosition + offset] !== input[matchedSequencePosition + offset]) {
	                        if (offset > lengthToSurpass) {
	                            longestMatchDistance = testedSequenceDistance;
	                            longestMatchLength = offset;
	                        }
	                        break;
	                    }
	                    else if (offset === this.MaximumSequenceLength)
	                        return { distance: testedSequenceDistance, length: this.MaximumSequenceLength };
	                }
	            }
	            if (longestMatchDistance !== undefined)
	                return { distance: longestMatchDistance, length: longestMatchLength };
	            else
	                return null;
	        };
	        Compressor.prototype.getBucketIndexForPrefix = function (startPosition) {
	            return (this.inputBuffer[startPosition] * 7880599 +
	                this.inputBuffer[startPosition + 1] * 39601 +
	                this.inputBuffer[startPosition + 2] * 199 +
	                this.inputBuffer[startPosition + 3]) % this.PrefixHashTableSize;
	        };
	        Compressor.prototype.outputPointerBytes = function (length, distance) {
	            if (distance < 128) {
	                this.outputRawByte(192 | length);
	                this.outputRawByte(distance);
	            }
	            else {
	                this.outputRawByte(224 | length);
	                this.outputRawByte(distance >>> 8);
	                this.outputRawByte(distance & 255);
	            }
	        };
	        Compressor.prototype.outputRawByte = function (value) {
	            this.outputBuffer[this.outputBufferPosition++] = value;
	        };
	        Compressor.prototype.cropAndAddNewBytesToInputBuffer = function (newInput) {
	            if (this.inputBuffer === undefined) {
	                this.inputBuffer = newInput;
	                return 0;
	            }
	            else {
	                var cropLength = Math.min(this.inputBuffer.length, this.MaximumMatchDistance);
	                var cropStartOffset = this.inputBuffer.length - cropLength;
	                this.inputBuffer = LZUTF8.CompressionCommon.getCroppedAndAppendedBuffer(this.inputBuffer, cropStartOffset, cropLength, newInput);
	                this.inputBufferStreamOffset += cropStartOffset;
	                return cropLength;
	            }
	        };
	        Compressor.prototype.logStatisticsToConsole = function (bytesRead) {
	            var usedBucketCount = this.prefixHashTable.getUsedBucketCount();
	            var totalHashtableElementCount = this.prefixHashTable.getTotalElementCount();
	            console.log("Compressed size: " + this.outputBufferPosition + "/" + bytesRead + " (" + (this.outputBufferPosition / bytesRead * 100).toFixed(2) + "%)");
	            console.log("Occupied bucket count: " + usedBucketCount + "/" + this.PrefixHashTableSize);
	            console.log("Total hashtable element count: " + totalHashtableElementCount + " (" + (totalHashtableElementCount / usedBucketCount).toFixed(2) + " elements per occupied bucket on average)");
	            console.log("");
	        };
	        return Compressor;
	    })();
	    LZUTF8.Compressor = Compressor;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var CompressorCustomHashTable = (function () {
	        function CompressorCustomHashTable(bucketCount) {
	            this.minimumBucketCapacity = 4;
	            this.maximumBucketCapacity = 64;
	            this.bucketLocators = new Uint32Array(bucketCount * 2);
	            this.storage = new Uint32Array(bucketCount * 2);
	            this.storageIndex = 1;
	        }
	        CompressorCustomHashTable.prototype.addValueToBucket = function (bucketIndex, valueToAdd) {
	            bucketIndex <<= 1;
	            if (this.storageIndex >= (this.storage.length >>> 1))
	                this.compact();
	            var startPosition = this.bucketLocators[bucketIndex];
	            if (startPosition === 0) {
	                startPosition = this.storageIndex;
	                var length = 1;
	                this.storage[this.storageIndex] = valueToAdd;
	                this.storageIndex += this.minimumBucketCapacity;
	            }
	            else {
	                var length = this.bucketLocators[bucketIndex + 1];
	                if (length === this.maximumBucketCapacity - 1)
	                    length = this.truncateBucketToNewerElements(startPosition, length, this.maximumBucketCapacity / 2);
	                var endPosition = startPosition + length;
	                if (this.storage[endPosition] === 0) {
	                    this.storage[endPosition] = valueToAdd;
	                    if (endPosition === this.storageIndex)
	                        this.storageIndex += length;
	                }
	                else {
	                    LZUTF8.ArrayTools.copyElements(this.storage, startPosition, this.storage, this.storageIndex, length);
	                    startPosition = this.storageIndex;
	                    this.storageIndex += length;
	                    this.storage[this.storageIndex++] = valueToAdd;
	                    this.storageIndex += length;
	                }
	                length++;
	            }
	            this.bucketLocators[bucketIndex] = startPosition;
	            this.bucketLocators[bucketIndex + 1] = length;
	        };
	        CompressorCustomHashTable.prototype.truncateBucketToNewerElements = function (startPosition, bucketLength, truncatedBucketLength) {
	            var sourcePosition = startPosition + bucketLength - truncatedBucketLength;
	            LZUTF8.ArrayTools.copyElements(this.storage, sourcePosition, this.storage, startPosition, truncatedBucketLength);
	            LZUTF8.ArrayTools.zeroElements(this.storage, startPosition + truncatedBucketLength, bucketLength - truncatedBucketLength);
	            return truncatedBucketLength;
	        };
	        CompressorCustomHashTable.prototype.compact = function () {
	            var oldBucketLocators = this.bucketLocators;
	            var oldStorage = this.storage;
	            this.bucketLocators = new Uint32Array(this.bucketLocators.length);
	            this.storageIndex = 1;
	            for (var bucketIndex = 0; bucketIndex < oldBucketLocators.length; bucketIndex += 2) {
	                var length = oldBucketLocators[bucketIndex + 1];
	                if (length === 0)
	                    continue;
	                this.bucketLocators[bucketIndex] = this.storageIndex;
	                this.bucketLocators[bucketIndex + 1] = length;
	                this.storageIndex += Math.max(Math.min(length * 2, this.maximumBucketCapacity), this.minimumBucketCapacity);
	            }
	            this.storage = new Uint32Array(this.storageIndex * 8);
	            for (var bucketIndex = 0; bucketIndex < oldBucketLocators.length; bucketIndex += 2) {
	                var sourcePosition = oldBucketLocators[bucketIndex];
	                if (sourcePosition === 0)
	                    continue;
	                var destPosition = this.bucketLocators[bucketIndex];
	                var length = this.bucketLocators[bucketIndex + 1];
	                LZUTF8.ArrayTools.copyElements(oldStorage, sourcePosition, this.storage, destPosition, length);
	            }
	        };
	        CompressorCustomHashTable.prototype.getArraySegmentForBucketIndex = function (bucketIndex, outputObject) {
	            bucketIndex <<= 1;
	            var startPosition = this.bucketLocators[bucketIndex];
	            if (startPosition === 0)
	                return null;
	            if (outputObject === undefined)
	                outputObject = new LZUTF8.ArraySegment();
	            outputObject.container = this.storage;
	            outputObject.startPosition = startPosition;
	            outputObject.length = this.bucketLocators[bucketIndex + 1];
	            return outputObject;
	        };
	        CompressorCustomHashTable.prototype.getUsedBucketCount = function () {
	            return Math.floor(LZUTF8.ArrayTools.countNonzeroValuesInArray(this.bucketLocators) / 2);
	        };
	        CompressorCustomHashTable.prototype.getTotalElementCount = function () {
	            var result = 0;
	            for (var i = 0; i < this.bucketLocators.length; i += 2)
	                result += this.bucketLocators[i + 1];
	            return result;
	        };
	        return CompressorCustomHashTable;
	    })();
	    LZUTF8.CompressorCustomHashTable = CompressorCustomHashTable;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var CompressorSimpleHashTable = (function () {
	        function CompressorSimpleHashTable(size) {
	            this.maximumBucketCapacity = 64;
	            this.buckets = new Array(size);
	        }
	        CompressorSimpleHashTable.prototype.addValueToBucket = function (bucketIndex, valueToAdd) {
	            var bucket = this.buckets[bucketIndex];
	            if (bucket === undefined) {
	                this.buckets[bucketIndex] = [valueToAdd];
	            }
	            else {
	                if (bucket.length === this.maximumBucketCapacity - 1)
	                    LZUTF8.ArrayTools.truncateStartingElements(bucket, this.maximumBucketCapacity / 2);
	                bucket.push(valueToAdd);
	            }
	        };
	        CompressorSimpleHashTable.prototype.getArraySegmentForBucketIndex = function (bucketIndex, outputObject) {
	            var bucket = this.buckets[bucketIndex];
	            if (bucket === undefined)
	                return null;
	            if (outputObject === undefined)
	                outputObject = new LZUTF8.ArraySegment();
	            outputObject.container = bucket;
	            outputObject.startPosition = 0;
	            outputObject.length = bucket.length;
	            return outputObject;
	        };
	        CompressorSimpleHashTable.prototype.getUsedBucketCount = function () {
	            return LZUTF8.ArrayTools.countNonzeroValuesInArray(this.buckets);
	        };
	        CompressorSimpleHashTable.prototype.getTotalElementCount = function () {
	            var currentSum = 0;
	            for (var i = 0; i < this.buckets.length; i++) {
	                if (this.buckets[i] !== undefined)
	                    currentSum += this.buckets[i].length;
	            }
	            return currentSum;
	        };
	        return CompressorSimpleHashTable;
	    })();
	    LZUTF8.CompressorSimpleHashTable = CompressorSimpleHashTable;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Decompressor = (function () {
	        function Decompressor() {
	            this.MaximumMatchDistance = 32767;
	            this.outputPosition = 0;
	        }
	        Decompressor.prototype.decompressBlockToString = function (input) {
	            return LZUTF8.decodeUTF8(this.decompressBlock(input));
	        };
	        Decompressor.prototype.decompressBlock = function (input) {
	            if (input === undefined || input === null)
	                throw new TypeError("decompressBlock: undefined or null input received");
	            input = LZUTF8.convertToByteArray(input);
	            if (this.inputBufferRemainder) {
	                input = LZUTF8.ArrayTools.joinByteArrays([this.inputBufferRemainder, input]);
	                this.inputBufferRemainder = undefined;
	            }
	            var outputStartPosition = this.cropOutputBufferToWindowAndInitialize(Math.max(input.length * 4, 1024));
	            for (var readPosition = 0, inputLength = input.length; readPosition < inputLength; readPosition++) {
	                var inputValue = input[readPosition];
	                if (inputValue >>> 6 != 3) {
	                    this.outputByte(inputValue);
	                    continue;
	                }
	                var sequenceLengthIdentifier = inputValue >>> 5;
	                if (readPosition == inputLength - 1 ||
	                    (readPosition == inputLength - 2 && sequenceLengthIdentifier == 7)) {
	                    this.inputBufferRemainder = LZUTF8.newByteArray(input.subarray(readPosition));
	                    break;
	                }
	                if (input[readPosition + 1] >>> 7 === 1) {
	                    this.outputByte(inputValue);
	                }
	                else {
	                    var matchLength = inputValue & 31;
	                    var matchDistance;
	                    if (sequenceLengthIdentifier == 6) {
	                        matchDistance = input[readPosition + 1];
	                        readPosition += 1;
	                    }
	                    else {
	                        matchDistance = (input[readPosition + 1] << 8) | (input[readPosition + 2]);
	                        readPosition += 2;
	                    }
	                    var matchPosition = this.outputPosition - matchDistance;
	                    for (var offset = 0; offset < matchLength; offset++)
	                        this.outputByte(this.outputBuffer[matchPosition + offset]);
	                }
	            }
	            this.rollBackIfOutputBufferEndsWithATruncatedMultibyteSequence();
	            return LZUTF8.CompressionCommon.getCroppedBuffer(this.outputBuffer, outputStartPosition, this.outputPosition - outputStartPosition);
	        };
	        Decompressor.prototype.outputByte = function (value) {
	            if (this.outputPosition === this.outputBuffer.length)
	                this.outputBuffer = LZUTF8.ArrayTools.doubleByteArrayCapacity(this.outputBuffer);
	            this.outputBuffer[this.outputPosition++] = value;
	        };
	        Decompressor.prototype.cropOutputBufferToWindowAndInitialize = function (initialCapacity) {
	            if (!this.outputBuffer) {
	                this.outputBuffer = LZUTF8.newByteArray(initialCapacity);
	                return 0;
	            }
	            var cropLength = Math.min(this.outputPosition, this.MaximumMatchDistance);
	            this.outputBuffer = LZUTF8.CompressionCommon.getCroppedBuffer(this.outputBuffer, this.outputPosition - cropLength, cropLength, initialCapacity);
	            this.outputPosition = cropLength;
	            if (this.outputBufferRemainder) {
	                for (var i = 0; i < this.outputBufferRemainder.length; i++)
	                    this.outputByte(this.outputBufferRemainder[i]);
	                this.outputBufferRemainder = undefined;
	            }
	            return cropLength;
	        };
	        Decompressor.prototype.rollBackIfOutputBufferEndsWithATruncatedMultibyteSequence = function () {
	            for (var offset = 1; offset <= 4 && this.outputPosition - offset >= 0; offset++) {
	                var value = this.outputBuffer[this.outputPosition - offset];
	                if ((offset < 4 && (value >>> 3) === 30) ||
	                    (offset < 3 && (value >>> 4) === 14) ||
	                    (offset < 2 && (value >>> 5) === 6)) {
	                    this.outputBufferRemainder = LZUTF8.newByteArray(this.outputBuffer.subarray(this.outputPosition - offset, this.outputPosition));
	                    this.outputPosition -= offset;
	                    return;
	                }
	            }
	        };
	        return Decompressor;
	    })();
	    LZUTF8.Decompressor = Decompressor;
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var WebWorker = (function () {
	        function WebWorker() {
	        }
	        WebWorker.compressAsync = function (input, options, callback) {
	            var requestInputEncoding = options.inputEncoding;
	            var requestOutputEncoding = options.outputEncoding;
	            if (!WebWorker.supportsTransferableObjects) {
	                if (options.inputEncoding == "ByteArray") {
	                    try {
	                        input = LZUTF8.decodeUTF8(input);
	                    }
	                    catch (e) {
	                        callback(undefined, e);
	                        return;
	                    }
	                    requestInputEncoding = "String";
	                }
	                if (options.outputEncoding == "ByteArray") {
	                    requestOutputEncoding = "BinaryString";
	                }
	            }
	            else {
	                if (options.inputEncoding == "ByteArray") {
	                    try {
	                        input = LZUTF8.convertToByteArray(input);
	                    }
	                    catch (e) {
	                        callback(undefined, e);
	                        return;
	                    }
	                }
	            }
	            var request = {
	                token: Math.random().toString(),
	                type: "compress",
	                data: input,
	                inputEncoding: requestInputEncoding,
	                outputEncoding: requestOutputEncoding
	            };
	            if (request.inputEncoding == "ByteArray")
	                WebWorker.globalWorker.postMessage(request, [(new Uint8Array(request.data)).buffer]);
	            else
	                WebWorker.globalWorker.postMessage(request, []);
	            var responseListener = function (e) {
	                var response = e.data;
	                if (!response || response.token != request.token)
	                    return;
	                WebWorker.globalWorker.removeEventListener("message", responseListener);
	                if (options.outputEncoding == "ByteArray" && response.inputEncoding == "BinaryString")
	                    response.data = LZUTF8.decodeBinaryString(response.data);
	                LZUTF8.enqueueImmediate(function () { return callback(response.data); });
	            };
	            WebWorker.globalWorker.addEventListener("message", responseListener);
	            WebWorker.globalWorker.addEventListener("error", function (e) { callback(undefined, e); });
	        };
	        WebWorker.decompressAsync = function (input, options, callback) {
	            var requestInputEncoding = options.inputEncoding;
	            var requestOutputEncoding = options.outputEncoding;
	            if (!WebWorker.supportsTransferableObjects) {
	                if (options.inputEncoding == "ByteArray") {
	                    try {
	                        input = LZUTF8.encodeBinaryString(input);
	                    }
	                    catch (e) {
	                        callback(undefined, e);
	                        return;
	                    }
	                    requestInputEncoding = "BinaryString";
	                }
	                if (options.outputEncoding == "ByteArray") {
	                    requestOutputEncoding = "String";
	                }
	            }
	            var request = {
	                token: Math.random().toString(),
	                type: "decompress",
	                data: input,
	                inputEncoding: requestInputEncoding,
	                outputEncoding: requestOutputEncoding
	            };
	            if (request.inputEncoding == "ByteArray")
	                WebWorker.globalWorker.postMessage(request, [(new Uint8Array(request.data)).buffer]);
	            else
	                WebWorker.globalWorker.postMessage(request, []);
	            var responseListener = function (e) {
	                var response = e.data;
	                if (!response || response.token != request.token)
	                    return;
	                WebWorker.globalWorker.removeEventListener("message", responseListener);
	                if (options.outputEncoding == "ByteArray" && response.inputEncoding == "String")
	                    response.data = LZUTF8.encodeUTF8(response.data);
	                LZUTF8.enqueueImmediate(function () { return callback(response.data); });
	            };
	            WebWorker.globalWorker.addEventListener("message", responseListener);
	            WebWorker.globalWorker.addEventListener("error", function (e) { callback(undefined, e); });
	        };
	        WebWorker.workerMessageHandler = function (e) {
	            var request = e.data;
	            if (request.type == "compress") {
	                var compressedData = LZUTF8.compress(request.data, { outputEncoding: request.outputEncoding });
	                var response = {
	                    token: request.token,
	                    type: "compressionResult",
	                    data: compressedData,
	                    inputEncoding: request.outputEncoding
	                };
	                if (response.inputEncoding == "ByteArray")
	                    self.postMessage(response, [compressedData.buffer]);
	                else
	                    self.postMessage(response, []);
	            }
	            else if (request.type == "decompress") {
	                var decompressedData = LZUTF8.decompress(request.data, { inputEncoding: request.inputEncoding, outputEncoding: request.outputEncoding });
	                var response = {
	                    token: request.token,
	                    type: "decompressionResult",
	                    data: decompressedData,
	                    inputEncoding: request.outputEncoding
	                };
	                if (response.inputEncoding == "ByteArray")
	                    self.postMessage(response, [decompressedData.buffer]);
	                else
	                    self.postMessage(response, []);
	            }
	        };
	        WebWorker.registerListenerIfRunningInWebWorker = function () {
	            if (typeof self == "object" && self.document === undefined && self.addEventListener != undefined) {
	                self.addEventListener("message", WebWorker.workerMessageHandler);
	                self.addEventListener("error", function (e) {
	                    console.log("LZUTF8 WebWorker exception: " + e.message);
	                });
	            }
	        };
	        WebWorker.createGlobalWorkerIfItDoesntExist = function () {
	            if (WebWorker.globalWorker)
	                return;
	            if (!WebWorker.isSupported())
	                throw new Error("createGlobalWorkerIfItDoesntExist: Web workers are not supported or script source is not available");
	            if (!WebWorker.scriptURI)
	                WebWorker.scriptURI = document.getElementById("lzutf8").getAttribute("src");
	            WebWorker.globalWorker = new Worker(WebWorker.scriptURI);
	            WebWorker.supportsTransferableObjects = WebWorker.testSupportForTransferableObjects();
	        };
	        WebWorker.isSupported = function () {
	            if (WebWorker.globalWorker)
	                return true;
	            if (typeof window != "object" || typeof window["Worker"] != "function")
	                return false;
	            if (WebWorker.scriptURI)
	                return true;
	            var scriptElement = document.getElementById("lzutf8");
	            if (!scriptElement || scriptElement.tagName != "SCRIPT") {
	                console.log("Cannot use a web worker as no script element with id 'lzutf8' was found in the page");
	                return false;
	            }
	            return true;
	        };
	        WebWorker.testSupportForTransferableObjects = function () {
	            if (typeof Uint8Array == "undefined")
	                return false;
	            if (!WebWorker.globalWorker)
	                throw new Error("testSupportForTransferableObjects: No global worker created");
	            var testArrayBuffer = new ArrayBuffer(1);
	            var result;
	            try {
	                WebWorker.globalWorker.postMessage(testArrayBuffer, [testArrayBuffer]);
	            }
	            catch (e) {
	                return false;
	            }
	            return (testArrayBuffer.byteLength === 0);
	        };
	        WebWorker.terminate = function () {
	            if (WebWorker.globalWorker) {
	                WebWorker.globalWorker.terminate();
	                WebWorker.globalWorker = undefined;
	            }
	        };
	        return WebWorker;
	    })();
	    LZUTF8.WebWorker = WebWorker;
	    WebWorker.registerListenerIfRunningInWebWorker();
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Encoding;
	    (function (Encoding) {
	        var Base64 = (function () {
	            function Base64() {
	            }
	            Base64.encode = function (inputArray, addPadding) {
	                if (addPadding === void 0) { addPadding = true; }
	                if (inputArray == null)
	                    throw new TypeError("Base64.encode: invalid input type");
	                if (inputArray.length == 0)
	                    return "";
	                var map = Encoding.Base64.charCodeMap;
	                var output = new LZUTF8.StringBuilder();
	                var uint24;
	                for (var readPosition = 0, length = inputArray.length; readPosition < length; readPosition += 3) {
	                    if (readPosition <= length - 3) {
	                        uint24 = inputArray[readPosition] << 16 | inputArray[readPosition + 1] << 8 | inputArray[readPosition + 2];
	                        output.append(map[(uint24 >>> 18) & 63]);
	                        output.append(map[(uint24 >>> 12) & 63]);
	                        output.append(map[(uint24 >>> 6) & 63]);
	                        output.append(map[(uint24) & 63]);
	                        uint24 = 0;
	                    }
	                    else if (readPosition === length - 2) {
	                        uint24 = inputArray[readPosition] << 16 | inputArray[readPosition + 1] << 8;
	                        output.append(map[(uint24 >>> 18) & 63]);
	                        output.append(map[(uint24 >>> 12) & 63]);
	                        output.append(map[(uint24 >>> 6) & 63]);
	                        if (addPadding)
	                            output.append(Encoding.Base64.paddingCharCode);
	                    }
	                    else if (readPosition === length - 1) {
	                        uint24 = inputArray[readPosition] << 16;
	                        output.append(map[(uint24 >>> 18) & 63]);
	                        output.append(map[(uint24 >>> 12) & 63]);
	                        if (addPadding) {
	                            output.append(Encoding.Base64.paddingCharCode);
	                            output.append(Encoding.Base64.paddingCharCode);
	                        }
	                    }
	                }
	                return output.toString();
	            };
	            Base64.decode = function (base64String, outputBuffer) {
	                if (typeof base64String !== "string")
	                    throw new TypeError("Base64.decode: invalid input type");
	                if (base64String.length === 0)
	                    return LZUTF8.newByteArray(0);
	                var lengthModulo4 = base64String.length % 4;
	                if (lengthModulo4 === 1)
	                    throw new Error("Invalid Base64 string: length % 4 == 1");
	                else if (lengthModulo4 === 2)
	                    base64String += Encoding.Base64.paddingCharacter + Encoding.Base64.paddingCharacter;
	                else if (lengthModulo4 === 3)
	                    base64String += Encoding.Base64.paddingCharacter;
	                var reverseCharCodeMap = Encoding.Base64.reverseCharCodeMap;
	                if (!outputBuffer)
	                    outputBuffer = LZUTF8.newByteArray(base64String.length);
	                var outputPosition = 0;
	                for (var i = 0, length = base64String.length; i < length; i += 4) {
	                    var uint24 = (reverseCharCodeMap[base64String.charCodeAt(i)] << 18) |
	                        (reverseCharCodeMap[base64String.charCodeAt(i + 1)] << 12) |
	                        (reverseCharCodeMap[base64String.charCodeAt(i + 2)] << 6) |
	                        (reverseCharCodeMap[base64String.charCodeAt(i + 3)]);
	                    outputBuffer[outputPosition++] = (uint24 >>> 16) & 255;
	                    outputBuffer[outputPosition++] = (uint24 >>> 8) & 255;
	                    outputBuffer[outputPosition++] = (uint24) & 255;
	                }
	                if (base64String.charAt(length - 1) == Encoding.Base64.paddingCharacter)
	                    outputPosition--;
	                if (base64String.charAt(length - 2) == Encoding.Base64.paddingCharacter)
	                    outputPosition--;
	                return outputBuffer.subarray(0, outputPosition);
	            };
	            Base64.paddingCharacter = '=';
	            Base64.charCodeMap = LZUTF8.convertToByteArray([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47]);
	            Base64.paddingCharCode = 61;
	            Base64.reverseCharCodeMap = LZUTF8.convertToByteArray([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 255, 255, 255, 255]);
	            return Base64;
	        })();
	        Encoding.Base64 = Base64;
	    })(Encoding = LZUTF8.Encoding || (LZUTF8.Encoding = {}));
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Encoding;
	    (function (Encoding) {
	        var BinaryString = (function () {
	            function BinaryString() {
	            }
	            BinaryString.encode = function (input) {
	                if (input == null)
	                    throw new TypeError("BinaryString.encode: undefined or null input received");
	                if (input.length === 0)
	                    return "";
	                var inputLength = input.length;
	                var outputStringBuilder = new LZUTF8.StringBuilder();
	                var remainder = 0;
	                var state = 1;
	                for (var i = 0; i < inputLength; i += 2) {
	                    if (i == inputLength - 1)
	                        var value = (input[i] << 8);
	                    else
	                        var value = (input[i] << 8) | input[i + 1];
	                    outputStringBuilder.append((remainder << (16 - state)) | value >>> state);
	                    remainder = value & ((1 << state) - 1);
	                    if (state === 15) {
	                        outputStringBuilder.append(remainder);
	                        remainder = 0;
	                        state = 1;
	                    }
	                    else {
	                        state += 1;
	                    }
	                    if (i >= inputLength - 2)
	                        outputStringBuilder.append(remainder << (16 - state));
	                }
	                outputStringBuilder.append(32768 | (inputLength % 2));
	                return outputStringBuilder.toString();
	            };
	            BinaryString.decode = function (input) {
	                if (typeof input !== "string")
	                    throw new TypeError("BinaryString.decode: invalid input type");
	                if (input == "")
	                    return LZUTF8.newByteArray(0);
	                var output = LZUTF8.newByteArray(input.length * 3);
	                var outputPosition = 0;
	                var appendToOutput = function (value) {
	                    output[outputPosition++] = value >>> 8;
	                    output[outputPosition++] = value & 255;
	                };
	                var remainder;
	                var state = 0;
	                for (var i = 0; i < input.length; i++) {
	                    var value = input.charCodeAt(i);
	                    if (value >= 32768) {
	                        if (value == (32768 | 1))
	                            outputPosition--;
	                        state = 0;
	                        continue;
	                    }
	                    if (state == 0) {
	                        remainder = value;
	                    }
	                    else {
	                        appendToOutput((remainder << state) | (value >>> (15 - state)));
	                        remainder = value & ((1 << (15 - state)) - 1);
	                    }
	                    if (state == 15)
	                        state = 0;
	                    else
	                        state += 1;
	                }
	                return output.subarray(0, outputPosition);
	            };
	            return BinaryString;
	        })();
	        Encoding.BinaryString = BinaryString;
	    })(Encoding = LZUTF8.Encoding || (LZUTF8.Encoding = {}));
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Encoding;
	    (function (Encoding) {
	        var Misc = (function () {
	            function Misc() {
	            }
	            Misc.binaryBytesToDecimalString = function (binaryBytes) {
	                var resultArray = [];
	                for (var i = 0; i < binaryBytes.length; i++)
	                    resultArray.push(Encoding.Misc.binaryBytesToDecimalStringLookupTable[binaryBytes[i]]);
	                return resultArray.join(" ");
	            };
	            Misc.binaryBytesToDecimalStringLookupTable = ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027", "028", "029", "030", "031", "032", "033", "034", "035", "036", "037", "038", "039", "040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050", "051", "052", "053", "054", "055", "056", "057", "058", "059", "060", "061", "062", "063", "064", "065", "066", "067", "068", "069", "070", "071", "072", "073", "074", "075", "076", "077", "078", "079", "080", "081", "082", "083", "084", "085", "086", "087", "088", "089", "090", "091", "092", "093", "094", "095", "096", "097", "098", "099", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255"];
	            return Misc;
	        })();
	        Encoding.Misc = Misc;
	    })(Encoding = LZUTF8.Encoding || (LZUTF8.Encoding = {}));
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    var Encoding;
	    (function (Encoding) {
	        var UTF8 = (function () {
	            function UTF8() {
	            }
	            UTF8.encode = function (str, outputArray) {
	                if (typeof str !== "string")
	                    throw new TypeError("UTF8.encode: null, undefined or invalid input type");
	                if (str.length == 0)
	                    return LZUTF8.newByteArray(0);
	                if (!outputArray)
	                    outputArray = LZUTF8.newByteArray(str.length * 4);
	                var writeIndex = 0;
	                for (var readIndex = 0; readIndex < str.length; readIndex++) {
	                    var charCode = Encoding.UTF8.getUnicodeCodePoint(str, readIndex);
	                    if (charCode < 128) {
	                        outputArray[writeIndex++] = charCode;
	                    }
	                    else if (charCode < 2048) {
	                        outputArray[writeIndex++] = 192 | (charCode >>> 6);
	                        outputArray[writeIndex++] = 128 | (charCode & 63);
	                    }
	                    else if (charCode < 65536) {
	                        outputArray[writeIndex++] = 224 | (charCode >>> 12);
	                        outputArray[writeIndex++] = 128 | ((charCode >>> 6) & 63);
	                        outputArray[writeIndex++] = 128 | (charCode & 63);
	                    }
	                    else if (charCode < 1114112) {
	                        outputArray[writeIndex++] = 240 | (charCode >>> 18);
	                        outputArray[writeIndex++] = 128 | ((charCode >>> 12) & 63);
	                        outputArray[writeIndex++] = 128 | ((charCode >>> 6) & 63);
	                        outputArray[writeIndex++] = 128 | (charCode & 63);
	                        readIndex++;
	                    }
	                    else
	                        throw new Error("UTF8.encode: Invalid UTF-16 string: Encountered a character unsupported by UTF-8/16 (RFC 3629)");
	                }
	                return outputArray.subarray(0, writeIndex);
	            };
	            UTF8.decode = function (utf8Bytes) {
	                if (utf8Bytes == null)
	                    throw new TypeError("UTF8.decode: null or undefined input type recieved");
	                if (utf8Bytes.length == 0)
	                    return "";
	                var output = new LZUTF8.StringBuilder();
	                var outputCodePoint, leadByte;
	                for (var readIndex = 0, length = utf8Bytes.length; readIndex < length;) {
	                    leadByte = utf8Bytes[readIndex];
	                    if ((leadByte >>> 7) === 0) {
	                        outputCodePoint = leadByte;
	                        readIndex += 1;
	                    }
	                    else if ((leadByte >>> 5) === 6) {
	                        if (readIndex + 1 >= length)
	                            throw new Error("UTF8.decode: Invalid UTF-8 stream: Truncated codepoint sequence encountered at position " + readIndex);
	                        outputCodePoint = ((leadByte & 31) << 6) | (utf8Bytes[readIndex + 1] & 63);
	                        readIndex += 2;
	                    }
	                    else if ((leadByte >>> 4) === 14) {
	                        if (readIndex + 2 >= length)
	                            throw new Error("UTF8.decode: Invalid UTF-8 stream: Truncated codepoint sequence encountered at position " + readIndex);
	                        outputCodePoint = ((leadByte & 15) << 12) | ((utf8Bytes[readIndex + 1] & 63) << 6) | (utf8Bytes[readIndex + 2] & 63);
	                        readIndex += 3;
	                    }
	                    else if ((leadByte >>> 3) === 30) {
	                        if (readIndex + 3 >= length)
	                            throw new Error("UTF8.decode: Invalid UTF-8 stream: Truncated codepoint sequence encountered at position " + readIndex);
	                        outputCodePoint = ((leadByte & 7) << 18) | ((utf8Bytes[readIndex + 1] & 63) << 12) | ((utf8Bytes[readIndex + 2] & 63) << 6) | (utf8Bytes[readIndex + 3] & 63);
	                        readIndex += 4;
	                    }
	                    else
	                        throw new Error("UTF8.decode: Invalid UTF-8 stream: An invalid lead byte value encountered at position " + readIndex);
	                    output.appendCodePoint(outputCodePoint);
	                }
	                return output.toString();
	            };
	            UTF8.getUnicodeCodePoint = function (str, position) {
	                var charCode = str.charCodeAt(position);
	                if (charCode < 0xD800 || charCode > 0xDBFF)
	                    return charCode;
	                else {
	                    var nextCharCode = str.charCodeAt(position + 1);
	                    if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF)
	                        return 0x10000 + (((charCode - 0xD800) << 10) + (nextCharCode - 0xDC00));
	                    else
	                        throw new Error("getUnicodeCodePoint: Received a lead surrogate character not followed by a trailing one");
	                }
	            };
	            UTF8.getStringFromUnicodeCodePoint = function (codePoint) {
	                if (codePoint <= 0xFFFF)
	                    return String.fromCharCode(codePoint);
	                else if (codePoint <= 0x10FFFF)
	                    return String.fromCharCode(0xD800 + ((codePoint - 0x10000) >>> 10), 0xDC00 + ((codePoint - 0x10000) & 1023));
	                else
	                    throw new Error("getStringFromUnicodeCodePoint: A code point of " + codePoint + " cannot be encoded in UTF-16");
	            };
	            return UTF8;
	        })();
	        Encoding.UTF8 = UTF8;
	    })(Encoding = LZUTF8.Encoding || (LZUTF8.Encoding = {}));
	})(LZUTF8 || (LZUTF8 = {}));
	var LZUTF8;
	(function (LZUTF8) {
	    function compress(input, options) {
	        if (input === undefined || input === null)
	            throw new TypeError("compress: undefined or null input received");
	        options = LZUTF8.ObjectTools.extendObject({ outputEncoding: "ByteArray" }, options);
	        var compressor = new LZUTF8.Compressor();
	        var compressedBytes = compressor.compressBlock(input);
	        return LZUTF8.CompressionCommon.encodeCompressedBytes(compressedBytes, options.outputEncoding);
	    }
	    LZUTF8.compress = compress;
	    function decompress(input, options) {
	        if (input === undefined || input === null)
	            throw new TypeError("decompress: undefined or null input received");
	        options = LZUTF8.ObjectTools.extendObject({ inputEncoding: "ByteArray", outputEncoding: "String" }, options);
	        input = LZUTF8.CompressionCommon.decodeCompressedData(input, options.inputEncoding);
	        var decompressor = new LZUTF8.Decompressor();
	        var decompressedBytes = decompressor.decompressBlock(input);
	        return LZUTF8.CompressionCommon.encodeDecompressedBytes(decompressedBytes, options.outputEncoding);
	    }
	    LZUTF8.decompress = decompress;
	    function compressAsync(input, options, callback) {
	        if (callback == null)
	            callback = function () { };
	        if (input === undefined || input === null) {
	            callback(undefined, new TypeError("compressAsync: undefined or null input received"));
	            return;
	        }
	        var defaultOptions = {
	            inputEncoding: LZUTF8.CompressionCommon.detectCompressionSourceEncoding(input),
	            outputEncoding: "ByteArray",
	            useWebWorker: true,
	            blockSize: 65536
	        };
	        options = LZUTF8.ObjectTools.extendObject(defaultOptions, options);
	        LZUTF8.EventLoop.enqueueImmediate(function () {
	            if (options.useWebWorker === true && LZUTF8.WebWorker.isSupported()) {
	                LZUTF8.WebWorker.createGlobalWorkerIfItDoesntExist();
	                LZUTF8.WebWorker.compressAsync(input, options, callback);
	            }
	            else {
	                LZUTF8.AsyncCompressor.compressAsync(input, options, callback);
	            }
	        });
	    }
	    LZUTF8.compressAsync = compressAsync;
	    function decompressAsync(input, options, callback) {
	        if (callback == null)
	            callback = function () { };
	        if (input === undefined || input === null) {
	            callback(undefined, new TypeError("decompressAsync: undefined or null input received"));
	            return;
	        }
	        var defaultOptions = {
	            inputEncoding: "ByteArray",
	            outputEncoding: "String",
	            useWebWorker: true,
	            blockSize: 65536
	        };
	        options = LZUTF8.ObjectTools.extendObject(defaultOptions, options);
	        LZUTF8.EventLoop.enqueueImmediate(function () {
	            if (options.useWebWorker === true && LZUTF8.WebWorker.isSupported()) {
	                LZUTF8.WebWorker.createGlobalWorkerIfItDoesntExist();
	                LZUTF8.WebWorker.decompressAsync(input, options, callback);
	            }
	            else {
	                LZUTF8.AsyncDecompressor.decompressAsync(input, options, callback);
	            }
	        });
	    }
	    LZUTF8.decompressAsync = decompressAsync;
	    function createCompressionStream() {
	        return LZUTF8.AsyncCompressor.createCompressionStream();
	    }
	    LZUTF8.createCompressionStream = createCompressionStream;
	    function createDecompressionStream() {
	        return LZUTF8.AsyncDecompressor.createDecompressionStream();
	    }
	    LZUTF8.createDecompressionStream = createDecompressionStream;
	    var globalUTF8TextEncoder;
	    var globalUTF8TextDecoder;
	    function encodeUTF8(str) {
	        if (typeof str !== "string")
	            throw new TypeError("encodeUTF8: null, undefined or invalid input type received");
	        if (LZUTF8.runningInNodeJS()) {
	            return LZUTF8.convertToByteArray(new Buffer(str, "utf8"));
	        }
	        if (typeof TextEncoder === "function") {
	            if (globalUTF8TextEncoder === undefined)
	                globalUTF8TextEncoder = new TextEncoder("utf-8");
	            return LZUTF8.convertToByteArray(globalUTF8TextEncoder.encode(str));
	        }
	        else
	            return LZUTF8.Encoding.UTF8.encode(str);
	    }
	    LZUTF8.encodeUTF8 = encodeUTF8;
	    function decodeUTF8(input) {
	        input = LZUTF8.convertToByteArray(input);
	        if (LZUTF8.runningInNodeJS()) {
	            return input.toString("utf8");
	        }
	        else if (typeof TextDecoder === "function") {
	            if (globalUTF8TextDecoder === undefined)
	                globalUTF8TextDecoder = new TextDecoder("utf-8");
	            return globalUTF8TextDecoder.decode(input);
	        }
	        else
	            return LZUTF8.Encoding.UTF8.decode(input);
	    }
	    LZUTF8.decodeUTF8 = decodeUTF8;
	    function encodeBase64(input) {
	        if (input == null)
	            throw new TypeError("decodeBase64: undefined or null input received");
	        input = LZUTF8.convertToByteArray(input);
	        if (LZUTF8.runningInNodeJS()) {
	            var result = input.toString("base64");
	            if (result == null)
	                throw new Error("encodeBase64: failed encdoing Base64");
	            return result;
	        }
	        else
	            return LZUTF8.Encoding.Base64.encode(input);
	    }
	    LZUTF8.encodeBase64 = encodeBase64;
	    function decodeBase64(str) {
	        if (typeof str !== "string")
	            throw new TypeError("decodeBase64: invalid input type received");
	        if (LZUTF8.runningInNodeJS()) {
	            var result = LZUTF8.convertToByteArray(new Buffer(str, "base64"));
	            if (result === null)
	                throw new Error("decodeBase64: failed decoding Base64");
	            return result;
	        }
	        else
	            return LZUTF8.Encoding.Base64.decode(str);
	    }
	    LZUTF8.decodeBase64 = decodeBase64;
	    function encodeBinaryString(input) {
	        input = LZUTF8.convertToByteArray(input);
	        return LZUTF8.Encoding.BinaryString.encode(input);
	    }
	    LZUTF8.encodeBinaryString = encodeBinaryString;
	    function decodeBinaryString(str) {
	        return LZUTF8.Encoding.BinaryString.decode(str);
	    }
	    LZUTF8.decodeBinaryString = decodeBinaryString;
	})(LZUTF8 || (LZUTF8 = {}));
	/// <reference path="./LZUTF8/Library/Dependencies/node-internal.d.ts"/>
	/// <reference path="./LZUTF8/Library/Common/Globals.ext.ts"/>
	/// <reference path="./LZUTF8/Library/Common/StringBuilder.ts"/>
	/// <reference path="./LZUTF8/Library/Common/ArraySegment.ts"/>
	/// <reference path="./LZUTF8/Library/Common/ArrayTools.ts"/>
	/// <reference path="./LZUTF8/Library/Common/ByteArray.ts"/>
	/// <reference path="./LZUTF8/Library/Common/CompressionCommon.ts"/>
	/// <reference path="./LZUTF8/Library/Common/EventLoop.ts"/>
	/// <reference path="./LZUTF8/Library/Common/GlobalInterfaces.ts"/>
	/// <reference path="./LZUTF8/Library/Async/AsyncCompressor.ts"/>
	/// <reference path="./LZUTF8/Library/Common/ObjectTools.ts"/>
	/// <reference path="./LZUTF8/Library/Async/AsyncDecompressor.ts"/>
	/// <reference path="./LZUTF8/Library/Common/Timer.ts"/>
	/// <reference path="./LZUTF8/Library/Compression/Compressor.ts"/>
	/// <reference path="./LZUTF8/Library/Compression/CompressorCustomHashTable.ts"/>
	/// <reference path="./LZUTF8/Library/Compression/CompressorSimpleHashTable.ts"/>
	/// <reference path="./LZUTF8/Library/Decompression/Decompressor.ts"/>
	/// <reference path="./LZUTF8/Library/Async/WebWorker.ts"/>
	/// <reference path="./LZUTF8/Library/Encoding/Base64.ts"/>
	/// <reference path="./LZUTF8/Library/Encoding/BinaryString.ts"/>
	/// <reference path="./LZUTF8/Library/Encoding/Misc.ts"/>
	/// <reference path="./LZUTF8/Library/Encoding/UTF8.ts"/>
	/// <reference path="./LZUTF8/Library/Exports/Exports.ts"/>

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(6).Buffer, __webpack_require__(10).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(7)
	var ieee754 = __webpack_require__(8)
	var isArray = __webpack_require__(9)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  function Foo () {}
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    arr.constructor = Foo
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Foo && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 8 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, __webpack_require__(10).clearImmediate))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(12).EventEmitter;
	var inherits = __webpack_require__(13);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(14);
	Stream.Writable = __webpack_require__(25);
	Stream.Duplex = __webpack_require__(26);
	Stream.Transform = __webpack_require__(27);
	Stream.PassThrough = __webpack_require__(28);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18);
	exports.Stream = __webpack_require__(11);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(22);
	exports.Duplex = __webpack_require__(15);
	exports.Transform = __webpack_require__(23);
	exports.PassThrough = __webpack_require__(24);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(16);
	util.inherits = __webpack_require__(17);
	/*</replacement>*/

	var Readable = __webpack_require__(18);
	var Writable = __webpack_require__(22);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ },
/* 17 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(19);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(6).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(12).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(11);

	/*<replacement>*/
	var util = __webpack_require__(16);
	util.inherits = __webpack_require__(17);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(20);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(15);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(21).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(15);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(21).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(6).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(6).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(16);
	util.inherits = __webpack_require__(17);
	/*</replacement>*/

	var Stream = __webpack_require__(11);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(15);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(15);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(15);

	/*<replacement>*/
	var util = __webpack_require__(16);
	util.inherits = __webpack_require__(17);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(23);

	/*<replacement>*/
	var util = __webpack_require__(16);
	util.inherits = __webpack_require__(17);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22)


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15)


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23)


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24)


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LZUTF8 = __webpack_require__(3);

	/**
	 * Given a compressed value, return a board array
	 * @param compressedResult - {String?/Number?} compressed game of life board
	 * @param width {number} -  Width of our matrix
	 * @param height {number} - Height of our Matrix
	 * @returns {Matrix} - Decompressed game of life matrix
	 */
	function expand(compressedResult, width, height) {

		var decompressed = LZUTF8.decompress(compressedResult, {inputEncoding: 'BinaryString'}),

			// 001001 to ['0','0','1','0','0','1']
			decompressedToArray = decompressed.split(''),

			// Map ['1'] to [1], then reduce to a matrix [ [1] ]
			result = decompressedToArray
				.map(function(cell) {
					return parseInt(cell, 10);
				})
				.reduce(function(memo, cell, index) {
					if (index%width === 0) {
						memo.push([]);
					}
					memo[memo.length - 1].push(cell);
					return memo;
				}, []);

		return result;
	}

	module.exports = expand;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Given a board array, calculate the next "step", and return it in a callback function
	 * @param board {Matrix} - Matrix containing 1s and 0s, representing a game of life board
	 * @param callback {Function} - function called with the "next" iteration of the game board
	 */
	function next(board, callback) {

		var width = board[0].length,
			newBoard = board.map(function(row, rowIndex){
			return row.map(function(cell, colIndex) {

				var topRow = (rowIndex - 1) >= 0 ? (rowIndex - 1) : board.length - 1,
					bottomRow = (rowIndex + 1) % board.length,

					leftCol = (colIndex - 1) >= 0 ? (colIndex - 1) : width - 1,
					rightCol = (colIndex + 1) % width,

					neighbors = [
						board[topRow][leftCol], board[topRow][colIndex], board[topRow][rightCol],
						board[rowIndex][leftCol], board[rowIndex][rightCol],
						board[bottomRow][leftCol], board[bottomRow][colIndex], board[bottomRow][rightCol]
					],
					neighborCount = neighbors.reduce(function(memo, neighbor) {
						return memo + neighbor;
					}, 0);

				if (cell === 0) {
					return neighborCount === 3 ? 1 : 0;
				}

				return (neighborCount === 2 || neighborCount === 3) ? 1 : 0;
			});
		});

		callback(newBoard);
	}
	module.exports = next;

/***/ }
/******/ ]);