import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion/gsap";

/**
 * Only Chromium and Firefox composite the alpha channel of a VP9 WebM; Safari
 * decodes the same file but paints the transparent areas black, so a cut-out
 * clip would show up there as a solid rectangle. Those browsers get the still
 * instead, which is the Figma design either way.
 */
function supportsAlphaVideo() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return !(/safari/i.test(ua) && !/chrome|chromium|android|edg/i.test(ua));
}

/**
 * A section backdrop that plays a looping clip and falls back to the still it
 * was generated from.
 *
 * The poster is the exact first frame of the clip, so the swap is invisible:
 * the image shows until the video can play, and it is what renders for good
 * under reduced motion or if the file fails to load.
 */
export function MediaBackdrop({
  video,
  poster,
  alpha = false,
  className = "",
  imgClassName = "pointer-events-none absolute inset-0 size-full max-w-none object-cover",
}: {
  /** Path under /assets/video. */
  video: string;
  /** Still fallback, also used as the poster frame. */
  poster: string;
  /** The clip carries an alpha channel and must not be shown opaque. */
  alpha?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const [canUseVideo] = useState(
    () => !prefersReducedMotion() && (!alpha || supportsAlphaVideo()),
  );
  /*
    Mounting all six clips at once had every one of them stuck in
    NETWORK_LOADING with no metadata: they open a connection each and none
    finishes. The clip is therefore only mounted once its section is close to
    the viewport, and until then the still stands in.
  */
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  /*
    Some Chrome builds accept a VP9 WebM by canPlayType and then stall the
    demuxer on an alpha stream: no metadata, no error event, just an element
    that never loads. The still therefore stays mounted underneath and the clip
    only fades over it once it genuinely has frames.
  */
  const [ready, setReady] = useState(false);
  const useVideo = canUseVideo && near && !failed;

  useEffect(() => {
    if (!canUseVideo || near) return;
    const el = stillRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canUseVideo, near]);

  useEffect(() => {
    if (!useVideo) return;

    /*
      `autoPlay` already starts playback; this only nudges browsers that defer
      it. A rejection is usually AbortError because autoplay is already under
      way, so it must NOT be treated as a failure — only a real load error
      (onError) falls back to the still.

      Retried on visibilitychange because a tab opened in the background never
      starts playing, and would otherwise stay frozen once brought forward.
    */
    const attempt = () => void ref.current?.play().catch(() => {});

    attempt();
    document.addEventListener("visibilitychange", attempt);

    /* Chrome pauses offscreen media on its own and never resumes it. */
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attempt();
        else ref.current?.pause();
      },
      { rootMargin: "200px" },
    );
    if (el) observer.observe(el);

    return () => {
      document.removeEventListener("visibilitychange", attempt);
      observer.disconnect();
    };
  }, [useVideo]);

  const still = (
    <img
      ref={stillRef}
      src={poster}
      alt=""
      loading="lazy"
      decoding="async"
      className={imgClassName}
    />
  );

  if (!useVideo) return still;

  return (
    <>
      {!ready && still}
    <video
      ref={ref}
      className={`${imgClassName} ${className}`}
      src={video}
      /* An alpha clip must not flash an opaque poster before it decodes. */
      poster={alpha ? undefined : poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={ready ? undefined : { opacity: 0 }}
      onLoadedData={() => setReady(true)}
      onError={() => setFailed(true)}
    />
    </>
  );
}
