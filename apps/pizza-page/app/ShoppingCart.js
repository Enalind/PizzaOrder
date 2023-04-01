"use client";
import styles from "./navbar.module.css"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";
import { loadRestrictedStripe } from "../../../packages/stripe";
import TimeKeeper from "react-timekeeper";
async function checkout(keys, router, time){
    const stripe = await loadRestrictedStripe()
    var filteredKeys = keys.filter(key => localStorage.getItem(key) !== "0")
    const prices = filteredKeys.map(key => {
        return {price: key.split(" ")[0], quantity: localStorage.getItem(key)}
    })
    console.log(prices)
    const session = await stripe.checkout.sessions.create({
      line_items: prices,
      mode: 'payment',
      payment_method_types: [
        "card",
        "klarna"
      ],
      success_url: "http://localhost:3000",
      metadata: {
        "time": time
      }
    })
    console.log(session)
    router.push(session.url)
}
export function ShoppingCart(){
    const router = useRouter()
    const [keys, setKeys] = useState([])
    const [cart, setCart] = useState(false)
    const [time, setTime] = useState("10:00")
    useEffect(() => {
        window.addEventListener("storage",() => {
            let testKeys = []
            for(let i = 0; i < localStorage.length; i++){
                if(localStorage.key(i).startsWith("price")){
                    testKeys.push(localStorage.key(i))
                }
            }
            setKeys(testKeys)
        })
        let testKeys = []
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.key(i).startsWith("price")){
                testKeys.push(localStorage.key(i))
            }
        }
        setKeys(testKeys)
        const bo = document.getElementsByClassName(styles.cartItem)
        console.log(bo.length)
    }, [])

    if(cart){
        return <div className={styles.cart}>
            <h1 onClick={() => setCart(!cart)} className={styles.cartSymbol}>Cart</h1>
            <div className={styles.cartItems}>
                {keys.map((key, i) => {
                    let val = localStorage.getItem(key)
                    if(val !== "0"){
                        return <div key={i} className={styles.cartItem}>
                            <p>{key.split(" ")[1]} {val}</p>
                        </div>
                    }
                    
                })}
                <TimeKeeper time={time} onChange={(data) => setTime(data.formatted24)}/>
                {<h1 onClick={() => checkout(keys, router, time)}>Checkout</h1>}
                
            </div>
        </div>
    }
    return<div className={styles.cart}>
        <h1 onClick={() => setCart(!cart)}>Cart</h1>
    </div>

    
    
}