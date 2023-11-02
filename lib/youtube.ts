import ytdl from "ytdl-core";
import Duration from "./duration";

export async function getYoutubeInfo(id: string) {
  const info = await ytdl.getInfo(id);
  return {
    id: info.videoDetails.videoId,
    title: info.videoDetails.title,
    thumbnail:
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
    description: info.videoDetails.description,
    embded: info.videoDetails.embed?.iframeUrl,
    duration: new Duration({
      seconds: Number(info.videoDetails.lengthSeconds),
    }).toJson(),
  };
}
