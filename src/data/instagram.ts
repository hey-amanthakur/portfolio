import type { IInstagramPost } from '@/types';

// Fallback posts — replaced by src/scraped/instagram-posts.json when the
// prebuild scraper runs successfully.
export const instagramPosts: readonly IInstagramPost[] = [
  {
    id: 'insta-1',
    imageUrl: '/assets/instagram/insta-1.jpg',
    caption: 'Spice, sizzle, and a journey of a lifetime! Tasting the absolute best Butter Chicken in Delhi 🍛🔥. Every bite has a story! #YehSafarSwaadKa #FoodVlog',
    likes: 1842,
    comments: 124,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-2',
    imageUrl: '/assets/instagram/insta-2.jpg',
    caption: 'Cracking the crispy gold standard! This 4-foot Masala Dosa is a legendary local masterclass 🥞 Sambhar check: 10/10. Chutneys: Spiced to perfection! #StreetFoodIndia',
    likes: 2150,
    comments: 187,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-3',
    imageUrl: '/assets/instagram/insta-3.jpg',
    caption: 'Long grained, slow-cooked, and loaded with aroma! Unboxing the most authentic Dum Biryani cooked over coal. Tag a friend who can finish this alone! 👇👇 #BiryaniLovers',
    likes: 3105,
    comments: 242,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-4',
    imageUrl: '/assets/instagram/insta-4.jpg',
    caption: 'A sweet ending to a spicy travel journey! Fluffy, milky Rasmalai soaked in saffron and loaded with pistachios 🍧. Pure foodie heaven! #DessertGram #SweetJourney',
    likes: 1982,
    comments: 98,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  }
] as const;
