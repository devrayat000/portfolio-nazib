import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { Suspense } from "react";

import { SkillLoader } from "~/components/common/loaders";
import gClient from "~/lib/gClient";
import { ProjectsQuery } from "~/lib/generated/graphql";

export const THESIS_PROJECTS_QUERY = gql`
  query ThesisProjects {
    projects(orderBy: createdAt_DESC, where: { projectType: THESIS }) {
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

export default function ThesisProjectsPage() {
  return (
    <main id="projects">
      <h1 className="text-center font-bold text-5xl">MY THESIS</h1>

      <div className="flex flex-col gap-6 mt-10 divide-y-2">
        <Suspense fallback={<SkillLoader />}>
          <Projects />
        </Suspense>
      </div>
    </main>
  );
}

async function Projects() {
  const { projects } = await gClient.request<ProjectsQuery>(
    THESIS_PROJECTS_QUERY
  );

  return projects.map((project) => (
    <div key={project.id} className="p-4">
      <h3 className="text-4xl text-center font-semibold">{project.title}</h3>

      <div className="relative aspect-video overflow-hidden flex-1 mr-8 my-8">
        <Image
          src={project.coverImage.url}
          alt={project.title}
          fill
          className="object-fill object-top"
        />
      </div>

      <div className="mt-2 prose max-w-full text-slate-200 prose-ul:list-disc prose-ul:pl-6 prose-a:text-amber-400 prose-h3:text-slate-400">
        <RichText content={project.description.raw} />
      </div>
    </div>
  ));
}
