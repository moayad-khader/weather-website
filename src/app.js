const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const Routes = require("../config/constants");
//define paths for express
const public_directory = path.join(__dirname, Routes.public);
const views_directory = path.join(__dirname, Routes.views);
const partials_directory = path.join(__dirname, Routes.partials);

//set up handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_directory);
hbs.registerPartials(partials_directory);

//set up static directory to serve
app.use(express.static(public_directory));

app.get(Routes.base, (req, res) => {
    res.render("index", {
        'title': 'Weather APP',
        'name': 'Moayad Khader'
    })
});

app.get(Routes.about, (req, res) => {
    res.render("about", {
        'title': "About",
        "picture": "/img/me.jpg",
        "name": "Moayad Khader"
    });
});

app.get(Routes.help, (req, res) => {
    res.render("help", {
        "title": "Help page",
        "message": "do you face any problem?",
        "name": "Moayad Khader"
    });
});

app.get(Routes.weather, (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "you must provide an address"
        })
    }

    geocode(req.query.address, (geocode_error, { latitude, longitude, location } = {}) => {
        if (geocode_error) {
            return res.send({
                "error": geocode_error
            });
        }

        forecast(latitude, longitude, (forecast_error, forecast_data) => {
            if (forecast_error) {
                return res, send({
                    "error": forecast_error
                });
            }
            res.send({
                location: location,
                forecast: forecast_data,
                address: req.query.address
            });

        })
    });

});

app.get(Routes.help, (req, res) => {
    res.render('404_handler', {
        'title': 'Error',
        'name': 'Moayad Khader',
        'error_message': 'help article not found'
    })
})

app.get("*", (req, res) => {
    res.render('404_handler', {
        'title': 'Error',
        'name': 'Moayad Khader',
        'error_message': 'page not found'
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});