import { Control } from "./controls"
import styles from "./page.module.css"
import { loadRestrictedStripe } from "../../../packages/stripe"



export default async function Home() {
  const stripe = await loadRestrictedStripe()
  const prices  = await stripe.prices.list({
    expand: ["data.product"]
  })
  // console.log(prices)
  
  return (
    <main className={styles.main}>
      <div className={styles.products}>
        {prices.data.map((price, i) => {
          const product = price.product
          return (
            <>
              <p>{product.name}</p>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{price.unit_amount/100} kr</p>
              <Control productName={product.name} price={price.id}/>
            </>
          )
        })}
      </div>
    </main>
  )
}
