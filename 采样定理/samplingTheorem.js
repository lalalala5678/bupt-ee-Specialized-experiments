document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let signalFrequency = 5;  // 信号频率
    let samplingRate = 30;  // 初始采样率
    let time = 0;  // 时间变量，用于动画效果

    function draw() {
        ctx.clearRect(0, 0, width, height);
        drawSignal(signalFrequency, time);
        drawSamples(signalFrequency, samplingRate, 'rgba(0, 255, 0, 0.8)', time);
        checkSamplingTheorem(signalFrequency, samplingRate);
        requestAnimationFrame(draw);
        time += 0.1;
    }
    
    function drawSignal(frequency, timeOffset) {
        ctx.beginPath();
        ctx.strokeStyle = '#00BCD4';
        ctx.lineWidth = 2; 
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x++) {
            const y = height / 2 + Math.sin((x / width * 2 * Math.PI * frequency) + timeOffset) * height / 4;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    function drawSamples(frequency, samplingRate, color, timeOffset) {
        ctx.fillStyle = color;
        const step = width / samplingRate;
        for (let x = 0; x < width; x += step) {
            const y = height / 2 + Math.sin((x / width * 2 * Math.PI * frequency) + timeOffset) * height / 4;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI); 
            ctx.fill();
        }
    }
    

    function checkSamplingTheorem(signalFrequency, samplingRate) {
        const meetsTheorem = samplingRate >= 2 * signalFrequency;
        ctx.font = "16px Arial";
        ctx.fillStyle = meetsTheorem ? "green" : "red";
        ctx.fillText(`采样率 ${samplingRate} Hz ${meetsTheorem ? '满足' : '不满足'} fs ≥ 2fmax (${2 * signalFrequency} Hz)`, 10, 30);
    }

    draw();


    document.getElementById('samplingRateControl').addEventListener('input', function(event) {
        samplingRate = parseInt(event.target.value);
    });

    document.getElementById('frequencyControl').addEventListener('input', function(event) {
        signalFrequency = parseInt(event.target.value);
    });
});

