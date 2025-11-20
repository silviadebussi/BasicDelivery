import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [registering, setRegistering] = useState(false)
  const API = 'http://localhost:4000/api'

  async function handleLogin(e) {
    e.preventDefault()

    if (!email || !password) {
      alert('Preencha todos os campos')
      return
    }

    const res = await fetch(API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      onLogin(data.user)
    } else {
      alert(data.error || 'erro')
    }
  }

  async function handleRegister(e) {
    e.preventDefault()

    if (!name || !email || !password) {
      alert('Preencha todos os campos')
      return
    }

    const res = await fetch(API + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'erro')
    } else {
      alert('Cadastro OK. Faça login.')
      setRegistering(false)
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="card">
      {registering ? (
        <form onSubmit={handleRegister}>
          <h3>Cadastro</h3>

          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          /><br/>

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br/>

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br/>

          <button type="submit">Criar conta</button>
          <button type="button" onClick={() => setRegistering(false)}>
            Voltar
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h3>Login</h3>

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br/>

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br/>

          <button type="submit">Entrar</button>
          <button type="button" onClick={() => setRegistering(true)}>
            Cadastrar
          </button>
        </form>
      )}
    </div>
  )
}
