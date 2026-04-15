import './App.css'
import { useState, useEffect, useMemo, memo } from 'react'

const Card = memo(({ name, image, position, biography }) => {
  console.log('render del politico:', name);

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
      return (
        p.name.toLowerCase().includes(normTerm) ||
        p.position.toLowerCase().includes(normTerm)

      )
    }
    ))
  }, [politicians, serchTerm])

  return (<>
    <h1>lista politci</h1>
    <input type="text"
      placeholder='inserisci nome o posizine'
      value={serchTerm}
      onChange={e => setSearchTerm(e.target.value)} />
    <div className='App'>
      {filteredPoliticians.map(p => (
        <Card key={p.id} {...p} />))}
    </div>
  </>)
}

export default App
