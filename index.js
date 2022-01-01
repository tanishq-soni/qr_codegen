const { auth, postReplyWithMedia  } = require('./config.js');

const client = auth();

var QRCode = require('qrcode')
 
client.stream('statuses/filter', { track: '@qr_generate' }, function (stream) {
  console.log("searching...");

  stream.on('data', function (tweet) {
    console.log("--->", tweet.text);

    var t_text = tweet.text.replace('@qr_generate','');
    console.log(t_text); 

    QRCode.toFile('./qrcodes/qr.png', t_text.toString(), {
      color: {
        dark: '#000000', 
        light: '#ffffff',
        margin: 0
      }
    }, function (err) {
      if (err) throw err
      console.log("tweeting...");
      postReplyWithMedia(client, "./qrcodes/qr.png", tweet);
    })

    stream.on('error', function (error) {
      console.log(error);
    });
  });
});





