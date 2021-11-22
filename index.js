const QRCode = require('qrcode') 
const { auth, postReplyWithMedia} = require('./config.js');
const client = auth();

client.stream('statuses/filter', { track: '@qr_codegen' }, function (stream) {
  console.log("searching...");
  stream.on('data', function (tweet) {

    console.log("--->", tweet.text);
    var t_text = tweet.text.replace('@qr_codegen','');
    console.log(t_text); 

    QRCode.toFile('./qrcodes/qr.png', t_text.toString(), {
      color: {
        dark: '#000000', 
        light: '#ffffff'
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