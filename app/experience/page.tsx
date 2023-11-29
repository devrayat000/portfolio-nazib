import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { Suspense } from "react";
import { ExperienceLoader } from "~/components/common/loaders";
import type { Metadata } from "next";

import gClient from "~/lib/gClient";
import { ExperiencesQuery } from "~/lib/generated/graphql";

export const EXPERIENCE_QUERY = gql`
  query Experiences {
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
  }
`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nazib Chowdhury - Experience",
  description: "A personal portfolio website of Nazib Chowdhury",
};

export default function ExperiencePage() {
  return (
    <main id="skills">
      <h1 className="text-center font-bold text-5xl">EXPERIENCE</h1>

      <ol className="relative mt-16">
        <Suspense fallback={<ExperienceLoader />}>
          <Experiences />
          <hr className="bg-gray-700 absolute -left-6 top-0 h-full w-0.5 -z-10" />
        </Suspense>
      </ol>
    </main>
  );
}

async function Experiences() {
  const { experiences } = await gClient.request<ExperiencesQuery>(
    EXPERIENCE_QUERY
  );

  return experiences.map((experience) => (
    <li className="mb-10 ml-10" key={experience.id}>
      <span
        className="absolute rounded flex items-center justify-center w-20 h-20 -left-16 ring-[12px] dark:ring-background overflow-hidden"
        title={experience.organization}
      >
        <Image
          src={experience.logo.url}
          alt={experience.organization}
          width={80}
          height={80}
          quality={50}
          className="h-full object-cover object-center"
        />
      </span>
      <h3 className="flex items-center mb-1 text-2xl font-semibold dark:text-slate-100">
        {experience.post}
      </h3>
      <h4 className="flex items-center mb-1 text-lg font-medium dark:text-slate-300">
        {experience.organization}
      </h4>
      <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
        {experience.during}
      </time>
      <div className="mt-6 prose max-w-full prose-ul:list-disc prose-ul:pl-6 dark:text-slate-400">
        <RichText content={experience.description.raw} />
      </div>
    </li>
  ));
}
