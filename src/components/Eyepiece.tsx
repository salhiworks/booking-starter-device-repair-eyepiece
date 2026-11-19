import type { SiteImage } from '@profitstudio/booking-engine';
import { Photo } from './Photo';
import { Reticle } from './Reticle';

interface EyepieceProps {
  image: SiteImage;
  sizes: string;
  /** Shown as a small mono caption on the ring ("Display connector, ×20"). */
  caption?: string;
  sample: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * A photograph seen through the eyepiece: a circle cut from a square photo, a dark ring around it and the
 * reticle laid over it. An owner's replacement is cropped to the circle, never distorted.
 */
export function Eyepiece({ image, sizes, caption, sample, className, priority }: EyepieceProps) {
  return (
    <figure className={`eyepiece ${className ?? ''}`} data-reveal="">
      <div className="eyepiece__lens">
        <Photo image={image} sizes={sizes} className="frame--round" priority={priority} />
        <Reticle className="eyepiece__reticle" />
      </div>
      {(caption || sample) && (
        <figcaption className="eyepiece__caption">
          {caption && <span className="eyepiece__text">{caption}</span>}
          {sample && <span className="photo-label photo-label--inline">Sample photo</span>}
        </figcaption>
      )}
    </figure>
  );
}
