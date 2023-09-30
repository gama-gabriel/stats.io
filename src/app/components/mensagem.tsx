/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import styles from '../page.module.css'


export default function Mensagem( { referencia, tentativa, img_jogadores, resposta, acertou, terminou }: any) 
{
    function replay()
    {
        window.location.reload()  
    }
    
    function fecharResp()
    {
        referencia.current?.close()  
    }
    
    return (
    
    <>
        <dialog ref={referencia}  id={styles.terminou}>
            <div className={styles.fecContainer} onClick={() => referencia.current?.close()}>
                <div className={styles.close_container}>
                    <div className={styles.leftright}></div>
                    <div className={styles.rightleft}></div>
                </div>
                <p className={styles.close} id={styles.close}>close</p>
            </div>
            {acertou &&
            <svg 
            className={styles.checkmark}
            viewBox="0 0 52 52">
                <circle 
                className={styles.checkmark__circle} 
                cx="26" cy="26" r="25" fill="none"/>
                <path 
                className={styles.checkmark__check}
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            }
            {acertou &&
            <p className={styles.right}>Congratulations! You guessed the right player in {tentativa} attempt(s)</p>
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
            {!acertou &&
            <p className={styles.wrong}>Almost! You'll get it next time!</p>
            }

            <img src={img_jogadores.find((jogador: any) => jogador.id == resposta.id).img_url} alt={"Player Image"}></img>
            <p>Answer: {resposta.PName}</p>
            <button className={styles.button} onClick={() => window.location.reload()}>Play again</button>

        </dialog>
        </>
        
  )
}
