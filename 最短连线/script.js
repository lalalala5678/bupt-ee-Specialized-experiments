const gridContainer = document.getElementById("grid-container");
let gridSize = 10;
let numberOfPoints = 5;
let connectionType = "diagonal";

function generateGrid() {
    gridContainer.style.width = `${gridSize * 20}px`;
    gridContainer.style.height = `${gridSize * 20}px`;
    gridContainer.innerHTML = "";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.left = `${j * 20}px`;
            cell.style.top = `${i * 20}px`;
            gridContainer.appendChild(cell);
        }
    }
}

function addRandomPoints() {
    document.querySelectorAll(".point").forEach(p => p.classList.remove("point"));
    for (let i = 0; i < numberOfPoints; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        const pointDiv = document.createElement("div");
        pointDiv.classList.add("point");
        pointDiv.style.left = `${y * 20}px`;
        pointDiv.style.top = `${x * 20}px`;
        gridContainer.appendChild(pointDiv);
    }
}

function applySettings() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    numberOfPoints = parseInt(document.getElementById("pointsCount").value);
    connectionType = document.getElementById("connectionType").value;
    generateGrid();
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }

    calculateH(target) {
        this.h = Math.abs(this.x - target.x) + Math.abs(this.y - target.y);
    }
}

function findPaths() {
    // 清除之前的路径标记
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("path");
    });

    // 获取网格大小和节点数量
    const gridSize = parseInt(document.getElementById("gridSize").value);
    const pointsCount = parseInt(document.getElementById("pointsCount").value);
    const connectionType = document.getElementById("connectionType").value;

    // 获取起点和终点的坐标
    const startPoint = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    const endPoint = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };

    // 创建起点和终点节点
    const startNode = new Node(startPoint.x, startPoint.y);
    const endNode = new Node(endPoint.x, endPoint.y);

    // 计算起点节点的启发值
    startNode.calculateH(endNode);

    // 初始化 openList 和 closedList
    const openList = [startNode];
    const closedList = [];

    // 开始 A* 算法
    while (openList.length > 0) {
        // 从 openList 中选择 f 值最小的节点作为当前节点
        let currentNode = openList[0];
        let currentIndex = 0;
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        // 将当前节点从 openList 中移除，并加入到 closedList 中
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        // 如果当前节点为终点节点，说明已找到路径
        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            // 回溯路径，并在网格上标记出来
            let path = [];
            let current = currentNode;
            while (current !== null) {
                path.unshift({ x: current.x, y: current.y });
                current = current.parent;
            }

            // 在节点之间绘制连线
            for (let i = 0; i < path.length - 1; i++) {
                const startX = path[i].x;
                const startY = path[i].y;
                const endX = path[i + 1].x;
                const endY = path[i + 1].y;

                // 使用 Bresenham 算法计算节点之间的连线
                const dx = Math.abs(endX - startX);
                const dy = Math.abs(endY - startY);
                const sx = (startX < endX) ? 1 : -1;
                const sy = (startY < endY) ? 1 : -1;
                let err = dx - dy;

                while (true) {
                    const cellIndex = startX * gridSize + startY;
                    cells[cellIndex].classList.add("path");

                    if (startX === endX && startY === endY) break;
                    const e2 = 2 * err;
                    if (e2 > -dy) {
                        err -= dy;
                        startX += sx;
                    }
                    if (e2 < dx) {
                        err += dx;
                        startY += sy;
                    }
                }
            }
            return;
        }

        // 获取当前节点的相邻节点
        const neighbors = [];
        const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]; // 上、左、下、右

        directions.forEach(dir => {
            const neighborX = currentNode.x + dir[0];
            const neighborY = currentNode.y + dir[1];

            // 检查相邻节点是否在网格范围内，并且不是障碍物（未被探索过）
            if (neighborX >= 0 && neighborX < gridSize && neighborY >= 0 && neighborY < gridSize) {
                const isDiagonal = connectionType === "diagonal";
                const isHorizontalVertical = connectionType === "straight";
                if (isDiagonal || (isHorizontalVertical && !(dir[0] !== 0 && dir[1] !== 0))) {
                    neighbors.push(new Node(neighborX, neighborY));
                }
            }
        });

        // 对每个相邻节点进行处理
        neighbors.forEach(neighbor => {
            // 如果相邻节点已在 closedList 中，跳过
            if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                return;
            }

            // 计算相邻节点的代价值和启发值
            neighbor.g = currentNode.g + 1;
            neighbor.calculateH(endNode);
            neighbor.f = neighbor.g + neighbor.h;

            // 如果相邻节点已在 openList 中
            const openNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
            if (openNode) {
                // 如果新的路径代价更低，则更新相邻节点的代价值和父节点
                if (neighbor.g >= openNode.g) {
                    return;
                }
            }

            // 更新相邻节点的父节点为当前节点
            neighbor.parent = currentNode;

            // 将相邻节点加入 openList 中
            openList.push(neighbor);
        });
    }

    // 如果 openList 为空，说明无法找到路径
    alert("无法找到路径！");
}

generateGrid(); // 初始化网格
