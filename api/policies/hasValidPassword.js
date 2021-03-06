/**
 * hasPassword
 *
 * @module      :: Policy
 * @description :: Only allows requests that contain a 'password' parameter, which is a string
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {
	if ( req.body.hasOwnProperty('password') ) {
		if (typeof(req.body.password) === 'string'){
			// PLACE PASSWORD RESTRICTIONS HERE
				// e.g. at least 8 characters, etc.
				if (req.body.password.length >= 8) {
					return next();
				} else {
					return res.badRequest("Your password must contain at least eight characters");
				}
		}
	}
	// User not allowed
  return res.forbidden('You are not permitted to perform this action.');
}