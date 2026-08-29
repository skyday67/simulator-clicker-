// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
var game = {
    money: 50, gems: 0, crystals: 0, eggs: 0, xp: 0, level: 1,
    totalClicks: 0, totalEarned: 0, totalPurchases: 0, coinsSpent: 0,
    playTime: 0, bestMultiplier: 1, startTime: Date.now(), lastSaveTime: Date.now(),
    clickPower: 1, autoIncome: 0, multiplier: 1, combo: 0, comboMultiplier: 1, comboTimer: 0,
    achievements: [], upgrades: {}, shopItems: {},
    settings: { animations: true, particles: true, notifications: true, darkMode: false, sound: true, music: true, volume: 50, autoSave: true, offlineProgress: true },
    luckMultiplier: 1, luckBonus: 1, pets: [], petsOwned: [], equippedPet: null,
    buildings: [], buildingsOwned: [], buildingLevel: 0, equippedBuilding: null,
    activeEvents: [], eventLogs: [], eventsTriggered: 0, miningProgress: 0, crystalMiningProgress: 0,
    gemsFound: 0, crystalsFound: 0, lastEventTime: 0
};

// === МАГАЗИН ===
var shopData = {
    clickers: [
        { id: 'cursor', name: 'Cursor', price: 750, income: 0, clickBonus: 1, desc: '+1 click', info: 'Basic' },
        { id: 'mouse', name: 'Mouse', price: 2500, income: 0, clickBonus: 3, desc: '+3 click', info: 'Improved' },
        { id: 'keyboard', name: 'Keyboard', price: 7500, income: 0, clickBonus: 8, desc: '+8 click', info: 'Pro' },
        { id: 'monitor', name: 'Monitor', price: 25000, income: 0, clickBonus: 20, desc: '+20 click', info: 'Large' },
        { id: 'computer', name: 'Computer', price: 75000, income: 0, clickBonus: 50, desc: '+50 click', info: 'Powerful' },
        { id: 'server', name: 'Server', price: 250000, income: 0, clickBonus: 150, desc: '+150 click', info: 'Server' },
        { id: 'ai', name: 'AI', price: 750000, income: 0, clickBonus: 500, desc: '+500 click', info: 'AI' },
        { id: 'quantum', name: 'Quantum', price: 2500000, income: 0, clickBonus: 1500, desc: '+1500 click', info: 'Quantum' },
        { id: 'neural', name: 'Neural', price: 10000000, income: 0, clickBonus: 5000, desc: '+5000 click', info: 'Neural' },
        { id: 'matrix', name: 'Matrix', price: 50000000, income: 0, clickBonus: 15000, desc: '+15000 click', info: 'Matrix' }
    ],
    auto: [
        { id: 'auto1', name: 'Beginner', price: 5000, income: 1, clickBonus: 0, desc: '+1/sec', info: 'Start' },
        { id: 'auto2', name: 'Worker', price: 25000, income: 5, clickBonus: 0, desc: '+5/sec', info: 'Work' },
        { id: 'auto3', name: 'Manager', price: 100000, income: 20, clickBonus: 0, desc: '+20/sec', info: 'Manage' },
        { id: 'auto4', name: 'Office', price: 500000, income: 100, clickBonus: 0, desc: '+100/sec', info: 'Office' },
        { id: 'auto5', name: 'Factory', price: 2500000, income: 500, clickBonus: 0, desc: '+500/sec', info: 'Factory' },
        { id: 'auto6', name: 'Corp', price: 10000000, income: 2000, clickBonus: 0, desc: '+2000/sec', info: 'Corp' },
        { id: 'auto7', name: 'Company', price: 50000000, income: 10000, clickBonus: 0, desc: '+10000/sec', info: 'Company' },
        { id: 'auto8', name: 'Empire', price: 250000000, income: 50000, clickBonus: 0, desc: '+50000/sec', info: 'Empire' },
        { id: 'auto9', name: 'Galaxy', price: 1000000000, income: 200000, clickBonus: 0, desc: '+200000/sec', info: 'Galaxy' },
        { id: 'auto10', name: 'Universe', price: 5000000000, income: 1000000, clickBonus: 0, desc: '+1M/sec', info: 'Universe' }
    ],
    boosters: [
        { id: 'boost1', name: 'Coffee', price: 10000, multiplier: 1.5, duration: 60, desc: 'x1.5 60s', info: 'Boost' },
        { id: 'boost2', name: 'Energy', price: 25000, multiplier: 2, duration: 120, desc: 'x2 120s', info: 'Energy' },
        { id: 'boost3', name: 'Luck', price: 50000, multiplier: 3, duration: 180, desc: 'x3 180s', info: 'Luck' },
        { id: 'boost4', name: 'Super', price: 125000, multiplier: 5, duration: 300, desc: 'x5 300s', info: 'Super' },
        { id: 'boost5', name: 'Mega', price: 500000, multiplier: 10, duration: 600, desc: 'x10 600s', info: 'Mega' },
        { id: 'boost6', name: 'Ultra', price: 2500000, multiplier: 25, duration: 900, desc: 'x25 900s', info: 'Ultra' },
        { id: 'boost7', name: 'Divine', price: 10000000, multiplier: 50, duration: 1200, desc: 'x50 1200s', info: 'Divine' },
        { id: 'boost8', name: 'Infinite', price: 50000000, multiplier: 100, duration: 1800, desc: 'x100 1800s', info: 'Infinite' },
        { id: 'boost9', name: 'Lightning', price: 100000000, multiplier: 250, duration: 2400, desc: 'x250 2400s', info: 'Lightning' },
        { id: 'boost10', name: 'Cosmos', price: 500000000, multiplier: 500, duration: 3600, desc: 'x500 3600s', info: 'Cosmos' }
    ],
    premium: [
        { id: 'gem1', name: '10 Gems', price: 50000, gems: 10, desc: '+10 gems', info: 'Premium' },
        { id: 'gem2', name: '50 Gems', price: 225000, gems: 50, desc: '+50 gems', info: 'Large' },
        { id: 'gem3', name: '100 Gems', price: 400000, gems: 100, desc: '+100 gems', info: 'Huge' },
        { id: 'gem4', name: '500 Gems', price: 1750000, gems: 500, desc: '+500 gems', info: 'Max' },
        { id: 'gem5', name: '1000 Gems', price: 3250000, gems: 1000, desc: '+1000 gems', info: 'Legendary' },
        { id: 'crystal1', name: '5 Crystals', price: 100000, crystals: 5, desc: '+5 crystals', info: 'Rare' },
        { id: 'crystal2', name: '25 Crystals', price: 450000, crystals: 25, desc: '+25 crystals', info: 'Large' },
        { id: 'crystal3', name: '100 Crystals', price: 1600000, crystals: 100, desc: '+100 crystals', info: 'Huge' },
        { id: 'crystal4', name: '500 Crystals', price: 7000000, crystals: 500, desc: '+500 crystals', info: 'Max' },
        { id: 'crystal5', name: '1000 Crystals', price: 12000000, crystals: 1000, desc: '+1000 crystals', info: 'Legendary' }
    ],
    eggs: [
        { id: 'egg1', name: 'Common Egg', price: 50000, eggs: 1, desc: 'Common/Rare/Epic', info: 'Easy' },
        { id: 'egg2', name: 'Rare Egg', price: 250000, eggs: 1, desc: 'Rare/Epic/Legendary', info: 'Medium' },
        { id: 'egg3', name: 'Epic Egg', price: 1000000, eggs: 1, desc: 'Epic/Legendary/Mythic', info: 'Hard' },
        { id: 'egg4', name: 'Legendary Egg', price: 5000000, eggs: 1, desc: 'Legendary/Mythic/Divine', info: 'Very Hard' },
        { id: 'egg5', name: 'Divine Egg', price: 25000000, eggs: 1, desc: '100% Divine!', info: 'Extreme' }
    ]
};

// === ПИТОМЦЫ ===
var petsData = [
    { id: 'pet_common1', name: 'Cat', rarity: 'common', bonus: 5, desc: '+5% income', color: '#95a5a6' },
    { id: 'pet_common2', name: 'Dog', rarity: 'common', bonus: 7, desc: '+7% income', color: '#95a5a6' },
    { id: 'pet_common3', name: 'Rabbit', rarity: 'common', bonus: 10, desc: '+10% income', color: '#95a5a6' },
    { id: 'pet_rare1', name: 'Fox', rarity: 'rare', bonus: 15, desc: '+15% income', color: '#3498db' },
    { id: 'pet_rare2', name: 'Raccoon', rarity: 'rare', bonus: 18, desc: '+18% income', color: '#3498db' },
    { id: 'pet_rare3', name: 'Owl', rarity: 'rare', bonus: 20, desc: '+20% income', color: '#3498db' },
    { id: 'pet_epic1', name: 'Panda', rarity: 'epic', bonus: 25, desc: '+25% income', color: '#9b59b6' },
    { id: 'pet_epic2', name: 'Unicorn', rarity: 'epic', bonus: 30, desc: '+30% income', color: '#9b59b6' },
    { id: 'pet_epic3', name: 'Dragon', rarity: 'epic', bonus: 35, desc: '+35% income', color: '#9b59b6' },
    { id: 'pet_legendary1', name: 'Phoenix', rarity: 'legendary', bonus: 50, desc: '+50% income', color: '#f1c40f' },
    { id: 'pet_legendary2', name: 'Leviathan', rarity: 'legendary', bonus: 60, desc: '+60% income', color: '#f1c40f' },
    { id: 'pet_mythic1', name: 'Star', rarity: 'mythic', bonus: 100, desc: '+100% income', color: '#e74c3c' },
    { id: 'pet_divine1', name: 'Infinity', rarity: 'divine', bonus: 250, desc: '+250% income', color: '#1abc9c' }
];

// === ЗДАНИЯ ===
var buildingsData = [
    { id: 'build1', name: 'House', basePrice: 500000, bonus: 2, desc: '+2% all', info: 'Base' },
    { id: 'build2', name: 'Shop', basePrice: 1000000, bonus: 5, desc: '+5% all', info: 'Trade' },
    { id: 'build3', name: 'Factory', basePrice: 2500000, bonus: 10, desc: '+10% all', info: 'Production' },
    { id: 'build4', name: 'Office', basePrice: 5000000, bonus: 20, desc: '+20% all', info: 'Business' },
    { id: 'build5', name: 'Castle', basePrice: 10000000, bonus: 40, desc: '+40% all', info: 'Royal' },
    { id: 'build6', name: 'Spaceport', basePrice: 50000000, bonus: 80, desc: '+80% all', info: 'Space' },
    { id: 'build7', name: 'Station', basePrice: 100000000, bonus: 150, desc: '+150% all', info: 'Orbit' },
    { id: 'build8', name: 'Star', basePrice: 500000000, bonus: 300, desc: '+300% all', info: 'Sun' },
    { id: 'build9', name: 'Galaxy', basePrice: 1000000000, bonus: 600, desc: '+600% all', info: 'Milky' },
    { id: 'build10', name: 'Universe', basePrice: 5000000000, bonus: 1200, desc: '+1200% all', info: 'All' }
];

// === СОБЫТИЯ ===
var randomEvents = {
    goldRain: { name: 'Gold Rain', duration: 300000, effect: { incomeMultiplier: 3 }, description: '+200% income' },
    deflation: { name: 'Deflation', duration: 300000, effect: { priceMultiplier: 0.5 }, description: '-50% prices' },
    inflation: { name: 'Inflation', duration: 300000, effect: { priceMultiplier: 1.5, incomeMultiplier: 1.5 }, description: 'Prices and income +50%' },
    superCombo: { name: 'Super Combo', duration: 300000, effect: { comboMultiplier: 5 }, description: 'Combo x5' },
    autoMarathon: { name: 'Auto Marathon', duration: 300000, effect: { autoMultiplier: 3 }, description: 'Auto x3' },
    doubleClick: { name: 'Double Click', duration: 300000, effect: { clickMultiplier: 2 }, description: 'Clicks x2' }
};

// === МУЗЫКА ===
var audioContext = null;
var musicInterval = null;
var musicGain = null;

function initAudio() {
    if (!audioContext) {
        try { audioContext = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
}

function playMusic(type) {
    if (!game.settings.music) return;
    initAudio();
    stopMusic();
    var notes = { ambient: [261.63, 329.63, 392.00, 523.25], epic: [196.00, 246.94, 293.66, 392.00], action: [329.63, 392.00, 493.88, 659.25], chill: [220.00, 277.18, 329.63, 440.00] };
    var freqs = notes[type] || notes.ambient;
    musicGain = audioContext.createGain();
    musicGain.gain.value = game.settings.musicVolume / 100 * 0.2;
    musicGain.connect(audioContext.destination);
    var noteIndex = 0;
    musicInterval = setInterval(function() {
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = freqs[noteIndex % freqs.length];
        gain.gain.setValueAtTime(game.settings.musicVolume / 100 * 0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(musicGain);
        osc.start();
        osc.stop(audioContext.currentTime + 1.5);
        noteIndex++;
    }, 1500);
    showToast('Music: ' + type);
}

function stopMusic() {
    if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
    if (musicGain) musicGain.disconnect();
}

// === ЗВУКОВЫЕ ЭФФЕКТЫ ===
var soundEffects = { click: [100, 150, 200, 250, 300], purchase: [600, 650, 700, 750, 800], achievement: [1200, 1400, 1600, 1800, 2000], levelup: [800, 1000, 1200, 1400, 1600], event: [400, 500, 600, 700, 800], error: [150, 200, 250, 300], mining: [1500, 1600, 1700, 1800, 1900, 2000], egg: [800, 900, 1000, 1100, 1200] };

function playSound(category) {
    if (!game.settings.sound) return;
    try {
        initAudio();
        var sounds = soundEffects[category];
        if (!sounds) return;
        var freq = sounds[Math.floor(Math.random() * sounds.length)];
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = category === 'click' ? 'square' : 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(game.settings.volume / 100 * 0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    } catch(e) {}
}

// === ЧАСТИЦЫ ===
function createParticle(x, y) {
    if (!game.settings.particles) return;
    var container = document.getElementById('particles-container');
    if (!container) return;
    var particle = document.createElement('div');
    particle.className = 'particle';
    var size = 5 + Math.random() * 15;
    var colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7', '#ffd700', '#ffed4e'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = 'left: ' + x + 'px; top: ' + y + 'px; width: ' + size + 'px; height: ' + size + 'px; background: ' + color + '; box-shadow: 0 0 10px ' + color + ';';
    container.appendChild(particle);
    setTimeout(function() { particle.remove(); }, 2000);
}

// === ИНТРО ===
function showIntro() {
    var intro = document.getElementById('intro');
    var startBtn = document.getElementById('start-btn');
    var gameContainer = document.getElementById('game-container');

    startBtn.addEventListener('click', function() {
        intro.style.opacity = '0';
        intro.style.transition = 'opacity 0.5s';
        setTimeout(function() {
            intro.style.display = 'none';
            gameContainer.style.display = 'block';
            init();
        }, 500);
    });
}

// === ИНИЦИАЛИЗАЦИЯ ===
function init() {
    try {
        loadGame();
        setupEventListeners();
        updateDisplay();
        renderShop('clickers');
        renderPets();
        renderBuildings();
        startGameLoop();
        checkAchievements();
        startEventSystem();
        updateMiningDisplay();
        if (game.settings.offlineProgress) {
            var offlineTime = (Date.now() - game.lastSaveTime) / 1000;
            if (offlineTime > 60 && game.autoIncome > 0) {
                var offlineEarnings = Math.floor(offlineTime * game.autoIncome * 0.3);
                game.money += offlineEarnings;
                game.totalEarned += offlineEarnings;
                showToast('Offline: ' + formatNumber(offlineEarnings));
            }
        }
        showToast('Super Clicker v16.0 INTRO!');
        if (game.settings.music) playMusic('ambient');
    } catch(e) { console.error('Init error:', e); }
}

// === СОБЫТИЯ ===
function setupEventListeners() {
    try {
        var menuBtns = document.querySelectorAll('.menu-btn');
        for (var i = 0; i < menuBtns.length; i++) {
            menuBtns[i].addEventListener('click', function() {
                var btns = document.querySelectorAll('.menu-btn');
                for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
                var tabs = document.querySelectorAll('.tab-content');
                for (var k = 0; k < tabs.length; k++) tabs[k].classList.remove('active');
                this.classList.add('active');
                document.getElementById(this.dataset.tab + '-tab').classList.add('active');
                playSound('click');
            });
        }
        var shopCats = document.querySelectorAll('.shop-category');
        for (var l = 0; l < shopCats.length; l++) {
            shopCats[l].addEventListener('click', function() {
                var cats = document.querySelectorAll('.shop-category');
                for (var m = 0; m < cats.length; m++) cats[m].classList.remove('active');
                this.classList.add('active');
                renderShop(this.dataset.category);
                playSound('click');
            });
        }
        document.getElementById('main-button').addEventListener('click', handleClick);
        document.getElementById('setting-sound').addEventListener('change', function(e) { game.settings.sound = e.target.checked; });
        document.getElementById('setting-music').addEventListener('change', function(e) { game.settings.music = e.target.checked; if (e.target.checked) playMusic('ambient'); else stopMusic(); });
        document.getElementById('setting-volume').addEventListener('input', function(e) { game.settings.volume = e.target.value; document.getElementById('volume-value').textContent = e.target.value; });
        document.getElementById('setting-animations').addEventListener('change', function(e) { game.settings.animations = e.target.checked; });
        document.getElementById('setting-particles').addEventListener('change', function(e) { game.settings.particles = e.target.checked; });
        document.getElementById('setting-dark-mode').addEventListener('change', function(e) { game.settings.darkMode = e.target.checked; document.body.classList.toggle('dark-mode', e.target.checked); });
        document.getElementById('save-game-btn').addEventListener('click', saveGame);
        document.getElementById('reset-game-btn').addEventListener('click', resetGame);
        document.getElementById('admin-give-btn').addEventListener('click', adminGiveCurrency);
        document.getElementById('admin-trigger-btn').addEventListener('click', adminTriggerRandom);
        document.getElementById('admin-clear-btn').addEventListener('click', adminClearEvents);
        var musicBtns = document.querySelectorAll('[data-music]');
        for (var n = 0; n < musicBtns.length; n++) {
            musicBtns[n].addEventListener('click', function() { playMusic(this.dataset.music); });
        }
        document.getElementById('admin-stop-music').addEventListener('click', stopMusic);
    } catch(e) { console.error('Event error:', e); }
}

// === КЛИК ===
function handleClick(e) {
    try {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        game.totalClicks++;
        game.combo++;
        game.comboTimer = 5;
        game.comboMultiplier = Math.min(10, 1 + (game.combo * 0.05));
        var clickValue = game.clickPower * game.multiplier * game.comboMultiplier;
        if (Math.random() < 0.05) { clickValue *= 5; showToast('CRIT!'); playSound('achievement'); }
        clickValue = Math.floor(clickValue);
        game.money += clickValue;
        game.totalEarned += clickValue;
        game.xp += Math.ceil(clickValue / 20);
        checkLevel();
        checkMining();
        if (game.comboMultiplier > game.bestMultiplier) game.bestMultiplier = game.comboMultiplier;
        if (game.settings.animations) {
            var btn = document.getElementById('main-button');
            btn.classList.add('clicked');
            setTimeout(function() { btn.classList.remove('clicked'); }, 300);
        }
        if (game.settings.particles && e) {
            var x = e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth / 2;
            var y = e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight / 2;
            createParticle(x, y);
        }
        playSound('click');
        updateDisplay();
        checkAchievements();
    } catch(e) { console.error('Click error:', e); }
}

// === УРОВЕНЬ ===
function checkLevel() {
    try {
        var xpNeeded = Math.floor(game.level * 500);
        if (game.xp >= xpNeeded) {
            game.xp -= xpNeeded;
            game.level++;
            showToast('Level ' + game.level + '!');
            playSound('levelup');
            var bonus = game.level * 50;
            game.money += Math.floor(bonus);
            updateDisplay();
        }
    } catch(e) { console.error('Level error:', e); }
}

// === МАЙНИНГ ===
function checkMining() {
    try {
        game.miningProgress++;
        game.crystalMiningProgress++;
        if (game.miningProgress >= 100000) game.miningProgress = 0;
        if (game.crystalMiningProgress >= 1000000) game.crystalMiningProgress = 0;
        if (Math.random() < 0.00001) {
            var gems = Math.floor(Math.random() * 10) + 1;
            game.gems += gems;
            game.gemsFound += gems;
            showToast('Found ' + gems + ' GEMS!');
            playSound('mining');
        }
        if (Math.random() < 0.000001) {
            var crystals = Math.floor(Math.random() * 5) + 1;
            game.crystals += crystals;
            game.crystalsFound += crystals;
            showToast('Found ' + crystals + ' CRYSTALS!');
            playSound('mining');
        }
        updateMiningDisplay();
    } catch(e) { console.error('Mining error:', e); }
}

function updateMiningDisplay() {
    try {
        var miningFill = document.getElementById('mining-progress-fill');
        var crystalFill = document.getElementById('crystal-mining-progress-fill');
        var miningProgress = document.getElementById('mining-progress');
        var crystalProgress = document.getElementById('crystal-mining-progress');
        if (miningFill) miningFill.style.width = (game.miningProgress / 100000 * 100) + '%';
        if (crystalFill) crystalFill.style.width = (game.crystalMiningProgress / 1000000 * 100) + '%';
        if (miningProgress) miningProgress.textContent = game.miningProgress;
        if (crystalProgress) crystalProgress.textContent = game.crystalMiningProgress;
    } catch(e) { console.error('Mining display error:', e); }
}

// === ОТОБРАЖЕНИЕ ===
function updateDisplay() {
    try {
        document.getElementById('money-display').textContent = formatNumber(game.money);
        document.getElementById('gems-display').textContent = formatNumber(game.gems);
        document.getElementById('crystal-display').textContent = formatNumber(game.crystals);
        document.getElementById('egg-display').textContent = formatNumber(game.eggs);
        document.getElementById('xp-display').textContent = formatNumber(game.xp) + ' XP';
        document.getElementById('level-display').textContent = game.level;
        document.getElementById('click-power').textContent = formatNumber(game.clickPower);
        document.getElementById('auto-income').textContent = formatNumber(game.autoIncome);
        document.getElementById('multiplier').textContent = 'x' + game.multiplier.toFixed(2);
        document.getElementById('combo-counter').textContent = 'Combo: ' + game.combo;
        document.getElementById('combo-multiplier').textContent = 'x' + game.comboMultiplier.toFixed(2);
        document.getElementById('stat-total-clicks').textContent = formatNumber(game.totalClicks);
        document.getElementById('stat-total-earned').textContent = formatNumber(game.totalEarned);
        document.getElementById('stat-play-time').textContent = formatTime(game.playTime);
        document.getElementById('stat-max-level').textContent = game.level;
        document.getElementById('stat-pets').textContent = game.petsOwned.length;
        document.getElementById('stat-buildings').textContent = game.buildingsOwned.length;
        updateEventsBar();
    } catch(e) { console.error('Display error:', e); }
}

function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(3) + 'Qi';
    if (num >= 1e15) return (num / 1e15).toFixed(3) + 'Qa';
    if (num >= 1e12) return (num / 1e12).toFixed(3) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(3) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(3) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

function formatTime(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = Math.floor(sec % 60);
    return h.toString().padStart(2,'0') + ':' + m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0');
}

// === МАГАЗИН ===
function renderShop(cat) {
    try {
        var container = document.getElementById('shop-items');
        container.innerHTML = '';
        shopData[cat].forEach(function(item) {
            var owned = game.shopItems[item.id] || 0;
            var div = document.createElement('div');
            div.className = 'shop-item ' + (owned >= 10 ? 'owned' : '');
            div.innerHTML = '<h4>' + item.name + ' ' + (owned > 0 ? '(x' + owned + ')' : '') + '</h4><p>' + item.desc + '</p><p class="price">' + formatNumber(item.price) + '</p><p class="bonus-info">' + item.info + '</p>';
            div.addEventListener('click', function() { buyItem(item, cat); playSound('purchase'); });
            container.appendChild(div);
        });
    } catch(e) { console.error('Shop error:', e); }
}

function buyItem(item, cat) {
    try {
        if (game.money >= item.price) {
            game.money -= item.price;
            game.coinsSpent += item.price;
            game.totalPurchases++;
            if (!game.shopItems[item.id]) game.shopItems[item.id] = 0;
            game.shopItems[item.id]++;
            if (item.clickBonus) game.clickPower += item.clickBonus;
            if (item.income) game.autoIncome += item.income;
            if (item.gems) game.gems += item.gems;
            if (item.crystals) game.crystals += item.crystals;
            if (item.eggs) game.eggs += item.eggs;
            if (item.multiplier) {
                game.multiplier *= item.multiplier;
                showToast(item.name + ' activated!');
                playSound('achievement');
                setTimeout(function() { game.multiplier /= item.multiplier; updateDisplay(); }, item.duration * 1000);
            }
            if (cat === 'eggs') openEgg();
            showToast('Bought ' + item.name);
            updateDisplay();
            renderShop(cat);
            checkAchievements();
        } else { showToast('Not enough!'); playSound('error'); }
    } catch(e) { console.error('Buy error:', e); }
}

// === ЯЙЦА ===
function openEgg() {
    try {
        var rand = Math.random();
        var rarity, pet;
        if (rand < 0.5) { rarity = 'common'; pet = petsData.filter(function(p) { return p.rarity === 'common'; })[Math.floor(Math.random() * 3)]; }
        else if (rand < 0.8) { rarity = 'rare'; pet = petsData.filter(function(p) { return p.rarity === 'rare'; })[Math.floor(Math.random() * 3)]; }
        else if (rand < 0.95) { rarity = 'epic'; pet = petsData.filter(function(p) { return p.rarity === 'epic'; })[Math.floor(Math.random() * 3)]; }
        else if (rand < 0.99) { rarity = 'legendary'; pet = petsData.filter(function(p) { return p.rarity === 'legendary'; })[Math.floor(Math.random() * 2)]; }
        else if (rand < 0.999) { rarity = 'mythic'; pet = petsData.filter(function(p) { return p.rarity === 'mythic'; })[0]; }
        else { rarity = 'divine'; pet = petsData.filter(function(p) { return p.rarity === 'divine'; })[0]; }
        game.petsOwned.push({ id: pet.id + '_' + Date.now(), name: pet.name, rarity: pet.rarity, bonus: pet.bonus, desc: pet.desc, color: pet.color });
        showToast('Got ' + pet.name + ' (' + rarity + ')!');
        playSound('egg');
        renderPets();
    } catch(e) { console.error('Egg error:', e); }
}

// === ПИТОМЦЫ ===
function renderPets() {
    try {
        var container = document.getElementById('pets-list');
        var ownedCount = document.getElementById('pets-owned');
        var equippedText = document.getElementById('pets-equipped');
        if (!container) return;
        container.innerHTML = '';
        if (ownedCount) ownedCount.textContent = game.petsOwned.length;
        if (equippedText) equippedText.textContent = game.equippedPet ? game.equippedPet.name : 'None';
        game.petsOwned.forEach(function(pet) {
            var div = document.createElement('div');
            div.className = 'pet-card ' + (game.equippedPet && game.equippedPet.id === pet.id ? 'equipped' : '');
            div.style.borderLeft = '4px solid ' + pet.color;
            div.innerHTML = '<h4>' + pet.name + '</h4><p style="color: ' + pet.color + '">' + pet.rarity.toUpperCase() + '</p><p>' + pet.desc + '</p><button class="equip-btn" onclick="equipPet(\'' + pet.id + '\')">' + (game.equippedPet && game.equippedPet.id === pet.id ? 'Equipped' : 'Equip') + '</button>';
            container.appendChild(div);
        });
    } catch(e) { console.error('Pets error:', e); }
}

window.equipPet = function(petId) {
    try {
        var pet = game.petsOwned.find(function(p) { return p.id === petId; });
        if (pet) { game.equippedPet = pet; showToast('Equipped: ' + pet.name); playSound('achievement'); renderPets(); updateDisplay(); }
    } catch(e) { console.error('Equip pet error:', e); }
};

// === ЗДАНИЯ ===
function renderBuildings() {
    try {
        var container = document.getElementById('buildings-list');
        var ownedCount = document.getElementById('buildings-owned');
        var equippedText = document.getElementById('buildings-equipped');
        if (!container) return;
        container.innerHTML = '';
        if (ownedCount) ownedCount.textContent = game.buildingsOwned.length;
        if (equippedText) equippedText.textContent = game.equippedBuilding ? game.equippedBuilding.name : 'None';
        buildingsData.forEach(function(build) {
            var owned = game.buildingsOwned.filter(function(b) { return b.id === build.id; }).length;
            var div = document.createElement('div');
            div.className = 'building-card ' + (game.equippedBuilding && game.equippedBuilding.id === build.id ? 'equipped' : '');
            div.innerHTML = '<h4>' + build.name + ' (x' + owned + ')</h4><p>' + build.desc + '</p><p>Price: ' + formatNumber(build.basePrice) + '</p><button class="equip-btn" onclick="buyBuilding(\'' + build.id + '\')">Buy</button><button class="equip-btn" onclick="equipBuilding(\'' + build.id + '\')">' + (game.equippedBuilding && game.equippedBuilding.id === build.id ? 'Equipped' : 'Equip') + '</button>';
            container.appendChild(div);
        });
    } catch(e) { console.error('Buildings error:', e); }
}

window.buyBuilding = function(buildId) {
    try {
        var build = buildingsData.find(function(b) { return b.id === buildId; });
        if (build && game.money >= build.basePrice) { game.money -= build.basePrice; game.buildingsOwned.push({ id: build.id + '_' + Date.now(), name: build.name, bonus: build.bonus, desc: build.desc }); showToast('Bought: ' + build.name); playSound('purchase'); renderBuildings(); updateDisplay(); }
        else { showToast('Not enough!'); playSound('error'); }
    } catch(e) { console.error('Buy building error:', e); }
};

window.equipBuilding = function(buildId) {
    try {
        var build = game.buildingsOwned.find(function(b) { return b.id === buildId; });
        if (build) { game.equippedBuilding = build; showToast('Equipped: ' + build.name); playSound('achievement'); renderBuildings(); updateDisplay(); }
    } catch(e) { console.error('Equip building error:', e); }
};

// === ДОСТИЖЕНИЯ ===
var achievementsData = [
    { id: 'ach1', name: 'First Click', desc: '1 click', condition: function() { return game.totalClicks >= 1; }, reward: 2500 },
    { id: 'ach2', name: 'Beginner', desc: '100 clicks', condition: function() { return game.totalClicks >= 100; }, reward: 10000 },
    { id: 'ach3', name: 'Amateur', desc: '1000 clicks', condition: function() { return game.totalClicks >= 1000; }, reward: 50000 },
    { id: 'ach4', name: 'Fan', desc: '10000 clicks', condition: function() { return game.totalClicks >= 10000; }, reward: 250000 },
    { id: 'ach5', name: 'Rich', desc: '50K money', condition: function() { return game.totalEarned >= 50000; }, reward: 25000 },
    { id: 'ach6', name: 'Level 20', desc: '20 level', condition: function() { return game.level >= 20; }, reward: 50000 },
    { id: 'ach7', name: 'Level 50', desc: '50 level', condition: function() { return game.level >= 50; }, reward: 250000 },
    { id: 'ach8', name: 'Miner', desc: '100K clicks', condition: function() { return game.totalClicks >= 100000; }, reward: 500000 },
    { id: 'ach9', name: 'Legend', desc: '1M clicks', condition: function() { return game.totalClicks >= 1000000; }, reward: 5000000 },
    { id: 'ach10', name: 'Mining God', desc: '10M clicks', condition: function() { return game.totalClicks >= 10000000; }, reward: 50000000 }
];

function checkAchievements() {
    try {
        achievementsData.forEach(function(ach) {
            if (!game.achievements.includes(ach.id) && ach.condition()) {
                game.achievements.push(ach.id);
                game.money += ach.reward;
                game.totalEarned += ach.reward;
                showToast('Achievement: ' + ach.name + '!');
                playSound('achievement');
            }
        });
    } catch(e) { console.error('Achievements error:', e); }
}

// === СИСТЕМА СОБЫТИЙ ===
function startEventSystem() {
    setInterval(function() {
        try {
            var now = Date.now();
            if (now - game.lastEventTime >= 1800000) {
                if (Math.random() < 0.5) { triggerRandomEvent(); game.lastEventTime = now; }
            }
        } catch(e) { console.error('Event system error:', e); }
    }, 1000);
    setInterval(function() {
        try { updateEventsDisplay(); } catch(e) { console.error('Events display error:', e); }
    }, 1000);
}

function triggerRandomEvent() {
    try {
        var eventKeys = Object.keys(randomEvents);
        var selected = eventKeys[Math.floor(Math.random() * eventKeys.length)];
        var eventData = randomEvents[selected];
        game.activeEvents.push({ id: selected, name: eventData.name, duration: eventData.duration, effect: eventData.effect, description: eventData.description, endTime: Date.now() + eventData.duration });
        game.eventsTriggered++;
        showToast('Event: ' + eventData.name + ' - ' + eventData.description);
        playSound('event');
        updateDisplay();
    } catch(e) { console.error('Event trigger error:', e); }
}

function updateEventsDisplay() {
    try {
        var now = Date.now();
        game.activeEvents = game.activeEvents.filter(function(ev) { return ev.endTime > now; });
        var container = document.getElementById('current-events');
        if (!container) return;
        container.innerHTML = '';
        game.activeEvents.forEach(function(ev) {
            var timeLeft = Math.max(0, Math.floor((ev.endTime - now) / 1000));
            var div = document.createElement('div');
            div.className = 'event-card';
            div.innerHTML = '<h4>' + ev.name + '</h4><p>' + ev.description + '</p><p class="event-timer">' + formatEventTime(timeLeft) + '</p>';
            container.appendChild(div);
        });
        updateEventsBar();
    } catch(e) { console.error('Events update error:', e); }
}

function updateEventsBar() {
    try {
        var bar = document.getElementById('active-events-bar');
        if (!bar) return;
        bar.innerHTML = '';
        game.activeEvents.forEach(function(ev) {
            var badge = document.createElement('span');
            badge.className = 'event-active-badge';
            badge.textContent = ev.name;
            bar.appendChild(badge);
        });
    } catch(e) { console.error('Events bar error:', e); }
}

function formatEventTime(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    return h + 'h ' + m + 'm ' + s + 's';
}

// === АДМИНКА ===
function adminGiveCurrency() {
    try {
        var money = parseInt(document.getElementById('admin-money').value) || 0;
        var gems = parseInt(document.getElementById('admin-gems').value) || 0;
        var crystals = parseInt(document.getElementById('admin-crystals').value) || 0;
        var eggs = parseInt(document.getElementById('admin-eggs').value) || 0;
        if (money > 0) { game.money += money; showToast('+' + formatNumber(money)); }
        if (gems > 0) { game.gems += gems; showToast('+' + formatNumber(gems)); }
        if (crystals > 0) { game.crystals += crystals; showToast('+' + formatNumber(crystals)); }
        if (eggs > 0) { game.eggs += eggs; showToast('+' + formatNumber(eggs)); }
        updateDisplay();
        document.getElementById('admin-money').value = '';
        document.getElementById('admin-gems').value = '';
        document.getElementById('admin-crystals').value = '';
        document.getElementById('admin-eggs').value = '';
    } catch(e) { console.error('Admin currency error:', e); }
}

function adminTriggerRandom() {
    try { triggerRandomEvent(); showToast('Event triggered'); } catch(e) { console.error('Admin trigger error:', e); }
}

function adminClearEvents() {
    try { game.activeEvents = []; updateDisplay(); showToast('Events cleared'); } catch(e) { console.error('Admin clear error:', e); }
}

// === СОХРАНЕНИЕ ===
function saveGame() {
    try { game.lastSaveTime = Date.now(); localStorage.setItem('superClickerINTRO', JSON.stringify(game)); showToast('Saved!'); playSound('achievement'); } catch(e) { console.error('Save error:', e); }
}

function loadGame() {
    try {
        var save = localStorage.getItem('superClickerINTRO');
        if (save) {
            var loaded = JSON.parse(save);
            game = Object.assign({}, game, loaded);
            if (game.settings.darkMode) document.body.classList.add('dark-mode');
            if (game.settings.music) playMusic('ambient');
            showToast('Loaded!');
            playSound('achievement');
        }
    } catch(e) { console.error('Load error:', e); }
}

function resetGame() {
    try { if (confirm('Reset all progress?')) { localStorage.removeItem('superClickerINTRO'); location.reload(); } } catch(e) { console.error('Reset error:', e); }
}

// === ИГРОВОЙ ЦИКЛ ===
function startGameLoop() {
    setInterval(function() {
        try {
            if (game.autoIncome > 0) {
                var income = game.autoIncome;
                game.activeEvents.forEach(function(ev) {
                    if (ev.effect.incomeMultiplier) income *= ev.effect.incomeMultiplier;
                    if (ev.effect.allMultiplier) income *= ev.effect.allMultiplier;
                    if (ev.effect.autoMultiplier) income *= ev.effect.autoMultiplier;
                });
                if (game.equippedPet) income = Math.floor(income * (1 + game.equippedPet.bonus / 100));
                income = Math.floor(income);
                game.money += income;
                game.totalEarned += income;
                game.xp += Math.ceil(income / 100);
                checkLevel();
                updateDisplay();
            }
            game.playTime++;
            if (game.combo > 0) {
                game.comboTimer -= 1;
                if (game.comboTimer <= 0) { game.combo = 0; game.comboMultiplier = 1; }
                updateDisplay();
            }
            if (game.settings.autoSave && game.playTime % 30 === 0) saveGame();
        } catch(e) { console.error('Game loop error:', e); }
    }, 1000);
}

// === УВЕДОМЛЕНИЯ ===
function showToast(msg) {
    try {
        if (!game.settings.notifications) return;
        var c = document.getElementById('toast-container');
        var t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        c.appendChild(t);
        setTimeout(function() { t.remove(); }, 2500);
    } catch(e) { console.error('Toast error:', e); }
}

// === ЗАПУСК ===
window.addEventListener('load', function() {
    showIntro();
});
