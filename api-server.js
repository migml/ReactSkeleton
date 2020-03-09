var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),

    assign = require('lodash/assign'),
    find = require('lodash/find'),
    findIndex = require('lodash/findIndex'),

    app = express(),
    router = express.Router(),

    // Using a JSON file as our "database"
    carS_FILE = path.join(__dirname, 'data/cars.json'),

    port = process.env.PORT || 9090;

function getcars(callback) {
    fs.readFile(carS_FILE, function(err, fileContents) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        callback(JSON.parse(fileContents));
    });
}

function savecars(cars, callback) {
    fs.writeFile(carS_FILE, JSON.stringify(cars, null, 4), function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        callback();
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// allow for cross-origin API requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

// routes that end in /cars
router.route('/cars')

    // create an car (accessed via POST to http://localhost:9090/cars)
    .post(function(req, res) {
        getcars(function(cars) {
            var newcar = assign({
                    id: Date.now(),
                    date: new Date() + '',
                    read: true
                }, req.body),
                newcars = cars.concat(newcar);

            // write out file back to disk
            savecars(newcars, function() {
                res.json({success: true});
            });
        });
    })

    // get all the cars (access via GET from http://localhost:9090/cars)
    .get(function(req, res) {
        getcars(function(cars) {
            // Return back the full list of cars
            res.setHeader('Cache-Control', 'no-cache');
            const result = {'Data':cars
                .filter(function(car) { return !car.deleted; })
                .sort(function(carA, carB) { return new Date(carB.date) - new Date(carA.date); })};
            res.json(
                result
            );
        });
    });

router.route('/images/image.jpg')
    .get(function(req, res) {
        var img = fs.readFileSync('./data/volvo-polestar.jpg');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    });

// routes that end in cars/:carId
router.route('/cars/:carId')

    // get the car with this id (accessed via GET from http://localhost:9090/cars/:carId)
    .get(function(req, res) {
        getcars(function(cars) {
            var carIdToGet = +req.params.carId,
                carToGet = find(cars, function(car) {
                    return car.id === carIdToGet;
                });

            res.json(carToGet);
        });
    })

    // update the car this id (accessed via PUT on http://localhost:9090/cars/:carId)
    .put(function(req, res) {
        getcars(function(cars) {
            var carIdToUpdate = +req.params.carId,

                // make a new copy of the cars list, updating the appropriate car
                updatedcars = cars.map(function(car) {
                    if (car.id === carIdToUpdate) {
                        // make a copy of the car to update before updating
                        return assign({}, car, {
                            read: !!req.body.read
                        });
                    }

                    return car;
                });

            savecars(updatedcars, function() {
                res.json({success: true});
            });
        });
    })

    // delete the car this id (accessed via PUT on http://localhost:9090/cars/:carId)
    .delete(function(req, res) {
        getcars(function(cars) {
            var carIdToDelete = +req.params.carId,

                // make a new copy of the cars list, marking the appropriate car as deleted
                updatedcars = cars.map(function(car) {
                    if (car.id === carIdToDelete) {
                        // make a copy of the car to update before updating
                        return assign({}, car, {
                            deleted: true
                        });
                    }

                    return car;
                });

            savecars(updatedcars, function() {
                res.json({success: true});
            });
        });
    });

// Register the routes
app.use('/', router);

app.get('/ping', function(req, res) {
    res.json({success: true});
});

app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
});