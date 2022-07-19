// create 5 burgers (at least 3 should be beef)
db.burgers.insertMany([ 
    {name: "Bubba Ho Tep", meat: "Beef", cheese: true, toppings: ["Cheddar", "Onion Rings", "BBQ Sauce", "Dill Pickles"]}, 
    {name: "Fire on the Mountain", meat: "Beyond Meat", cheese: false, toppings: ["Fresno Chile", "Spicy Pickled Pomegranate Seeds", "Red Onion Jam"]}, 
    {name: "Smoke From the Sage", meat: "Beyond Meat", cheese: true, toppings: ["Smoked Provolone", "Fried Sage", "Fire-Roasted Piquillo Peppers"]}, 
    {name: "Bilbo Burgins", meat: "Beef", cheese: false, toppings: ["Onion Rings", "Mordor Mayo"]}, 
    {name: "Stuck in the Middle With Jus", meat: "Beef", cheese: true, toppings: ["Swiss", "Beef Au Jus", "Caramelized Onions", "Garlic Aioli"]}
    ])
    
    // find all the burgers
    db.burgers.find()
    // show just the meat of each burger
    db.burgers.find ({}, {meat: 1 })
    
    // show just the toppings of each burger
    db.burgers.find ({}, {toppings: 1})
    // show everything but the cheese
    db.burgers.find({}, {meat:1, toppings:1})
    // find all the burgers with beef
    db.burgers.find({ meat: "Beef" })
    // find all the burgers that are not beef
    db.burgers.find( { meat: { $ne: "Beef" } } )
    // find the first burger with cheese
    db.burgers.findOne({cheese: true})
    // find one and update the first burger with cheese to have a property of 'double cheese'
    db.burgers.updateOne( { cheese: true}, { $set: { cheese: "Double Cheese"}})
    // find the burger you updated to have double cheese
    db.burgers.find ({cheese: "Double Cheese"})
    // find and update all the beef burgers to be 'veggie'
    db.burgers.updateMany({}, {$set: {meat: "Veggie"}})
    // delete one of your veggie burgers
    // WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
    db.burgers.deleteOne( { meat: "Veggie"} )
    // drop the collection
    //Expected Output
    //true
    db.burgers.drop()
    // drop the database
    db.dropDatabase()
    //Expected Output
    // {
    //   "dropped": "burgers",
    //   "ok": 1
    // }
    
    //
    // Bonus
    //recreate your burgers database and your burger collection
    //copy paste your insert burgers from above to reseed your database
    db.burgers.insertMany([ 
        {name: "Bubba Ho Tep", meat: "Beef", cheese: true, toppings: ["Cheddar", "Onion Rings", "BBQ Sauce", "Dill Pickles"]}, 
        {name: "Fire on the Mountain", meat: "Beyond Meat", cheese: false, toppings: ["Fresno Chile", "Spicy Pickled Pomegranate Seeds", "Red Onion Jam"]}, 
        {name: "Smoke From the Sage", meat: "Beyond Meat", cheese: true, toppings: ["Smoked Provolone", "Fried Sage", "Fire-Roasted Piquillo Peppers"]}, 
        {name: "Bilbo Burgins", meat: "Beef", cheese: false, toppings: ["Onion Rings", "Mordor Mayo"]}, 
        {name: "Stuck in the Middle With Jus", meat: "Beef", cheese: true, toppings: ["Swiss", "Beef Au Jus", "Caramelized Onions", "Garlic Aioli"]}
        ])
    // Change the name of the key cheese to 'pumpkinSpice'
    db.burgers.updateMany ({}, { $rename: {cheese: 'pumpkinSpice'} })
    // find all the burgers with ketchup (or another topping you used at least once)
    db.burgers.find( { toppings: "Onion Rings" })
    // find all the burgers with pickles (or a topping you used more than once) and remove the pickles
    db.burgers.deleteMany({ toppings: "Onion Rings" })
    //this was wrong, it deleted the entire Object
    db.burgers.updateMany({toppings: "Onion Rings"}, {$set: {toppings: ""}})
    //also tried this and it turned all toppings to the empty string
    //I added them back in and this works, but really just replaces that spot with an empty string, so stumped on how to completely remove...
    db.burgers.updateMany({toppings:"Onion Rings"}, {$set: { "toppings.$": "" } })
    
    // add a topping of 'eggs' to all the beef burgers
    //note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact
    db.burgers.updateMany({ meat: "Beef"},{ $push: {toppings: "Sunny Side Up Egg"}})
    //Add a price to each burger, start with $5.00 for each burger 
    db.burgers.updateMany({}, {$set: {cost: "$5.00"}})