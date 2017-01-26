/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const Yadll = require('../');
suite.add('Yadll.push', function () {
	const dll = new Yadll();
	for (var i = 0; i < 1000; i++) {
		dll.push(i);
	}
}).add('Yadll.unshift', function () {
	const dll = new Yadll();
	for (var i = 0; i < 1000; i++) {
		dll.unshift(i);
	}
}).on('cycle', function (event) {
	console.log(String(event.target));
}).on('complete', function () {
	console.log('Fastest is ' + this.filter('fastest').map('name').join(', '));
}).run({'async' : true});
