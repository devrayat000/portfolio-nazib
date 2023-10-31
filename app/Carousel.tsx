"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla overflow-hidden relative w-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide grid place-items-center bg-slate-800 flex-[0_0_100%] w-full aspect-video">
            Slide 1
          </div>
          <div className="embla__slide grid place-items-center bg-slate-800 flex-[0_0_100%] w-full aspect-video">
            Slide 2
          </div>
          <div className="embla__slide grid place-items-center bg-slate-800 flex-[0_0_100%] w-full aspect-video">
            Slide 3
          </div>
        </div>
      </div>
      <Button
        variant="link"
        size="icon"
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="link"
        size="icon"
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-0"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
