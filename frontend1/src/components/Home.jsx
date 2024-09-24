import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import image1 from '/img/loader1.jpg'
import image2 from '/img/loader2.jpg'
import image3 from '/img/loader3.jpg'
import Banner from './Banner';
import Card from './Card/Card';

const Home = () => {

  const percentage = useRef(null);
  const loaderText = useRef(null);
  const hero = useRef(null);
  const [counter, setCounter] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const tl = gsap.timeline();
  const { contextSafe } = useGSAP();
  const random = gsap.utils.random(5, 10, 1, true);
  const randomTimer = gsap.utils.random(550, 1000, 50, true);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem('loaderShown');

    // Show loader only if it hasn't been shown yet
    if (!loaderShown) {
      setShowLoader(true);
      sessionStorage.setItem('loaderShown', 'true');
    }
  }, []);

  useEffect(() => {
    if (showLoader) {
      const t = setInterval(() => {
        if (counter >= 100) {
          clearInterval(t);
        } else {
          setCounter((prevCounter) => Math.min(prevCounter + random(), 100));
        }
      }, randomTimer());

      return () => clearInterval(t); // Clean up the interval
    }
  }, [counter, showLoader]);

  useEffect(() => {
    if (showLoader) {
      percentage.current.textContent = counter.toString().padStart(2, '0');

      contextSafe(() => {
        gsap.to(loaderText.current, {
          clipPath: `polygon(0% 0%, ${counter}% 0%, ${counter}% 100%, 0% 100%)`
        });
      })();

      if (counter === 100) {
        loaderAnimation();
      }
    }
  }, [counter, showLoader]);

  const loaderAnimation = contextSafe(() => {
    tl.to('.loader', {
      scale: .7,
      ease: "power3.inOut",
      duration: 1,
    })
      .to('.black-bg', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        duration: .5,
      })
      .to('.image3', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        duration: .5,
      }, "-=.2")
      .to('.image2', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        duration: .5,
      }, "-=.2")
      .to('.image1', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        duration: .5,
      }, "-=.2")
      .fromTo('.loader', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      }, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        duration: .5,
      }, "-=.2")
      .fromTo('.navbar', {
        opacity: 0
      }, {
        opacity: .5,
        ease: "power3.inOut",
        duration: 1,
      })
      .fromTo('iframe', {
        opacity: 0
      }, {
        opacity: 1,
        ease: "power3.inOut",
        duration: .5,
      });
  });

  const data = [
    {
      img: '/img/new1.png',
      name: 'Nike Core Black Limited Edition',
      price: '32,000',
      tags: ['popular']
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
      img: '/img/new4.png',
      name: 'Jordan High Top Yellow Edition',
      price: '38,000',
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
  ]

  return (
    <>
      {showLoader && (
        <div className="loader absolute w-full h-screen top-0 left-0 bg-[#191919] overflow-hidden">
          <img className="absolute top-0 left-0 w-full h-full object-cover image1" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} src={image1} alt="" />
          <img className="absolute top-0 left-0 w-full h-full object-cover image2" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} src={image2} alt="" />
          <img className="absolute top-0 left-0 w-full h-full object-cover image3" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} src={image3} alt="" />
          
          <div className="black-bg w-full h-full relative bg-[#191919]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
            <div className="content-container flex px-2 w-full h-[20vh] justify-between items-end absolute bottom-0 left-0 font-custom2 leading-none">
              <div className="text overflow-hidden">
                <p ref={loaderText} className="text-white text-[11vh]" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>Discover the latest fashion trends and sneakers</p>
              </div>
              <div className='text-white leading-[0.7] font-custom1'>
                <p ref={percentage} className='text-[20vh]'>0<span className='text-[5vh]'>%</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className='w-full h-fit'>
        <div className="overflow-hidden w-full h-[90vh] px-2 py-2">
          {/* <Spline scene="https://prod.spline.design/267tkv41GMaNHcOt/scene.splinecode" /> */}
          <iframe className="scale-[1.3]" src='https://my.spline.design/sneakheads-e7240d71054ddc7fb7609e50a88f3259/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>
        <Banner data="New Arrivals" color="#ff6723"/>
        
        {/* New Arrivals Container */}
        <div className='min-h-[100vh] w-full flex flex-wrap gap-10 justify-around my-8'>
          {
            data.map((item, index) => (
              <Card key={index} data={item} category="New Arrival"/>
            ))
          }
        </div>
      </main>
    </>
  )
}

export default Home;
