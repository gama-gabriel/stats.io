/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useRef, useEffect } from 'react'
import Tabela from './tabela'
import Linha from './linha'
import { Player } from '../types/player'
import Mensagem from './mensagem'
import { ThemeProvider } from 'next-themes'


export default function Conteudo({lista, resposta, img_times,  player_images}: { lista : Player[], resposta : any, img_times: any,  player_images: any})
{
  const [terminado, setTerminado] = useState(false)
  const [replay, setReplay] = useState(false)
  const [acertou, setAcertou] = useState(false)
  const [playersList, setPlayersList] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null)
  const [tentativa, setTentativa] = useState(1)
  const [mostrarLinha, setMostrarLinha] = useState(false)
  const [listaRespostas, setListaRespostas] = useState<any>([])

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const respostaRef = useRef<HTMLDialogElement | null>(null)
  const [isOpen, setIsOpen] = useState<any>(false)
  

  
  if (playersList.length === 0) 
  {
    setPlayersList(lista)
    
  }

  function criarLinha(objeto: object): any
  {
    setListaRespostas([...listaRespostas, objeto])
    setMostrarLinha(false)
  }
  
  const handleClick = (item: any) => 
  {
    setSelectedPlayer(item)
    setTentativa((prevTentativa) => prevTentativa + 1)
    setMostrarLinha(true)
    setBusca("")
    if (item.id == resposta.id)
    {
      setAcertou(true)
      setTerminado(true) 
      setTentativa(tentativa)
      setReplay(true)
    }
    
  }
  function abrir()
  {
    setIsOpen(true)
    dialogRef.current?.showModal()
  }
  
  function fechar()
  {
    dialogRef.current?.close()
  }
  const clicarFora = (e:any) => 
    {
        if (e.target === e.currentTarget) 
        {
          fechar()
        }
    }

  function abrirResposta()
  {
    if (tentativa > 8)
    {
      setTentativa(8)
      setTerminado(true)
      setReplay(true)
    }
    respostaRef.current?.showModal()  
    setTerminado(false)
    
  }
  
  return(
    <ThemeProvider attribute='dark'>  
    <>
      <input 
        type="search" 
        className='teste h-13 w-72 p-3 bg-pink/25 border border-pink outline-none focus:border-2' 
        placeholder={`Guess ${tentativa} of 8`} 
        autoComplete="off" 
        value={busca} 
        onChange={(e)=>(setBusca(e.target.value))} 
        disabled={acertou || tentativa > 8 ? true : false}
      />
      <br/>

      <ul className='flex-col h-52 m-auto w-fit overflow-auto scrollbar'>
      {busca != '' && playersList.filter(
        (item) =>
          item = item.PName.toLowerCase().includes(busca.toLowerCase()))
          .map((filtrado)=> (
            <li 
              onClick={() => handleClick(filtrado)} 
              className='h-min py-1 w-64 border-b-2 border-pink p-auto cursor-pointer hover:bg-pink/25' 
              key={filtrado.id}>{filtrado.PName}
            </li>))
      }
      </ul>
  
      <p className="text-white-100 h-auto text-base sm:w-auto w-80 mx-auto my-5 font-bold">Which player averaged these stats during the 22-23 regular season?</p>

      <p onClick={abrir} className='text-white-100 mx-auto h-5 mb-6 w-fit text-sm font-bold underline cursor-pointer hover:text-base'>How to play</p>

      <div className='block w-[90%] mx-auto overflow-hidden overflow-x-auto'>
        <Tabela 
          lista={resposta} 
          tentativa={tentativa}  
          terminou={acertou} 
          img_times={img_times}>
        </Tabela>

        <table className=' mx-auto mb-8 text-purple-900 text-sm font-bold min-w-max opacity-100'>
          <tbody>
            {mostrarLinha &&  criarLinha(selectedPlayer)}
            <Linha 
              key={tentativa}  
              lista={listaRespostas}
              resposta={resposta}
              tentativa={tentativa - 1}
              terminou={terminado}
              img_times={img_times}>
            </Linha>
          </tbody>
        </table>
      </div>
      
      
      {/*help dialog*/}

      <dialog 
        ref={dialogRef}
        className='w-[90%] sm:w-fit rounded-xl bg-purple-500 py-4 px-4 sm:px-6 md:px-2 lg:px-2 drop-shadow-2xl text-white-100 font-bold animate-fade-in'
        onClick={clicarFora}
      >

        <div className='p-0'>
          <h1 className='text-2xl sm:text-3xl text-white-100 p-2'>How to Play</h1>
          <p className='text-sm sm:text-base pt-4 pb-6 w-[90%] mx-auto'>Guess which player averaged the stats highlighted in yellow. You'll have 8 attempts!</p>
          <div className='block w-[100%] mx-auto overflow-hidden overflow-x-auto scale-90'>
          <Tabela lista={resposta} tentativa={tentativa} terminou={terminado} img_times={img_times}></Tabela>
          </div>
          <p className='text-sm sm:text-base pt-6 w-[90%] mx-auto'>With every wrong attempt you have, another stat will be revealed.</p>
          <p className='text-sm sm:text-base p-3 w-[90%] mx-auto'>You may get other tips if you get anything that matches the answer. They will be highlighted in
            <span style={{color:'#a5fa97'}}>&nbsp;green</span>
          .</p>
          <p className="text-[9px] sm:text-xs p-2">*Player needs to have played at least 100 minutes to qualify</p>
          <button className='border-2 border-pink px-4 py-3 bg-pink/20 text-white-100 font-bold outline-none mt-4 rounded-md hover:bg-pink/30 active:bg-pink/60' onClick={fechar}>Got it!</button>
        </div>
      </dialog>
      
      {terminado && abrirResposta()}
      {(tentativa > 8 && abrirResposta())}
      
        <Mensagem 
          referencia={respostaRef} 
          img_jogadores={player_images} 
          resposta={resposta} 
          tentativa={tentativa}
          acertou={acertou} 
          onClose={() => setTerminado(false)}>
        </Mensagem>

      {
      replay && 
        <button className='border-2 border-pink px-4 py-2 bg-pink/20 text-white-100 font-bold outline-none mt-4 mb-2 rounded-md hover:bg-pink/30 active:bg-pink/60' onClick={() => window.location.reload()}>Play again</button>
      }
      {
      replay &&
        <p className='text-sm cursor-pointer font-bold underline' onClick={abrirResposta}>Show answer</p>
      }
    </>
    </ThemeProvider>
  )

}

