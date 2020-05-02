import React from 'react';

import style from './Image.module.scss';

const Image = () => {
  return (
    <>
      <img className={style.image} src='https://source.unsplash.com/random/800x600' alt="image" />
      <h3 className={style.header}>TODO's</h3>
    </>
  )
}

export default Image;