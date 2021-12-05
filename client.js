function submit() {
    const url = document.getElementById('url');
    const loader = document.getElementById('loader');
    if (!url.value) {
        alert('Please enter an url.');
        return;
    }

    //Ajax Started
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const urls = JSON.parse(this.responseText);
            //console.log(urls);
            saveUrl(urls);
        }
    };
    const formData = new FormData();
    formData.append('url', url.value);
    xhttp.open("POST", "server.php", true);
    xhttp.send(formData);
    //Ajax Ended
}

async function saveUrl(urls) {
    const loader = document.getElementById('loader');
    const current = document.getElementById('current');
    const next = document.getElementById('next');
    let timeout = 300;
    urls.forEach((url, index) => {
        setTimeout(() => {
            // loader.innerText = `${index}/${urls.length}`
            var width = 0;
            var id = setInterval(frame, 5);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    loader.style.width = width + "%";
                    loader.innerHTML = width  + "%";
                }
            }
            if (index < urls.length) {
                current.innerText = `Current: ${url.loc}`;
            }
            if (index + 1 < urls.length) {
                next.innerText = `Next: ${urls[index+1].loc}`;
            }
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (index == urls.length - 1) {
                        loader.innerText = `${index+1}/${urls.length}`
                        current.innerText = '';
                    }
                    if (index == urls.length - 2) {
                        next.innerText = '';
                    }
                }
            };

            xhttp.open("GET", `server.php?url=${url.loc}`, true);
            xhttp.send();
        }, timeout)
        timeout += 300;
    });
}
//kgiuhim