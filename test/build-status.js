var assert = require("assert"),
	BuildStatus = require('../lib/build-status');

describe('BuildStatus', function(){
	var status;

	beforeEach(function(){
		status = new BuildStatus({
			url: 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true',
			interval: 1000
		});
	});

	describe('constructor(options)', function(){
		it('should accept options', function(){
			assert.ok(status.options)
			assert.equal(status.options.url, 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true')
			assert.equal(status.options.interval, 1000)
		})

	})

})