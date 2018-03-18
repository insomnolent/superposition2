// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
$.ajax({
    url: "https://data.blurriness60.hasura-app.io/v1/query",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77"
    },
    data: JSON.stringify({
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
    }),
    type: "POST",
    dataType: "json"
}).done(function(json) {
  console.log("JSON IS", json);
    // Handle Response
    if (json.length == 0) {
        $("#no-hist").attr('style','visibility: visible');
        $("#picture1").attr('style','visibility: hidden');
    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-4].file_id;
        document.querySelector("#picture1").src=url;
    }
    // var counter = 0;
    if (json.length < 2) {
        $("#picture2").attr('style','visibility: hidden');
    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-3].file_id;
        document.querySelector("#picture2").src=url;
    }
    if (json.length < 3) {
        $("#picture3").attr('style','visibility: hidden');
    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-2].file_id;
        document.querySelector("#picture3").src=url;
    }
    if (json.length < 4) {
        $("#picture4").attr('style','visibility: hidden');
    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-1].file_id;
        document.querySelector("#picture4").src=url;
    }


}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});
