import { categories } from '@/lib/categories'
import Image from 'next/image'
import Link from 'next/link'
import { Lobster_Two } from 'next/font/google'

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

export default function Categories() {
  return (
    <main className='mt-20 sm:mt-24 md:mt-32 lg:mt-40 '>
      <h1 className={ `${lobster.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8`}>Available Brands</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>

        {categories.map((cat) => (
          <Link key={cat.path} href={cat.path} className='group cursor-pointer py-4 px-2 gap-2 rounded-lg flex flex-col justify-center items-center '>
            <Image
              src={cat.image}
              alt={cat.text}
              width={200}
              height={120}
              className='object-contain group-hover:scale-105 transition-all duration-300 ease-in-out '
            />
            <p className='text-lg font-semibold'>{cat.text}</p>
          </Link>
        ))}

      </div>
    </main>
  )
}