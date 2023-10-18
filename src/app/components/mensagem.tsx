/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import styles from '../page.module.css'

export default function Mensagem( { referencia, tentativa, img_jogadores, resposta, acertou, terminou }: any) 
{
    function fechar()
    {
        referencia.current?.close()
    }
    const clicarFora = (e:any) => 
    {
        if (e.target === e.currentTarget) 
        {
          fechar()
        }
    }


    return (
    <>
        <dialog ref={referencia} className='w-96 py-3 px-0 bg-purple-500 drop-shadow-2xl rounded-xl outline-none' onClick={clicarFora}>
        <div className='p-0'>
            <div className='grid grid-cols-3 w-full h-fit'>
                <div></div>
            
                {acertou &&
                <svg 
                className={styles.checkmark}
                viewBox="0 0 52 52" width={56} height={56}>
                    <circle 
                    className={styles.checkmark__circle} 
                    cx="26" cy="26" r="25" fill="none"/>
                    <path 
                    className={styles.checkmark__check}
                    fill="none" 
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                }
                {!acertou &&
                <svg 
                className={styles.checkmark_w}
                viewBox="0 0 52 52">
                    <circle className={styles.checkmark__circle_wrong} cx="26" cy="26" r="25" fill="#FFA5A5"/>
                        <line className={styles.checkmark__check} x1="17" y1="35" x2="35" y2="17" stroke="#40128B" strokeWidth="1.5"/>
                        <line className={styles.checkmark__check} x1="35" y1="35" x2="17" y2="17" stroke="#40128B" strokeWidth="1.5"/>

                </svg>
                }
                <div className="hover:cursor-pointer ml-auto me-4 mt-2 w-fit h-fit group scale-75 md:scale-100 col-2" onClick={fechar}>
                    <div className=" h-1 w-7 absolute mt-4 ml-3 md:bg-white-100 bg-red rounded-md transform rotate-45 transition-transform duration-300 ease-in group-hover:rotate-[-45deg] group-hover:bg-red">
                    </div>
                    <div className=" h-1 w-7 absolute mt-4 ml-3 md:bg-white-100 bg-red rounded-md transform -rotate-45 transition-transform duration-300 ease-in group-hover:rotate-[45deg] group-hover:bg-red"></div>
                    
                    <div className="pt-5 text-white-100 text-xs uppercase transition-opacity opacity-100 md:opacity-0  mx-auto mt-3 px-1 text-center group-hover:opacity-100">Close</div>
                </div>

            </div>
            {acertou &&
            <p className='text-green w-[90%] text-base font-bold mx-auto pt-3'
            >Congratulations! You guessed the right player in {tentativa} attempt(s)</p>
            }

            {!acertou &&
            <p className='text-red w-[90%] text-base font-bold mx-auto pt-3'
            >Almost! You'll get it next time!</p>
            }

            <img 
                className='w-80 mx-auto py-3 px-3' 
                src={img_jogadores.find((jogador: any) => jogador.id == resposta.id).img_url} 
                alt={"Player Image"}>
            </img>

            <p className='text-white-100 w-[90%] text-base font-bold mx-auto pt-1'
            >Answer: {resposta.PName}</p>
            
            <button className='border-2 border-pink px-4 py-2 bg-pink/20 text-white-100 font-bold outline-none mt-4 mb-2 rounded-md hover:bg-pink/30 active:bg-pink/60' onClick={() => window.location.reload()}
            >Play again</button>
        </div>
        </dialog>
        </>
        
  )
}
