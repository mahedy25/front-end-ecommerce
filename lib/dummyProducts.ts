export type Product = {
  id: number;
  title: string;
  price: number;
  offerPrice: number;
  description: string;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  instock: string;
};

export const products: Product[] = [

  {
    id: 1,
    title: 'Mercedes Benz AMG GT',
    price: 129750,
    offerPrice: 118900,
    description: 'Mercedes-Benz AMG GT: The epitome of luxury and performance.',
    category: 'Mercedes',
    image: [
      '/productImages/mercedes-amg-gt-1.jpg',
      '/productImages/mercedes-amg-gt-2.jpg',
      '/productImages/mercedes-amg-gt-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 2,
    title: 'BMW M3 GTS',
    price: 100300 ,
    offerPrice: 97300,
    description: 'BMW M3 GTS: The epitome of luxury and performance.',
    category: 'BMW',
    image: [
      '/productImages/bmw-m3-gts-1.jpg',
      '/productImages/bmw-m3-gts-2.jpg',
      '/productImages/bmw-m3-gts-3.jpg',
      '/productImages/bmw-m3-gts-4.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 3,
    title: 'Audi A8',
    price: 93295,
    offerPrice: 90000,
    description: 'Audi A4: The epitome of luxury and performance.',
    category: 'Audi',
    image: [
      '/productImages/audi-a8-1.jpg',
      '/productImages/audi-a8-2.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 4,
    title: 'Genesis G90',
    price: 100000,
    offerPrice: 89700,
    description: 'Genesis G70: The epitome of luxury and performance.',
    category: 'Genesis',
    image: [
      '/productImages/genesis-g90-1.jpg',
      '/productImages/genesis-g90-2.jpg',
      '/productImages/genesis-g90-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 5,
    title: 'Rolls-Royce Phantom',
    price: 597750,
    offerPrice: 517750,
    description: 'Rolls-Royce Ghost: The epitome of luxury and performance.',
    category: 'Rolls-Royce',
    image: [
      '/productImages/rolls-royce-phantom-1.jpg',
      '/productImages/rolls-royce-phantom-2.jpg',
      '/productImages/rolls-royce-phantom-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 6,
    title: 'Bentley Continental GT',
    price: 363550,
    offerPrice: 296950,
    description: 'Bentley Continental GT: The epitome of luxury and performance.',
    category: 'Bentley',
    image: [
      '/productImages/bentley-continental-gt-1.jpg',
      '/productImages/bentley-continental-gt-2.jpg',
      '/productImages/bentley-continental-gt-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 7,
    title: 'Porsche Panamera',
    price: 110100,
    offerPrice: 102800,
    description: 'Porsche Panamera: The epitome of luxury and performance.',
    category: 'Porsche',
    image: [
      '/productImages/porsche-panamera-1.jpg',
      '/productImages/porsche-panamera-2.jpg',
      '/productImages/porsche-panamera-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  },
  {
    id: 8,
    title: 'Maserati Quattroporte',
    price: 155000,
    offerPrice: 140000,
    description: 'Maserati Quattroporte: The epitome of luxury and performance.',
    category: 'Maserati',
    image: [
      '/productImages/maserati-quattroporte-1.jpg',
      '/productImages/maserati-quattroporte-2.jpg',
      '/productImages/maserati-quattroporte-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
  }

];