"use client";
import { usePathname } from "next/navigation";

export default function ContactInfo() {
  const pathname = usePathname();

  if (!pathname?.includes("about")) {
    return null;
  }

  return (
    <div className="flex justify-center text-lg mt-6">
      <div>
        Reach me at:{" "}
        <a
          href="mailto:nazibchowdhury000@gmail.com"
          className="underline text-orange-500"
        >
          nazibchowdhury000@gmail.com
        </a>
      </div>
    </div>
  );
}
