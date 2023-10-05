/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useRef, useEffect } from 'react'
import styles from '../page.module.css'
import Tabela from './tabela'
import Linha from './linha'
import { Player } from '../types/player'
import Mensagem from './mensagem'
import { ThemeProvider } from 'next-themes'


export default function Buscar({ lista, resposta, img_times, player_images}: { lista : Player[], resposta : any, img_times: any, player_images: any} )
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
      <input type="search" name={styles.busca} id={styles.busca} placeholder={`Guess ${tentativa} of 8`} autoComplete="off" value={busca} onChange={(e)=>(setBusca(e.target.value))} disabled={terminado || tentativa > 8 ? true : false}/><br/>

      <ul id={styles.resultados}>
      {busca != '' && playersList.filter((item) =>
          item = item.PName.toLowerCase().includes(busca.toLowerCase())  
      ).map((item)=> (
          <li onClick={() => handleClick(item)} key={item.id}>{item.PName}</li> ) 
      )}
      </ul>
      
      <p className={styles.subtitulo}>Which player averaged these stats during the 22-23 regular season?</p>
      <p onClick={abrir} className={styles.abrirHelp}>How to play</p>

      <Tabela lista={resposta} tentativa={tentativa} terminou={acertou} img_times={img_times}></Tabela>

      <table className={styles.respostas}>
        <tbody>
          {mostrarLinha &&  criarLinha(selectedPlayer)}
          <Linha key={tentativa} lista={listaRespostas} resposta={resposta} tentativa={tentativa - 1} terminou={terminado} img_times={img_times}></Linha>
        </tbody>
      </table>

      <p>{resposta.PName}</p>
      
      
      

      <dialog ref={dialogRef} id={styles.help}>
        
        <h1>How to Play</h1>

        <p>Guess which player averaged the stats highlighted in yellow. You'll have 8 attempts!</p>

        <Tabela lista={resposta} tentativa={tentativa} terminou={terminado} img_times={img_times}></Tabela>

        <p>With every wrong attempt you have, another stat will be revealed.</p>
        <p>You may get other tips if you get anything that matches the answer. They will be highlighted in
          <span style={{color:'#a5fa97'}}>&nbsp;green</span>
        .</p>
        <p className={styles.reminder}>*Player needs to have played at least 100 minutes to qualify</p>
        <button className={styles.button} onClick={fechar}>Got it!</button>
      </dialog>
      
      {terminado && abrirResposta()}
      {(tentativa > 8 && abrirResposta())}
      
        <Mensagem referencia={respostaRef} img_jogadores={player_images} resposta={resposta} tentativa={tentativa}
        acertou={acertou} onClose={() => setTerminado(false)}></Mensagem>
      
      {
      replay && 
        <button className={styles.button} onClick={() => window.location.reload()}>Play again</button>
      }
    </>
    </ThemeProvider>
  )

}