import React from 'react'
import Banner from './Banner'
import Card from './Card/Card'

const Mens = () => {
  const data = [
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
  ]

  return (
    <main className='w-full h-fit'>
      <Banner data="Mens" color="blue"/>
        {/* Mens Container */}
        <div className='min-h-[100vh] w-full flex flex-wrap gap-10 justify-around my-8'>
          {
            data.map((item, index) => (
              <Card key={index} data={item} category="Mens"/>
            ))
          }
        </div>
    </main>
  )
}

export default Mens