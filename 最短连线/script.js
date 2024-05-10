const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
let gridSize = 10;
let numberOfPoints = 5;
let connectionType = "diagonal";

function generateGrid() {
    canvas.width = gridSize * 20;
    canvas.height = gridSize * 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(j * 20, i * 20, 20, 20);
        }
    }
}

function addRandomPoints() {
    // 清除 Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 重新绘制网格
    generateGrid();

    // 添加随机节点到网格交点处
    const nodeRadius = 5; // 节点的半径大小
    for (let i = 0; i < numberOfPoints; i++) {
        // 生成随机交点的位置
        const x = Math.floor(Math.random() * (gridSize - 1)) * 20 ; 
        const y = Math.floor(Math.random() * (gridSize - 1)) * 20 ;

        // 在交点处绘制节点
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(y, x, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}




function applySettings() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    numberOfPoints = parseInt(document.getElementById("pointsCount").value);
    connectionType = document.getElementById("connectionType").value;
    generateGrid();
}

function findPaths() {
    // 清除之前的路径绘制
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 获取网格大小和节点数量
    const gridSize = parseInt(document.getElementById("gridSize").value);
    const pointsCount = parseInt(document.getElementById("pointsCount").value);
    const connectionType = document.getElementById("connectionType").value;

    // 获取起点和终点的坐标
    const startPoint = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    const endPoint = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };

    // 创建起点和终点节点
    const startNode = { x: startPoint.x * 20 + 10, y: startPoint.y * 20 + 10 };
    const endNode = { x: endPoint.x * 20 + 10, y: endPoint.y * 20 + 10 };

    // 绘制起点和终点
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(startNode.y, startNode.x, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endNode.y, endNode.x, 6, 0, Math.PI * 2);
    ctx.fill();

    // 绘制路径（这里需要根据实际的路径计算来绘制）
    // 这里是示例，你需要根据具体的路径计算来绘制
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(startNode.y, startNode.x);
    ctx.lineTo(endNode.y, endNode.x);
    ctx.stroke();
}

generateGrid(); // 初始化网格
