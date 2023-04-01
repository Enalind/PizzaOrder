"use client";

import { useState } from "react";
import {loadStripe} from "../../../packages/stripe"


export default function Home() {
  const [prod, setProd] = useState({name: "", description: "", price: 0, succcsecc: false})
  async function click(){
    console.log(await fetch("/api/route"))
    const stripe = await loadStripe()
    const product = await stripe.products.create({
      name: prod.name,
      description: prod.description,
    })
    const price = await stripe.prices.create({
      unit_amount_decimal: prod.price*100,
      currency: "sek",
      product: product.id
    })
    if(product !== null){
      setProd({succcsecc: true})
    }
    console.log(prod)
    
  }
  return (
    <main>
      <div>
        <h1>Name</h1>
        <input onChange={(e) => {setProd({name: e.currentTarget.value, description: prod.description, price: prod.price})}}/>
        <h1>Description</h1>
        <input onChange={(e) => {setProd({name: prod.name, description: e.currentTarget.value, price: prod.price})}}/>
        <h1>Price</h1>
        <input type="number" onChange={(e) => {setProd({name: prod.name, description: prod.description, price: e.currentTarget.value})}}/>
      </div>
      <h1 onClick={() => click()}>Add prod {prod.succcsecc ? "done": ""}</h1>

    </main>
  )
}
