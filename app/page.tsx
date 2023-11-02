import SkillPage from "./skill/page";
import EducationPage from "./education/page";
import ExperiencePage from "./experience/page";
import AboutPage from "./about/page";
import Slideshow from "./CarouselLoader";
import FeaturedVideos from "./FeaturedVideos";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <section className="mt-4">
        <Slideshow />
      </section>
      <section className="mt-20">
        <AboutPage />
      </section>
      <section className="mt-20">
        <FeaturedVideos />
      </section>
      <section className="mt-20">
        <SkillPage />
      </section>
      <section className="mt-20">
        <ExperiencePage />
      </section>
      <section className="mt-20">
        <EducationPage />
      </section>
    </main>
  );
}
