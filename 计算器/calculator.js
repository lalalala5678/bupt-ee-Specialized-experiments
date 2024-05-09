// 初始化计算器的输入和结果显示
function input(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// 计算表达式并显示结果
function calculate() {
    const display = document.getElementById('display');
    try {
        // 使用 eval 安全地计算表达式，这里简化了代码安全性处理，实际使用时需要更安全的实现
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// 清除显示
function clearDisplay() {
    document.getElementById('display').value = '';
}
