"use client";
import styles from "./navbar.module.css"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";
import { loadRestrictedStripe } from "../../../packages/stripe";
async function checkout(keys, router){
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
      success_url: "http://localhost:3000"
    })
    router.push(session.url)
}
export function ShoppingCart(){
    const router = useRouter()
    const [keys, setKeys] = useState([])
    const [cart, setCart] = useState(false)
    

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
                <h1 onClick={() => checkout(keys, router)}>Checkout</h1>
            </div>
        </div>
    }
    return<div className={styles.cart}>
        <h1 onClick={() => setCart(!cart)}>Cart</h1>
    </div>

    
    
}