function check() {
    const winningNumbers = JSON.parse(localStorage.getItem('winningNumbers')).split(',');;
    const winningSpecialNumber = ~~localStorage.getItem('winningSpecialNumber');
    const userNumbers = document.getElementById('numbers').value.split(',').map(Number);
    const userSpecialNumber = Number(document.getElementById('specialNumber').value);
    
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

// 创建管理员登录弹出窗口
function showAdminLogin() {
    var adminPassword = prompt("请输入管理员密码：");
    // 验证管理员密码是否正确
    if (adminPassword === "12345") { 
        // 显示管理员菜单
        showAdminPanel();
    } else {
        alert("管理员密码错误，请重新输入！");
    }
}

// 显示管理员菜单
function showAdminPanel() {
    var adminPanelDiv = document.createElement("div");
    adminPanelDiv.innerHTML = `
        <div id="adminPanel" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #f9f9f9; padding: 20px; border: 2px solid #ccc; border-radius: 5px;">
            <h2 style="color: cyan;">管理员菜单</h2>
            <button class='adim' onclick="changeLotteryPassword()">更改中奖号码</button>
            <button class='adim' onclick="showAllWinningNumbers()">查看中奖号码</button>
        </div>
    `;
    document.body.appendChild(adminPanelDiv);
}

// 更改彩票中奖密码功能
function changeLotteryPassword() {
    var newLotteryPassword = prompt("请输入新的彩票中奖密码：");
    var newspeicalnum = prompt("请输入新的彩票中奖特殊号码：");
    winningNumbers = newLotteryPassword;
    winningSpecialNumber = newspeicalnum;
    localStorage.setItem('winningNumbers', JSON.stringify(winningNumbers));
    localStorage.setItem('winningSpecialNumber', winningSpecialNumber);
    // 这里可以将新的彩票中奖密码保存到后端数据库或者本地存储中
    alert('彩票中奖密码已成功更改为：' + JSON.parse (localStorage.getItem('winningNumbers')) + '\n ' + '彩票中奖特殊号码已成功更改为：' + localStorage.getItem('winningSpecialNumber'));
    
}

// 输出所有中奖号码功能
function showAllWinningNumbers() {
    // 这里可以编写代码来从后端获取所有中奖号码并显示在页面上
    alert('彩票中奖密码为：' +JSON.parse (localStorage.getItem('winningNumbers')) + '\n ' + '彩票中奖特殊号码为：' + localStorage.getItem('winningSpecialNumber'));
}