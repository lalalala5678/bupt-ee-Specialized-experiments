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

function applySettings() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    numberOfPoints = parseInt(document.getElementById("pointsCount").value);
    connectionType = document.getElementById("connectionType").value;
    generateGrid();
}

generateGrid(); // 初始化网格
function findPaths() {
    // 清除之前的路径标记
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("path");
    });

    // 实现路径查找逻辑，可以选择是否包含斜线
    // TODO: 在这里添加路径查找算法的实现
    alert(`当前连线模式：${connectionType}`);
}

