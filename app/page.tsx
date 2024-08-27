import type { Metadata } from "next";

import SkillPage from "./skill/page";
import EducationPage from "./education/page";
import ExperiencePage from "./experience/page";
import AboutPage, { ABOUT_QUERY } from "./about/page";
import Slideshow, { SLIDESHOW_QUERY } from "./CarouselLoader";
import FeaturedVideos from "./FeaturedVideos";
import gClient from "~/lib/gClient";
import { gql } from "graphql-request";
import { BulkQueryQuery } from "~/lib/generated/graphql";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nazib Chowdhury",
  description: "A personal portfolio website of Nazib Chowdhury",
};

export const BULK_QUERY = gql`
  query BulkQuery {
    profiles(first: 1) {
      id
      name
      email
      about {
        raw
      }
      photo {
        id
        url
      }
      slideshowImages {
        id
        url
      }
      featuredVideos
    }
    educations(orderBy: createdAt_DESC) {
      id
      institution
      degree
      during
      logo {
        url
      }
      description {
        raw
      }
    }
    experiences(orderBy: createdAt_DESC) {
      id
      post
      organization
      during
      logo {
        url
      }
      description {
        raw
      }
    }
    projects(orderBy: createdAt_DESC, where: { projectType: GENERAL }) {
      id
      title
      coverImage {
        url
      }
      description {
        raw
      }
    }
    skills(orderBy: createdAt_DESC) {
      id
      title
      coverImage {
        url
      }
      description {
        raw
      }
    }
  }
`;

function extractPromise<T extends object, Key extends keyof T>(
  promise: Promise<T>,
  key: Key
) {
  return promise.then((result) => ({ [key]: result[key] } as Pick<T, Key>));
}

export default async function Home() {
  const bulkPromise = gClient.request<BulkQueryQuery>(BULK_QUERY);

  return (
    <main>
      <section className="mt-4">
        <Slideshow promise={extractPromise(bulkPromise, "profiles")} />
      </section>
      <section className="mt-20">
        <AboutPage promise={extractPromise(bulkPromise, "profiles")} />
      </section>
      <section className="mt-20">
        <FeaturedVideos promise={extractPromise(bulkPromise, "profiles")} />
      </section>
      <section className="mt-20">
        <SkillPage promise={extractPromise(bulkPromise, "skills")} />
      </section>
      <section className="mt-20">
        <ExperiencePage promise={extractPromise(bulkPromise, "experiences")} />
      </section>
      <section className="mt-20">
        <EducationPage promise={extractPromise(bulkPromise, "educations")} />
      </section>
    </main>
  );
}
