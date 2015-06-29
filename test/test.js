var expect = require('chai').expect,
	RFIDReader = require('../index.js');
	
var COM_PORT = 'test';
	
console.log("Many of these tests require an open connection to an RFID reader as determined by the --port= argument.");

describe('Initialization', function(){
	
	it('should allow a string an object with a baudrate attribute to pass', function(){
		expect(function(){
			var tmp = new RFIDReader('something', { baudrate: 57600 });
		}).to.not.throw();
	});
	
	it('should throw an error if you do not provide a port and a settings object.', function(){
		expect(function(){
			var tmp = new RFIDReader();
		}).to.throw();
		
		expect(function(){
			var tmp2 = new RFIDReader('something');
		}).to.throw();
	});
	
	it('should allow you to pass a number for baudrate for initialization', function(){
		expect(function(){
			var tmp = new RFIDReader('something', 57600);
		}).to.not.throw();
	});
	
	it('should throw an error if the options object does not specify baudrate', function(){
		expect(function(){
			var tmp = new RFIDReader('something', { test: 'fake' });
		}).to.throw();
	});
	
	it('should throw an error if the port is not a string', function(){
		expect(function(){
			var tmp = new RFIDReader({ test: 'fake'}, { baudrate: 57600 });
		}).to.throw();
	});
	
});

describe('Configuring RFID Reader', function(){
	
	it('should set the events.read function when setting the on("read")');
	
	it('should throw an error if on("read") is not passed a function with two arguments (input, cb)');
	
	it('should throw an error if the "read" event is not set when listening');
	
	it('should not throw an error if the "read" event is set when listening');
	
	it('should set the events.serial function when setting the on("serial")');
	
	it('should throw an error if on("read") is not passed a function with two arguments (input, cb)');
	
});

describe('Open Connection', function(){
	
	it('should throw an error if the serialport connection can not be opened', function(){
		expect(function(){
			var tmp = new RFIDReader('fakeSerialPortAddress', 57600);
			
			tmp.listen();
			
		}).to.throw();
	});
	
	it('should open a connection and not throw any errors if the serial port connection can be opened', function(){
		expect(function(){
			var tmp = new RFIDReader(COM_PORT, 57600);
			
			tmp.on('read', function(){
				
			});
			
			tmp.listen();
			
		}).to.not.throw();
	});
	
});

describe('Response from the RFID card', function(){
	
	it('should react when a card is pressed against the reader');
	
});

describe('Serial Parsing', function(){
	
	it('should call the on("serial") on a RFID card event');
	
	it('should, by default, parse a string and trim spaces / new line characters');
	
});

describe('On RFID Token', function(){
	
	it('should call the read event on an RFID token read');
	
});