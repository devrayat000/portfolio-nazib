import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";

import gClient from "~/lib/gClient";
import { ExperienceLoader } from "~/components/common/loaders";
import { EducationsQuery } from "~/lib/generated/graphql";

export const EDUCATION_QUERY = gql`
  query Educations {
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
  }
`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nazib Chowdhury - Education",
};

export default function EducationPage() {
  return (
    <main id="skills">
      <h1 className="text-center font-bold text-5xl">EDUCATION</h1>
      <p className="text-center text-2xl mt-2">My Schooling</p>

      <ol className="relative mt-16">
        <Suspense fallback={<ExperienceLoader />}>
          <EducationQualifications />
          <hr className="bg-gray-700 absolute -left-6 top-0 h-full w-0.5 -z-10" />
        </Suspense>
      </ol>
    </main>
  );
}

async function EducationQualifications() {
  const { educations } = await gClient.request<EducationsQuery>(
    EDUCATION_QUERY
  );

  return educations.map((education) => (
    <li className="mb-10 ml-10" key={education.id}>
      <span
        className="absolute rounded-full flex items-center justify-center w-20 h-20 -left-16 ring-[12px] dark:ring-background overflow-hidden"
        title={education.institution}
      >
        <Image
          src={education.logo.url}
          alt={education.degree}
          width={80}
          height={80}
          quality={50}
          className="h-full object-cover object-center"
        />
      </span>
      <h3 className="flex items-center mb-1 text-2xl font-semibold dark:text-slate-100">
        {education.degree}
      </h3>
      <h4 className="flex items-center mb-1 text-lg font-medium dark:text-slate-300">
        {education.institution}
      </h4>
      <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
        {education.during}
      </time>
      <div className="mt-6 prose max-w-full prose-ul:list-disc prose-ul:pl-6 dark:text-slate-400">
        <RichText content={education.description.raw} />
      </div>
    </li>
  ));
}
