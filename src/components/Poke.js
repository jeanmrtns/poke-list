import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Poke.css'

function Poke() {
  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  )
  const [pokemon, setPokemon] = useState([])
  const [prevUrl, setPrevUrl] = useState()
  const [nextUrl, setNextUrl] = useState()

  function nextPage() {
    setCurrentPage(nextUrl)
  }

  function prevPage() {
    setCurrentPage(prevUrl)
  }

  useEffect(() => {
    axios.get(currentPage).then((response) => {
      setPrevUrl(response.data.previous)
      setNextUrl(response.data.next)
      setPokemon(response.data.results)
    })
  }, [currentPage])

  return (
    <div className='Pokemon'>
      <ul>
        {pokemon.map((poke) => {
          const pokeNumber = poke.url.split('/')[6];
          return (
            <li key={poke.name}>
              <h3>{poke.name}</h3>
              {<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`} alt={poke.name} /> }
              <a key={poke.url} href={poke.url}>
                Take a look
              </a>
            </li>
          )
        })}
      </ul>
      <div className='page-btn'>
        {prevUrl ? <button onClick={prevPage}>Previous</button> : null}
        {nextUrl ? <button onClick={nextPage}>Next</button> : null}
      </div>
    </div>
  )
}

export default Poke
