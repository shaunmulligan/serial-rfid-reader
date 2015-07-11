var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

module.exports = function(){
	
	var RFIDReader = function(port, options){
		if(!port || typeof port != 'string') throw new Error('Port must be provided and be a string')
		if(!options) throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		if(typeof options == 'object' && !options.baudrate && !options.baudRate) throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		else if(typeof options == 'number') options = { baudrate: options };
		else if(typeof options != 'object' && typeof options != 'number') throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		
		if(!options.parser) options.parser = serialport.parsers.readline("\n");
		
		this.serialPort = new SerialPort(port, options, false);
		
		this.events =
			{
				serial: function(input, cb){
					input = input.trim().replace(/\W/g, '');
					cb(null, input);
				},
				
				read: null,
				
				open: null
			};
	};
	
	RFIDReader.prototype.on = function(event, fnc){
		if(['serial', 'read', 'open'].indexOf(event) == -1) throw new Error('Only the read, serial, and open events are open in this module.');
		
		if(event == 'serial'){
			if(fnc.length != 2) throw new Error('The "serial" event expects a function with two inputs - the input string and a callback of function(err, parsedString)');
		} else if(event == 'read'){
			if(fnc.length != 1) throw new Error('The "read" event expects a function with a single input.');
		} else if(event == 'open'){
			if(fnc.length != 0) throw new Error('The "open" event expects a function with no arguments');
		}
		
		this.events[event] = fnc;
		
		return this;
	};
	
	//Listen will start the reader.	
	RFIDReader.prototype.listen = function(cb){
		var self = this;
		if(!self.events.read) throw new Error('The "read" event has not been defined');
		
		if(self.events.open) self.serialPort.on("open", self.events.open);
		
		self.serialPort.on("data", function(data){
			self.events.serial(data, function(err, parsedResult){
				if(typeof err == 'undefined') err = null;
				if(err) return;
				
				self.events.read(parsedResult);
			});
		});
		
		//Why close first? I've had a lot of issues with the port being open/reserved that this fixes.
		self.serialPort.close(function(err){
			self.serialPort.open(function(err){
				if(typeof err == 'undefined') err = null;
				if(cb) return cb(err);
				if(err) throw new Error(err);
				
				//if(self.events.open) self.events.open();
				
				if(cb) cb();
			});
		});
	};
	
	RFIDReader.prototype.close = function(cb){
		this.serialPort.close(function(err){
			if(typeof err == 'undefined') err = null;
			cb ? cb(err) : function(err){ throw new Error(err) }
		});
	};
	
	return RFIDReader;
}
