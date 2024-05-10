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
    generateGrid();
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
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            edges.push({start: nodes[i], end: nodes[j], weight: distance});
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
        ctx.beginPath();
        ctx.moveTo(y1 * 20, x1 * 20);
        ctx.lineTo(y2 * 20, x2 * 20);
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.stroke();
    });

    // Draw nodes on top of the edges
    nodes.forEach(node => {
        const [x, y] = node.split(',').map(Number);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(y * 20, x * 20, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

generateGrid(); // 初始化网格
