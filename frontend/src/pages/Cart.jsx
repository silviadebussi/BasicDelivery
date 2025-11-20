import React from 'react'

export default function Cart({ cart, user, onClear, onBack, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  async function checkout() {
    const res = await fetch('http://localhost:4000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id || null,
        restaurantId: cart[0]?.restaurant_id || null,
        items: cart,
        total
      })
    });

    const data = await res.json();
    if (data.ok) {
      alert('Pedido realizado: ' + data.orderId);
      onClear();
      onBack();
    } else alert('erro');
  }

  return (
    <div>
      <button onClick={onBack}>Voltar</button>
      <h3>Carrinho</h3>

      {cart.map((c, idx) => (
        <div key={idx} className="card">
          {c.name} - R$ {c.price.toFixed(2)}
          <button style={{ marginLeft: 10 }} onClick={() => onRemove(idx)}>
            Remover
          </button>
        </div>
      ))}

      <p><strong>Total: R$ {total.toFixed(2)}</strong></p>

      <button onClick={checkout} disabled={cart.length === 0}>
        Finalizar Pedido
      </button>
    </div>
  );
}
