const config = require("./config");
const rp = require("request-promise");

class LiveStreamer {
  constructor() {
    this.request = this.request();
    this.broadcastInfo = "";
  }

  request(cursor) {
    const request = {
      uri: "https://api.twitch.tv/kraken/streams/",
      qs: {
        limit: "100",
        stream_type: "live",
        language: "en"
      },
      headers: {
        "Client-ID": config.client_id,
        Accept: "application/vnd.twitchtv.v5+json"
      },
      json: true
    };
    if (cursor) {
      request.qs.cursor = cursor;
    }
    return request;
  }

  getStreamerInfo() {
    return rp(this.request)
      .then(payload => {
        let randomNumber = Math.floor(Math.random() * 100);
        if (payload._total < 100) {
          randomNumber = Math.floor(Math.random() * payload._total);
        }
        this.broadcastInfo = payload.streams[randomNumber];
        return payload.streams[randomNumber];
      })
      .catch(err => {
        console.log("couldn't make request");
        console.log(err);
      });
  }

  getURL(broadcastInfo) {
    return broadcastInfo.channel.url;
  }
}

export default LiveStreamer;
