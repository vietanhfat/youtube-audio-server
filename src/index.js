import AudioServer from 'streamer';

AudioServer.listen(process.env.PORT||3000, () => {
  console.log("Server in esecuzione...");
});
