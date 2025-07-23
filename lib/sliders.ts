// lib/sliders.ts

export type Slide = {
  id: number
  image: string
  title: string
  description: string
  link: string
  cta: string
}

export const slides: Slide[] = [
    {
    id: 1,
    image: '/HeroCars/mercedes-benz-AMG-GT.jpg',
    title: 'Rugged and Ready',
    description: 'Experience the ruggedness and readiness of Mercedes-Benz AMG GT.',
    link: '',
    cta: 'See Mercedes',
  },
  {
    id: 2,
    image: '/HeroCars/bmw-M3-GTS.jpg',
    title: 'Luxury Meets Performance',
    description: 'Experience the epitome of luxury and performance with BMW M3 GTS.',
    link: '',
    cta: 'View BMW',
  },
    {
    id: 3,
    image: '/HeroCars/audi-A4.jpg',
    title: 'Drive the Future Today',
    description: 'Audi A4: Unleash the Future of Driving.',
    link: '',
    cta: 'Explore AUDI',
  },
]
