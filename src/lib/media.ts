import images from './images.json';
import {u} from './base';

export type Img = {cat: string; alt: string; w: number; h: number};
export const imgs = images as Record<string, Img>;
export const allImages = Object.entries(imgs).map(([slug, v]) => ({slug, ...v}));

export const src = (slug: string, small = false) => u(`/media/${slug}${small ? '-640' : ''}.webp`);
export const srcSet = (slug: string) => `${u(`/media/${slug}-640.webp`)} 640w, ${u(`/media/${slug}.webp`)} ${imgs[slug]?.w ?? 1600}w`;
