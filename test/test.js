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
	
	it('should allow the setting of _serialParse via the setOnSerialRead function');
	
	it('should allow the setting of _onRFIDTokenRead via the setOnRFIDTokenRead function');
	
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
			
			tmp.listen();
			
		}).to.not.throw();
	});
	
});

describe('Response from the RFID card', function(){
	
	it('should react when a card is pressed against the reader');
	
});

describe('Serial Parsing');

describe('Get RFID Token', function(){
	it('should not call _onRFIDTokenRead if it is not set');
	
	it('should call _onRFIDTokenRead if it is set');
});