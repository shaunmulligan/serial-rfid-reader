# serial-rfid-reader

This library is for use for simple serial output RFID readers. It was originally created for the [Innovations RFID reader kit found at Sparkfun](https://www.sparkfun.com/products/13198). It should work for any RFID reader that dumps its output to a serial port that node can read.

## Install
```
npm install serial-rfid-reader
```

## Example use
```
var RFIDReader = require('serial-rfid-reader');
var rfid = new RFIDReader('/dev/tty0', 9600);

rfid.on("read", function(read){

  console.log("RFID reader has read the following: ", read);
  
}).listen(function(err){
  console.log("RFID Reader is now listening!");
})
```

### Constructor

The constructor accepts two arguments.
* port - A string representing the COM port to listen to. /dev/tty0 or COM4 are examples.
* options
  * If it is a number, it is assumed that this is the baud rate.
  * If it is an object, it will be passed to node-serialport as options. Baudrate must be included.
  
### listen(cb)
This will open the serial port and start listening for reads. Once open, it will call the cb and the "open" event, whichever you've defined (if any).

### close
This closes the serial port.

### Events / functions

There are three events you can subscribe to.
* serial - function(input, cb) - By default, this function will trim any non alphanumeric characters and spaces. This receives the raw input from the serial port. The callback function cb is function(err, parsedRead);
* read - function(read) - This is called with the parsedRead returned from serial port if err is null.
* open - function() - This is called when the serial port successfully opens.

## node-serialport

This module makes use of node-serialport. This is a massive pain to compile on windows machines, so I suggest mozying on over to [their github page](https://github.com/voodootikigod/node-serialport). They have several excellent explanations there and on their wiki page that will help the install process.
