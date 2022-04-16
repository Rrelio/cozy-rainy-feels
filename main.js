const NBR_OF_BARS = 40;
const audio = document.querySelector("audio");
const ctx = new AudioContext();
const audioSource = ctx.createMediaElementSource(audio);
const analayzer = ctx.createAnalyser();
audioSource.connect(analayzer);
audioSource.connect(ctx.destination);
const frequencyData = new Uint8Array(analayzer.frequencyBinCount);
analayzer.getByteFrequencyData(frequencyData);
console.log("frequencyData", frequencyData);
const visualizerContainer = document.querySelector(".visualizer-container");
for (let i = 0; i < NBR_OF_BARS; i++) {
    const bar = document.createElement("DIV");
    bar.setAttribute("id", "bar" + i);
    bar.setAttribute("class", "visualizer-container__bar");
    visualizerContainer.appendChild(bar);

}

function renderFrame() {
    analayzer.getByteFrequencyData(frequencyData);
    for (let i = 0; i < NBR_OF_BARS; i++) {
        const index = (i + 10) * 2;
        const fd = frequencyData[index];
        const bar = document.querySelector("#bar" + i);
        if (!bar) {
            continue;
        }
        const barHeight = Math.max(4, fd || 0);
        bar.style.height = barHeight / 4 + "px";

    }
    window.requestAnimationFrame(renderFrame);

}


function convertMonth(index) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    return months[index];
}
function convertDay(index) {
    let months = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return months[index];
}

console

fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.9542348&lon=120.9008733&appid=6feef5df4f51d8368c298ead1971324a&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        $(".weather-icon>img").prop("src", `http://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`)
        $(".weather-temperature").text(`${Math.round(data["main"]["temp"])}°`)
        $(".weather-desc").text(`${data["weather"][0]["main"]}`)
        $(".weather-feels").text(`Feels like ${Math.round(data["main"]["feels_like"])}°`)

        renderFrame();
        audio.volume = 0.10;
        audio.play();

        let date = new Date;
        let hours;
        if(String(date.getHours()).length==1){
            hours = `0${date.getHours()}`
        }else{
            hours = `${date.getHours()}`
        }
        let minutes;
        if(String(date.getMinutes()).length==1){
            minutes = `0${date.getMinutes()}`
        }else{
            minutes = `${date.getMinutes()}`
        }
        $(".day>div").text(`${convertDay(date.getDay()-1)}`.toUpperCase())
        $(".date>div").text(`${date.getDate()} ${convertMonth(date.getMonth())}, ${date.getFullYear()}`);
        $(".time>div").text(`— ${hours}:${minutes} —`)

    });