/**
 * [mongoose Mongoose package instance]
 * @type {[type]}
 */
const mongoose = require('mongoose');

/**
 * [notificationService notification module instance]
 * @type {[type]}
 */
const notificationService = require("./notificationService");

/**
 * [Schema mongodb schema instance]
 * @type {[type]}
 */
const Schema = mongoose.Schema;

module.exports = {

	/**
		Used to connect to Database.
	**/
	connectDatabase : function connectDatabase( credentials ){
		
		try {
			const mongoConnection = mongoose.connect('mongodb://'+credentials.username+':'+credentials.password+'@'+credentials.hostname+':27017/'+credentials.dbname,{ bufferCommands : false })
			.then(
				() => { 
					console.log( 'connected to database' ); 

					notificationService.notifyUserSuccessmsg( 'DB connected SuccessFully.' );
				}
			)
			.catch( (e) => { 
				const errormsg = 'error : '+e;
				notificationService.notifyUserWarnmsg( errormsg );
			})
		}catch (e) {
			//console.error(`.catch(${e})`) 
		};
		 
  			return mongoose.connection;
	},

	/**
		Used to generate schema.
	**/
	generateSchema : function generateSchema( mongoConnection ){

		var logSchema = new mongoose.Schema({
			logData : String,
			created_at: {	
				type: Date,
    			default: new Date().getTime()
  			}
		});

		return logSchema;
	},

	/**
		Used to generate model.
	**/
	generateModel : function generateModel( generateSchema, socketId ){
		
		const logModel = mongoose.model("log_"+socketId, generateSchema);

		return logModel;
	},


	/**
		Generates data to store.
	**/
	generateLogDataToStore : function generateLogDataToStore( generateModel, fetchedLoggedData ){

		const logDataToStore = new generateModel({
			logData : fetchedLoggedData
		}); 

		const saveStatus = module.exports.saveLogData( logDataToStore );
		return saveStatus;
	},

	/**
		Save data in collection
	**/
	saveLogData : function saveLogData( logDataToStore ){
		
		const saveStatus = logDataToStore.save().then(function(product) {		
 			return product;
		});

 		return saveStatus;	
	}

}