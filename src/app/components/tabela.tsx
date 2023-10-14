/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import styles from '../page.module.css'
import classNames from 'classnames'

export default function Tabela({ lista, tentativa, terminou, img_times, dica}: any)
{
    const cell:string = 'border-2 border-purple-900 text-sm py-1'
    const definicao:string = 'bg-purple-700'
    const nome:string = 'w-40'
    const stats:string = 'w-12 sm:w-16'
    const team:string = 'h-16 w-16'

    return(
        <div>
        <table className='min-w-max mb-0 mx-auto'>
        <tbody>
            <tr className='h-10'>
                <th className={classNames(cell, definicao, nome)} >Player name</th>
                <th className={classNames(cell, definicao, stats)}>PTS</th>
                <th className={classNames(cell, definicao, stats)}>FG%</th>
                <th className={classNames(cell, definicao, stats)}>3P%</th>
                <th className={classNames(cell, definicao, stats)}>FT%</th>
                <th className={classNames(cell, definicao, stats)}>REB</th> 
                <th className={classNames(cell, definicao, stats)}>AST</th> 
                <th className={classNames(cell, definicao, stats)}>Pos</th>
                <th className={classNames(cell, definicao, stats)}>Team</th>
                <th className={classNames(cell, definicao, stats)}>Age</th>
                <th className={classNames(cell, definicao, stats)}>BLK</th> 
                <th className={classNames(cell, definicao, stats)}>STL</th> 
            </tr>   
            <tr className='bg-yellow text-purple-900 font-bold text-sm max-h-16 h-16'>
                <td className={classNames(cell, nome)}>{(tentativa > 8 || terminou)? lista.PName:''}</td>
                <td className={classNames(cell, stats)}>{lista.PPG}</td>
                <td className={classNames(cell, stats)}>{lista[`FG%`]}</td> 
                <td className={classNames(cell, stats)}>{lista[`3P%`]}</td>
                <td className={classNames(cell, stats)}>{lista[`FT%`]}</td>
                <td className={classNames(cell, stats)}>{(tentativa >= 2 || terminou)? lista.RPG:''}</td> 
                <td className={classNames(cell, stats)}>{(tentativa >= 3 || terminou)? lista.APG:''}</td>
                <td className={classNames(cell, stats)}>{(tentativa >= 4 || terminou)? lista.POS : ''}</td>
                <td className={classNames(cell, team)}>
                    {(tentativa >= 5 || terminou)&& (
                    <>
                    <img className='w-10 h-10 mx-auto' src={img_times.find((time: any) => time.TName === lista.Team).team_img} alt={lista.Team}/>  {lista.Team}</>)}
                </td>
                <td className={classNames(cell, stats)}>{(tentativa >= 6 || terminou)? lista.Age:''}</td>
                <td className={classNames(cell, stats)}>{(tentativa >= 7 || terminou)? lista.BPG:''}</td>
                <td className={classNames(cell, stats)}>{(tentativa >= 8 || terminou)? lista.SPG:''}</td>  
            </tr>
        </tbody>
    </table>
    </div>
    
    )
}