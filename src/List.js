/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const Node = require('./Node');
/**
 *
 * @param {List} list
 * @returns {Node|null}
 */
function pop(list) {
	return cut(list.tail);
}
/**
 *
 * @param {List} list
 * @returns {Node|null}
 */
function shift(list) {
	return cut(list.head);
}
/**
 *
 * @param {List} list
 * @param {Node|*} node
 * @return {Node}
 */
function push(list, node) {
	if (!(node instanceof Node)) {
		node = new Node(node);
	}
	if (list.tail === node) {
		return node;
	}
	if (node.list !== null) {
		list.cut(node);
	}
	node.list = list;
	const tail = list.tail;
	list.tail = node;
	node.prev = tail;
	if (tail !== null) {
		tail.next = node;
	}
	if (list.length === 0) {
		list.head = node;
	}
	list.length++;
	return node;
}
/**
 *
 * @param {List} list
 * @param {Node|*} node
 * @return {Node}
 */
function unshift(list, node) {
	if (!(node instanceof Node)) {
		node = new Node(node);
	}
	if (list.head === node) {
		return node;
	}
	if (node.list !== null) {
		list.cut(node);
	}
	node.list = list;
	const head = list.head;
	list.head = node;
	node.next = head;
	if (head !== null) {
		head.prev = node;
	}
	if (list.length === 0) {
		list.tail = node;
	}
	list.length++;
	return node;
}
/**
 *
 * @param {Node} node
 * @return {Node}
 */
function cut(node) {
	if (node === null) {
		return null;
	}
	const list = node.list;
	const prev = node.prev;
	const next = node.next;
	if (prev !== null) {
		prev.next = next;
	}
	if (next !== null) {
		next.prev = prev;
	}
	if (node === list.head) {
		list.head = next;
	}
	if (node === list.tail) {
		list.tail = prev;
	}
	list.length--;
	node.list = null;
	return node;
}
/**
 *
 * @param {List} list
 * @param {Function.<Node>} callback
 */
function forEach(list, callback) {
	iterate(list.head, false, callback);
}
/**
 *
 * @param {List} list
 * @param {Function.<Node>} callback
 */
function forEachReverse(list, callback) {
	iterate(list.tail, true, callback);
}
/**
 *
 * @param {Node} start
 * @param {Boolean} backward
 * @param {Function.<Node>} callback
 */
function iterate(start, backward, callback) {
	let node = start;
	const next = backward ? 'prev' : 'next';
	while (node !== null) {
		const current = node;
		node = node[next];
		callback(current);
	}
}
/**
 *
 * @constructor
 */
function List() {
	/**
	 *
	 * @type {Node|null}
	 */
	this.head = null;
	/**
	 *
	 * @type {Node|null}
	 */
	this.tail = null;
	/**
	 *
	 * @type {number}
	 */
	this.length = 0;
}
List.prototype.createNode = function (value) {
	return new Node(value);
};
/**
 * @return {Node|null}
 */
List.prototype.pop = function () {
	return pop(this);
};
/**
 *
 * @param {*} node
 */
List.prototype.push = function (node) {
	return push(this, node);
};
/**
 *
 * @return {*}
 */
List.prototype.shift = function () {
	return shift(this);
};
/**
 *
 * @param node
 */
List.prototype.unshift = function (node) {
	return unshift(this, node);
};
/**
 *
 * @param node
 * @return {*}
 */
List.prototype.cut = function (node) {
	return cut(node);
};
/**
 *
 * @param {Function.<Node>} callback
 */
List.prototype.forEach = function (callback) {
	forEach(this, callback);
};
/**
 *
 * @param {Function.<Node>} callback
 */
List.prototype.forEachReverse = function (callback) {
	forEachReverse(this, callback);
};
List.prototype.clear = function () {
	/*this.forEach((node) => {
		node.destroy();
	});*/
	this.length = 0;
	this.head = null;
	this.tail = null;
};
module.exports = List;
