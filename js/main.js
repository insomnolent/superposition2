function getDescription(url) {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "c0fdfbe6f79e453398402493beeb5b04";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

        // Request parameters.
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        // Display the image.
        document.querySelector("#sourceImage").src = url;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {
            var label = data.description.captions[0].text;
            // Show formatted JSON on webpage.

            $("#descriptionTextArea").val(label);

            //var dataS = JSON.stringify(data);

            var msg = new SpeechSynthesisUtterance(label);
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Image Description"));
            window.speechSynthesis.speak(msg);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    };

function getImageText(url) {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "278c61cde8b44c39888b508b6ac0f5f7";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

        // Request parameters.
        var params = {
            "language": "unk",
            "detectOrientation ": "true",
        };

        // Display the image.
        document.querySelector("#sourceImage").src = url;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {

            var wordArr = [];
            data.regions.forEach(regionObj => {
                regionObj.lines.forEach(lineObj => {
                    lineObj.words.forEach(wordObj => {
                        console.log(wordObj.text)
                            wordArr.push(wordObj.text)
                    })
                })
            })

            var text = wordArr.join(' ');

            // Show formatted JSON on webpage.

            $("#textTextArea").val(text);

            //var dataS = JSON.stringify(data);
            if (text.length() > 0) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("Here are the words in this image."));
                var msg = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(msg);
            } else {
                var msg = new SpeechSynthesisUtterance("There are no words in this image.");
                window.speechSynthesis.speak(msg);
            }
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    function processImage(url) {
        getDescription(url);
        getImageText(url);
    }
