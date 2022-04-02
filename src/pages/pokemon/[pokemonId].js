

import Image from 'next/image'
import styles from './styles.module.scss'


export const getStaticPaths = async () => {
    const maxPokemons = 252
    const api = `https://pokeapi.co/api/v2/pokemon/`
  
    const res = await fetch(`${api}/?limit=${maxPokemons}`)
  
    const data = await res.json()
  
    const paths = data.results.map((pokemon, index) => {
      return {
        params: { pokemonId: index.toString() },
      }
    })
  
    return {
      paths,
      fallback: false,
    }
  }
  
  export const getStaticProps = async (context) => {
    const id = context.params.pokemonId.toString()
  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  
    const data = await res.json()
  
    return {
      props: { pokemon: data },
    }
  }

export default function Details ({ pokemon }){
    return(
        <div className={styles.container}>
                <h1> {pokemon.name}</h1>
                <Image src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
                width='200'
                height='200'
                alt={pokemon.name}
                />

                <div>
                    <h3>Número:</h3>
                    <p>#{pokemon.id}</p>
                </div>

                <div>
                    <h3>Tipo:</h3>
                    <p className={styles.types}>{pokemon.types.map((item, index) => (
                        <span key={index}  className={`${styles.type}  ${styles['type_' + item.type.name]}`} >
                        {item.type.name}</span>
                    ))}</p>
                </div>

                <div className={styles.contentContainer} >
                    <div className={styles.height}>
                        <h3>Altura</h3>
                        <p>{pokemon.height * 10}cm</p>
                    </div>

                    <div className={styles.weight}>
                        <h3>Peso</h3>
                        <p>{pokemon.weight / 10} kg</p>
                    </div>
                </div>
        </div>
    )
}