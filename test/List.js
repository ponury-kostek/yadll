/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require('assert');
const List = require('../');
describe('List', () => {
	it('initialize', () => {
		const list = new List();
		assert.strictEqual(list.head, null);
		assert.strictEqual(list.tail, null);
		assert.strictEqual(list.length, 0);
	});
	describe('push', () => {
		it('direction', () => {
			const list = new List();
			list.push(1);
			assert.strictEqual(list.length, 1, 'length == 1');
			assert.strictEqual(list.head.value, 1, 'head.value == 1');
			assert.strictEqual(list.tail.value, 1, 'tail.value == 1');
			list.push(2);
			assert.strictEqual(list.length, 2, 'length == 2');
			assert.strictEqual(list.head.value, 1, 'head.value == 1');
			assert.strictEqual(list.tail.value, 2, 'tail.value == 2');
			list.push(3);
			assert.strictEqual(list.length, 3, 'length == 3');
			assert.strictEqual(list.head.value, 1, 'head.value == 1');
			assert.strictEqual(list.tail.value, 3, 'tail.value == 3');
			assert.strictEqual(list.tail.prev, list.head.next, 'tail.prev == head.next');
		});
		it('non "Node" items', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			for (var i = 0; i < length; i++) {
				const node = list.push(values[i]);
				assert.strictEqual(node.value, values[i]);
			}
			assert.equal(list.length, length);
		});
		it('"Node" items', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			for (var i = 0; i < length; i++) {
				const value = list.createNode(values[i]);
				const node = list.push(value);
				assert.strictEqual(node, value);
				assert.strictEqual(node.value, values[i]);
			}
			assert.equal(list.length, length);
		});
		it('tail', () => {
			const list = new List();
			const tail = list.push();
			list.push(tail);
			assert.strictEqual(list.length, 1);
			assert.strictEqual(list.tail, tail);
		});
		it('head', () => {
			const list = new List();
			list.push(1);
			list.push(2);
			const head = list.head.value;
			list.push(list.head);
			assert.strictEqual(list.length, 2);
			assert.strictEqual(list.tail.value, head);
		});
		it('from middle', () => {
			const list = new List();
			const nodes = [];
			for (var i = 0; i < 5; i++) {
				nodes.push(list.push(i));
			}
			list.push(nodes[2]);
			assert.strictEqual(list.length, 5);
			assert.strictEqual(list.tail, nodes[2]);
			assert.strictEqual(nodes[1].next, nodes[3]);
			assert.strictEqual(nodes[1], nodes[3].prev);
		});
		it('in correct order', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			const nodes = [];
			for (var i = 0; i < length; i++) {
				const value = list.createNode(values[i]);
				nodes.push(list.push(value));
			}
			assert.equal(list.length, length);
		});
	});
	describe('unshift', () => {
		it('direction', () => {
			const list = new List();
			list.unshift(1);
			assert.strictEqual(list.length, 1, 'length == 1');
			assert.strictEqual(list.head.value, 1, 'head.value == 1');
			assert.strictEqual(list.tail.value, 1, 'tail.value == 1');
			list.unshift(2);
			assert.strictEqual(list.length, 2, 'length == 2');
			assert.strictEqual(list.head.value, 2, 'head.value == 2');
			assert.strictEqual(list.tail.value, 1, 'tail.value == 1');
			list.unshift(3);
			assert.strictEqual(list.length, 3, 'length == 3');
			assert.strictEqual(list.head.value, 3, 'head.value == 3');
			assert.strictEqual(list.tail.value, 1, 'tail.value == 1');
			assert.strictEqual(list.tail.prev, list.head.next, 'tail.prev == head.next');
		});
		it('non "Node" items', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			for (var i = 0; i < length; i++) {
				const node = list.unshift(values[i]);
				assert.strictEqual(node.value, values[i]);
			}
			assert.equal(list.length, length);
		});
		it('"Node" items', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			for (var i = 0; i < length; i++) {
				const value = list.createNode(values[i]);
				const node = list.unshift(value);
				assert.strictEqual(node, value);
				assert.strictEqual(node.value, values[i]);
			}
			assert.equal(list.length, length);
		});
		it('tail', () => {
			const list = new List();
			const head = list.unshift();
			list.unshift(head);
			assert.strictEqual(list.length, 1);
			assert.strictEqual(list.head, head);
		});
		it('head', () => {
			const list = new List();
			list.unshift(1);
			list.unshift(2);
			const tail = list.tail.value;
			list.unshift(list.tail);
			assert.strictEqual(list.length, 2);
			assert.strictEqual(list.head.value, tail);
		});
		it('from middle', () => {
			const list = new List();
			const nodes = [];
			for (var i = 0; i < 5; i++) {
				nodes.push(list.push(i));
			}
			list.unshift(nodes[2]);
			assert.strictEqual(list.length, 5);
			assert.strictEqual(list.head, nodes[2]);
			assert.strictEqual(nodes[1].next, nodes[3]);
			assert.strictEqual(nodes[1], nodes[3].prev);
		});
		it('in correct order', () => {
			const values = [
				null,
				undefined,
				false,
				true,
				0,
				1,
				2.3,
				'text',
				[
					1,
					2
				],
				{a : 'b'}
			];
			const length = values.length;
			const list = new List();
			const nodes = [];
			for (var i = 0; i < length; i++) {
				const value = list.createNode(values[i]);
				nodes.unshift(list.unshift(value));
			}
			assert.equal(list.length, length);
		});
	});
	describe('pop', () => {
		it('empty list', () => {
			const list = new List();
			const node = list.pop();
			assert.strictEqual(node, null);
			assert.equal(list.length, 0);
		});
		it('drain', () => {
			const list = new List();
			list.push(1);
			const node = list.pop();
			assert.strictEqual(node.value, 1);
			assert.strictEqual(list.length, 0);
			assert.strictEqual(list.head, null);
			assert.strictEqual(list.tail, null);
		});
	});
	describe('shift', () => {
		it('empty list', () => {
			const list = new List();
			const node = list.shift();
			assert.strictEqual(node, null);
			assert.equal(list.length, 0);
		});
		it('drain', () => {
			const list = new List();
			list.push(1);
			const node = list.shift();
			assert.strictEqual(node.value, 1);
			assert.strictEqual(list.length, 0);
			assert.strictEqual(list.head, null);
			assert.strictEqual(list.tail, null);
		});
	});
	it('forEach', () => {
		const list = new List();
		let i = 0;
		for (; i < 5; i++) {
			list.push(i);
		}
		i = 0;
		list.forEach((node) => {
			assert.strictEqual(node.value, i++);
		});
	});
	it('forEachReverse', () => {
		const list = new List();
		let i = 0;
		for (; i < 5; i++) {
			list.unshift(i);
		}
		i = 0;
		list.forEachReverse((node) => {
			assert.strictEqual(node.value, i++);
		});
	});
	it('clear', () => {
		const list = new List();
		let i = 0;
		for (; i < 5; i++) {
			list.unshift(i);
		}
		list.clear();
		assert.strictEqual(list.length, 0);
		assert.strictEqual(list.head, null);
		assert.strictEqual(list.tail, null);
	});
});