module.exports = function (sails) {
	var Promise = require('bluebird');
	var passwords = require('machinepack-passwords');
	return {
		encryptPass:  function(pass) {
			return new Promise(function (resolve, reject) {
				passwords.encryptPassword({password: pass}).exec({
					error: function(err) {
						return reject(err);
					},
					success: function (encryptedPass) {
						return resolve(encryptedPass);
					}
				});
			});	
		}, //End encryptPass()

		checkPass: function(pass, encryptedPass) {
			return new Promise(function (resolve, reject) {
				passwords.checkPassword({
					passwordAttempt: pass,
					encryptedPassword: encryptedPass
				}).exec({
					error: function(err) {
						console.log("Error checking pass");
						console.log(err);
						return reject(err);
					},
					incorrect: function() {
						return reject(new Error("Wrong password"));
					}, 
					success: function() {
						return resolve(true);
					}
				});
			});
		} //End checkPass()
	} //End return JSON
}