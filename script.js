document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成,开始初始化...');
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // 如果是主页链接，不执行滚动
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算目标位置，考虑顶部固定导航栏的高度
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 根据滚动位置更新导航链接激活状态
    const sections = document.querySelectorAll('section[id], header');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('nav').offsetHeight;
        
        // 找到当前可见的部分
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10; // 减去导航栏高度和一点偏移
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        
        // 更新导航链接状态
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + currentSection || (href === '#' && currentSection === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden:not(.hidden)');
    const mobileMenu = document.querySelector('.md\\:hidden.hidden');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 处理移动端菜单的链接点击
        const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 点击链接后隐藏菜单
                mobileMenu.classList.add('hidden');
                
                // 执行滚动逻辑
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // 计算目标位置，考虑顶部固定导航栏的高度
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    // 平滑滚动
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Add animation classes to elements
    const heroContent = document.querySelector('header .max-w-3xl');
    if (heroContent) {
        heroContent.classList.add('hero-content');
    }
    
    const gameCards = document.querySelectorAll('.bg-apple-gray-100.rounded-xl');
    gameCards.forEach(card => {
        card.classList.add('game-card');
    });
    
    const ctaButtons = document.querySelectorAll('.py-3.px-8.rounded-full');
    ctaButtons.forEach(button => {
        button.classList.add('cta-button');
    });
    
    // 确保游戏控制器已加载
    if (!window.gameController) {
        console.error('游戏控制器未加载!');
        
        // 创建一个临时控制器以防止错误
        window.gameController = {
            gameData: {
                'monster-survivors': {
                    name: 'Monster Survivors',
                    description: '一款刺激的生存动作游戏，你需要控制角色对抗无尽的怪物浪潮。',
                    url: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html',
                    controls: 'WASD：移动角色'
                }
            },
            startGame: function(gameId) {
                console.log('启动游戏:', gameId);
                return this.gameData[gameId];
            },
            toggleAudio: function() {
                console.log('切换音频');
                return false;
            }
        };
    }
    
    // 更精确地选择"立即玩"按钮(同时支持多种选择器)
    const playNowButton = document.querySelector('header .bg-white.text-apple-blue.rounded-full') || 
                          document.querySelector('header .bg-white.rounded-full') ||
                          document.querySelector('button.rounded-full:first-of-type');
    
    if (playNowButton) {
        console.log('找到"立即玩"按钮:', playNowButton.textContent.trim());
        
        // 添加点击事件
        playNowButton.addEventListener('click', function() {
            console.log('立即玩按钮被点击');
            createGameSelectionModal();
        });
    } else {
        console.error('未找到"立即玩"按钮!');
    }
    
    // 同样为了保险起见,单独处理"了解更多"按钮
    const learnMoreButton = document.querySelector('header .border-2.border-white.rounded-full') ||
                           document.querySelector('header .border-white.rounded-full') ||
                           document.querySelector('button.rounded-full:nth-of-type(2)');
    
    if (learnMoreButton) {
        console.log('找到"了解更多"按钮:', learnMoreButton.textContent.trim());
        
        learnMoreButton.addEventListener('click', function() {
            console.log('了解更多按钮被点击');
            // 创建关于弹窗代码...
            
            // 这部分保留原有代码即可
        });
    }
    
    // 游戏选择弹窗功能
    function createGameSelectionModal() {
        try {
            console.log('创建游戏选择弹窗');
            
            // 创建游戏选择弹窗
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-apple-gray-900">选择游戏开始</h3>
                        <button class="text-apple-gray-500 hover:text-apple-gray-700 focus:outline-none" id="close-modal">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="bg-apple-blue bg-opacity-10 rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-20 transition ring-2 ring-apple-blue" data-game="monster-survivors" data-url="https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html">
                            <div class="w-12 h-12 bg-apple-green rounded-full mx-auto mb-2 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-apple-blue">Monster Survivors</h4>
                        </div>
                        <div class="bg-apple-blue bg-opacity-10 rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-20 transition" data-game="traffic-jam-3d-alt" data-url="https://html5.gamedistribution.com/337302b23b5943d8bcfc501d81d50cdb/?gd_sdk_referrer_url=https://www.onlinegames.io/traffic-jam-3d/">
                            <div class="w-12 h-12 bg-apple-purple rounded-full mx-auto mb-2 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-apple-blue">Traffic Jam 3D</h4>
                        </div>
                        <div class="bg-apple-blue bg-opacity-10 rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-20 transition" data-game="bubble-shooter" data-url="https://www.crazygames.com/embed/color-match-amg">
                            <div class="w-12 h-12 bg-apple-red rounded-full mx-auto mb-2 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-apple-blue">Color Match</h4>
                        </div>
                        <div class="bg-apple-blue bg-opacity-10 rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-20 transition" data-game="doodle-road" data-url="https://www.crazygames.com/embed/doodle-road">
                            <div class="w-12 h-12 bg-apple-orange rounded-full mx-auto mb-2 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-apple-blue">Doodle Road</h4>
                        </div>
                    </div>
                    <div id="game-info" class="bg-apple-gray-100 p-4 rounded-lg mb-4">
                        <h4 class="font-bold text-apple-blue mb-2">游戏说明</h4>
                        <p class="text-apple-gray-700 text-sm mb-2" id="game-description"></p>
                        <p class="text-apple-gray-600 text-xs italic" id="game-controls"></p>
                    </div>
                    <button class="w-full bg-apple-blue text-white py-3 rounded-lg hover:bg-apple-indigo transition">
                        开始游戏
                    </button>
                </div>
            `;
            
            console.log('模态框HTML创建完成');
            document.body.appendChild(modal);
            console.log('模态框已添加到DOM');
            
            // 关闭弹窗功能
            document.getElementById('close-modal').addEventListener('click', function() {
                modal.classList.add('opacity-0');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // 点击游戏卡片功能
            const gameOptions = modal.querySelectorAll('.bg-apple-blue.bg-opacity-10');
            const gameInfo = document.getElementById('game-info');
            const gameDescription = document.getElementById('game-description');
            const gameControls = document.getElementById('game-controls');
            
            console.log('找到游戏选项数量:', gameOptions.length);
            
            // 默认选择第一个游戏并显示信息
            try {
                const firstGame = gameOptions[0];
                const firstGameId = firstGame.getAttribute('data-game');
                console.log('第一个游戏ID:', firstGameId);
                
                const firstGameData = window.gameController.gameData[firstGameId];
                console.log('第一个游戏数据:', firstGameData ? firstGameData.name : null);
                
                // 显示第一个游戏的信息
                if (firstGameData) {
                    gameDescription.textContent = firstGameData.description;
                    gameControls.textContent = '操作: ' + firstGameData.controls;
                    
                    // 更新开始按钮文本
                    const startButton = modal.querySelector('.w-full.bg-apple-blue');
                    startButton.textContent = `开始 ${firstGameData.name}`;
                }
                
                // 确保第一个游戏选项被高亮显示
                firstGame.classList.add('ring-2', 'ring-apple-blue');
            } catch (error) {
                console.error('设置默认游戏信息时出错:', error);
            }
            
            // 添加游戏选项点击事件
            gameOptions.forEach((option, index) => {
                option.addEventListener('click', function() {
                    // 添加选中效果
                    gameOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-apple-blue'));
                    this.classList.add('ring-2', 'ring-apple-blue');
                    
                    // 获取游戏数据
                    const gameId = this.getAttribute('data-game');
                    const gameData = window.gameController.gameData[gameId];
                    
                    // 显示游戏信息
                    if (gameData) {
                        gameInfo.classList.remove('hidden');
                        gameDescription.textContent = gameData.description;
                        gameControls.textContent = '操作: ' + gameData.controls;
                    }
                    
                    // 更新开始按钮文本
                    const startButton = modal.querySelector('.w-full.bg-apple-blue');
                    startButton.textContent = `开始 ${gameData.name}`;
                });
            });
            
            // 开始游戏按钮功能
            const startButton = modal.querySelector('.w-full.bg-apple-blue');
            startButton.addEventListener('click', function() {
                // 查找被选中的游戏
                const selectedGame = modal.querySelector('.ring-2.ring-apple-blue');
                if (selectedGame) {
                    const gameId = selectedGame.getAttribute('data-game');
                    const gameData = window.gameController.gameData[gameId];
                    
                    // 创建游戏界面
                    createGameInterface(gameData);
                    
                    // 记录游戏启动
                    window.gameController.startGame(gameId);
                    
                    // 关闭选择弹窗
                    document.body.removeChild(modal);
                } else {
                    // 如果没有选择游戏，显示提示
                    alert('请先选择一个游戏');
                }
            });
        } catch (error) {
            console.error('创建游戏选择弹窗时出错:', error);
            alert('打开游戏菜单失败,请刷新页面后重试。');
        }
    }
    
    // 创建游戏界面
    function createGameInterface(gameData) {
        try {
            console.log('创建游戏界面:', gameData.name);
            
            const gameInterface = document.createElement('div');
            gameInterface.className = 'fixed inset-0 bg-apple-gray-950 z-50 flex flex-col';
            gameInterface.innerHTML = `
                <div class="bg-apple-blue py-3 px-4 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-white cursor-pointer" id="back-button" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                        </svg>
                        <span class="text-white font-medium">${gameData.name}</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button id="mute-button" class="text-white hover:text-apple-gray-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                            </svg>
                        </button>
                        <button id="fullscreen-button" class="text-white hover:text-apple-gray-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex-1 bg-apple-gray-950 flex relative justify-center items-center">
                    <div id="loading-overlay" class="absolute inset-0 bg-apple-gray-950 flex items-center justify-center z-10">
                        <div class="text-center">
                            <div class="inline-block rounded-full bg-apple-blue p-3 mb-4">
                                <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <p class="text-white text-xl">正在加载游戏...</p>
                            <p class="text-apple-gray-400 mt-2">请稍候片刻</p>
                        </div>
                    </div>
                    <iframe src="${gameData.url}" id="game-iframe" width="1280" height="720" scrolling="no" frameborder="0" allow="gamepad *;" class="max-w-full max-h-full border-0 z-0" style="${gameData.url.includes('crazygames.com') ? 'width: 100%; height: 100%;' : ''}"></iframe>
                </div>
            `;
            
            document.body.appendChild(gameInterface);
            console.log('游戏界面已加载');
            
            // 调整iframe大小以适应屏幕
            const adjustIframeSize = () => {
                const iframe = document.getElementById('game-iframe');
                const container = iframe.parentElement;
                
                // 对Crazy Games的游戏使用100%宽高
                if (gameData.url.includes('crazygames.com')) {
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    return;
                }
                
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                
                // 对其他游戏保持原有的缩放逻辑
                const originalWidth = 1280;
                const originalHeight = 720;
                
                // 计算合适的缩放比例
                const widthRatio = containerWidth / originalWidth;
                const heightRatio = containerHeight / originalHeight;
                const scale = Math.min(widthRatio, heightRatio);
                
                if (scale < 1) {
                    // 如果需要缩小
                    iframe.style.width = `${originalWidth * scale}px`;
                    iframe.style.height = `${originalHeight * scale}px`;
                } else {
                    // 如果可以保持原尺寸或放大
                    iframe.style.width = `${originalWidth}px`;
                    iframe.style.height = `${originalHeight}px`;
                }
            };
            
            // 初始调整
            setTimeout(adjustIframeSize, 100);
            
            // 窗口大小变化时调整
            window.addEventListener('resize', adjustIframeSize);
            
            // 处理iframe加载完成事件
            const iframe = document.getElementById('game-iframe');
            const loadingOverlay = document.getElementById('loading-overlay');
            
            iframe.addEventListener('load', function() {
                console.log('iframe加载完成');
                // 延迟一点时间隐藏加载层，确保游戏已经渲染
                setTimeout(() => {
                    loadingOverlay.classList.add('opacity-0');
                    loadingOverlay.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                }, 1500);
            });
            
            // 添加返回按钮功能
            document.getElementById('back-button').addEventListener('click', function() {
                window.removeEventListener('resize', adjustIframeSize);
                document.body.removeChild(gameInterface);
            });
            
            // 添加静音按钮功能
            const muteButton = document.getElementById('mute-button');
            muteButton.addEventListener('click', function() {
                const isMuted = window.gameController.toggleAudio();
                if (isMuted) {
                    this.innerHTML = `
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
                        </svg>
                    `;
                } else {
                    this.innerHTML = `
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                        </svg>
                    `;
                }
            });
            
            // 添加全屏功能
            document.getElementById('fullscreen-button').addEventListener('click', function() {
                const iframe = document.getElementById('game-iframe');
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) { /* Safari */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* IE11 */
                    iframe.msRequestFullscreen();
                }
            });
        } catch (error) {
            console.error('创建游戏界面时出错:', error);
            alert('启动游戏失败,请刷新页面后重试。');
        }
    }
    
    // Simple game category filtering
    const categories = document.querySelectorAll('.rounded-lg.p-6.text-center');
    if (categories.length) {
        categories.forEach(category => {
            category.addEventListener('click', function() {
                // In a real implementation, this would filter games
                // For now, just add a visual indicator
                categories.forEach(c => c.classList.remove('ring-4', 'ring-white'));
                this.classList.add('ring-4', 'ring-white');
                
                // Show a message
                const message = document.createElement('div');
                message.className = 'fixed bottom-4 right-4 bg-apple-blue text-white px-6 py-3 rounded-lg shadow-lg z-50';
                message.textContent = `${this.querySelector('h3').textContent} games selected!`;
                document.body.appendChild(message);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    message.style.opacity = '0';
                    message.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => message.remove(), 500);
                }, 3000);
            });
        });
    }
    
    // Add hover effect to leaderboard rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.classList.add('hover-grow');
    });
    
    // Simple newsletter form validation
    const newsletterForm = document.querySelector('input[type="email"]');
    const subscribeButton = newsletterForm?.nextElementSibling;
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const email = newsletterForm.value;
            if (!email || !email.includes('@') || !email.includes('.')) {
                newsletterForm.style.border = '1px solid #FF3B30';
                newsletterForm.setAttribute('placeholder', 'Please enter a valid email');
                newsletterForm.value = '';
            } else {
                newsletterForm.style.border = '1px solid #34C759';
                subscribeButton.textContent = 'Subscribed!';
                subscribeButton.disabled = true;
                newsletterForm.disabled = true;
            }
        });
    }
    
    // 处理Featured Games区域的游戏按钮
    const featuredGameButtons = document.querySelectorAll('.game-btn');
    featuredGameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            let gameData = {
                name: this.closest('.bg-apple-gray-100').querySelector('h3').textContent,
                description: this.closest('.bg-apple-gray-100').querySelector('p').textContent,
                url: this.closest('.bg-apple-gray-100').querySelector('iframe').src,
                controls: '鼠标点击：控制游戏'
            };
            
            // 根据游戏ID设置特定的控制说明
            if (gameId === 'billiards') {
                gameData.controls = '鼠标移动：瞄准\n鼠标点击：击球\n拖动白球：设置位置';
            } else if (gameId === 'stickman') {
                gameData.controls = '点击：选择车辆/开始\n方向键：控制车辆\nR键：重置关卡';
            } else if (gameId === 'count-masters') {
                gameData.controls = '拖动屏幕：左右移动\n向上滑动：增加速度';
            }
            
            // 创建游戏界面
            createGameInterface(gameData);
        });
    });
    
    // 处理Featured Games区域的全屏按钮
    const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const iframe = this.closest('.relative').querySelector('iframe');
            
            // 确保iframe已加载
            if (iframe.getAttribute('src') === null) {
                const dataSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', dataSrc);
            }
            
            setTimeout(() => {
                if (iframe) {
                    if (iframe.requestFullscreen) {
                        iframe.requestFullscreen();
                    } else if (iframe.webkitRequestFullscreen) { /* Safari */
                        iframe.webkitRequestFullscreen();
                    } else if (iframe.msRequestFullscreen) { /* IE11 */
                        iframe.msRequestFullscreen();
                    }
                }
            }, 500); // 给iframe一点时间加载
        });
    });
    
    // 处理游戏容器的悬停加载
    const gameContainers = document.querySelectorAll('.game-container');
    gameContainers.forEach(container => {
        // 鼠标悬停时加载游戏
        container.addEventListener('mouseenter', function() {
            const iframe = this.querySelector('iframe');
            const placeholder = this.querySelector('.game-placeholder');
            
            if (iframe && iframe.getAttribute('src') === null) {
                const dataSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', dataSrc);
                
                // 游戏加载后隐藏占位符
                iframe.addEventListener('load', function() {
                    if (placeholder) {
                        placeholder.style.opacity = '0';
                        setTimeout(() => {
                            placeholder.style.display = 'none';
                        }, 300);
                    }
                });
            } else if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    placeholder.style.display = 'none';
                }, 300);
            }
        });
        
        // 点击占位符也加载游戏
        const placeholder = container.querySelector('.game-placeholder');
        if (placeholder) {
            placeholder.addEventListener('click', function() {
                const iframe = this.closest('.game-container').querySelector('iframe');
                if (iframe && iframe.getAttribute('src') === null) {
                    const dataSrc = iframe.getAttribute('data-src');
                    iframe.setAttribute('src', dataSrc);
                    
                    this.style.opacity = '0';
                    setTimeout(() => {
                        this.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
    
    // 处理分类标签游戏
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 移除所有标签的active状态
            categoryTabs.forEach(t => t.classList.remove('active-tab'));
            // 添加当前标签的active状态
            this.classList.add('active-tab');
            
            // 隐藏所有内容
            categoryContents.forEach(content => content.classList.add('hidden'));
            // 显示目标内容
            document.getElementById(`${category}-content`).classList.remove('hidden');
        });
    });
    
    // 处理分类游戏中的游戏卡片
    const gamePlaceholders = document.querySelectorAll('.game-placeholder');
    
    gamePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const container = this.closest('.game-container');
            const iframe = container.querySelector('iframe');
            
            if (iframe && iframe.getAttribute('src') === null) {
                const dataSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', dataSrc);
                
                // 加载后隐藏占位符
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // 处理分类游戏中的全屏按钮
    const categoryFullscreenBtns = document.querySelectorAll('.category-content .fullscreen-btn');
    
    categoryFullscreenBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const container = this.closest('.game-container');
            const iframe = container.querySelector('iframe');
            const placeholder = container.querySelector('.game-placeholder');
            
            // 确保iframe已加载
            if (iframe.getAttribute('src') === null) {
                const dataSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', dataSrc);
                
                if (placeholder) {
                    placeholder.style.opacity = '0';
                    setTimeout(() => {
                        placeholder.style.display = 'none';
                    }, 300);
                }
            }
            
            // 延迟执行全屏操作，确保iframe已加载
            setTimeout(() => {
                if (iframe) {
                    if (iframe.requestFullscreen) {
                        iframe.requestFullscreen();
                    } else if (iframe.webkitRequestFullscreen) {
                        iframe.webkitRequestFullscreen();
                    } else if (iframe.msRequestFullscreen) {
                        iframe.msRequestFullscreen();
                    }
                }
            }, 500);
        });
    });
    
    // 处理分类游戏中的游戏按钮
    const gamePlayBtns = document.querySelectorAll('.game-play-btn');
    
    gamePlayBtns.forEach(button => {
        button.addEventListener('click', function() {
            const gameCard = this.closest('.bg-white');
            const container = gameCard.querySelector('.game-container');
            const iframe = container.querySelector('iframe');
            const placeholder = container.querySelector('.game-placeholder');
            
            // 加载游戏
            if (iframe.getAttribute('src') === null) {
                const dataSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', dataSrc);
                
                if (placeholder) {
                    placeholder.style.opacity = '0';
                    setTimeout(() => {
                        placeholder.style.display = 'none';
                    }, 300);
                }
            }
            
            // 滚动到游戏视图
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    
    console.log('页面初始化完成');
}); 