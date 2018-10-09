
/**
 * [fs Node File module object]
 * @type {Object}
 */
const fs = require('fs');

/**
 * [rf Node Readline module object]
 * @type {Object}
 */
const rf = require('readline');

/**
 * [notificationService Notification service module object]
 * @type {[type]}
 */
const notificationService = require("./notificationService");


/**
 * Used to read file
 * @return {Promise}
 */
const singleRead = ( sio, socket, socketUsers )=>{

	const logFilename = socketUsers[socket.id]['filenamePath'];



 	return new Promise(( resolve,reject )=>{

 		if( !fs.existsSync( logFilename ) ){
			notificationService.notifyUserWarnmsg( "File Does not exists,kindly provide valid File name and path" );
			return reject("File Does not exists");
		
		}

 		//get file properties
 		fs.stat( logFilename , (err,stat) => {
 				
 				//store startig position for file read	
 				let calculateStartSize = 0;
 				
 				if( stat.size > 1000000 ){
 					calculateStartSize = stat.size - 1000000;
 				}
 				
 				//read file from staring position to eof.
				const rl = rf.createInterface({
			  		input: fs.createReadStream( logFilename , { start : calculateStartSize } ),
			  		crlfDelay: Infinity
				});
				
				
				if( socketUsers.indexOf(socket.id) == -1 ){
					
					//emit file data  line by line
					rl.on('line', (line) => {
						
					let lineData = "";
					  
					  sio.to(`${socket.id}`).emit('streamingdata', line);
					  lineData = line;
					
						if( lineData == "" ){
							reject("Failed to read the file");
						}else{
							resolve( [socketUsers , socket] );
						}

					});
				}
		});		
	});		
}

/**
 * Used to get last file read size and store it for async file read during file changes.
 * @param  {Array}
 * @param  {Object}
 * @return {Promise}
 */
const getLastSize = ( socketUsers , socket )=>{

	const logFilename = socketUsers[socket.id]['filenamePath'];

	return new Promise( ( resolve, reject ) =>{

		fs.stat(logFilename,(err,statser)=>{
			let currFileLastSize = statser.size;
			
			if( currFileLastSize == 0 ){
				reject("Failed to read the file");
			}else{
				resolve(currFileLastSize);
			}
		});	
	});
}

/**
 * @param  {Object}
 * @param  {Object}
 * @param  {Array}
 * @return {Integer}
 */
const initializeSingleRead = function( sio, socket, socketUsers ){

	const lastfilereadPosition = singleRead( sio, socket, socketUsers )
	.then( (socketUsers )=>{
		return getLastSize( socketUsers[0] , socketUsers[1] );
	},function(error){
		throw(error);
	}).then( (result) => {
		console.log("Last file read position "+result );
		return result;
	}).catch((err)=>{
		console.log("Error while single read"+err);
	});
	return lastfilereadPosition;
}


module.exports = initializeSingleRead;	