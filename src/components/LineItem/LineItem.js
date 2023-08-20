import styles from './LineItem.module.scss'
import { useState } from 'react';

export default function LineItem ({ albumPrice, lineItem, isPaid, handleChangeQty, chosenAlbum }) {
  console.log(chosenAlbum)


  return (
    <div className={styles.LineItem}>

<div className='flex-ctr-ctr'>
        {chosenAlbum && (
          <img src={chosenAlbum.images[0]?.url} alt={`${chosenAlbum.name} Album Cover`} />
        )}
      </div>
      <div className='flex-ctr-ctr flex-col'>
        <span className='align-ctr'>{chosenAlbum.artists[0]?.name}</span>
        <span className='order-album align-ctr'>{chosenAlbum.name}</span>
      </div>
      <div
        className={styles.qty}
        style={{ justifyContent: isPaid && 'center' }}
      >
        {!isPaid && (
          <button
            className='btn-xs'
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
            >
            -
          </button>
        )}
        <span>{lineItem.qty}</span>
        {!isPaid && (
          <button
            className='btn-xs'
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
          >
            +
          </button>
        )}
      </div>
      <div className={styles.extPrice}>${albumPrice}</div>
    </div>
  )
}
