var assert = require("assert"),
	CILite = require('../lib/cilite');

describe('CILite', function(){
	var lite;

	beforeEach(function(){
		lite = new CILite();
	});

	describe('constructor(options)', function(){
		it('should have colors', function(){
			assert.ok(CILite.colors)
		})

	})

	describe('.color', function(){

		it('should have a color getter/setter', function(){
			lite.color = 'red';
			assert.equal(lite.color, 'red')
		});
	});

	describe('.turn(color)', function(){
		it('should have turn the light a provided color', function(){
			assert.ok(lite.turn)

			lite.turn('yellow');
			assert.equal(lite.color, 'yellow')

			assert.throws(
				function(){
					lite.turn('fuchsia');
				},
				/fuchsia/
			);

		})

	})
	describe('.red(), .yellow(), .green()', function(){
		it('should have convenience methods for setting the color', function(){
			assert.ok(lite.red)
			assert.ok(lite.yellow)
			assert.ok(lite.green)

			lite.green();
			assert.equal(lite.color, "green")
			lite.red();
			assert.equal(lite.color, "red")
			lite.yellow();
			assert.equal(lite.color, "yellow")
		})

	})
})