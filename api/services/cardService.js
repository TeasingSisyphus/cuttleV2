var Promise = require('bluebird');
module.exports = {

	/*
	**Find Card by id
	*****options = {cardId: integer}
	*/
	findCard: function (options) {
		return new Promise(function (resolve, reject) {
			if (options.hasOwnProperty("cardId") && typeof(options.cardId) === "number") {
				Card.findOne(options.cardId)
				.populate("attachments")
				.exec(function (err, card) {
					if (err) {
						return reject(err);
					} else if (!card) {
						return reject(new Error("Can't find card " + options.cardId));
					} else {
						return resolve(card);
					}
				});
			} else {
				return Promise.reject(new Error("Invalid arguments for findCard"));
			}
		});
	},

	/*
	**Create Card from suit, rank, and gameId
	*****options = {suit: integer, rank: integer, gameId: integer}
	*/
	createCard: function (options, done) {
		return new Promise(function (resolve, reject) {
			var validArgs = options.suit > -1 && options.suit < 4 && options.suit > -1 && options.suit < 14 && options.gameId;
			if (validArgs) {
				var gameId = options.gameId;
				var suit = options.suit;
				var rank = options.rank;
				var str_rank = "";
				var str_suit = "";
				var str_name = "";
				var ruleText = "";
				var img = "";
				// Stringify Rank
				switch (rank) {
					case 1:
						str_rank = "Ace";
						break;
					case 11:
						str_rank = "Jack";
						break;
					case 12:
						str_rank = "Queen";
						break;
					case 13:
						str_rank = "King";
						break;
					case 1:
						str_rank = "Ace";
					default:
						str_rank = rank;
						break;
				}
				// Stringify Suit
				switch (suit) {
					case 0:
						str_suit = "Clubs";
						break;
					case 1:
						str_suit = "Diamonds";
						break;
					case 2:
						str_suit = "Hearts";
						break;
					case 3:
						str_suit = "Spades";
						break;
				}
				str_name = str_rank + " of " + str_suit; //Assign str name
				img = "images/cards/card_" + suit + "_" + rank + ".png"; //Assign img
				if(options.rank === 8){
					runeImg = "images/cards/Glasses_" + str_suit + ".jpg";
				} else {
					runeImg = img;
				}

				// Assign Rule Text
				switch (rank) {
					case 1:
						ruleText = "ONE-OFF: Destroy all POINTS.";
						break;
					case 2:
						ruleText = "ONE-OFF: Destroy target BOON.";
						break;
					case 3:
						ruleText = "ONE-OFF: Choose 1 card in the SCRAP and put it to your hand.";
						break;
					case 4:
						ruleText = "ONE-OFF: Your opponent discards two cards of her choice from her hand.";
						break;
					case 5:
						ruleText = "ONE-OFF: Draw two cards from the deck.";
						break;
					case 6:
						ruleText = "ONE-OFF: Destroy ALL BOONS.";
						break;
					case 7:
						ruleText = "Play one of the top two cards of the deck and put the other back. (Both are revealed)";
						break;
					case 8:
						ruleText = "BOON: Your opponent plays with an open HAND (Her cards are revealed to you).";
						break;
					case 9:
						ruleText = "ONE-OFF: Return target card to its controller's HAND. She can't play it next turn.";
						break;
					case 10:
						ruleText = "No effect";
						break;
					case 11:
						ruleText = "BOON: Play on top of target POINT card to steal it.";
						break;
					case 12:
						ruleText = "BOON: Your other cards may only be targeted by scuttles.";
						break;
					case 13:
						ruleText = "BOON: Reduces the points you need to win. See counter on the left.";
						break;
				}

				// Create card record
				Card.create({
					suit: suit,
					rank: rank,
					img: img,
					runeImg : runeImg,
					name: str_name,
					ruleText: ruleText,
					deck: gameId
				}).exec(function (err, newCard) {
					if (err) {
						return reject(err);
					} else if (!newCard) {
						return reject(new Error("Could not create new card"));
					//Everything ok -> resolve promise
					} else {
						return resolve(newCard);
					}
				});
			} else {
				return reject(new Error("Invalid Arguments for createCard service"));
			}
		})
	},

	/*
	**Find all points in player's hand from player id
	*****options = {userId: integer}
	*/
	findPoints: function (options) {
		return new Promise(function (resolve, reject) {
			if (options.userId) {
				Card.find({points: options.userId}).populate("attachments", {sort: "index"}).exec(function (err, cards) {
					if (err) {
						return reject(err);
					} else if (!cards) {
						return reject(new Error("Can't find cards in points"));
					} else {
						return resolve(cards);
					}
				}); //End find()
			} else {
				return reject(new Error("Don't have userId to find cards in user's points"));
			}

		}); //End returned Promise
	},

	/*
	**Saves a card and returns it as a Promise
	****options = {card: CardRecord}
	*/
	saveCard: function (options) {
		return new Promise (function (resolve, reject) {
			if (options.card) {
				options.card.save(function (err) {
					if (err) {
						return reject(err);
					} else {
						return resolve(options.card);
					}
				});
			} else {
				return reject(new Error("Can't save card without card record"))
			}
		});
	}
};