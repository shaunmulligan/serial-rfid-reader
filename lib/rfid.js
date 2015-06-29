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
	
	RFIDReader.prototype._serialParse = function(input, cb){
		
	};
	
	RFIDReader.prototype.getRFIDToken = function(input, cb){
		
	};
	
	/**
	
		Setter functions	
	
	*/
	
	//Set the _onSerialRead function.
	RFIDReader.prototype.setSerialParse = function(){
		
	};
	
	//Helper function to ensure that functions assigned follow the proper definition
	RFIDReader.prototype._setFunction = function(functionName, requiredArguments, fnc){
		
	};
	
	//Listen will start the reader.	
	RFIDReader.prototype.listen = function(){
		
	};
	
	return RFIDReader;
}