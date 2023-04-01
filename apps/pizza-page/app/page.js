import { Control } from "./controls"
import styles from "./page.module.css"
import { loadRestrictedStripe } from "../../../packages/stripe"

async function click(stripe){
  const sess = await stripe.checkout.sessions.create({
    line_items: [
      {price: 'price_1MrknvCBIaWRaYkmgiC3bryK', quantity: 2},
    ],
    mode: 'payment',
    success_url: "http://localhost:3000"
  })
  return sess.url
}

export default async function Home() {
  const stripe = await loadRestrictedStripe()
  const prices  = await stripe.prices.list({
    expand: ["data.product"]
  })
  // console.log(prices)
  const url = await click(stripe)
  
  return (
    <main className={styles.main}>
      <div className={styles.products}>
        {prices.data.map((price, i) => {
          const product = price.product
          return (
            <div key={i} className={styles.item}>
              <p>{product.name}</p>
              <p>{price.unit_amount/100} kr</p>
              <Control productID={product.id}/>
            </div>
          )
        })}
      </div>
      <a href={url} className={styles.checkout}>Checkout</a>
    </main>
  )
}
