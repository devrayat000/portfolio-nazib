"use client";

import Image from "next/image";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import type { getYoutubeInfo } from "~/lib/youtube";

export default function VideoModal({
  video,
}: {
  video: Awaited<ReturnType<typeof getYoutubeInfo>>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="group cursor-pointer">
          <div className="aspect-video relative">
            <Image src={video.thumbnail} alt={video.title} fill />
            <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>
          <h5 className="text-lg font-medium mt-2 text-slate-300">
            {video.title}
          </h5>
          <p className="mt-1.5 text-ellipsis line-clamp-2">
            {video.description}
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-7xl">
        <div className="w-full">
          <div className="float-left w-4/5 mr-4 mb-2">
            <iframe
              src={video.embded}
              frameBorder="0"
              className="w-full aspect-video"
            />
          </div>
          <AlertDialogTitle>{video.title}</AlertDialogTitle>
          <AlertDialogDescription className="mt-3">
            {video.description}
          </AlertDialogDescription>
        </div>
        <AlertDialogCancel className="absolute right-3 top-3 w-8 h-8 rounded-full grid place-items-center">
          <X className="h-4 w-4" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
