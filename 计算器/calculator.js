
function input(value) {
    const display = document.getElementById('display');
    display.value += value;
}


function calculate() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);  
        display.value = result;


        const event = new CustomEvent('calculationCompleted', { detail: { result: result } });
        document.dispatchEvent(event);
    } catch (error) {
        display.value = 'Error';
    }
}


// 清除显示
function clearDisplay() {
    document.getElementById('display').value = '';
}
