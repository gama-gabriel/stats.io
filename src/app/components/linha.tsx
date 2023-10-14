import styles from '../page.module.css'
import classNames from 'classnames'

export default function Linha({lista, resposta, tentativa, img_times, terminou}: any)
{
    
    const cell:string = 'border-b-2 border-x-2 border-purple-900 text-sm py-1'
    
    const nome:string = 'w-40'
    const stats:string = 'w-12 sm:w-16'
    const team:string = ' h-16 w-16'
    const certo:string = 'bg-green'
    const normal:string = 'bg-white-300'    
    
    return(
    <>
    {
        lista.map((jogador: any, index: number) =>
        (


        <tr key={index} className={classNames(index == (tentativa - 1) ? 'animate-fade-in' : '')}>
            <td 
                className={classNames(cell, nome, resposta.PName === jogador.PName? certo : normal)}>{jogador.PName}</td>
            <td 
                className={classNames(cell, stats, resposta.PPG === jogador.PPG? certo : normal)}>{jogador.PPG}
            </td>
            <td 
                className={classNames(cell, stats, resposta["FG%"] === jogador["FG%"]? certo : normal)}>{jogador["FG%"]}
            </td>
            <td 
                className={classNames(cell, stats, resposta["3P%"] === jogador["3P%"]? certo : normal)}>{jogador["3P%"]}
            </td>
            <td 
                className={classNames(cell, stats, resposta["FT%"] === jogador["FT%"]? certo : normal)}>{jogador["FT%"]}
            </td>
            <td 
                className={classNames(cell, stats, resposta.RPG === jogador.RPG? certo : normal)}>{jogador.RPG}
            </td>
            <td 
                className={classNames(cell, stats, resposta.APG === jogador.APG? certo : normal)}>{jogador.APG}
            </td>
            <td 
                className={classNames(cell, stats, resposta.POS === jogador.POS? certo : normal)}>{jogador.POS
            }</td>
            <td 
                className={classNames(cell, team, resposta.Team === jogador.Team? certo : normal)}>
                <img className='w-10 h-10 mx-auto' src={img_times.find((item: any) => item.TName == jogador.Team).team_img} alt={jogador.Team}/>
                {jogador.Team}
            </td>
            <td 
                className={classNames(cell, stats, resposta.Age === jogador.Age? certo : normal)}>{jogador.Age}</td>
            <td 
                className={classNames(cell, stats, resposta.BPG === jogador.BPG? certo : normal)}>{jogador.BPG}
            </td>
            <td 
                className={classNames(cell, stats, resposta.SPG === jogador.SPG? certo : normal)}>{jogador.SPG}
            </td>
        </tr>))
    }
    </>
    )
}