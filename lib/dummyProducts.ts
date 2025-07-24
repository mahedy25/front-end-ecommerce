export type Product = {
  id: string;
  title: string;
  price: number;
  offerPrice: number;
  description: string;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  instock: string;
  ratings: number[];
};

export const products: Product[] = [
  // Mercedes category
  {
    id: 'mbamggt',
    title: 'Mercedes Benz AMG GT',
    price: 129750,
    offerPrice: 118900,
    description: 'Mercedes-Benz AMG GT: The epitome of luxury and performance.',
    category: 'Mercedes',
    image: [
      '/productImages/mercedes-amg-gt-1.jpg',
      '/productImages/mercedes-amg-gt-2.jpg',
      '/productImages/mercedes-amg-gt-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 4, 5, 4]
  },
  {
    id: 'mbclacoupe',
    title: 'Mercedes-Benz CLA Coupe',
    price: 129750,
    offerPrice: 118900,
    description: 'Mercedes-Benz CLA Coupe: The epitome of luxury and performance.',
    category: 'Mercedes',
    image: [
      '/productImages/mercedes-benz-cla-coupe-1.jpg',
      '/productImages/mercedes-benz-cla-coupe-2.jpg',
      '/productImages/mercedes-benz-cla-coupe-3.jpg',
      '/productImages/mercedes-benz-cla-coupe-4.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 4, 5, 4]
  },
  {
    id: 'mbgclass',
    title: 'Mercedes-Benz G-Class (G-Wagon)',
    price: 160000,
    offerPrice: 140000,
    description: 'Mercedes-Benz G-Class (G-Wagon): The epitome of luxury and performance.',
    category: 'Mercedes',
    image: [
      '/productImages/mercedes-benz-g-class-g-wagon-1.jpg',
      '/productImages/mercedes-benz-g-class-g-wagon-2.jpg',
      '/productImages/mercedes-benz-g-class-g-wagon-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 4, 5, 4]
  },

  // BMW category

  {
    id: 'bmwm3gts',
    title: 'BMW M3 GTS',
    price: 100300,
    offerPrice: 97300,
    description: 'BMW M3 GTS: The epitome of luxury and performance.',
    category: 'BMW',
    image: [
      '/productImages/bmw-m3-gts-1.jpg',
      '/productImages/bmw-m3-gts-2.jpg',
      '/productImages/bmw-m3-gts-3.jpg',
      '/productImages/bmw-m3-gts-4.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 5, 4]
  },
  {
    id: 'bmwm4gts',
    title: 'BMW X1',
    price: 50800,
    offerPrice: 41350,
    description: 'BMW X1: The epitome of luxury and performance.',
    category: 'BMW',
    image: [
      '/productImages/bmw-x1-1.jpg',
      '/productImages/bmw-x1-2.jpg',
      '/productImages/bmw-x1-3.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 5, 4]
  },
  {
    id: 'bmw7series',
    title: 'BMW 7 Series',
    price: 98475,
    offerPrice: 93000,
    description: 'BMW 7 Series: The epitome of luxury and performance.',
    category: 'BMW',
    image: [
      '/productImages/bmw-7-series-1.jpg',
      '/productImages/bmw-7-series-2.jpg',
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 5, 4]
  },

  // Audi category

  {
    id: 'audi-a8',
    title: 'Audi A8',
    price: 93295,
    offerPrice: 90000,
    description: 'Audi A4: The epitome of luxury and performance.',
    category: 'Audi',
    image: [
      '/productImages/audi-a8-1.jpg',
      '/productImages/audi-a8-2.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 5, 5, 4]
  },
  {
    id: 'audi-q3',
    title: 'Audi Q3',
    price: 50000,
    offerPrice: 45945,
    description: 'Audi Q3: The epitome of luxury and performance.',
    category: 'Audi',
    image: [
      '/productImages/audi-q3-1.jpg',
      '/productImages/audi-q3-2.jpg',
      '/productImages/audi-q3-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 5, 5, 4]
  },
  {
    id: 'audi-tt',
    title: 'Audi TT',
    price: 54000,
    offerPrice: 45500,
    description: 'Audi TT: The epitome of luxury and performance.',
    category: 'Audi',
    image: [
      '/productImages/audi-tt-1.jpg',
      '/productImages/audi-tt-2.jpg',
      '/productImages/audi-tt-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 5, 5, 4]
  },

  // Genesis category

  {
    id: 'genesis-g90',
    title: 'Genesis G90',
    price: 100000,
    offerPrice: 89700,
    description: 'Genesis G70: The epitome of luxury and performance.',
    category: 'Genesis',
    image: [
      '/productImages/genesis-g90-1.jpg',
      '/productImages/genesis-g90-2.jpg',
      '/productImages/genesis-g90-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 3, 5]
  },

  // Rolls-Royce category

  {
    id: 'rolls-royce-phantom',
    title: 'Rolls-Royce Phantom',
    price: 597750,
    offerPrice: 517750,
    description: 'Rolls-Royce Ghost: The epitome of luxury and performance.',
    category: 'Rolls-Royce',
    image: [
      '/productImages/rolls-royce-phantom-1.jpg',
      '/productImages/rolls-royce-phantom-2.jpg',
      '/productImages/rolls-royce-phantom-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 5, 5, 4, 5]
  },

  // Bentley category

  {
    id: 'bentley-continental-gt',
    title: 'Bentley Continental GT',
    price: 363550,
    offerPrice: 296950,
    description: 'Bentley Continental GT: The epitome of luxury and performance.',
    category: 'Bentley',
    image: [
      '/productImages/bentley-continental-gt-1.jpg',
      '/productImages/bentley-continental-gt-2.jpg',
      '/productImages/bentley-continental-gt-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 4, 3]
  },

  // Porsche category

  {
    id: 'porsche-panamera',
    title: 'Porsche Panamera',
    price: 110100,
    offerPrice: 102800,
    description: 'Porsche Panamera: The epitome of luxury and performance.',
    category: 'Porsche',
    image: [
      '/productImages/porsche-panamera-1.jpg',
      '/productImages/porsche-panamera-2.jpg',
      '/productImages/porsche-panamera-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [5, 4, 4]
  },

  // Maserati category

  {
    id: 'maserati-quattroporte',
    title: 'Maserati Quattroporte',
    price: 155000,
    offerPrice: 140000,
    description: 'Maserati Quattroporte: The epitome of luxury and performance.',
    category: 'Maserati',
    image: [
      '/productImages/maserati-quattroporte-1.jpg',
      '/productImages/maserati-quattroporte-2.jpg',
      '/productImages/maserati-quattroporte-3.jpg'
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    instock: 'true',
    ratings: [4, 3, 4]
  }
];
