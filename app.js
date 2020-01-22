let inputRub = document.getElementById("rur"),
    inputUsd = document.getElementById("usd");

// inputRub.addEventListener("input", () => {
//     let request = new XMLHttpRequest();

//     // request.open(method, url, async, login, password);

//     request.open("GET", "./current.json");
//     request.setRequestHeader("Content-type", "application/json; charset=utf-8");
//     request.send();

//     // status
//     // statusText
//     //responseText / response
//     //readyState
//     request.addEventListener("readystatechange", function() {
//         if (request.readyState == 4 && request.status == 200) {
//             let data = JSON.parse(request.response);

//             inputUsd.value = inputRub.value / data.usd;
//         } else {
//             inputUsd.value = "something went wrong!";
//         }
//     });
// });

inputRub.addEventListener("input", () => {
    let promise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "./current.json");
        request.setRequestHeader(
            "Content-type",
            "application/json; charset=utf-8"
        );
        request.send();

        request.onload = function() {
            if (request.readyState === 4 && request.status == 200) {
                let data = JSON.parse(request.response);
                resolve(data);
            } else {
                reject();
            }
        };
    });

    promise
        .then(data => {
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(() => {
            inputUsd.value = "something went wrong!";
        });
});
