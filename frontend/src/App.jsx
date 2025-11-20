import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Restaurants from './pages/Restaurants'
import Menu from './pages/Menu'
import Cart from './pages/Cart'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (user) setPage('restaurants')
  }, [user])

  function addToCart(item) {
    setCart(prev => [...prev, item])
  }

  function clearCart() {
    setCart([])
  }

  function removeFromCart(index) {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="app">
      <header>
        <h1>Mini Delivery</h1>
        {user && (
          <button onClick={() => { setUser(null); setPage('login') }}>
            Logout
          </button>
        )}
      </header>

      <main>
        {page === 'login' && (
          <Login 
            onLogin={u => { setUser(u); setPage('restaurants') }} 
            onGoRegister={() => setPage('register')} 
          />
        )}

        {page === 'restaurants' && (
          <Restaurants 
            onOpen={(r) => { setSelectedRestaurant(r); setPage('menu') }} 
          />
        )}

        {page === 'menu' && (
          <Menu 
            restaurant={selectedRestaurant}
            onAdd={addToCart}
            onBack={() => setPage('restaurants')}
            onCheckout={() => setPage('cart')}
          />
        )}

        {page === 'cart' && (
          <Cart 
            cart={cart}
            user={user}
            onClear={clearCart}
            onBack={() => setPage('restaurants')}
            onRemove={removeFromCart}
          />
        )}
      </main>
    </div>
  )
}
