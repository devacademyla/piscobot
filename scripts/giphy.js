'use strict';

var request = require('request');

function spotify(bot, controller, message) {
  var msg = '';
  var url = 'https://api.spotify.com/v1/search?q=';
  url += message.match[1] + '&type=track';
  request.get(url, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var response = JSON.parse(body);
      var gifs = response.data.length;
      var urls = response.data[0].images.fixed_height.url
      if (gifs > 0 && urls !== null) {
        bot.reply(message, urls);
      } else {
        msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Giphy.';
        bot.reply(message, msg)
      }
    } else {
      msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Giphy.';
      bot.reply(message, msg);
    }
  });
}

module.exports = {
  name: 'giphy me',
  author: 'Deiby Toralva (deibytb)',
  patterns: ['giphy me (.*)'],
  types: ['direct_message', 'direct_mention'],
  description: 'Search for a gif on Giphy',
  command: giphy,
};