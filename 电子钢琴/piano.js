const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playFrequency(frequency, duration) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

function autoPlay() {
    playFrequency(1, A, 0.5);
}

document.getElementById('autoPlay').addEventListener('click', autoPlay);



function composeMusic() {
    const notes = document.getElementById('composeInput').value.split('/');
    let currentTime = 0;

    notes.forEach(note => {
        const parts = note.match(/(\d+\.?\d*)([A-G])(\d)/);
        if (parts) {
            const duration = parseFloat(parts[1]);
            const noteName = parts[2];
            const octave = parts[3];

            setTimeout(() => {
                playFrequency(noteName, octave, duration);
            }, currentTime * 1000);

            currentTime += duration;
        }
    });
}


document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note'); // 假设 data-note 属性包含音符和倍频，如 'A3'
        const [noteName, octave] = note.split('');
        playFrequency(noteName, octave, 0.5); // 持续时间为1秒
    });
});


const frequencies = {
    '1': { 'A': 131, 'B': 147, 'C': 165, 'D': 175, 'E': 196, 'F': 220, 'G': 247 },
    '2': { 'A': 262, 'B': 296, 'C': 330, 'D': 349, 'E': 392, 'F': 440, 'G': 494 },
    '3': { 'A': 523, 'B': 587, 'C': 659, 'D': 698, 'E': 784, 'F': 880, 'G': 988 },
    '4': { 'A': 1047, 'B': 1175, 'C': 1319, 'D': 1397, 'E': 1568, 'F': 1760, 'G': 1976 }
};

function playFrequency(note, octave, duration) {
    const frequency = frequencies[octave][note];
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}
