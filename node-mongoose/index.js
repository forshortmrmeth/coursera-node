'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then(db => {
    Dishes
        .create({
            name: 'Pepperoni',
            description: 'Classic pizza'
        })
        .then(dish => {
            return Dishes
                .findByIdAndUpdate(
                    dish._id,
                    { $set: { description: 'Updated Test' } },
                    { 'new': true }
                )
                .exec()
        })
        .then(dish => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'Hello, world!',
                author: 'Vl. Kolesnikov'
            });

            return dish.save()
        })
        .then(dish => {
            console.log(dish);
            return db.collection('dishes').drop()
        })
        .then(_ => db.close())
        .catch(err => console.error(err))

});