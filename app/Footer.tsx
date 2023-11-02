import Link from "next/link";
import { use } from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { gql } from "graphql-request";

import { SocialInfosQuery, SocialPlatform } from "~/lib/generated/graphql";
import gClient from "~/lib/gClient";

const socialIconMap = {
  [SocialPlatform.Facebook]: Facebook,
  [SocialPlatform.Twitter]: Twitter,
  [SocialPlatform.Linkedin]: Linkedin,
  [SocialPlatform.Email]: Mail,
};

export const SOCIAL_INFOS = gql`
  query SocialInfos {
    profiles(first: 1) {
      id
      socialInfos {
        id
        platform
        link
      }
    }
  }
`;

export default function Footer() {
  const {
    profiles: [profile],
  } = use(gClient.request<SocialInfosQuery>(SOCIAL_INFOS));

  return (
    <footer className="border-t-2 border-slate-700">
      <div className="flex justify-between items-center py-3 px-40">
        <div className="animate-logo-flip will-change-transform">
          <Link href="/" className="font-black text-4xl">
            N
          </Link>
        </div>

        <p>&copy;{new Date().getFullYear()} by Nazib Chowdhury</p>

        <div className="flex gap-2 items-center">
          {profile?.socialInfos.map((socialInfo) => {
            const link =
              socialInfo.platform === SocialPlatform.Email
                ? `mailto:${socialInfo.link}`
                : socialInfo.link;
            const Icon = socialIconMap[socialInfo.platform];

            return (
              <a
                key={socialInfo.platform}
                href={link}
                target="_blank"
                rel="noopener"
                className="w-9 h-9 rounded-full border-2 border-slate-400 grid place-items-center"
              >
                <Icon className="w-5 h-5 text-slate-300" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
