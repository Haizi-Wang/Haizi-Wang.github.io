import { useEffect, useRef, useState } from "react";
import Calculator from "@alterversorge/App.tsx";
import "../calc-embed.css";

/** Target layout width for the two-column calculator; scale down when narrower. */
const FIT_WIDTH = 1180;

export default function Rechner() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [slotHeight, setSlotHeight] = useState<number | undefined>();

  useEffect(() => {
    const viewport = viewportRef.current;
    const fit = fitRef.current;
    if (!viewport || !fit) return;

    const update = () => {
      const avail = viewport.clientWidth;
      const next = avail > 0 && avail < FIT_WIDTH ? Math.min(1, avail / FIT_WIDTH) : 1;
      setScale(next);
      requestAnimationFrame(() => {
        setSlotHeight(fit.scrollHeight * next);
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    ro.observe(fit);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scaled = scale < 0.999;

  return (
    <div
      className="rechner-page"
      ref={viewportRef}
      style={slotHeight ? { height: slotHeight } : undefined}
    >
      <div
        ref={fitRef}
        className="rechner-fit"
        style={
          scaled
            ? {
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: FIT_WIDTH,
                maxWidth: "none",
              }
            : undefined
        }
      >
        <Calculator />
      </div>
    </div>
  );
}
