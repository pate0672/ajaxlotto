document.addEventListener("DOMContentLoaded", init);


function init() {
    document.getElementById("btnSend").addEventListener("click", gettingData);
    document.getElementById("btnBack").addEventListener("click", gettingHomepage);
}


function gettingData() {

    let data = document.querySelector("#digits").value;
    let high = document.querySelector("#max").value;

    let custSet = {
        mode: "cors",
        method: "POST"

    };

    let link = "https://davidst.edumedia.ca/mad9014/nums.php?digits=" + data + "&max=" + high;
    let rqst = new Request(link, custSet);
    let errMsg = document.querySelector("#errorMessage");

    fetch(rqst)
        .then(function (result) {
            errMsg.innerHTML = "";
            errMsg.style.display = "none";
            return result.json();
        })
        .then(function (result) {
            let ul = document.querySelector(".num_list");
            ul.innerHTML = "";

            if (result.code == "0") {

                for (let content in result.numbers) {
                    let li = document.createElement("li");
                    li.innerHTML = result.numbers[content];
                    ul.appendChild(li);
                }

                pageShift(1);
            } else if (result.code == "534" || result.code == "522") {
                errMsg.style.display = "block";
                errMsg.innerHTML = "Provide appropriate range";
                pageShift(1);
            }

        })
        .catch(function (catching) {
            console.log("Error " + catching.message);
        });
}

function gettingHomepage() {
    pageShift(0);
    document.getElementById("digits").value = "";
    document.getElementById("max").value = "";
}

function pageShift(pg) {
    let slide = document.querySelectorAll(".page");
    for (let i = 0; i < slide.length; i++) {
        if (pg == i) {
            slide[i].classList.add("active");
        } else {
            slide[i].classList.remove("active");
        }
    }
}
