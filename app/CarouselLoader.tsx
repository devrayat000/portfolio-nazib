import { gql } from "graphql-request";
import { Suspense, use } from "react";
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

export default function Slideshow({
  promise,
}: {
  promise?: Promise<MySlideshowsQuery>;
}) {
  return (
    <Suspense
      fallback={
        <div className="bg-slate-800 w-full aspect-video animate-pulse" />
      }
    >
      <Carousel
        images={(
          promise ?? gClient.request<MySlideshowsQuery>(SLIDESHOW_QUERY)
        ).then((res) => res.profiles[0].slideshowImages)}
      />
    </Suspense>
  );
}
