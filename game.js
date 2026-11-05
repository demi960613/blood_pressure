const GameSystem = {
    storageKey: 'bp_game_data',
    currentMember: '人員1',
    quotes: [
        '慢慢來也沒關係，每一次照顧自己都值得肯定。',
        '今天的你，已經比昨天更懂得照顧自己。',
        '休息不是停下來，而是為下一段路補充力量。',
        '照顧健康不必追求完美，持續一點點就很好。',
        '願意記錄與關心自己，就是一份很棒的勇氣。',
        '深呼吸，給自己一點空間，也給心情一點溫柔。',
        '每個小小的好習慣，都在為更安心的日常加分。'
    ],
    themes: [
        { id: 'slate', name: '沉靜灰階', level: 0 },
        { id: 'dark', name: '深夜模式', level: 1 },
        { id: 'rose', name: '柔和粉色', level: 2 },
        { id: 'amber', name: '暖心琥珀', level: 3 },
        { id: 'blue', name: '清新天藍', level: 4 },
        { id: 'emerald', name: '薄荷翠綠', level: 5 }
    ],

    defaultData(xp = 0, coins = 0) {
        return {
            xp,
            coins,
            coinsEarned: coins,
            shields: 0,
            streakDays: 0,
            unlockedQuotes: [],
            lastQuote: '',
            activeTheme: 'slate'
        };
    },

    readStore() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return { members: {} };

            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                throw new Error('遊戲資料格式無效');
            }
            if (parsed.members && typeof parsed.members === 'object' && !Array.isArray(parsed.members)) {
                return parsed;
            }

            if (Number.isFinite(parsed.xp) && Number.isFinite(parsed.coins)) {
                return { members: { [this.currentMember]: parsed } };
            }
            throw new Error('遊戲資料格式無效');
        } catch (error) {
            console.error('無法讀取遊戲資料：', error);
            throw error;
        }
    },

    saveStore(store) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(store));
        } catch (error) {
            console.error('無法儲存遊戲資料：', error);
            throw error;
        }
    },

    getRecords(member) {
        const raw = localStorage.getItem('blood_pressure_db');
        if (!raw) return [];

        const database = JSON.parse(raw);
        if (!database || typeof database !== 'object' || !database.members || typeof database.members !== 'object') {
            throw new Error('血壓紀錄資料格式無效，無法計算遊戲成就');
        }
        const records = database.members[member] || [];
        if (!Array.isArray(records)) throw new Error('成員血壓紀錄格式無效，無法計算遊戲成就');
        return records;
    },

    getData(member = this.currentMember) {
        const store = this.readStore();
        const existing = store.members[member];
        if (existing && Number.isFinite(existing.xp) && Number.isFinite(existing.coins)) {
            existing.coinsEarned = Number.isFinite(existing.coinsEarned) ? existing.coinsEarned : existing.coins;
            existing.shields = Number.isFinite(existing.shields) ? existing.shields : 0;
            existing.unlockedQuotes = Array.isArray(existing.unlockedQuotes) ? existing.unlockedQuotes : [];
            existing.lastQuote = typeof existing.lastQuote === 'string' ? existing.lastQuote : '';
            existing.activeTheme = typeof existing.activeTheme === 'string' ? existing.activeTheme : 'slate';
            return existing;
        }
        return this.retroactiveCalculation(member, store);
    },

    saveData(data, member = this.currentMember) {
        const store = this.readStore();
        store.members[member] = data;
        this.saveStore(store);
    },

    retroactiveCalculation(member, store = this.readStore()) {
        const totalRecords = this.getRecords(member).length;
        const initialData = this.defaultData(totalRecords * 10, totalRecords * 5);
        store.members[member] = initialData;
        this.saveStore(store);
        return initialData;
    },

    getLevel(xp) {
        if (xp >= 1500) return { level: 5, name: '薄荷翠綠', min: 1500, max: 1500 };
        if (xp >= 1000) return { level: 4, name: '清新天藍', min: 1000, max: 1500 };
        if (xp >= 600) return { level: 3, name: '暖心琥珀', min: 600, max: 1000 };
        if (xp >= 300) return { level: 2, name: '柔和粉色', min: 300, max: 600 };
        if (xp >= 100) return { level: 1, name: '深夜模式', min: 100, max: 300 };
        return { level: 0, name: '沉靜灰階', min: 0, max: 100 };
    },

    getLongestStreak(records) {
        const dates = [...new Set(records.map(record => record.date).filter(date => /^\d{4}-\d{2}-\d{2}$/.test(date)))].sort();
        let longest = 0;
        let current = 0;
        let previousDay = null;
        for (const date of dates) {
            const day = Date.parse(`${date}T00:00:00Z`);
            if (day === previousDay + 86400000) current += 1;
            else current = 1;
            longest = Math.max(longest, current);
            previousDay = day;
        }
        return longest;
    },

    setMember(member) {
        this.currentMember = member;
        this.refreshUI();
    },

    renameMember(oldName, newName) {
        const store = this.readStore();
        if (store.members[oldName]) {
            store.members[newName] = store.members[oldName];
            delete store.members[oldName];
            this.saveStore(store);
        }
        if (this.currentMember === oldName) this.currentMember = newName;
    },

    deleteMember(member) {
        const store = this.readStore();
        if (Object.hasOwn(store.members, member)) {
            delete store.members[member];
            this.saveStore(store);
        }
    },

    onBloodPressureRecorded(category, member = this.currentMember) {
        try {
            const data = this.getData(member);
            let earnedXP = 10;
            if (category === 'normal') earnedXP = 20;
            else if (category === 'normal-high') earnedXP = 15;
            else if (category === 'stage1' || category === 'mild-high' || category === 'low') earnedXP = 12;

            const earnedCoins = Math.round(earnedXP * 0.5);
            data.xp += earnedXP;
            data.coins += earnedCoins;
            data.coinsEarned += earnedCoins;
            this.saveData(data, member);
            this.refreshUI();
            alert(`🎉 紀錄成功！獲得 +${earnedXP} XP 與 ${earnedCoins} 金幣`);
        } catch (error) {
            console.error('血壓紀錄已儲存，但遊戲獎勵無法更新：', error);
            alert('血壓紀錄已儲存，但遊戲獎勵無法更新。請檢查瀏覽器儲存空間後再試。');
        }
    },

    refreshUI() {
        const badge = document.getElementById('nav-level-badge');
        if (!badge) return;
        try {
            const data = this.getData();
            const level = this.getLevel(data.xp);
            badge.textContent = `Lv.${level.level}`;
            this.renderModal(data, level);
        } catch (error) {
            console.error('無法顯示遊戲資料：', error);
            document.getElementById('quote-display').textContent = '遊戲資料目前無法讀取，請確認瀏覽器儲存設定。';
        }
    },

    renderModal(data, level) {
        const records = this.getRecords(this.currentMember);
        const progress = level.max === level.min
            ? 100
            : Math.min(100, Math.max(0, ((data.xp - level.min) / (level.max - level.min)) * 100));
        const fill = document.getElementById('progress-bar-fill');
        const progressBar = fill.parentElement;
        document.getElementById('current-level-text').textContent = `Lv. ${level.level} ${level.name}`;
        document.getElementById('xp-text').textContent = `${data.xp} / ${level.max} XP`;
        fill.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
        document.getElementById('coin-count').textContent = String(data.coins);
        document.getElementById('shield-count').textContent = String(data.shields);

        this.setBadge('badge-first', records.length > 0);
        this.setBadge('badge-streak', this.getLongestStreak(records) >= 7);
        this.setBadge('badge-rich', data.coinsEarned >= 100);
        document.getElementById('quote-display').textContent = data.lastQuote || '點擊下方按鈕抽取今日暖心小語...';
        this.renderThemes(data, level);
    },

    setBadge(id, unlocked) {
        const badge = document.getElementById(id);
        badge.classList.toggle('locked', !unlocked);
        badge.classList.toggle('unlocked', unlocked);
        badge.setAttribute('aria-label', `${badge.textContent}，${unlocked ? '已解鎖' : '未解鎖'}`);
    },

    renderThemes(data, level) {
        const container = document.getElementById('theme-buttons-container');
        const themeSelector = document.getElementById('themeSelector');
        const activeTheme = localStorage.getItem('blood_pressure_theme') || data.activeTheme;
        [...themeSelector.options].forEach(option => {
            const theme = this.themes.find(item => item.id === option.value);
            if (theme) option.disabled = theme.level > level.level;
        });
        container.replaceChildren();
        this.themes.filter(theme => theme.level <= level.level).forEach(theme => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `theme-button${activeTheme === theme.id ? ' active' : ''}`;
            button.textContent = `${theme.name}（Lv.${theme.level}）`;
            button.setAttribute('aria-pressed', String(activeTheme === theme.id));
            button.addEventListener('click', () => {
                changeTheme(theme.id);
                data.activeTheme = theme.id;
                this.saveData(data);
                this.refreshUI();
            });
            container.appendChild(button);
        });
    },

    buyShield() {
        const data = this.getData();
        if (data.coins < 50) {
            alert('金幣不足，記錄血壓即可獲得更多金幣。');
            return;
        }
        data.coins -= 50;
        data.shields += 1;
        this.saveData(data);
        this.refreshUI();
    },

    drawQuote() {
        const data = this.getData();
        if (data.coins < 20) {
            alert('金幣不足，記錄血壓即可獲得更多金幣。');
            return;
        }
        data.coins -= 20;
        const availableQuotes = this.quotes.filter(quote => !data.unlockedQuotes.includes(quote));
        const quotePool = availableQuotes.length ? availableQuotes : this.quotes;
        const quote = quotePool[Math.floor(Math.random() * quotePool.length)];
        data.unlockedQuotes.push(quote);
        data.lastQuote = quote;
        this.saveData(data);
        this.refreshUI();
    }
};

window.GameSystem = GameSystem;

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('game-modal-overlay');
    const openButton = document.getElementById('open-modal-btn');
    const closeButton = document.getElementById('close-modal-btn');
    const closeModal = () => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        openButton.focus();
    };

    openButton.addEventListener('click', () => {
        GameSystem.refreshUI();
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    });
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', event => {
        if (event.target === overlay) closeModal();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && overlay.style.display !== 'none') closeModal();
    });
    document.getElementById('buy-shield-btn').addEventListener('click', () => GameSystem.buyShield());
    document.getElementById('draw-quote-btn').addEventListener('click', () => GameSystem.drawQuote());
});