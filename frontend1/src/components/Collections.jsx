import React from 'react'
import Banner from './Banner'
import Card from './Card/Card'

const Collections = () => {

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
      img: '/img/new2.png',
      name: 'Sejda Supers Z900',
      price: '9,000',
      tags: ['new']
    },
    {
      img: '/img/new3.png',
      name: 'Nike Dragon Red High Top',
      price: '12,000',
      tags: ['trending']
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
      img: '/img/men1.png',
      name: 'Nike Lighting Black Limited Edition',
      price: '36,000',
      tags: ['popular']
    },
    {
      img: '/img/men2.png',
      name: 'Adidas SPLV-350 Crimson',
      price: '10,000',
      tags: ['new']
    },
    {
      img: '/img/new1.png',
      name: 'Nike Core Black Limited Edition',
      price: '32,000',
      tags: ['popular']
    },
    {
      img: '/img/new4.png',
      name: 'Jordan High Top Yellow Edition',
      price: '38,000',
      tags: ['trending']
    },
    {
      img: '/img/men5.png',
      name: 'Adidas Gazelle Yellow',
      price: '17,000',
      tags: ['trending']
    },
    {
      img: '/img/men6.png',
      name: 'Nike High Top Red Edition',
      price: '26,000',
      tags: ['new']
    },
    {
      img: '/img/women5.png',
      name: 'Adidas 361',
      price: '13,000',
      tags: ['trending']
    },
    {
      img: '/img/new5.png',
      name: 'Adidas SPLV-350',
      price: '15,000',
      tags: ['popular']
    },
    {
      img: '/img/new6.png',
      name: 'Jordan OG Red Edition',
      price: '25,000',
      tags: ['new']
    },
    {
      img: '/img/men3.png',
      name: 'Nike Dragon Red',
      price: '18,000',
      tags: ['trending']
    },
    {
      img: '/img/men4.png',
      name: 'Adidas SPLV-350 Grey',
      price: '8,000',
      tags: ['new']
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
      <Banner data="Collection" color="green"/>
        {/* Mens Container */}
        <div className='min-h-[100vh] w-full flex flex-wrap gap-10 justify-around my-8'>
          {
            data.map((item, index) => (
              <Card key={index} data={item} category="Collection"/>
            ))
          }
        </div>
    </main>
  )
}

export default Collections