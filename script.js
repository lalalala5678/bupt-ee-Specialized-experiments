const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
let gridSize = 10;
let numberOfPoints = 5;
let connectionType = "diagonal";
let nodeCoordinates = {}; // 用于存储节点坐标的对象

function generateGrid() {
    canvas.width = gridSize * 20;
    canvas.height = gridSize * 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "gray";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(j * 20, i * 20, 20, 20);
        }
    }
}

function addRandomPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateGrid();
    nodeCoordinates = {};

    const nodeRadius = 5;
    for (let i = 0; i < numberOfPoints; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);

        nodeCoordinates[`${x},${y}`] = true;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(y * 20, x * 20, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    drawMST(); // Draw the MST after adding points
}

function applySettings() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    numberOfPoints = parseInt(document.getElementById("pointsCount").value);
    connectionType = document.getElementById("connectionType").value;
    drawMST(); // Redraw MST with the new settings
}


function addCustomPoint() {
    const x = parseInt(document.getElementById('nodeX').value);
    const y = parseInt(document.getElementById('nodeY').value);
    if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
        alert('请输入有效的坐标！');
        return;
    }

    const nodeRadius = 5;
    nodeCoordinates[`${x},${y}`] = true;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(y * 20, x * 20, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    
    drawMST(); // 更新最小生成树
}

document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        addRandomPoints(); // 添加随机节点
    }
});

class UnionFind {
    constructor(elements) {
        this.parent = {};
        elements.forEach(e => this.parent[e] = e);
    }
    find(item) {
        if (this.parent[item] === item) {
            return item;
        }
        this.parent[item] = this.find(this.parent[item]); // Path compression
        return this.parent[item];
    }
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootY] = rootX;
        }
    }
}

function createEdges() {
    let edges = [];
    let nodes = Object.keys(nodeCoordinates);
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const [x1, y1] = nodes[i].split(',').map(Number);
            const [x2, y2] = nodes[j].split(',').map(Number);
            // Calculate distance
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            // Only add edges for straight lines if 'straight' is selected
            if (0) {
                // Check if the nodes are aligned either horizontally or vertically
                if (x1 === x2 || y1 === y2) {
                    edges.push({start: nodes[i], end: nodes[j], weight: distance});
                }
            } else {
                // 'diagonal' includes all possible connections
                edges.push({start: nodes[i], end: nodes[j], weight: distance});
            }
        }
    }
    return edges;
}

function drawMST() {
    const edges = createEdges();
    const nodes = Object.keys(nodeCoordinates);
    const uf = new UnionFind(nodes);
    let mst = [];
    edges.sort((a, b) => a.weight - b.weight);

    edges.forEach(edge => {
        if (uf.find(edge.start) !== uf.find(edge.end)) {
            uf.union(edge.start, edge.end);
            mst.push(edge);
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateGrid();

    // Draw MST edges
    mst.forEach(edge => {
        const [x1, y1] = edge.start.split(',').map(Number);
        const [x2, y2] = edge.end.split(',').map(Number);

        if (connectionType === "straight" && x1 != x2 && y1 != y2) {
            // 先确定连接点是否应该先水平后垂直，或是先垂直后水平
            const horizontalFirst = Math.abs(x1 - x2) < Math.abs(y1 - y2);

            if (horizontalFirst) {
                // 水平连接到同一x坐标
                ctx.beginPath();
                ctx.moveTo(y1 * 20, x1 * 20);
                ctx.lineTo(y2 * 20, x1 * 20);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 4;
                ctx.stroke();

                // 垂直连接到同一y坐标
                ctx.beginPath();
                ctx.moveTo(y2 * 20, x1 * 20);
                ctx.lineTo(y2 * 20, x2 * 20);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 4;
                ctx.stroke();
            } else {
                // 垂直连接到同一x坐标
                ctx.beginPath();
                ctx.moveTo(y1 * 20, x1 * 20);
                ctx.lineTo(y1 * 20, x2 * 20);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 4;

                ctx.stroke();

                // 水平连接到同一y坐标
                ctx.beginPath();
                ctx.moveTo(y1 * 20, x2 * 20);
                
                ctx.lineTo(y2 * 20, x2 * 20);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 4;

                ctx.stroke();
                
            }
        } else {
            // 普通直线连接
            ctx.beginPath();
            ctx.moveTo(y1 * 20, x1 * 20);
            ctx.lineTo(y2 * 20, x2 * 20);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    });

    // 重新绘制节点以确保它们在连线上方可见
    nodes.forEach(node => {
        const [x, y] = node.split(',').map(Number);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(y * 20, x * 20, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function findShortestPath() {
    const queue = [{x: 0, y: 0, path: []}]; // 初始队列，包含起点，以及到达该点的路径
    const visited = {}; // 用于记录已经访问过的节点

    while (queue.length > 0) {
        const {x, y, path} = queue.shift(); // 从队列中取出一个节点
        const key = `${x},${y}`;

        // 如果当前节点已经访问过或者是墙壁，则跳过
        if (visited[key] || isWall(x, y)) {
            console.log(`Skipping wall or visited node at (${x}, ${y})`);
            continue;
        }

        // 将当前节点标记为已访问
        visited[key] = true;
        console.log(`Visiting node at (${x}, ${y})`);

        // 检查当前节点是否为目标节点
        if (x === gridSize - 1 && y === gridSize - 1) {
            // 如果是目标节点，则绘制路径并返回
            drawPath(path);
            console.log("Path found:", path);
            return;
        }

        // 向四个方向扩展，并将下一步的路径加入队列中
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // 检查新节点是否在网格范围内
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                queue.push({x: nx, y: ny, path: [...path, {x: nx, y: ny}]});
            }
        }
    }

    // 如果没有找到路径，打印错误消息
    console.log("No path found!");
}

function isWall(x, y) {
    // 定义检查点的偏移数组，分布在每个方格的四条边的中点
    const offsets = [
        { dx: 10, dy: 0 },   // 上边界中点
        { dx: 10, dy: 20 },  // 下边界中点
        { dx: 0, dy: 10 },   // 左边界中点
        { dx: 20, dy: 10 }   // 右边界中点
    ];

    let blueCount = 0;
    offsets.forEach(offset => {
        const pixelData = ctx.getImageData(y * 20 + offset.dy, x * 20 + offset.dx, 1, 1).data;
        // 检查蓝色阈值
        if (pixelData[2] > 200 && pixelData[0] < 100 && pixelData[1] < 100) {
            blueCount++;
        }
    });

    // 如果有任何边界点是蓝色的，我们认为存在墙壁
    return blueCount > 0;
}









function drawPath(path) {
    ctx.beginPath();
    ctx.moveTo(path[0].y * 20 + 10, path[0].x * 20 + 10);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].y * 20 + 10, path[i].x * 20 + 10);
    }
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.stroke();
}




generateGrid(); // 初始化网格
