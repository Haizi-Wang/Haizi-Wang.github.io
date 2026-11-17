export default function Film() {
  return (
    <>
      <header className="page-head">
        <h1>介绍影片</h1>
        <p>Milestone 2 占位：成片与分镜将在此上线。</p>
      </header>

      <div className="film-placeholder" role="status">
        <p style={{ fontFamily: "var(--display)", fontSize: "1.35rem", color: "var(--primary)" }}>
          影片制作中
        </p>
        <p>
          盘内已有口播参考音频与后续 AI 视频 / Krita 素材流程笔记。本里程碑仅保留占位，不嵌入大体积媒体。
        </p>
        <p>完成后将提供正式介绍片，并可与上方教育路径交叉链接。</p>
      </div>
    </>
  );
}
