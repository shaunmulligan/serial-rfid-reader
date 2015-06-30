var expect = require('chai').expect,
	RFIDReader = require('../index.js');
	
var COM_PORT = process.env.COM_PORT;

if(!COM_PORT){
	throw new Error('You must set the COM port via the environment variable COM_PORT to continue');
}
	
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
	
	it('should set the events.read function when setting the on("read")', function(){
		var tmp = new RFIDReader('fake', 57600);
		expect(tmp.events.read).to.be.null;
		
		tmp.on('read', function(input){
			
		});
		
		expect(tmp.events.read).to.be.ok;
	});
	
	it('should throw an error if on("read") is not passed a function with one argument (input)', function(){
		var tmp = new RFIDReader('fake', 57600);
		
		expect(function(){
			
			tmp.on('read', function(){
				
			});
			
		}).to.throw();
	});
	
	it('should throw an error if the "read" event is not set when listening', function(){
		var tmp = new RFIDReader('fake', 57600);
		expect(function(){
			tmp.listen();
		}).to.throw();
	});
	
	it('should set the events.serial function when setting the on("serial")', function(){
		var tmp = new RFIDReader('fake', 57600);
		
		tmp.events.serial = null;
		
		expect(tmp.events.serial).to.be.null;
		
		tmp.on('serial', function(a, b){
			
		});
		
		expect(tmp.events.serial).to.be.ok;
	});
	
	it('should throw an error if on("serial") is not passed a function with two arguments (input, cb)', function(){
		var tmp = new RFIDReader('fake', 57600);
		
		expect(function(){
			tmp.on('serial', function(a){
				
			});
		}).to.throw();
	});
	
	it('should set events.open when setting the on("open")', function(){
		var tmp = new RFIDReader('fake', 57600);
		expect(tmp.events.open).to.be.null;
		tmp.on('open', function(){});
		expect(tmp.events.open).to.be.ok;
	});
	
	it('should throw an error if on("open") is not passed a function with no arguments', function(){
		var tmp = new RFIDReader('fake', 57600);
		expect(function(){
			tmp.on("open", function(fake){
				
			});
		}).to.throw();
	});
	
	it('should only allow you to set an "on" event for serial, open, and read', function(){
		var tmp = new RFIDReader('fake', 57600);
		expect(function(){
			tmp.on('serial', function(input, cb){});
		}).to.not.throw();
		expect(function(){
			tmp.on('read', function(input){});
		}).to.not.throw();
		expect(function(){
			tmp.on('open', function(){});
		}).to.not.throw();
		expect(function(){
			tmp.on('fake', function(){});
		}).to.throw();
	});
	
});

describe('Open Connection', function(){
	
	it('should throw an error if the serialport connection can not be opened', function(){
		expect(function(){
			var tmp = new RFIDReader('fakeSerialPortAddress', 57600);
			
			tmp.listen();
			
		}).to.throw();
	});
	
	it('should open a connection and not throw any errors if the serial port connection can be opened', function(done){
		expect(function(){
			var tmp = new RFIDReader(COM_PORT, 57600);
			
			tmp.on('read', function(result){
				
			});
			
			tmp.listen();
			
		}).to.not.throw();
		setTimeout(function(){
			tmp.close();
			done();
		}, 1000);
	});
	
	it('should, if the "open event" is defined, call the open event on a successful serial port connection', function(done){
		expect(function(){
			var tmp = new RFIDReader(COM_PORT, 57600);
			
			tmp.on('read', function(result){
				
			});
			
			tmp.on('open', function(){
				expect.to.be.ok;
				tmp.close();
				done();
			});
			
			tmp.listen();
			
		}).to.not.throw();
	});
	
});

describe('Response from the RFID card', function(){
	
	it('should react when a card is pressed against the reader', function(done){
		console.log("Please use the card on the reader.");
		var reader = new RFIDReader(COM_PORT, 57600);
		
		reader.on('read', function(input){
			expect(input).to.be.ok;
			reader.close();
			done();
		});
		
		reader.listen();
		
	});
	
});

describe('Serial Parsing', function(){
	
	it('should call the on("serial") on a RFID card event', function(done){
		console.log("Please use the card on the reader");
		var reader = new RFIDReader(COM_PORT, 57600);
		
		reader.on('serial', function(input, cb){
			expect.to.be.ok;
			reader.close();
			done();
		});
		
		reader.on('read', function(input){
			
		});
		
		reader.listen();
		
	});
	
	it('should, by default, parse a string and trim spaces / new line characters', function(done){
		var tmp = new RFIDReader(COM_PORT, 57600);
		
		tmp.events.serial(' abcdefgh_5 ', function(err, parsed){
			expect(err).to.be.null;
			expect(parsed).to.be.equal('abcdefgh_5');
			done();
		});
	});
	
});

describe('On RFID Token', function(){
	
	it('should call the read event on an RFID token read', function(done){
		console.log("Please use the card on the reader");
		var reader = new RFIDReader(COM_PORT, 57600);
		
		reader.on('read', function(input){
			expect(input).to.be.ok;
			reader.close();
			done();
		});
		
		reader.listen();
		
	});
	
});