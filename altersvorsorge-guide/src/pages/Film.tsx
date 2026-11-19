import { useI18n } from "../i18n/I18nProvider";

const AUDIO_SRC = `${import.meta.env.BASE_URL}assets/alterversorge.mp3`;
const CHART_VIDEO_SRC = `${import.meta.env.BASE_URL}assets/chart-anim-2004-30eur.mp4`;

export default function Film() {
  const { t } = useI18n();
  const f = t.film;

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
        <p className="video-caption">{f.chartVideoCaption}</p>
        <video
          className="video-player"
          controls
          playsInline
          preload="metadata"
          src={CHART_VIDEO_SRC}
        >
          {f.videoFallback}{" "}
          <a href={CHART_VIDEO_SRC}>{f.downloadVideo}</a>
        </video>
        <p className="video-aside">{f.introFilmNote}</p>
      </section>
    </>
  );
}
