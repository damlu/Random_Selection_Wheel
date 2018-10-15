const config = require("./config");
// const _ = require("lodash");
const rp = require("request-promise");

class LiveStreamer {
  constructor() {
    this.request = this.request();
    this.broadcastInfo = [];
    this.previewImages = [];
    this.URLS = [];
    this.getTenImages = this.getTenImages.bind(this);
    this.getTenURLS = this.getTenURLS.bind(this);
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

  getTenStreams() {
    console.log("getting streamer");
    return rp(this.request)
      .then(payload => {
        let counter = 10;
        while (counter > 0) {
          let randomNumber = Math.floor(Math.random() * 90);
          if (payload._total < 100) {
            randomNumber = Math.floor(Math.random() * payload._total);
          }
          this.broadcastInfo.push(payload.streams[randomNumber]);
          counter--;
        }
        return this.broadcastInfo;
      })
      .catch(err => {
        console.log("couldn't make request");
        console.log(err);
      });
  }

  getURL(broadcastInfo) {
    return broadcastInfo.channel.url;
  }

  getImage(singlebroadcastInfo) {
    return singlebroadcastInfo.preview.large;
  }

  getTenImages(broadcastInfo) {
    broadcastInfo.forEach(broadcast => {
      this.previewImages.push(this.getImage(broadcast));
    });
  }

  getTenURLS(broadcastInfo) {
    broadcastInfo.forEach(broadcast => {
      this.URLS.push(this.getURL(broadcast));
    });
  }

  chooseStream(num) {
    const streamerData = {};
    streamerData["URL"] = this.URLS[num];
    streamerData["previewImages"] = this.previewImages[num];
    return streamerData;
  }
}

export default LiveStreamer;

// const stream = new LiveStreamer();
// stream.getTenStreams().then(() => {
//   stream.getTenURLS(stream.broadcastInfo);
//   stream.getTenImages(stream.broadcastInfo);
//   console.log(stream.previewImages);
//   console.log(stream.URLS);
//   console.log(stream.chooseStream(1));
// console.log(stream.getDisplayName(result));
// });
