import { useCallback, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";

const AUDIO_SRC = `${import.meta.env.BASE_URL}assets/alterversorge.mp3`;
const AUDIO2_SRC = `${import.meta.env.BASE_URL}assets/alterversorge-koubo-2.m4a`;
const CHART_VIDEO_SRC = `${import.meta.env.BASE_URL}assets/chart-anim-2004-30eur.mp4`;
const CHART_POSTER_SRC = `${import.meta.env.BASE_URL}assets/chart-anim-2004-30eur-poster.jpg`;

type VideoPhase = "idle" | "playing" | "paused";

function seekNearEnd(el: HTMLVideoElement) {
  const d = el.duration;
  if (!Number.isFinite(d) || d <= 0) return;
  // Slightly before EOF so the painted frame is reliable across browsers.
  el.currentTime = Math.max(0, d - 0.05);
}

export default function Film() {
  const { t } = useI18n();
  const f = t.film;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoPhase>("idle");

  const showLastFrame = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    try {
      seekNearEnd(el);
    } catch {
      /* ignore seek before ready */
    }
    setPhase("idle");
  }, []);

  const playFromStart = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    try {
      el.currentTime = 0;
    } catch {
      /* ignore */
    }
    const play = el.play();
    if (play && typeof play.catch === "function") {
      play
        .then(() => setPhase("playing"))
        .catch(() => setPhase("idle"));
    } else {
      setPhase("playing");
    }
  }, []);

  const resume = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = el.play();
    if (play && typeof play.catch === "function") {
      play
        .then(() => setPhase("playing"))
        .catch(() => setPhase("paused"));
    } else {
      setPhase("playing");
    }
  }, []);

  const pause = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPhase("paused");
  }, []);

  const onActivate = useCallback(() => {
    if (phase === "idle") playFromStart();
    else if (phase === "playing") pause();
    else resume();
  }, [phase, playFromStart, pause, resume]);

  const buttonLabel =
    phase === "playing"
      ? f.chartVideoPause
      : phase === "paused"
        ? f.chartVideoResume
        : f.chartVideoPlay;

  return (
    <>
      <header className="page-head">
        <h1>{f.title}</h1>
        <p>{f.lead}</p>
      </header>

      <section className="audio-block" aria-labelledby="audio-title">
        <h2 id="audio-title">{f.audioTitle}</h2>
        <p className="audio-caption">{f.audioCaption}</p>
        <audio className="audio-player" controls preload="metadata" src={AUDIO_SRC}>
          {f.audioFallback}{" "}
          <a href={AUDIO_SRC}>{f.downloadAudio}</a>
        </audio>
      </section>

      <section className="audio-block audio-block-supplement" aria-labelledby="audio2-title">
        <h2 id="audio2-title">{f.audio2Title}</h2>
        <p className="audio-caption">{f.audio2Caption}</p>
        <audio className="audio-player" controls preload="metadata" src={AUDIO2_SRC}>
          {f.audioFallback}{" "}
          <a href={AUDIO2_SRC}>{f.downloadAudio}</a>
        </audio>
      </section>

      <section className="video-block" aria-labelledby="chart-video-title">
        <h2 id="chart-video-title">{f.chartVideoTitle}</h2>
        <p className="video-caption video-caption-intro">{f.chartVideoIntro}</p>
        <p className="video-caption">{f.chartVideoCaption}</p>
        <div className={`video-frame is-${phase}`}>
          <video
            ref={videoRef}
            className="video-player"
            playsInline
            muted
            preload="auto"
            poster={CHART_POSTER_SRC}
            src={CHART_VIDEO_SRC}
            tabIndex={0}
            aria-label={f.chartVideoTitle}
            onClick={onActivate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
              }
            }}
            onLoadedMetadata={(e) => {
              const el = e.currentTarget;
              if (el.paused && phase === "idle") {
                try {
                  seekNearEnd(el);
                } catch {
                  /* ignore */
                }
              }
            }}
            onPlay={() => setPhase("playing")}
            onEnded={showLastFrame}
          >
            {f.videoFallback}{" "}
            <a href={CHART_VIDEO_SRC}>{f.downloadVideo}</a>
          </video>
          <button
            type="button"
            className={`video-play-btn${phase === "playing" ? " is-dim" : ""}`}
            onClick={onActivate}
          >
            {buttonLabel}
          </button>
        </div>
      </section>
    </>
  );
}
