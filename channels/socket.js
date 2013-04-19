;!function(exports, undefined) {
	
	var channel = {
		name: 'socket',
		init: function(callback){
			var self = this;
			if(!this.socket){
				throw new Error('No Socket Supplied');
			}
			
			this.socket.on('data', function(buff){
				var entity =  new self._Entity({
					value: buff.toString()
				});
				self.emit('entity', entity);
			});
			
			this.socket.on('close', function(){
				self.emit('close', {});
			});
			
			if(callback){
				callback(this);
			}
		},
		publish: function(entity){
			this.emit('entity', entity);
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