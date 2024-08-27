import { gql } from "graphql-request";
import { use } from "react";

import gClient from "~/lib/gClient";
import { MyFeaturedVideosQuery } from "~/lib/generated/graphql";
import { getYoutubeInfo } from "~/lib/youtube";
import VideoModal from "./VideoModal";

export const FEATURED_VIDEOS_QUERY = gql`
  query MyFeaturedVideos {
    profiles(first: 1) {
      id
      featuredVideos
    }
  }
`;

export const dynamic = "force-dynamic";

export default function FeaturedVideos({
  promise,
}: {
  promise?: Promise<MyFeaturedVideosQuery>;
}) {
  const {
    profiles: [profile],
  } = use(
    promise ?? gClient.request<MyFeaturedVideosQuery>(FEATURED_VIDEOS_QUERY)
  );

  if (!profile) {
    return null;
  }

  return (
    <main id="featured_videos">
      <InfroVideo url={profile.featuredVideos[0]} />

      <div className="grid grid-cols-2 gap-8 mt-6">
        {profile.featuredVideos.map((url) => (
          <FeatureVideoShort key={url} url={url} />
        ))}
      </div>
    </main>
  );
}

function InfroVideo({ url }: { url: string }) {
  const id = getIDFromUrl(url);
  const video = use(getYoutubeInfo(id!));

  return (
    <iframe
      src={video.embded}
      frameBorder="0"
      className="w-full aspect-video"
    />
  );
}

function FeatureVideoShort({ url }: { url: string }) {
  const id = getIDFromUrl(url);
  const video = use(getYoutubeInfo(id!));

  return <VideoModal video={video} />;
}

function getIDFromUrl(url: string) {
  const u = new URL(url);
  return u.searchParams.get("v");
}
