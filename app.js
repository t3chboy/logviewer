
console.log("app started");
/**
 * [express express object]
 * @type {object}
 */
const express = require("express");

/**
 * [fileReader Filereader object]
 * @type {[type]}
 */
const fileReader = require("./modules/filereader");

/**
 * [singleread singleread object instance]
 * @type {[type]}
 */
const singleread = require("./modules/singleread");

/**
 * [mongoService MongoDB service instance]
 * @type {[type]}
 */
const mongoService = require("./modules/mongoService");

/**
 * [notificationService Notification Service instance]
 * @type {[type]}
 */
const notificationService = require("./modules/notificationService");

/**
 * [listingPort Port on which application socket will keep listing]
 * @type {Number}
 */
const listingPort = 3000;

/**
 * [app App express object]
 * @type {[type]}
 */
const app = express();

/**
 * [server http server object instance]
 * @type {[type]}
 */
const server = require('http').createServer(app);  

/**
 * [sio socket server object instance]
 * @type {[type]}
 */
const sio = require("socket.io")(server);

app.use(express.static("."));
app.get("/",(req,res, next) => {
	res.sendFile('index.html');
});

/**
 * [socketUsers Used to store information related to connected users]
 * @type {Array}
 */
let socketUsers = [];

server.listen(listingPort);

/**
 * @param  {Conection is used to connect client with server via socket connection}
 * @return {[type]}
 */
sio.on('connection',( socket )=> {
	
	console.log( "Connection established with socket id : "+socket.id );
	
	/**
	 * @param  {Connection disconnect event handler}
	 * @return {[type]}
	 */
	socket.on('disconnect', function () {
        console.log('user disconnected of id '+socket.id);
    });


	/**
	 * @param  {client view logs event handler}
	 * @return {[type]}
	 */
	socket.on('viewlogs',function( data ){

		socketUsers[socket.id] = new Array();
		socketUsers[socket.id]['saveFlag']= 0;
		socketUsers[socket.id]['filenamePath'] = data.filename ;

		notificationService.listenUpdate(socketUsers,socket,sio);		
		/**
		 * Call to sinleread which will read last 1 mb of file in single go and send data to client
		 * @return {promise object}
		 */
		const firstAttemptSize = function( socketUsers,socket ){
			return new Promise( (resolve,reject)=> {
				var lastfilereadPosition = singleread( sio, socket, socketUsers ) ;
				resolve( lastfilereadPosition, socket );
			});
		}

		/**
		 * Call to filereader which will keep monitoring file for any changes and strem back to client
		 * @return {Promise}
		 */
		const continuesRead = function(){
			return new Promise( ( resolve,reject )=> {
				fileReader( sio, socketUsers, socket);
			});
		}

		firstAttemptSize(socketUsers,socket)
		.then( (result)=>{
			socketUsers[socket.id]['location'] = result;
			return ;
		}).then(()=>{
			continuesRead(); 
		});


	});

	/**
	 * event listner for client request to start saving records in Mongo DB.
	 * @param  {Function}
	 * @return {[type]}
	 */
	socket.on('storeevent', function(data) {

		const userSocketID = data.userSocketID;
		socketUsers[socket.id]['saveFlag']= 1;
		
		const mongoCredentials = { 'hostname' : data.hostName, 'username' : data.userName , 'password' :  data.password , 'dbname' : data.dbname };
		
		return new Promise( ( resolve,reject )=> {
				const mongoConnection = mongoService.connectDatabase(mongoCredentials);
				resolve( mongoConnection );
			}).then( ( mongoConnection ) =>{
				
				const generatedScehma = mongoService.generateSchema( mongoConnection );
		
				const existingmodelName = 'log_'+socket.id;
				
				if( ( 'model' in socketUsers[socket.id] ) != true  ){
					
					const ifCollectionExists = mongoConnection.model(existingmodelName, generatedScehma);
					
					ifCollectionExists.count({}, function(err, count){
						//console.log(err);
					});
					
					async function getCount(){
						return await ifCollectionExists.count({});
					}

					getCount().then((result)=>{

						const modelCount = result;
						
						if( modelCount != "undefined" && modelCount > 0 ){
							
							socketUsers[socket.id]['model']= ifCollectionExists;
						}else{
							
							const genModel =  mongoService.generateModel( generatedScehma, socket.id );
							socketUsers[socket.id]['model']= genModel;
							socketUsers[socket.id]['totalSaveCount']= 0;
						}
						

					});
				}
				const startDate = new Date().toISOString();
				notificationService.notifyUserSuccessmsg( 'Saving statred at : '+startDate );
			});	
	});

	/**
	 * Event listner to stop saving records in Mongo DB.
	 * @param  {Function}
	 * @return {[type]}
	 */
	socket.on('stopStore', function(data) {
		socketUsers[socket.id]['saveFlag'] = 0;
		
		if( ( 'model' in socketUsers[socket.id] ) == true  ){
			socketUsers[socket.id]['model'].db.close();
			//console.log(socketUsers[socket.id]);
		}
		const stopDate = new Date().toISOString();
		notificationService.notifyUserSuccessmsg( 'Saving stopped at : '+stopDate );
	});

});

