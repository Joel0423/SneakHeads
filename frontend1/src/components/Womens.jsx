import React from 'react'
import Banner from './Banner'
import Card from './Card/Card'

const Womens = () => {

  const data = [
    {
      img: '/img/women1.png',
      name: 'Nike Flexo Running Shoes',
      price: '6,000',
      tags: ['popular']
    },
    {
      img: '/img/women2.png',
      name: 'Nike OffWhite Limited Edition',
      price: '11,000',
      tags: ['new']
    },
    {
      img: '/img/women3.png',
      name: 'Nike Flexo Running Shoes Red Edition',
      price: '8,000',
      tags: ['trending']
    },
    {
      img: '/img/women4.png',
      name: 'Nike Flexo Running Shoes Red Edition',
      price: '7,500',
      tags: ['new']
    },
    {
      img: '/img/women5.png',
      name: 'Adidas 361',
      price: '13,000',
      tags: ['trending']
    },
    {
      img: '/img/women6.png',
      name: 'Nike Flexo Running Shoes Yellow Edition',
      price: '6,900',
      tags: ['new']
    },
  ]

  return (
    <main className='w-full h-fit'>
      <Banner data="Womens" color="hotpink"/>

        {/* Womens Container */}
        <div className='min-h-[100vh] w-full flex flex-wrap gap-10 justify-around my-8'>
          {
            data.map((item, index) => (
              <Card key={index} data={item} category="Womens"/>
            ))
          }
        </div>
    </main>
  )
}

export default Womens