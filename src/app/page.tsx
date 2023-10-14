"use server"

import styles from './page.module.css'
import Image from 'next/image'
import Busca from './components/busca'
import icone from './favicon.ico'


async function loadData(): Promise<any>
{
  const resposta = await fetch("https://nba-players-api-alpha.vercel.app/players")
  const players = await resposta.json()

  const resp_igm_times = await fetch("https://nba-players-api-alpha.vercel.app/teams")
  const img_times = await resp_igm_times.json()

  const resp_player_imgs = await fetch("https://nba-players-api-alpha.vercel.app/player_images/")
  const player_imgs = await resp_player_imgs.json()

  const data = 
  {
    players: players,
    img_times: img_times,
    player_imgs: player_imgs
  }
  return data 
}
  



export default async function Home() 
{
  const data = await loadData()
  
  async function escolher()
  {
    const n = Math.floor(Math.random() * (468)) + 1
    console.log(n)
    const data = await loadData()
    const escolhido = data.players.find((jogador: any) => jogador.id === n)
    return escolhido
  }

  const escolhido = await escolher()

  return (  
    <>
    <div className='w-full h-full mx-auto '>
      <div className='flex justify-center my-16 w-full mx-auto'>
        <h1 className='text-4xl text-white-100 w-min my-auto font-bold tracking-wide'>Stats.i</h1><Image src={icone} alt='abc' width={55} height={55} className={styles.img}></Image><br />
      </div>
      <Busca lista={data.players} resposta={escolhido} img_times={data.img_times} player_images={data.player_imgs}></Busca>
      
    </div>

    <footer className='mx-auto text-sm font-bold mb-2 mt-3'>Made by: Gabriel Gama - <a href="https://github.com/gama-gabriel" target="_blank" className='underline'>GitHub profile</a>
    </footer>
    </>

  )
}
