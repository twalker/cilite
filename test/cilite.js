var assert = require("assert"),
	CILite = require('../lib/cilite'),
	five = require("johnny-five");

describe('CILite', function(){
	var lite;
	var board = new five.Board();

	before(function(done){
		board.on('ready', function(){
			lite = new CILite();
			done();
		});
	});

	after(function(){
		lite.off();
	})

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
		it('should turn the light a provided color name', function(){
			assert.ok(lite.turn)

			lite.turn('blue');
			assert.equal(lite.color, 'blue')

			assert.throws(
				function(){
					lite.turn('fuchsia');
				},
				/fuchsia/
			);

		})

	})

	describe('.red(), .green(), .blue()', function(){
		it('should have convenience methods for setting the color', function(){
			assert.ok(lite.red)
			assert.ok(lite.blue)
			assert.ok(lite.green)

			lite.red();
			assert.equal(lite.color, "red")
			lite.green();
			assert.equal(lite.color, "green")
			lite.blue();
			assert.equal(lite.color, "blue")
		})

		it('should have .failure(), .building(), .success() aliases for build status semantics', function(){
			// alias methods
			assert.ok(lite.success)
			assert.ok(lite.failure)
			assert.ok(lite.building)

		})
	})
})