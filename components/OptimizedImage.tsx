import type { ImgHTMLAttributes } from 'react';
import manifest from '@/lib/image-manifest.json';

type Asset = { src: string; width: number; height: number; srcSet: string | null };
const assets: Record<string, Asset> = manifest;

export default function OptimizedImage({ alt, src, width, height, srcSet, sizes, loading, decoding = 'async', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const asset = typeof src === 'string' ? assets[src.split('?')[0]] : undefined;
  // Assets are pre-generated as WebP with responsive srcsets; no runtime image service is required.
  // oxlint-disable-next-line next/no-img-element
  return <img {...props} alt={alt} src={asset?.src ?? src} width={width ?? asset?.width} height={height ?? asset?.height}
    srcSet={srcSet ?? asset?.srcSet ?? undefined}
    sizes={sizes ?? (asset?.srcSet ? '(max-width: 760px) 100vw, (max-width: 1050px) 60vw, 900px' : undefined)}
    loading={loading} decoding={decoding} />;
}
