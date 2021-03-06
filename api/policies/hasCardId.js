/**
 * hasCardId
 *
 * @module      :: Policy
 * @description :: Only allows requests that contain a 'cardId' parameter, which is a number
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.body.cardId) {
  	if (typeof(req.body.cardId) === "number") {
    	return next();
  	} else {
  		return res.forbidden("Error: You must provide a valid card for your move (ID was non-integer)");
  	}
  } else {
  	return res.forbidden("Error You must provide a valid card to make that move (No ID given)");
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};