/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
/**
 * @param {*} value
 * @constructor
 */
function Node(value) {
	this.value = value;
	this.next = null;
	this.prev = null;
	this.list = null;
}
/**
 *
 * @return {string}
 */
Node.prototype.toString = function () {
	return String(this.value);
};
/**
 *
 */
Node.prototype.destroy = function () {
	this.value = null;
	this.next = null;
	this.prev = null;
	this.list = null;
};
module.exports = Node;
