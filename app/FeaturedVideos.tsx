import { gql } from "graphql-request";

export const FEATURED_VIDEOS_QUERY = gql`
  query MyFeaturedVideos {
    profiles(first: 1) {
      id
      featuredVideos
    }
  }
`;

export const dynamic = "force-dynamic";

export default function FeaturedVideos() {
  return <div>FeaturedVideos</div>;
}
