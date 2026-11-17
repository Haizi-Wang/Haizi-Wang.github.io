import { useLayoutEffect, useRef, useState } from "react";
import Calculator from "@alterversorge/App.tsx";
import "../calc-embed.css";

/** Design width where the two-column calculator layout looks correct. */
const DESIGN_WIDTH = 1100;
const NARROW_BREAKPOINT = 720;

type Fit = {
  scale: number;
  naturalW: number;
  naturalH: number;
  slotW: number;
  slotH: number;
  mode: "narrow" | "fluid" | "scaled";
};

/**
 * Scale the two-column calculator to the available *width* so nothing is
 * cropped horizontally. Vertical overflow scrolls with the page (guide chrome
 * + footer stay usable). Recomputes on resize / visualViewport changes.
 */
export default function Rechner() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<Fit>({
    scale: 1,
    naturalW: DESIGN_WIDTH,
    naturalH: 0,
    slotW: 0,
    slotH: 0,
    mode: "fluid",
  });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    let raf = 0;
    let busy = false;

    const measure = () => {
      if (busy) return;
      busy = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        try {
          const availW = viewport.clientWidth;
          if (availW <= 0) return;

          if (availW < NARROW_BREAKPOINT) {
            setFit({
              scale: 1,
              naturalW: availW,
              naturalH: 0,
              slotW: 0,
              slotH: 0,
              mode: "narrow",
            });
            return;
          }

          const slot = content.parentElement as HTMLElement | null;
          const prev = {
            slotOverflow: slot?.style.overflow ?? "",
            slotW: slot?.style.width ?? "",
            slotH: slot?.style.height ?? "",
            cw: content.style.width,
            ct: content.style.transform,
            cp: content.style.position,
          };
          if (slot) {
            slot.style.overflow = "visible";
            slot.style.width = `${DESIGN_WIDTH}px`;
            slot.style.height = "auto";
          }
          content.style.position = "static";
          content.style.transform = "none";
          content.style.width = `${DESIGN_WIDTH}px`;
          content.style.maxWidth = "none";

          const naturalW = Math.max(DESIGN_WIDTH, content.scrollWidth);
          const naturalH = Math.max(content.scrollHeight, content.offsetHeight, 1);

          if (slot) {
            slot.style.overflow = prev.slotOverflow;
            slot.style.width = prev.slotW;
            slot.style.height = prev.slotH;
          }
          content.style.width = prev.cw;
          content.style.transform = prev.ct;
          content.style.position = prev.cp;

          const scale = Math.min(1, availW / naturalW);
          if (scale >= 0.999) {
            setFit({
              scale: 1,
              naturalW,
              naturalH,
              slotW: 0,
              slotH: 0,
              mode: "fluid",
            });
            return;
          }

          setFit({
            scale,
            naturalW,
            naturalH,
            slotW: Math.max(1, Math.floor(naturalW * scale)),
            slotH: Math.max(1, Math.ceil(naturalH * scale) + 8),
            mode: "scaled",
          });
        } finally {
          busy = false;
        }
      });
    };

    measure();
    const t1 = window.setTimeout(measure, 160);
    const t2 = window.setTimeout(measure, 520);

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, []);

  const scaled = fit.mode === "scaled";

  return (
    <div className="rechner-page" ref={viewportRef}>
      <div
        className={`rechner-scale-slot${scaled ? " rechner-scale-slot--active" : ""}`}
        style={
          scaled
            ? { width: fit.slotW, height: fit.slotH, overflow: "hidden" }
            : { width: "100%", height: "auto", overflow: "visible" }
        }
      >
        <div
          ref={contentRef}
          className={`rechner-fit${scaled ? " rechner-fit--scaled" : ""}`}
          style={
            scaled
              ? {
                  width: fit.naturalW,
                  height: fit.naturalH || "auto",
                  transform: `scale(${fit.scale})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }
              : {
                  width: "100%",
                  maxWidth: "100%",
                  transform: "none",
                  position: "relative",
                }
          }
        >
          <Calculator />
        </div>
      </div>
    </div>
  );
}
