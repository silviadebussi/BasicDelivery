import React, {useEffect, useState} from 'react'
export default function Menu({restaurant, onAdd, onBack, onCheckout}){
  const [items, setItems] = useState([])
  useEffect(()=>{ if (restaurant) fetch(`http://localhost:4000/api/restaurants/${restaurant.id}/menu`).then(r=>r.json()).then(setItems) }, [restaurant])
  if (!restaurant) return <div>Selecione um restaurante</div>
  return (
    <div>
      <button onClick={onBack}>Voltar</button>
      <h2>{restaurant.name} - Menu</h2>
      {items.map(i=>(
        <div key={i.id} className="card">
          <strong>{i.name}</strong>
          <p>R$ {i.price.toFixed(2)}</p>
          <button onClick={()=>onAdd(i)}>Adicionar</button>
        </div>
      ))}
      <button onClick={onCheckout}>Ir para o carrinho</button>
    </div>
  )
}
