import { useI18n } from "../i18n/I18nProvider";

const AUDIO_SRC = `${import.meta.env.BASE_URL}assets/yanglao-cun300-song1050.m4a`;

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
          {f.audioFallback} <a href={AUDIO_SRC}>{f.download}</a>
        </audio>
      </section>

      <div className="film-placeholder" role="status">
        <p style={{ fontFamily: "var(--display)", fontSize: "1.35rem", color: "var(--primary)" }}>
          {f.videoTitle}
        </p>
        <p>{f.videoNote}</p>
      </div>
    </>
  );
}
