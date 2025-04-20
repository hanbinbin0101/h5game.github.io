/**
 * 游戏控制器 - 管理游戏状态和功能
 */
class GameController {
    constructor() {
        this.currentGame = null;
        this.gameData = {
            'doodle-road': {
                name: 'Doodle Road',
                description: '一款有趣的涂鸦风格道路冒险游戏，通过控制你的车辆在各种复杂道路上行驶，躲避障碍并收集奖励。',
                url: 'https://www.crazygames.com/embed/doodle-road',
                controls: '使用鼠标或触摸屏控制车辆，避开障碍物，尽可能地行驶更远距离。'
            },
            'monster-survivors': {
                name: 'Monster Survivors',
                description: '一款刺激的生存动作游戏，你需要控制角色对抗无尽的怪物浪潮，收集经验提升能力，尽可能地生存下去。',
                url: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html',
                controls: 'WASD：移动角色\n鼠标：瞄准\n空格：特殊能力\n1-5：选择装备\nESC：暂停游戏'
            },
            'traffic-jam-3d-alt': {
                name: 'Traffic Jam 3D',
                description: '在这款刺激的交通管理游戏中，控制十字路口的交通信号灯，防止车辆相撞，并尽可能保持交通畅通。随着级别的提高，交通流量会增加，挑战也会更大！',
                url: 'https://html5.gamedistribution.com/337302b23b5943d8bcfc501d81d50cdb/?gd_sdk_referrer_url=https://www.onlinegames.io/traffic-jam-3d/',
                controls: '点击或触摸屏幕来切换交通信号灯，防止车辆碰撞，确保交通顺畅通行。'
            },
            'traffic-jam': {
                name: 'Traffic Jam 3D',
                description: '控制交通流量，避免车辆碰撞，测试你的反应速度。',
                url: 'https://games.gamesnacks.com/traffic-jam-3d/index.html',
                controls: '点击或触摸屏幕控制游戏。'
            },
            'bubble-shooter': {
                name: 'Color Match',
                description: '一款考验反应能力和色彩匹配的休闲游戏，点击与中央颜色相匹配的小球，不断挑战你的专注力和反应速度。',
                url: 'https://www.crazygames.com/embed/color-match-amg',
                controls: '鼠标点击：选择与中央颜色相匹配的小球'
            }
        };
        
        // 绑定音频控制
        this.isMuted = false;
    }
    
    // 启动游戏
    startGame(gameId) {
        const game = this.gameData[gameId];
        if (!game) return false;
        
        this.currentGame = gameId;
        return game;
    }
    
    // 切换音频状态
    toggleAudio() {
        this.isMuted = !this.isMuted;
        
        const iframe = document.getElementById('game-iframe');
        if (iframe) {
            // 尝试将音频状态传递给iframe
            try {
                iframe.contentWindow.postMessage({
                    action: 'setAudio',
                    muted: this.isMuted
                }, '*');
            } catch (e) {
                console.warn('无法控制游戏音频:', e);
            }
        }
        
        return this.isMuted;
    }
    
    // 获取游戏高分
    getHighScores() {
        // 从本地存储获取高分
        try {
            const scores = localStorage.getItem('gameverse-scores');
            return scores ? JSON.parse(scores) : {};
        } catch (e) {
            console.error('无法获取高分:', e);
            return {};
        }
    }
    
    // 保存高分
    saveScore(gameId, score) {
        if (!gameId || !score) return false;
        
        try {
            const scores = this.getHighScores();
            
            // 如果当前分数更高，则更新
            if (!scores[gameId] || score > scores[gameId]) {
                scores[gameId] = score;
                localStorage.setItem('gameverse-scores', JSON.stringify(scores));
                return true;
            }
            
            return false;
        } catch (e) {
            console.error('无法保存高分:', e);
            return false;
        }
    }
}

// 创建全局游戏控制器实例
window.gameController = new GameController(); 