/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const Node = require('./Node');
/**
 *
 * @param {List} list
 * @param {Node} node
 * @return {Node}
 */
function push(list, node) {
	if (list.tail === node) {
		return node;
	}
	if (node.list !== null) {
		cut(node);
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
 * @param {Node} node
 * @return {Node}
 */
function unshift(list, node) {
	if (list.head === node) {
		return node;
	}
	if (node.list !== null) {
		cut(node);
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
 * @param {List} list
 * @param {Node} node
 * @param {Node} newNode
 * @returns {Node|Boolean}
 */
function insertAfter(list, node, newNode) {
	if (!(node instanceof Node) || node.list !== list) {
		return false;
	}
	const next = node.next;
	if (next === null) {
		return push(list, newNode);
	}
	newNode.list = list;
	node.next = newNode;
	newNode.prev = node;
	newNode.next = next;
	next.prev = newNode;
	list.length++;
	return newNode;
}
/**
 *
 * @param {List} list
 * @param {Node} node
 * @param {Node} newNode
 * @returns {Node|Boolean}
 */
function insertBefore(list, node, newNode) {
	if (!(node instanceof Node) || node.list !== list) {
		return false;
	}
	const prev = node.prev;
	if (prev === null) {
		return unshift(list, newNode);
	}
	newNode.list = list;
	node.prev = newNode;
	newNode.next = node;
	newNode.prev = prev;
	prev.next = newNode;
	list.length++;
	return newNode;
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
 * @param {Node} start
 * @param {Boolean} backward
 * @param {Function.<Node>} iterator
 */
function iterate(start, backward, iterator) {
	if (start === null) {
		return;
	}
	let node = start;
	const next = backward ? 'prev' : 'next';
	while (node !== null) {
		const current = node;
		node = node[next];
		iterator(current);
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
	return cut(this.tail);
};
/**
 *
 * @param {*} node
 */
List.prototype.push = function (node) {
	if (!(node instanceof Node)) {
		node = new Node(node);
	}
	return push(this, node);
};
/**
 *
 * @return {*}
 */
List.prototype.shift = function () {
	return cut(this.head);
};
/**
 *
 * @param node
 */
List.prototype.unshift = function (node) {
	if (!(node instanceof Node)) {
		node = new Node(node);
	}
	return unshift(this, node);
};
/**
 *
 * @param {Node} node
 * @param {Node} newNode
 * @returns {Node|Boolean}
 */
List.prototype.insertAfter = function (node, newNode) {
	if (!(newNode instanceof Node)) {
		newNode = new Node(newNode);
	}
	return insertAfter(this, node, newNode);
};
/**
 *
 * @param {Node} node
 * @param {Node} newNode
 * @returns {Node|Boolean}
 */
List.prototype.insertBefore = function (node, newNode) {
	if (!(newNode instanceof Node)) {
		newNode = new Node(newNode);
	}
	return insertBefore(this, node, newNode);
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
	iterate(this.head, false, callback);
};
/**
 *
 * @param {Function.<Node>} callback
 */
List.prototype.forEachReverse = function (callback) {
	iterate(this.tail, true, callback);
};
List.prototype.clear = function () {
	this.length = 0;
	this.head = null;
	this.tail = null;
};
module.exports = List;
