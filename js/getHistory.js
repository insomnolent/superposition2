var fetchAction =  require('fetch');

var url = "https://data.blurriness60.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77"
    }
};

var body = {
    "type": "select",
    "args": {
        "table": {
            "schema": "hf_catalog",
            "name": "hf_file"
        },
        "columns": [
            "*"
        ]
    }
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});