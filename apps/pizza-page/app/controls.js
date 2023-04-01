"use client"
import styles from "./page.module.css"
import { useLocalStorage } from "./useLocalStorage"
export function Control(props){
    const [count, setCount] = useLocalStorage(props.price + " " + props.productName, 0)
    if(count !== 0){
        return(
            <div className={styles.controls}>
                <p onClick={() => setCount(count + 1)}>+</p>
                <p>{count}</p>
                <p onClick={() => setCount(count - 1)}>-</p>
            </div>
        )
    }
    return(<div>
        <h3 onClick={() => setCount(1)}>BUY</h3>
    </div>)
    
}