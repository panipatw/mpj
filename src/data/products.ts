// Shared product data for the (fictional) pottery shop.
//
// Both the landing-page teaser and the full /shop page import from here, so
// there's ONE source of truth — edit a price once and it updates everywhere.
//
// Product photos live in src/assets/shop/ (named after the slug) so Astro's
// image pipeline optimises them at build time. Pieces without a photo yet fall
// back to a CSS gradient placeholder built from `from`/`to`.

import hikariBowl from '../assets/shop/hikari-bowl.png';
import komorebiMug from '../assets/shop/komorebi-mug.png';

export interface Product {
	slug: string;
	name: string;
	price: number; // in whole dollars, formatted where displayed
	blurb: string;
	from: string; // gradient start colour
	to: string; // gradient end colour
	image?: ImageMetadata; // real product photo; gradient is the fallback
	alt?: string; // describes the photo for screen readers
	featured?: boolean; // shown in the landing-page teaser
}

export const products: Product[] = [
	{
		slug: 'hikari-bowl',
		name: 'Hikari Stoneware Bowl',
		price: 48,
		blurb: 'Hand-thrown stoneware with a soft matte glaze that catches the light.',
		from: '#c98a5e',
		to: '#6f4a34',
		image: hikariBowl,
		alt: 'Stoneware bowl with a glaze fading from warm amber at the rim to deep brown at the foot.',
		featured: true,
	},
	{
		slug: 'komorebi-mug',
		name: 'Komorebi Speckled Mug',
		price: 32,
		blurb: 'A generous mug flecked with iron speckle, glazed to a warm oatmeal.',
		from: '#d8b48a',
		to: '#8a6b4a',
		image: komorebiMug,
		alt: 'Speckled oatmeal-glazed mug with a rounded body and looped handle.',
		featured: true,
	},
	{
		slug: 'suna-vase',
		name: 'Suna Indigo Vase',
		price: 74,
		blurb: 'Tall, quiet lines in a deep indigo-black, swept with a single pale brushstroke.',
		from: '#3b4a63',
		to: '#14181f',
		featured: true,
	},
	{
		slug: 'tsuki-plate',
		name: 'Tsuki Serving Plate',
		price: 56,
		blurb: 'A wide plate in an ocean-blue glaze that breaks to a foamy pale rim.',
		from: '#bcdfe8',
		to: '#2f7aac',
	},
	{
		slug: 'ame-pitcher',
		name: 'Ame Rain Pitcher',
		price: 62,
		blurb: 'A balanced pitcher in a milky cream glaze, iron-speckled and made to pour clean.',
		from: '#ece4d6',
		to: '#c2b29a',
	},
	{
		slug: 'nemu-planter',
		name: 'Nemu Planter',
		price: 40,
		blurb: 'A rounded planter in unglazed terracotta that breathes with the soil.',
		from: '#c67c5a',
		to: '#7a3f28',
	},
	{
		slug: 'cha-teacup-set',
		name: 'Cha Teacup Set',
		price: 68,
		blurb: 'Two small cups in a glossy near-black glaze, mottled with deep teal, sized for slow afternoon tea.',
		from: '#245049',
		to: '#0b1216',
	},
	{
		slug: 'kaze-incense-holder',
		name: 'Kaze Incense Holder',
		price: 24,
		blurb: 'A small, weighted dish with a single hole, glazed in a foamy ocean blue.',
		from: '#bcdfe8',
		to: '#2f7aac',
	},
];

// Convenience helpers used by the pages.
export const featuredProducts = products.filter((p) => p.featured);
