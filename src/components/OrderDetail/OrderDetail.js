import styles from './OrderDetail.module.scss';
import LineItem from '../LineItem/LineItem';

import { useState } from 'react';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({
	order,
	handleChangeQty,
	handleCheckout,
	chosenAlbum,
  albumPrice,
  setAlbumPrice
}) {
	if (!order) return null;
  console.log(albumPrice)


	const lineItems = order.lineItems.map((item) => (
		<LineItem
			lineItem={item}
			isPaid={order.isPaid}
			handleChangeQty={handleChangeQty}
			key={item._id}
			chosenAlbum={chosenAlbum}
      albumPrice={albumPrice}
		/>
	));

	//console.log(order.lineItems)

  const totalPrice = order.lineItems.reduce((total, item) => total + (item.extPrice + albumPrice), 0);


	return (
		<div className={styles.OrderDetail}>
			<div className={styles.sectionHeading}>
				{order.isPaid ? (
					<span>
						ORDER <span className="smaller">{order.orderId}</span>
					</span>
				) : (
					<span>NEW ORDER</span>
				)}
				<span>{new Date(order.updatedAt).toLocaleDateString()}</span>
			</div>
			<div
				className={`${styles.lineItemContainer} flex-ctr-ctr flex-col scroll-y`}
			>
				{lineItems.length ? (
					<>
						{lineItems}
						<section className={styles.total}>
							{order.isPaid ? (
								<span className={styles.right}>TOTAL&nbsp;&nbsp;</span>
							) : (
								<button
									className="btn-sm"
									onClick={handleCheckout}
									disabled={!lineItems.length}
								>
									CHECKOUT
								</button>
							)}
							<span>{order.totalQty}</span>
							<span className={styles.right}>
								${totalPrice.toFixed(2)}
							</span>
						</section>
					</>
				) : (
					<div className={styles.hungry}>Don't like music? Try Therapy.</div>
				)}
			</div>
		</div>
	);
}
