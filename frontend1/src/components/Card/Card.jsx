import React from 'react';
import './Card.css';

const Card = ({ data, category }) => {

  const cardTag = data.tags[0];

  return (
    <div className="card" 
    data-popular = {cardTag === 'popular'}
    data-trending={cardTag === 'trending'}
    data-new={cardTag === 'new'}>
      <div className="author">
        <div className="name">{category}</div>
      </div>
      <div className="image">
        <img src={data.img} alt="Nike Trifo Premium" />
      </div>
      <div className="info">
        <div className="name font-2xl">{data.name}</div>
        <div className="price"><span className='font-bold text-5xl'>₹</span>{data.price}</div>
      </div>
      <div className="more">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdgTw6j_qvQERYZ_mpI7JZ6NztR6A9Uv1PI99wKxnSCsj7QYw/viewform" target='_blank'><button>Contact Seller</button></a>
      </div>
    </div>
  );
};

export default Card;
