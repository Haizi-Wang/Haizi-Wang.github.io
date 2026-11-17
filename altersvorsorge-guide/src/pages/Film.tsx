const AUDIO_SRC = `${import.meta.env.BASE_URL}assets/yanglao-cun300-song1050.m4a`;

export default function Film() {
  return (
    <>
      <header className="page-head">
        <h1>介绍影片</h1>
        <p>先听口播说明；成片与分镜将在后续里程碑上线。</p>
      </header>

      <section className="audio-block" aria-labelledby="audio-title">
        <h2 id="audio-title">口播音频</h2>
        <p className="audio-caption">
          《德国养老金存300送1050》——用一个简单数字例子，说明缴费与补贴如何叠加（估算示意，非正式投顾意见）。
        </p>
        <audio className="audio-player" controls preload="metadata" src={AUDIO_SRC}>
          您的浏览器不支持音频播放。
          <a href={AUDIO_SRC}>下载音频</a>
        </audio>
      </section>

      <div className="film-placeholder" role="status">
        <p style={{ fontFamily: "var(--display)", fontSize: "1.35rem", color: "var(--primary)" }}>
          影片制作中
        </p>
        <p>正式介绍片将在此上线，并可与上方教育路径交叉链接。</p>
      </div>
    </>
  );
}
