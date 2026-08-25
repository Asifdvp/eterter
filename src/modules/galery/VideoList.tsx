"use client";
import Container from "@/components/shared/Container";
import { useState } from "react";
import CloseIcon from "@/assets/icons/close.svg";
import PlayIcon from "@/assets/icons/playButton.svg";
import Image from "next/image";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { GalleryVideo } from "@/lib/api";

type Props = {
  videos: GalleryVideo[];
};

function getYoutubeId(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

function toEmbedUrl(url: string): string {
  const id = getYoutubeId(url);
  return `https://www.youtube.com/embed/${id}`;
}

const VideoList = ({ videos }: Props) => {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);

  useScrollLock(!!selectedVideo);

  return (
    <Container>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {videos.map((video) => {
          const videoId = getYoutubeId(video.url);
          return (
            <div key={video.id} className="cursor-pointer overflow-hidden rounded-lg relative h-60">
              <button
                type="button"
                className="w-full h-full relative block"
                onClick={() => setSelectedVideo(video)}
                aria-label={`${video.title} — izlə`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <PlayIcon />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-[90vw] max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-md shadow-lg"
              src={`${toEmbedUrl(selectedVideo.url)}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Videonu bağla"
              className="cursor-pointer absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default VideoList;
