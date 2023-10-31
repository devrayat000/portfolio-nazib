import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { Suspense } from "react";

import { SkillLoader } from "~/components/common/loaders";
import gClient from "~/lib/gClient";
import type { SkillsQuery } from "~/lib/generated/graphql";

export const SKILLS_QUERY = gql`
  query Skills {
    skills {
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

export default function SkillPage() {
  return (
    <main id="skills">
      <h1 className="text-center font-bold text-5xl">MY SKILLSET</h1>
      <p className="text-center text-2xl mt-2">Competence & Aptitude</p>

      <div className="grid grid-cols-2 gap-12 mt-10">
        <Suspense fallback={<SkillLoader />}>
          <Skills />
        </Suspense>
      </div>
    </main>
  );
}

async function Skills() {
  const { skills } = await gClient.request<SkillsQuery>(SKILLS_QUERY);

  return skills.map((skill) => (
    <div key={skill.id}>
      <div className="relative aspect-video rounded overflow-hidden">
        <Image
          src={skill.coverImage.url}
          alt={skill.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-center text-2xl mt-3 font-semibold">{skill.title}</h3>
      <div className="mt-2 prose-ul:list-disc prose-ul:pl-6">
        <RichText content={skill.description.raw} />
      </div>
    </div>
  ));
}
