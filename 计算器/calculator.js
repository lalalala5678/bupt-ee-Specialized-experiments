// 初始化计算器的输入和结果显示
function input(value) {
    const display = document.getElementById('display');
    display.value += value;
}


function calculate() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);  // 注意安全风险
        display.value = result;

        // 创建并触发自定义事件
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
