document.addEventListener("DOMContentLoaded", function () {
    let stopwatch = document.getElementById("stopwatch");
    let timer = document.getElementById("timer");

    let stopwatchDisplay = document.getElementById("stopwatchDisplay");
    let timerDisplay = document.getElementById("timerDisplay");
    let timerInput = document.getElementById("timerInput");

    let startStopwatch = document.getElementById("startStopwatch");
    let resetStopwatch = document.getElementById("resetStopwatch");
    let startTimer = document.getElementById("startTimer");
    let resetTimer = document.getElementById("resetTimer");

    let toggleStopwatch = document.getElementById("toggleStopwatch");
    let toggleTimer = document.getElementById("toggleTimer");

    let stopwatchInterval;
    let timerInterval;
    let stopwatchTime = 0;

    function startStopwatchTimer() {
        stopwatch.style.display = "block";
        timer.style.display = "none";

        clearInterval(timerInterval);
        timerInput.value = "";
        timerTime = 0;

        if (stopwatchInterval) {
            clearInterval(stopwatchInterval);
            startStopwatch.innerHTML = "Start";
            startStopwatch.classList.remove("running");
        } else {
            let startTime = Date.now() - (stopwatchTime || 0);
            stopwatchInterval = setInterval(function () {
                const elapsedTime = Date.now() - startTime;
                const hours = Math.floor(elapsedTime / 3600000);
                const minutes = Math.floor((elapsedTime % 3600000) / 60000);
                const seconds = Math.floor((elapsedTime % 60000) / 1000);
                stopwatchDisplay.innerHTML = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }, 1000);

            startStopwatch.innerHTML = "Stop";
            startStopwatch.classList.add("running");
        }
    }

    function startTimerTimer() {
        timer.style.display = "block";
        stopwatch.style.display = "none";

        clearInterval(stopwatchInterval);

        if (timerInterval) {
            clearInterval(timerInterval);
            startTimer.innerHTML = "Start";
            startTimer.classList.remove("running");
        } else {
            const timeParts = timerInput.value.split(":");
            const hours = parseInt(timeParts[0]) || 0;
            const minutes = parseInt(timeParts[1]) || 0;
            const seconds = parseInt(timeParts[2]) || 0;
            timerTime = hours * 3600 + minutes * 60 + seconds;

            if (timerTime <= 0) return;

            timerInterval = setInterval(function () {
                timerTime--;
                if (timerTime <= 0) {
                    clearInterval(timerInterval);
                    startTimer.innerHTML = "Start";
                    startTimer.classList.remove("running");
                    timerTime = 0;
                }
                const hours = Math.floor(timerTime / 3600);
                const minutes = Math.floor((timerTime % 3600) / 60);
                const seconds = timerTime % 60;
                timerDisplay.innerHTML = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }, 1000);

            startTimer.innerHTML = "Pause";
            startTimer.classList.add("running");
        }
    }

    function resetStopwatchTimer() {
        clearInterval(stopwatchInterval);
        clearInterval(timerInterval);
        stopwatchInterval = null;
        timerInterval = null;
        stopwatchTime = 0;
        stopwatchDisplay.innerHTML = "00:00:00";
        timerTime = 0;
        timerDisplay.innerHTML = "00:00:00";
        startStopwatch.innerHTML = "Start";
        startTimer.innerHTML = "Start";
        startStopwatch.classList.remove("running");
        startTimer.classList.remove("running");
        timerInput.value = "";
    }

    toggleStopwatch.addEventListener("click", startStopwatchTimer);
    toggleTimer.addEventListener("click", startTimerTimer);

    startStopwatch.addEventListener("click", startStopwatchTimer);
    resetStopwatch.addEventListener("click", resetStopwatchTimer);

    startTimer.addEventListener("click", startTimerTimer);
    resetTimer.addEventListener("click", resetStopwatchTimer);
});
