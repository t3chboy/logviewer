module.exports = {
	
	socketUsers : "",
	socket : "",
	sio : "",

	listenUpdate : function(socketUsers,socket,sio){

		module.exports.socketUsers = socketUsers;
		module.exports.socket = socket;
		module.exports.sio = sio;
	},

	/**
	 * Send update to client
	 * @param  {Number}
	 * @param  {String}
	 * @return {[type]}
	 */
	updateUser : function(socketId,message){
	 	
	 	module.exports.socketUsers[socketId]['totalSaveCount']= module.exports.socketUsers[socketId]['totalSaveCount'] + 1;
	 	module.exports.sio.to(`${socketId}`).emit('saveSuccessRecordCount', module.exports.socketUsers[socketId]['totalSaveCount'] );
	},

	/**
	 * send warning message to client
	 * @param  {String}
	 * @return {[type]}
	 */
	notifyUserWarnmsg : function(message){
		module.exports.sio.to(`${module.exports.socket.id}`).emit('warningmsg', message );	 	
	 },

	/**
	 * send success message to client
	 * @param  {String}
	 * @return {[type]}
	 */
	notifyUserSuccessmsg : function(message){
	 	module.exports.sio.to(`${module.exports.socket.id}`).emit('successmsg', message );	 		
	 }	

}