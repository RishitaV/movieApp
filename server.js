// const API_KEY = "sk_test_51NJbjhSAVwpRHtCct6oU6ieiRrcAxQZiQwA0wpIYtne6rayPxlzgbq4xkEFYtlQB00CLnUuiQPgIFP4RuuzUMOnO00o1QIfbKR";

// premium: price_1NJwuRSAVwpRHtCco7ZZDYm2
// standard: price_1NJwspSAVwpRHtCcEJ24ho44
// basic: price_1NJwqWSAVwpRHtCcJ4cTMZLO

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NJbjhSAVwpRHtCct6oU6ieiRrcAxQZiQwA0wpIYtne6rayPxlzgbq4xkEFYtlQB00CLnUuiQPgIFP4RuuzUMOnO00o1QIfbKR');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    try {
        // line_items: req.body.items.map(({ id, quantity }) => {
        //     const storeItem = storeItems.get(id)
        //     return {
        //       price_data: {
        //         currency: "usd",
        //         product_data: {
        //           name: storeItem.name,
        //         },
        //         unit_amount: storeItem.priceInCents,
        //       },
        //       quantity: quantity,
        //     }
        //   }),

        const item = req.body.item;
        // console.log("item ==> ", item.id);
        let lineItems = [];
        // item.forEach((item) => {
            lineItems.push(
                {
                    price: item.id,
                    quantity: 1,
                }
                )
                // });
                const session = await stripe.checkout.sessions.create({
                    line_items: lineItems,
                    mode: 'subscription',
                    success_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/cancel",
                });
                console.log("items==>", lineItems);
    
        res.send(JSON.stringify({
            url: session.url
        }));
    } catch (error) {
        console.log("error ===> ", error);
    }
});

app.listen(4000, () => console.log("Listening on port 4000"));