"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import RightArrow from "@/assets/icons/right-arrow.svg";
import Container from "@/components/shared/Container";
import Link from "next/link";

const YOUTUBE_VIDEO_ID = "xitrc_rq3dg";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
};

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        options: {
          videoId: string;
          width: string;
          height: string;
          playerVars: Record<string, number | string>;
          events: {
            onStateChange: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const MainSection = () => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const createPlayer = () => {
      if (!playerContainerRef.current) return;
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
    window.onYouTubeIframeAPIReady = createPlayer;
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative min-h-[calc(85vh-12rem)] overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={playerContainerRef}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="relative z-10 bg-black/20">
        <Container>
          <div className="min-h-[calc(85vh-12rem)] flex items-center justify-center">
            <div className="container mx-auto px-6 text-center flex flex-col items-center  text-white ">
              <h1 className="text-2xl leading-8 mb-2 font-black   md:text-[52px] md:leading-17 max-w-4xl">
                Çöhrə Estetik Klinikası
              </h1>
              <p className="font-medium text-sm leading-5 mb-6 md:text-[16px] md:leading-6 md:mb-7 max-w-159.5">
                Yolunuzu Çöhrədən salın, çünki ən dəyərli geyiminiz dərinizdir
              </p>
              <Link
                href={"/services"}
                aria-label="Xidmətlərimizə baxın"
                className="backdrop-blur-xl rounded-[48px] py-1.5 px-4 text-sm leading-5 flex gap-2 items-center"
              >
                <span>Xidmətlər</span>
                <div
                  aria-hidden="true"
                  className={`bg-[linear-gradient(91.42deg,#7F9276.2%,#BFCDB4.04%)] w-9 h-9 rounded-full flex items-center justify-center text-white`}
                >
                  <RightArrow />
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Videonu dayandır" : "Videonu oynat"}
        className="absolute bottom-6 left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" fill="currentColor" />
        ) : (
          <Play className="h-5 w-5" fill="currentColor" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Səsi aç" : "Səsi bağla"}
        className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default MainSection;
