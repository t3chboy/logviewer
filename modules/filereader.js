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
 * [mongoService MongoDb service object]
 * @type {[type]}
 */
const mongoService = require("./mongoService");

/**
 * [notificationService Notification service module object]
 * @type {[type]}
 */
const notificationService = require("./notificationService");


/**
 * It keeps on watching file for any changes and emits them back to client
 * @param  {Objct}
 * @param  {Array}
 * @param  {Object}
 * @return {[type]}
 */
const reader = ( sio, socketUsers, socket)=>{
	
	/**
	 * [oldsize last postion where eof was found and will be used as new start position for file read]
	 * @type {Number}
	 */
	let oldsize = 0;

	/**
	 * [shouldWait boolean to handle the issue of node file descriptor twice event trigger]
	 * @type {Boolean}
	 */
	let shouldWait = false;
	
	/**
	 * [logFilename Name of the file to read]
	 * @type {[type]}
	 */
	const logFilename = socketUsers[socket.id]['filenamePath'];
	
	//This function will start watching file for any updates
	fs.watch( logFilename , function( event ){

		//wait till true and than handle event
		if(shouldWait) return;
		else{
			shouldWait = setTimeout( () => {
			shouldWait = false;	
			}, 100);	
		fs.stat( logFilename , (err,stat) => {
			
			
			let oldsize = socketUsers[socket.id]['location'];
			
			//get the file data from start and end position specified.	
			const fsread =  fs.createReadStream(logFilename , { start : oldsize , end : stat.size } );
			
			const fileReadLine = rf.createInterface({
  				input: fsread,
  				crlfDelay: Infinity
			});

			fileReadLine.on('line', (line) => {

			  sio.to(`${socket.id}`).emit('streamingdata', line);
			  
			  //save file data in DB	
			  if( socketUsers[socket.id].saveFlag == 1 && ( 'model' in socketUsers[socket.id] ) == true ){
			  	
			  	console.log("Record saved to db for " +socket.id);
			  	
			  	const genModel = socketUsers[socket.id]['model'];
			  	
			  	const saveStatus = mongoService.generateLogDataToStore( genModel , line );
			  	
			  	//send notification to user
			  	notificationService.updateUser(socket.id, saveStatus );
				
				sio.to(`${socket.id}`).emit('displayCollectionName', socketUsers[socket.id]['model'].modelName );

			  	}
			});
 			
			oldsize = stat.size;
			socketUsers[socket.id]['location'] = oldsize;
		
		});
		}				
	});
}

module.exports = reader;