import { useCallback, useRef } from "react";
import { useI18n } from "../i18n/I18nProvider";

const AUDIO_SRC = `${import.meta.env.BASE_URL}assets/alterversorge.mp3`;
const CHART_VIDEO_SRC = `${import.meta.env.BASE_URL}assets/chart-anim-2004-30eur.mp4`;
const CHART_POSTER_SRC = `${import.meta.env.BASE_URL}assets/chart-anim-2004-30eur-poster.jpg`;

export default function Film() {
  const { t } = useI18n();
  const f = t.film;
  const videoRef = useRef<HTMLVideoElement>(null);

  const resetToStart = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    try {
      el.currentTime = 0;
    } catch {
      /* ignore seek before ready */
    }
  }, []);

  const playMuted = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = el.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        /* autoplay may be blocked; poster stays */
      });
    }
  }, []);

  const onActivate = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) playMuted();
    else resetToStart();
  }, [playMuted, resetToStart]);

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

      <section className="video-block" aria-labelledby="chart-video-title">
        <h2 id="chart-video-title">{f.chartVideoTitle}</h2>
        <p className="video-caption video-caption-intro">{f.chartVideoIntro}</p>
        <p className="video-caption">{f.chartVideoCaption}</p>
        <div
          className="video-frame"
          onMouseEnter={playMuted}
          onMouseLeave={resetToStart}
          onPointerEnter={(e) => {
            if (e.pointerType === "touch" || e.pointerType === "pen") playMuted();
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "touch" || e.pointerType === "pen") resetToStart();
          }}
        >
          <video
            ref={videoRef}
            className="video-player"
            playsInline
            muted
            loop
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
            onLoadedData={(e) => {
              const el = e.currentTarget;
              if (el.paused) {
                try {
                  el.currentTime = 0;
                } catch {
                  /* ignore */
                }
              }
            }}
          >
            {f.videoFallback}{" "}
            <a href={CHART_VIDEO_SRC}>{f.downloadVideo}</a>
          </video>
        </div>
        <p className="video-aside">{f.introFilmNote}</p>
      </section>
    </>
  );
}
