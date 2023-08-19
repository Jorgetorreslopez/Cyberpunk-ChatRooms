import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/order-api';
import styles from './NewOrderPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({
	user,
	setUser,
	spotifyToken,
	setSpotifyToken
}) {
	const [menuItems, setMenuItems] = useState([]);
	const [activeCat, setActiveCat] = useState('');
	const [cart, setCart] = useState(null);
	const categoriesRef = useRef([]);
	const navigate = useNavigate();

	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [chosenAlbum, setChosenAlbum] = useState(null);
	const [albumPrice, setAlbumPrice] = useState(null);

	// useEffect(function () {
	//   async function getItems () {
	//     const items = await itemsAPI.getAll()
	//     categoriesRef.current = items.reduce((cats, item) => {
	//       const cat = item.category.name
	//       return cats.includes(cat) ? cats : [...cats, cat]
	//     }, [])
	//     setMenuItems(items)
	//     setActiveCat(categoriesRef.current[0])
	//   }
	//   getItems()
	//   async function getCart () {
	//     const cart = await ordersAPI.getCart()
	//     setCart(cart)
	//   }
	//   getCart()
	// }, [])

	////////////////////////////////////////////////////////////////////////////////////start
	const SPOTIFY_CLIENT_ID = process.env.SPOTIFYID;
	const SPOTIFY_CLIENT_ID_SECRET = process.env.SPOTIFYCLIENTSECRET;

	useEffect(() => {
		async function getSpotifyToken() {
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(
						`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_ID_SECRET}`
					)}`
				},
				body: 'grant_type=client_credentials'
			});
			if (response.ok) {
				const data = await response.json();
				// console.log(data)
				setSpotifyToken(data.access_token);
			} else {
				console.error(
					'Failed to fetch Spotify access token:',
					response.statusText
				);
			}
		}
		getSpotifyToken();
	}, []);

	// useEffect(() => {
	//   console.log('Updated spotifyToken:', spotifyToken);
	// }, [spotifyToken]);

	// useEffect(function () {
	//   async function fetchCategories () {
	//     const categories = await getCategories(spotifyToken)
	//     setMenuItems(categories)
	//     setActiveCat(categories[0]?.id)
	//   }

	//   async function getCart () {
	//     const cart = await ordersAPI.getCart()
	//     setCart(cart)
	//   }

	//   fetchCategories()
	//   getCart()
	// }, [spotifyToken])

	async function searchAlbums(query) {
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(
					query
				)}&type=album`,
				{
					headers: {
						Authorization: `Bearer ${spotifyToken}`
					}
				}
			);

			if (response.ok) {
				const data = await response.json();
				return data.albums.items;
			} else {
				console.error(
					'Failed to fetch Spotify search results:',
					response.statusText
				);
				return [];
			}
		} catch (error) {
			console.error('An error occurred:', error);
			return [];
		}
	}

	// async function getCategories() {
	//     console.log(spotifyToken)
	//     try {
	//       const response = await fetch('https://api.spotify.com/v1/browse/categories', {
	//         headers: {
	//           Authorization: `Bearer ${spotifyToken}`,
	//         },
	//       });

	//       if (response.ok) {
	//         const data = await response.json();
	//         const categories = data.categories.items;
	//         console.log(categories);

	//         if (categories.length > 0) {
	//           return categories;
	//         } else {
	//           console.warn('Spotify returned an empty list of categories.');
	//           return [];
	//         }
	//       } else {
	//         console.error('Failed to fetch Spotify categories:', response.statusText);
	//         return [];
	//       }
	//     } catch (error) {
	//       console.error('An error occurred:', error);
	//       return [];
	//     }
	//   }

	////////////////////////////////////////////////////////////////////////////////////////////////End

	// Providing an empty 'dependency array'
	// results in the effect running after
	// the FIRST render only

	/* -- Event Handlers -- */
	// async function handleAddToOrder(itemId) {
	// 	const updatedCart = await ordersAPI.addItemToCart(itemId);
	// 	setCart(updatedCart);
	// }

	// async function handleChangeQty(itemId, newQty) {
	// 	const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
	// 	setCart(updatedCart);
	// }

	async function generateRandomPrice () {
		const newPrice = (Math.random() * 10 + 20).toFixed(2);
		setAlbumPrice(newPrice)
		console.log(albumPrice)
	  }

	async function handleCheckout() {
		await ordersAPI.checkout();
		navigate('/chat');
	}

	/////////////////////////////////////////////////////////////////////////////////start

	async function handleSearchSubmit(event) {
		event.preventDefault();
		if (searchInput.trim()) {
			const results = await searchAlbums(searchInput);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	}

  async function handleAddAlbumToCart(albumId) {
    const updatedCart = await ordersAPI.addItemToCart(albumId);
		setCart(updatedCart);
		console.log(updatedCart);
		const selectedAlbum = searchResults.find((album) => album.id === albumId);
		setChosenAlbum(selectedAlbum);
		generateRandomPrice();
  }

  async function handleChangeQty(albumId, newQty) {
		const updatedCart = await ordersAPI.setItemQtyInCart(albumId, newQty);
		setCart(updatedCart);
		//console.log(updatedCart);
	}

	/////////////////////////////////////////////////////////////////////////////////end

	return (
		<main className={styles.NewOrderPage}>
			<aside>
				<Logo />
				<CategoryList
					categories={categoriesRef.current}
					cart={setCart}
					setActiveCat={setActiveCat}
				/>
				<UserLogOut user={user} setUser={setUser} />
			</aside>
			<MenuList
				menuItems={menuItems.filter((item) => item.category.name === activeCat)}
				// handleAddToOrder={handleAddToOrder}
        handleSearchSubmit={handleSearchSubmit}
        searchResults={searchResults}
        setSearchInput={setSearchInput}
        handleAddAlbumToCart={handleAddAlbumToCart}
			/>
			<OrderDetail
				order={cart}
				handleChangeQty={handleChangeQty}
				handleCheckout={handleCheckout}
				chosenAlbum={chosenAlbum}
				albumPrice={albumPrice}
				setAlbumPrice={setAlbumPrice}
			/>
		</main>
	);
}
