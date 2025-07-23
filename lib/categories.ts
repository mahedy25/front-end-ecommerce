export type Category = {
  text: string
  path: string
  image: string
}

export const categories: Category[] = [
  {
    text: 'Mercedes',
    path: '/categories/electric-cars',
    image: '/CarsCategories/mercedes.jpg',
  },
  {
    text: 'BMW',
    path: '/categories/suvs',
    image: '/CarsCategories/bmw.jpg',
  },
  {
    text: 'Audi',
    path: '/categories/sedans',
    image: '/CarsCategories/audi.jpg',
  },
  {
    text: 'Genesis',
    path: '/categories/luxury',
    image: '/CarsCategories/genesis.png',
  },
  {
    text: 'Rolls-Royce',
    path: '/categories/sports',
    image: '/CarsCategories/rolls-royce.jpg',
  },
  {
    text: 'Bentley',
    path: '/categories/hybrids',
    image: '/CarsCategories/bentley.jpg',
  },
  {
    text: 'Porsche',
    path: '/categories/pickup-trucks',
    image: '/CarsCategories/porsche.jpg',
  },
  {
    text: 'Maserati',
    path: '/categories/compact',
    image: '/CarsCategories/maserati.jpg',
  },
]
