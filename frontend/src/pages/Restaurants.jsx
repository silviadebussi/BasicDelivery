import React, {useEffect, useState} from 'react'
export default function Restaurants({onOpen}){
  const [list, setList] = useState([])
  useEffect(()=>{ fetch('http://localhost:4000/api/restaurants').then(r=>r.json()).then(setList) }, [])
  return (
    <div>
      <h2>Restaurantes</h2>
      {list.map(r=>(
        <div key={r.id} className="card">
          <h3>{r.name}</h3>
          <p>{r.cuisine}</p>
          <button onClick={()=>onOpen(r)}>Abrir menu</button>
        </div>
      ))}
    </div>
  )
}
