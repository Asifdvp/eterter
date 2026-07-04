"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import RightArrow from "@/assets/icons/right-arrow.svg";
import Container from "@/components/shared/Container";
import Link from "next/link";
import Script from "next/script";

const YOUTUBE_VIDEO_ID = "xitrc_rq3dg";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
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
  const [videoReady, setVideoReady] = useState(false);

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
          const playing = event.data === window.YT.PlayerState.PLAYING;
          setIsPlaying(playing);
          if (playing) setVideoReady(true);
        },
      },
    });
  };

  useEffect(() => {
    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
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
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
      />

      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden"
      >
        {/* Fallback poster — video yüklənsəyə qədər görünür */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/mainSection.webp')",
            opacity: videoReady ? 0 : 1,
          }}
        />

        {/* YouTube video background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            ref={playerContainerRef}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/20" />

        {/* Content */}
        <Container className="relative z-20 min-h-[calc(100svh-4.5rem)] flex items-center justify-center">
          <div className="text-center flex flex-col items-center text-white">
            <h1
              id="hero-heading"
              className="text-2xl leading-8 mb-2 font-black md:text-[52px] md:leading-17 max-w-4xl"
            >
              Çöhrə Estetik Klinikası
            </h1>
            <p className="font-medium text-sm leading-5 mb-6 md:text-[16px] md:leading-6 md:mb-7 max-w-159.5">
              Yolunuzu Çöhrədən salın, çünki ən dəyərli geyiminiz dərinizdir
            </p>
            <Link
              href="/services"
              className="backdrop-blur-xl rounded-[48px] py-1.5 px-4 text-sm leading-5 flex gap-2 items-center"
            >
              <span>Xidmətlərimizə baxın</span>
              <div
                aria-hidden="true"
                className="bg-[linear-gradient(91.42deg,#7F9276_62%,#BFCDB4_100%)] w-9 h-9 rounded-full flex items-center justify-center text-white"
              >
                <RightArrow />
              </div>
            </Link>
          </div>
        </Container>

        {/* Video controls */}
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
      </section>
    </>
  );
};

export default MainSection;
