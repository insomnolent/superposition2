// function processImage() {
//         // **********************************************
//         // *** Update or verify the following values. ***
//         // **********************************************
//
//         // Replace the subscriptionKey string value with your valid subscription key.
//         var subscriptionKey = "c0fdfbe6f79e453398402493beeb5b04";
//
//         // Replace or verify the region.
//         //
//         // You must use the same region in your REST API call as you used to obtain your subscription keys.
//         // For example, if you obtained your subscription keys from the westus region, replace
//         // "westcentralus" in the URI below with "westus".
//         //
//         // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
//         // a free trial subscription key, you should not need to change this region.
//         var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
//
//         // Request parameters.
//         var params = {
//             "visualFeatures": "Categories,Description,Color",
//             "details": "",
//             "language": "en",
//         };
//
//         // Display the image.
//         var sourceImageUrl = document.getElementById("inputImage").value;
//         document.querySelector("#sourceImage").src = sourceImageUrl;
//
//         // Perform the REST API call.
//         $.ajax({
//             url: uriBase + "?" + $.param(params),
//
//             // Request headers.
//             beforeSend: function(xhrObj){
//                 xhrObj.setRequestHeader("Content-Type","application/json");
//                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//             },
//
//             type: "POST",
//
//             // Request body.
//             data: '{"url": ' + '"' + sourceImageUrl + '"}',
//         }).done(function(response) {
//             // Show formatted JSON on webpage.
//             $("#responseTextArea").val(JSON.stringify(response, null, 2));
//
//             $.ajax({
//                 url: "https://data.blurriness60.hasura-app.io/v1/query",
//
//                 // Request headers.
//                 beforeSend: function(xhrObj){
//                     xhrObj.setRequestHeader("Content-Type","application/json");
//                     xhrObj.setRequestHeader("Authorization", "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77");
//                 },
//
//                 type: "POST",
//
//                 data: JSON.stringify({
//                     "type":"insert",
//                     "args":{
//                         "table":"Photos",
//                         "objects":[
//                             {"URL": sourceImageUrl, "info": response.description.captions[0].text, "words": "asdf"}
//                         ]
//                     }
//                 })
//
//             }).done(function(response) {
//                 console.log(response)
//
//             }).fail(function(jqXHR, textStatus, errorThrown) {
//
//                 console.log(jqXHR, textStatus, errorThrown)
//             });
//         }).fail(function(jqXHR, textStatus, errorThrown) {
//             // Display error message.
//             var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
//             errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
//             alert(errorString);
//         });
//
//     };
