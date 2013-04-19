;!function(exports, undefined) {
	
	var channel = {
		name: 'connect',
		publish: function(entity){
			throw new Error('Cannot publish to TCP Server');
		},
		init: function(callback){
			var self = this;
			var net = require('net');
			
			var server = net.createServer(function(socket) { //'connection' listener
			//TODO: need a way to require channel ctr
			  	var tcpChannel = new self.constructor('myConn', {
					type: 'TCP.Socket',
					socket: socket
				});
				
				self.emit('entity', new self._Entity({
					Channel: tcpChannel
				}));
			});
			
			server.listen(8000, function() { //'listening' listener
			  console.log('server bound');
			});
		}
	}
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return channel;
		});
	} else {
		exports.Channel = channel;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);