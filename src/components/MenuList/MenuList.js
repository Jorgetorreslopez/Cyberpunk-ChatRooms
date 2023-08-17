import styles from './MenuList.module.scss';
import MenuListItem from '../MenuListItem/MenuListItem';

export default function MenuList({
	menuItems,
	handleAddToOrder,
	handleAddAlbumToCart,
	handleSearchSubmit,
	searchResults,
	searchInput,
	setSearchInput
}) {
	// const items = menuItems.map((item) => (
	// 	<MenuListItem
	// 		key={item._id}
	// 		handleAddToOrder={handleAddToOrder}
	// 		menuItem={item}
	// 	/>
	// ));
	return (
		<main className={styles.MenuList}>
			{/* {items} */}
			<div className={styles.Search}>
				<h2>Search for Albums</h2>
				<form onSubmit={handleSearchSubmit}>
					<input
						type="text"
						placeholder="Enter album name"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<button type="submit">Search</button>
				</form>
				<ul>
					{searchResults.map((album) => (
						<li key={album.id}>
							<div className={styles.Album}>
								<img
                  className={styles.AlbumArtwork}
									src={album.images[0]?.url}
									alt={`${album.name} Album Cover`}
								/>
								<div className={styles.AlbumDetails}>
									<h3>{album.name}</h3>
									<p>{album.artists[0].name}</p>
									<button onClick={() => handleAddAlbumToCart(album.id)}>
										Add to Cart
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
