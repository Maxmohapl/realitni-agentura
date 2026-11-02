import OptimizedImage from '@/components/OptimizedImage';

// Compensate for the different transparent margins in the supplied artwork.
const iconScales = [1.32, 1.25, 1.25, 1.08, 1.1, 1.13, 1, 1.25, 1.2, 1.15];

export default function JourneyIcon({ step }: { step: number }) {
  return (
    <OptimizedImage
      className="journey-step__artwork"
      src={`/images/services/journey-icons/step-${step + 1}.png`}
      alt=""
      aria-hidden="true"
      width={1254}
      height={1254}
      loading="lazy"
      style={{ transform: `scale(${iconScales[step] ?? 1})` }}
    />
  );
}
