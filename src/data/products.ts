// Shared product data for the (fictional) pottery shop.
//
// Both the landing-page teaser and the full /shop page import from here, so
// there's ONE source of truth — edit a price once and it updates everywhere.
//
// `from`/`to` are the two colours of the CSS gradient we use as a placeholder
// "photo" for each piece (no image files yet — see the plan). When real photos
// exist, swap the gradient thumbnail for an <img> and these can go away.

export interface Product {
	slug: string;
	name: string;
	price: number; // in whole dollars, formatted where displayed
	blurb: string;
	from: string; // gradient start colour
	to: string; // gradient end colour
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
		featured: true,
	},
	{
		slug: 'komorebi-mug',
		name: 'Komorebi Speckled Mug',
		price: 32,
		blurb: 'A generous mug flecked with iron speckle, glazed to a warm oatmeal.',
		from: '#d8b48a',
		to: '#8a6b4a',
		featured: true,
	},
	{
		slug: 'suna-vase',
		name: 'Suna Ash-Glaze Vase',
		price: 74,
		blurb: 'Tall, quiet lines finished in a wood-ash glaze that pools at the base.',
		from: '#a9a08c',
		to: '#5c5648',
		featured: true,
	},
	{
		slug: 'tsuki-plate',
		name: 'Tsuki Serving Plate',
		price: 56,
		blurb: 'A wide, moon-pale plate with a hand-trimmed foot and gentle rim.',
		from: '#cfc4b0',
		to: '#7d7462',
	},
	{
		slug: 'ame-pitcher',
		name: 'Ame Rain Pitcher',
		price: 62,
		blurb: 'A balanced pitcher glazed in a streaked slate blue, made to pour clean.',
		from: '#8fa1a8',
		to: '#495a63',
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
		blurb: 'Two small cups with a celadon glaze, sized for slow afternoon tea.',
		from: '#a7c1a8',
		to: '#4f6b52',
	},
	{
		slug: 'kaze-incense-holder',
		name: 'Kaze Incense Holder',
		price: 24,
		blurb: 'A small, weighted dish with a single hole — minimal and steady.',
		from: '#b9a6b0',
		to: '#665262',
	},
];

// Convenience helpers used by the pages.
export const featuredProducts = products.filter((p) => p.featured);
