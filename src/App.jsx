import { use } from 'react';
import './App.css'
import { useState, useEffect, useMemo, memo } from 'react'

const Card = memo(({ name, image, position, biography }) => {
  console.log('render del politico:');
  return (
    <div className='card'>
      <img src={image} alt={name} />
      <div className="container">
        <h4><b>nome: {name}</b></h4>
        <p>ruolo: {position}</p>
        <p>biografia: {biography}</p>
      </div>
    </div>
  )
})

function App() {

  //var di stato politici
  const [politicians, setPoliticians] = useState([])

  //var di stato per la parola cercata
  const [serchTerm, setSearchTerm] = useState('')

  //var di stato per posizine selezionata
  const [selectedPos, setSelecetePos] = useState('')

  //useeffect per fare chiamata api al montaggio del componente
  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err)
      )

  }, [])

  const filteredPoliticians = useMemo(() => {
    //normalizzo in minuscolo e tolgo spazi
    const normTerm = serchTerm.toLowerCase()

    //filtro array di partenza
    return (politicians.filter(p => {
      //la posizione e valida
      const isValidPos = selectedPos === "" || selectedPos === p.position
      return (
        (p.name.toLowerCase().includes(normTerm) ||
        p.position.toLowerCase().includes(normTerm)) &&
        isValidPos
      )
    }
    ))
  }, [politicians, serchTerm, selectedPos])

  const allPosition = useMemo(() => {
    const position = [...new Set(politicians.map(p => p.position))]
    return position
  }, [politicians])

  return (<>
    <h1>lista politci</h1>
    <input type="text"
      placeholder='inserisci nome o posizine'
      value={serchTerm}
      onChange={e => setSearchTerm(e.target.value)} />
    <select value={selectedPos} onChange={e => setSelecetePos(e.target.value)}>
      <option >tutte le posizioni</option>
      {allPosition.map((pos, i) => (<option key={i} value={pos}>{pos}</option>))}
    </select>
    <div className='App'>
      {filteredPoliticians.map(p => (
        <Card key={p.id} {...p} />))}
    </div>
  </>)
}

export default App
