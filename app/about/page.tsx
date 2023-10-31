import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import Image from "next/image";
import { use } from "react";

import gClient from "~/lib/gClient";
import type { AboutMeQuery } from "~/lib/generated/graphql";
import ContactInfo from "./ContactInfo";

export const ABOUT_QUERY = gql`
  query AboutMe {
    profile(where: { email: "nazibchowdhury000@gmail.com" }) {
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
    }
  }
`;

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const { profile } = use(gClient.request<AboutMeQuery>(ABOUT_QUERY));

  if (!profile) {
    return null;
  }

  return (
    <main id="about">
      <h1 className="text-center font-bold text-4xl">ABOUT ME</h1>

      <div className="mt-16">
        <div className="grid grid-cols-2 gap-16">
          <div className="relative aspect-[4/5] rounded">
            <Image
              src={profile.photo.url}
              alt={profile.name}
              fill
              className="object-cover object-center"
            />
          </div>

          <section>
            <h2 className="text-6xl text-center font-bold text-orange-400">
              {profile.name}
            </h2>

            <div className="mt-6 prose-ul:list-disc prose-ul:pl-6 dark:text-slate-200 prose-p:text-lg prose-li:text-lg">
              <RichText content={profile.about.raw} />
            </div>
          </section>
        </div>

        <ContactInfo />
      </div>
    </main>
  );
}
