function checkWinning() {
    const userNumbers = document.getElementById('numbers').value.split(',').map(Number);
    const userSpecialNumber = Number(document.getElementById('specialNumber').value);
    const winningNumbers = [5, 12, 23, 8, 15]; // 定义中奖号码
    const winningSpecialNumber = 22; 
    matchedNumbers =  0;
    for( j = 0; j < 5;j++ ){
        for(i = 0 ; i < 5;i++){
            if( winningNumbers[i] == userNumbers[j] )
                matchedNumbers = matchedNumbers + 1;
        }
    }
    
    let resultText;

    if (matchedNumbers === 5 && userSpecialNumber === winningSpecialNumber) {
        resultText = "恭喜你中了大奖！";
    } else if (matchedNumbers === 5) {
        resultText = "恭喜你中了一等奖！";
    } else if (matchedNumbers === 4 && userSpecialNumber === winningSpecialNumber) {
        resultText = "恭喜你中了二等奖！";
    } else if (matchedNumbers === 4) {
        resultText = "恭喜你中了三等奖！";
    } else if (matchedNumbers === 3) {
        resultText = "恭喜你中了四等奖！";
    } else if (matchedNumbers === 2) {
        resultText = "恭喜你中了五等奖！";
    } else {
        resultText = "很遗憾，这次没有中奖。";
    }

    document.getElementById('result').innerText = resultText;
}
