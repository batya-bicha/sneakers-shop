import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  { name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: "/img/sneakers/image1.png" },
  { name: 'Мужские Кроссовки Nike Air Max 270', price: 15600, imageUrl: "/img/sneakers/image2.png" },
  { name: 'Мужские Кроссовки Nike Blaze Mid Suede', price: 8499, imageUrl: "/img/sneakers/image3.png" },
  { name: 'Кроссовки Puma X Aka Boku Future Rider ', price: 8999, imageUrl: "/img/sneakers/image4.png" }
];

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
    fetch('https://61ad256ad228a9001703ad1d.mockapi.io/items').then(res => {
      return res.json();
    }).then(json => {
      setItems(json)
    })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  console.log(cartItems)

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items.map(item => (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('fav')}
                onPlus={onAddToCart}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;