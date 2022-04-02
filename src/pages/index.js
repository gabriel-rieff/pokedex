import Card from '../components/Card'

import Head from 'next/head'


import styles from '../../styles/Home.module.scss'
import { MdOutlineCatchingPokemon } from 'react-icons/md';


export async function getStaticProps(){

  const maxPokemon = 252;
  const url = `https://pokeapi.co/api/v2/pokemon/` 

  const res = await fetch(`${url}/?limit=${maxPokemon}`)
  const data = await res.json()



  //insert pokemon id

    data.results.forEach((item, index) => {
      item.id = index + 1
    })

    return {
      props: {
        pokemons: data.results 
      }
    }

}

export default function Home({ pokemons }){
  return(
    <>

        <Head>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
            <title>Pokedex</title>
        </Head>

      <div className={styles.titleContainer}>
        <h1>Poke<span>DEX</span></h1>
        <MdOutlineCatchingPokemon size={50} color='#000' />
      </div>
      
      <div className={styles.podemonContainer}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon}/>
          ))}
      </div>
    </>
  )
}