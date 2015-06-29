var SerialPort = require('serialport').SerialPort;

module.exports = function(){
	
	var RFIDReader = function(port, options){
		if(!port || typeof port != 'string') throw new Error('Port must be provided and be a string')
		if(!options) throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		if(typeof options == 'object' && !options.baudrate && !options.baudRate) throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		else if(typeof options == 'number') options = { baudrate: options };
		else if(typeof options != 'object' && typeof options != 'number') throw new Error('Must supply baud rate when creating the RFID reader serial connection');
		
		this.serialPort = new SerialPort(port, options);
	};
	
	/**
	
		Event functions
		
		These handle each event in the RFIDReader workflow.
	
	**/
	RFIDReader.prototype.events =
		{
			serial: function(input, cb){
				
			},
			
			read: null		
		};
	
	RFIDReader.prototype.on = function(event, fnc){
		if(event != 'serial' || event != 'read') throw new Error('Only the serial and read events are exposed in this module.');
		
		if(event == 'serial'){
			
		} else if(event == 'read'){
			
		}
		
		this.events[event] = fnc;
		
		return this;
	};
	
	//Listen will start the reader.	
	RFIDReader.prototype.listen = function(){
		var self = this;
		if(!self.events.read) throw new Error('The "read" event has not been defined');
	};
	
	return RFIDReader;
}