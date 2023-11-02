import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { Suspense } from "react";

import { SkillLoader } from "~/components/common/loaders";
import gClient from "~/lib/gClient";
import { ProjectsQuery } from "~/lib/generated/graphql";

export const PROJECTS_QUERY = gql`
  query Projects {
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
  }
`;

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <main id="projects">
      <h1 className="text-center font-bold text-5xl">MY PROJECTS</h1>

      <div className="flex flex-col gap-6 mt-10">
        <Suspense fallback={<SkillLoader />}>
          <Projects />
        </Suspense>
      </div>
    </main>
  );
}

async function Projects() {
  const { projects } = await gClient.request<ProjectsQuery>(PROJECTS_QUERY);

  return projects.map((project) => (
    <div
      key={project.id}
      className="flex gap-4 items-start border-2 rounded-xl border-slate-500 p-4"
    >
      <div className="relative aspect-video overflow-hidden flex-1">
        <Image
          src={project.coverImage.url}
          alt={project.title}
          fill
          className="object-fill object-top"
        />
      </div>
      <div className="flex-[1_1_20%]">
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <div className="mt-2 prose max-w-full prose-ul:list-disc prose-ul:pl-6">
          <RichText content={project.description.raw} />
        </div>
      </div>
    </div>
  ));
}
