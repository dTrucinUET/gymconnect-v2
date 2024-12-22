# Migration
 use config/config.json and run 

     node migrate.js

You can seed user:

    node seed.js

### Payment API standard:
```
{
    amount: (money need to purchase. Eg: 10000VND => amount: 10000),
    description: (description of purchase. Eg: "Buy coffee"),
    item: [
        {
            name: (name of item. Eg: "Coffee"),
            price: (price of item. Eg: 10000VND),
            quantity: (quantity of item. Eg: 1)
        },
        ...
    ]
} 
```