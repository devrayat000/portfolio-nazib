import { gql } from "graphql-request";
import { Suspense } from "react";
import gClient from "~/lib/gClient";
import { MySlideshowsQuery } from "~/lib/generated/graphql";
import Carousel from "./Carousel";

export const SLIDESHOW_QUERY = gql`
  query MySlideshows {
    profiles(first: 1) {
      id
      slideshowImages {
        id
        url
      }
    }
  }
`;

async function getSlideshowImages() {
  const {
    profiles: [profile],
  } = await gClient.request<MySlideshowsQuery>(SLIDESHOW_QUERY);
  return profile?.slideshowImages;
}

export default function Slideshow() {
  const slideshowImages = getSlideshowImages();

  return (
    <Suspense
      fallback={
        <div className="bg-slate-800 w-full aspect-video animate-pulse" />
      }
    >
      <Carousel images={slideshowImages} />
    </Suspense>
  );
}
