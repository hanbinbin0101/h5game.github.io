// 调试脚本 - 模拟游戏选择功能
console.log('调试脚本加载');

// 模拟游戏控制器数据
window.gameController = {
    gameData: {
        'bru-boegie': {
            name: 'Bru & Boegie: Get da MILK!',
            description: '一个手绘2D超现实主义喜剧点击冒险游戏。扮演Bru，一个奇怪的沉默寡言的人，他的任务是为咖啡获取牛奶。',
            url: 'https://mikdog.itch.io/bru-boegie-get-da-milk',
            controls: '左键点击：交互/使用\n右键点击：检查\nESC：暂停/选项\nF：显示热点\nD：Dab（学习后）\nTab：跳过过场动画'
        },
        'monster-survivors': {
            name: 'Monster Survivors',
            description: '一款刺激的生存动作游戏',
            url: 'https://example.com/game2',
            controls: 'WASD：移动'
        }
    },
    startGame: function(gameId) {
        console.log('开始游戏:', gameId);
        return this.gameData[gameId];
    },
    toggleAudio: function() {
        console.log('切换音频');
        return false;
    }
};

// 测试打开游戏选择弹窗
function testOpenGameModal() {
    console.log('测试打开游戏选择弹窗');
    
    try {
        // 创建游戏选择弹窗
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">选择游戏开始</h3>
                    <button class="text-gray-500" id="close-modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-blue-100 rounded-lg p-4 text-center cursor-pointer ring-2 ring-blue-500" data-game="bru-boegie">
                        <h4 class="font-bold">Bru & Boegie</h4>
                    </div>
                    <div class="bg-blue-100 rounded-lg p-4 text-center cursor-pointer" data-game="monster-survivors">
                        <h4 class="font-bold">Monster Survivors</h4>
                    </div>
                </div>
                <div id="game-info" class="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 class="font-bold mb-2">游戏说明</h4>
                    <p class="text-gray-700 text-sm mb-2" id="game-description"></p>
                    <p class="text-gray-600 text-xs italic" id="game-controls"></p>
                </div>
                <button id="start-button" class="w-full bg-blue-500 text-white py-3 rounded-lg">
                    开始游戏
                </button>
            </div>
        `;
        
        console.log('模态框创建成功');
        document.body.appendChild(modal);
        console.log('模态框已添加到DOM');
        
        // 关闭弹窗功能
        document.getElementById('close-modal').addEventListener('click', function() {
            console.log('关闭按钮被点击');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                document.body.removeChild(modal);
                console.log('模态框已关闭');
            }, 300);
        });
        
        // 获取元素
        console.log('获取模态框内的元素');
        const gameOptions = modal.querySelectorAll('[data-game]');
        const gameInfo = document.getElementById('game-info');
        const gameDescription = document.getElementById('game-description');
        const gameControls = document.getElementById('game-controls');
        
        console.log('找到游戏选项数量:', gameOptions.length);
        
        // 默认选择第一个游戏并显示信息
        console.log('尝试设置默认游戏信息');
        try {
            const firstGame = gameOptions[0];
            console.log('第一个游戏元素:', firstGame);
            
            const firstGameId = firstGame.getAttribute('data-game');
            console.log('第一个游戏ID:', firstGameId);
            
            const firstGameData = window.gameController.gameData[firstGameId];
            console.log('第一个游戏数据:', firstGameData);
            
            // 显示第一个游戏的信息
            gameDescription.textContent = firstGameData.description;
            gameControls.textContent = '操作: ' + firstGameData.controls;
            
            // 更新开始按钮文本
            const startButton = document.getElementById('start-button');
            startButton.textContent = `开始 ${firstGameData.name}`;
            
            console.log('默认游戏信息设置完成');
        } catch (error) {
            console.error('设置默认游戏信息时出错:', error);
        }
        
        // 添加游戏选项点击事件
        console.log('添加游戏选项点击事件');
        gameOptions.forEach((option) => {
            option.addEventListener('click', function() {
                console.log('游戏选项被点击:', this);
                
                // 添加选中效果
                gameOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-blue-500'));
                this.classList.add('ring-2', 'ring-blue-500');
                
                // 获取游戏数据
                const gameId = this.getAttribute('data-game');
                console.log('选中的游戏ID:', gameId);
                
                const gameData = window.gameController.gameData[gameId];
                console.log('选中的游戏数据:', gameData);
                
                // 显示游戏信息
                if (gameData) {
                    gameInfo.classList.remove('hidden');
                    gameDescription.textContent = gameData.description;
                    gameControls.textContent = '操作: ' + gameData.controls;
                    
                    // 更新开始按钮文本
                    const startButton = document.getElementById('start-button');
                    startButton.textContent = `开始 ${gameData.name}`;
                }
            });
        });
        
        // 开始游戏按钮功能
        console.log('添加开始游戏按钮事件');
        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', function() {
            console.log('开始游戏按钮被点击');
            
            // 查找被选中的游戏
            const selectedGame = modal.querySelector('.ring-2.ring-blue-500');
            console.log('选中的游戏元素:', selectedGame);
            
            if (selectedGame) {
                const gameId = selectedGame.getAttribute('data-game');
                console.log('选中的游戏ID:', gameId);
                
                const gameData = window.gameController.gameData[gameId];
                console.log('选中的游戏数据:', gameData);
                
                alert('游戏即将启动: ' + gameData.name);
                
                // 移除模态框
                document.body.removeChild(modal);
                console.log('模态框已关闭');
            } else {
                console.log('没有选中的游戏');
                alert('请先选择一个游戏');
            }
        });
        
    } catch (error) {
        console.error('打开游戏选择弹窗时出错:', error);
    }
}

// 页面加载时添加测试按钮
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面已加载');
    
    const testButton = document.createElement('button');
    testButton.textContent = '测试游戏选择弹窗';
    testButton.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded';
    testButton.addEventListener('click', testOpenGameModal);
    
    document.body.appendChild(testButton);
    console.log('测试按钮已添加');
}); 