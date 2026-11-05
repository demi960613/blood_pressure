const GameSystem = {
    storageKey: 'bp_game_data',
    currentMember: '人員1',
    quoteFilter: 'all',
    quotes: [
        { category: 'mindful', text: '一步一步走，也能走到很遠的地方。' },
        { category: 'mindful', text: '真正的從容，不是沒有變化，而是願意陪自己一起適應。' },
        { category: 'mindful', text: '把注意力放回眼前能做的一小步，心就多一分安定。' },
        { category: 'mindful', text: '每個人的步調不同，適合自己的節奏就是好節奏。' },
        { category: 'mindful', text: '看見自己的努力，本身就是一種智慧。' },
        { category: 'mindful', text: '慢慢來也沒關係，每一次照顧自己都值得肯定。' },
        { category: 'mindful', text: '今天的你，已經比昨天更懂得照顧自己。' },
        { category: 'mindful', text: '休息不是停下來，而是為下一段路補充力量。' },
        { category: 'mindful', text: '願意記錄與關心自己，就是一份很棒的勇氣。' },
        { category: 'mindful', text: '深呼吸，給自己一點空間，也給心情一點溫柔。' },
        { category: 'jokes', text: '醫生說要多走路，我現在每天都走到冰箱前，來回好幾趟。' },
        { category: 'jokes', text: '我開始早睡了，現在只是把滑手機的地方從客廳搬到床上。' },
        { category: 'jokes', text: '今天做了伸展運動：伸手拿遙控器，拉筋效果……下次再說。' },
        { category: 'jokes', text: '朋友問我怎麼保持好心情？我說：先找找看，通常就在咖啡旁邊。' },
        { category: 'jokes', text: '我的運動計畫很有彈性，彈性大到每天都能延期。' },
        { category: 'jokes', text: '健康生活第一步：把餅乾放遠一點。第二步：練習走過去拿。' },
        { category: 'jokes', text: '我不是拖延運動，只是在等身體發出更有說服力的邀請。' },
        { category: 'jokes', text: '今天的待辦清單完成一項：成功把待辦清單寫好了。' },
        { category: 'daily', text: '固定時間測量並記下數值，有助於觀察自己的變化。' },
        { category: 'daily', text: '測量前安靜休息幾分鐘，讀值會更容易比較。' },
        { category: 'daily', text: '把手臂放在與心臟大約同高的位置，再開始測量。' },
        { category: 'daily', text: '單次數值只是參考；持續記錄能提供更完整的趨勢。' },
        { category: 'daily', text: '規律作息與日常活動，都是照顧健康的一部分。' },
        { category: 'daily', text: '工作或讀書一段時間後，起身活動一下、看看遠方。' },
        { category: 'daily', text: '覺得緊繃時，可以慢慢吸氣、吐氣幾次，讓自己稍作停頓。' },
        { category: 'daily', text: '喝水、吃飯、休息，這些小事也值得放進照顧自己的清單。' }
    ],
    quoteCategories: [
        { id: 'all', label: '全部' },
        { id: 'mindful', label: '🌟 心靈金句' },
        { id: 'jokes', label: '😂 療癒笑話' },
        { id: 'daily', label: '🍃 生活微日常' }
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
            unlockedBadges: [],
            unlockedQuotes: [],
            lastQuote: '',
            lastProcessedDate: '',
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
            existing.streakDays = Number.isFinite(existing.streakDays) ? existing.streakDays : 0;
            existing.lastProcessedDate = typeof existing.lastProcessedDate === 'string' ? existing.lastProcessedDate : '';
            if (!Array.isArray(existing.unlockedBadges)) {
                existing.unlockedBadges = this.getUnlockedBadges(member, existing);
            }
            existing.unlockedQuotes = Array.isArray(existing.unlockedQuotes)
                ? [...new Set(existing.unlockedQuotes.filter(quote => typeof quote === 'string'))]
                : [];
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
        const records = this.getRecords(member);
        const totalRecords = records.length;
        const initialData = this.defaultData(totalRecords * 10, totalRecords * 5);
        initialData.unlockedBadges = this.getUnlockedBadges(member, initialData, records);
        store.members[member] = initialData;
        this.saveStore(store);
        return initialData;
    },

    getTodayDate() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    },

    shiftDate(date, offset) {
        const [year, month, day] = date.split('-').map(Number);
        const shifted = new Date(year, month - 1, day);
        shifted.setDate(shifted.getDate() + offset);
        return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, '0')}-${String(shifted.getDate()).padStart(2, '0')}`;
    },

    isDate(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const [year, month, day] = value.split('-').map(Number);
        const parsed = new Date(year, month - 1, day);
        return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
    },

    getStreakEnding(records, endDate) {
        const recordedDates = new Set(records.map(record => record.date).filter(date => this.isDate(date)));
        let streak = 0;
        let date = endDate;
        while (recordedDates.has(date)) {
            streak += 1;
            date = this.shiftDate(date, -1);
        }
        return streak;
    },

    initializeMember(member = this.currentMember, { notify = true } = {}) {
        const data = this.getData(member);
        const today = this.getTodayDate();
        const records = this.getRecords(member);
        let changed = false;

        if (!this.isDate(data.lastProcessedDate)) {
            const todayRecorded = records.some(record => record.date === today);
            const anchorDate = todayRecorded ? today : this.shiftDate(today, -1);
            data.streakDays = this.getStreakEnding(records, anchorDate);
            data.lastProcessedDate = anchorDate;
            changed = true;
        }

        let shieldsUsed = 0;
        const shieldDates = [];
        let protectedStreakDays = data.streakDays;
        let streakReset = false;
        let date = this.shiftDate(data.lastProcessedDate, 1);
        while (date < today) {
            const recorded = records.some(record => record.date === date);
            if (recorded) {
                data.streakDays += 1;
            } else if (data.shields > 0) {
                data.shields -= 1;
                data.streakDays += 1;
                shieldsUsed += 1;
                shieldDates.push(date);
                protectedStreakDays = data.streakDays;
            } else if (data.streakDays > 0) {
                data.streakDays = 0;
                streakReset = true;
            }
            data.lastProcessedDate = date;
            date = this.shiftDate(date, 1);
            changed = true;
        }

        if (data.lastProcessedDate < today && records.some(record => record.date === today)) {
            data.streakDays += 1;
            data.lastProcessedDate = today;
            changed = true;
        }

        const previousBadges = Array.isArray(data.unlockedBadges) ? data.unlockedBadges : [];
        const unlockedBadges = this.getUnlockedBadges(member, data, records);
        const newlyUnlocked = unlockedBadges.filter(badge => !previousBadges.includes(badge));
        if (newlyUnlocked.length || unlockedBadges.length !== previousBadges.length) changed = true;
        data.unlockedBadges = unlockedBadges;
        if (changed) this.saveData(data, member);

        const settlement = { data, shieldsUsed, shieldDates, protectedStreakDays, streakReset, newlyUnlocked };
        if (notify) this.notifyDailySettlement(settlement);
        return settlement;
    },

    notifyDailySettlement({ shieldsUsed, shieldDates, protectedStreakDays, streakReset, newlyUnlocked }) {
        if (shieldsUsed === 0 && !streakReset && newlyUnlocked.length === 0) return;
        const messages = [];
        if (shieldsUsed > 0) {
            const yesterday = this.shiftDate(this.getTodayDate(), -1);
            const missedDays = shieldsUsed === 1 && shieldDates[0] === yesterday
                ? '昨天'
                : `日期 ${shieldDates.join('、')}`;
            messages.push(`哎呀！${missedDays}漏了血壓紀錄，好險背包裡的 🛡️ 保護盾自動出動，幫您守住連續 ${protectedStreakDays} 天的打卡紀錄！已消耗 ${shieldsUsed} 枚。`);
        }
        if (streakReset) {
            messages.push('連續紀錄已溫柔重新計算，沒關係，今天重新開始也很棒。');
        }
        if (newlyUnlocked.includes('streak')) messages.push('解鎖徽章：七日之星！');
        window.showAppToast(messages.join(' '), shieldsUsed > 0 ? 'shield' : 'success', 6000);
    },

    getUnlockedBadges(member, data, records = this.getRecords(member)) {
        const unlocked = new Set((data.unlockedBadges || []).filter(badge => ['first', 'streak', 'rich'].includes(badge)));
        if (records.length > 0) unlocked.add('first');
        if (data.streakDays >= 7 || this.getLongestStreak(records) >= 7) unlocked.add('streak');
        if (data.coinsEarned >= 100) unlocked.add('rich');
        return ['first', 'streak', 'rich'].filter(badge => unlocked.has(badge));
    },

    getLevel(xp) {
        if (xp >= 1500) return { level: 5, name: '薄荷翠綠', min: 1500, max: 1500 };
        if (xp >= 1000) return { level: 4, name: '清新天藍', min: 1000, max: 1500 };
        if (xp >= 600) return { level: 3, name: '暖心琥珀', min: 600, max: 1000 };
        if (xp >= 300) return { level: 2, name: '柔和粉色', min: 300, max: 600 };
        if (xp >= 100) return { level: 1, name: '深夜模式', min: 100, max: 300 };
        return { level: 0, name: '沉靜灰階', min: 0, max: 100 };
    },

    getAllowedTheme(themeId, data = this.getData()) {
        const theme = this.themes.find(item => item.id === themeId);
        const level = this.getLevel(data.xp).level;
        if (theme && theme.level <= level) return theme.id;

        const savedTheme = this.themes.find(item => item.id === data.activeTheme && item.level <= level);
        return savedTheme?.id || 'slate';
    },

    saveActiveTheme(themeId, member = this.currentMember) {
        const data = this.getData(member);
        data.activeTheme = this.getAllowedTheme(themeId, data);
        this.saveData(data, member);
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
        let shieldsUsed = 0;
        let newlyUnlockedBadges = [];
        try {
            const settlement = this.initializeMember(member);
            shieldsUsed = settlement.shieldsUsed;
            newlyUnlockedBadges = settlement.newlyUnlocked;
        } catch (error) {
            console.error('無法結算成員的每日連續紀錄：', error);
            window.showAppToast('每日紀錄結算失敗，請確認本機資料儲存狀態。', 'error');
        }
        this.refreshUI({ shieldUsed: shieldsUsed > 0, newlyUnlockedBadges });
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

    onBloodPressureRecorded(category, member = this.currentMember, recordDate = this.getTodayDate(), settlement = null) {
        try {
            settlement = settlement || this.initializeMember(member, { notify: false });
            const data = settlement.data;
            const today = this.getTodayDate();
            if (recordDate === today && data.lastProcessedDate < today) {
                data.streakDays += 1;
                data.lastProcessedDate = today;
            }
            const previousLevel = this.getLevel(data.xp).level;
            const previousBadges = [...data.unlockedBadges];
            let earnedXP = 10;
            if (category === 'normal') earnedXP = 20;
            else if (category === 'normal-high') earnedXP = 15;
            else if (category === 'stage1' || category === 'mild-high' || category === 'low') earnedXP = 12;

            const earnedCoins = Math.round(earnedXP * 0.5);
            data.xp += earnedXP;
            data.coins += earnedCoins;
            data.coinsEarned += earnedCoins;
            const currentBadges = this.getUnlockedBadges(member, data);
            const newlyUnlockedBadges = currentBadges.filter(badge => !previousBadges.includes(badge));
            data.unlockedBadges = currentBadges;
            this.saveData(data, member);
            this.refreshUI({ shieldUsed: settlement.shieldsUsed > 0, newlyUnlockedBadges });
            const messages = [`紀錄成功！獲得 +${earnedXP} XP、${earnedCoins} 金幣`];
            if (recordDate === today) messages.push(`連續紀錄 ${data.streakDays} 天`);
            if (settlement.shieldsUsed > 0 || settlement.streakReset) {
                if (settlement.shieldsUsed > 0) {
                    messages.push(`保護盾已自動守住連續 ${settlement.protectedStreakDays} 天紀錄，消耗 ${settlement.shieldsUsed} 枚`);
                }
                if (settlement.streakReset) messages.push('漏記後已溫柔重新開始，今天重新出發也很棒');
            }
            if (settlement.newlyUnlocked.includes('streak')) messages.push('解鎖徽章：七日之星');
            const newLevel = this.getLevel(data.xp);
            if (newLevel.level > previousLevel) messages.push(`升級至 Lv.${newLevel.level} ${newLevel.name}`);
            const badgeNames = {
                first: '初次見面',
                streak: '七日之星',
                rich: '百寶箱'
            };
            newlyUnlockedBadges.forEach(badge => messages.push(`解鎖徽章：${badgeNames[badge]}`));
            window.showAppToast(messages.join('！'), settlement.shieldsUsed > 0 ? 'shield' : 'success', 5000);
        } catch (error) {
            console.error('血壓紀錄已儲存，但遊戲獎勵無法更新：', error);
            alert('血壓紀錄已儲存，但遊戲獎勵無法更新。請檢查瀏覽器儲存空間後再試。');
        }
    },

    refreshUI({ shieldUsed = false, animateQuote = null, newlyUnlockedBadges = [] } = {}) {
        const badge = document.getElementById('nav-level-badge');
        if (!badge) return;
        try {
            const data = this.getData();
            const level = this.getLevel(data.xp);
            badge.textContent = `Lv.${level.level}`;
            const selectedTheme = localStorage.getItem('blood_pressure_theme') || data.activeTheme;
            const allowedTheme = this.getAllowedTheme(selectedTheme, data);
            if (selectedTheme !== allowedTheme) {
                changeTheme(allowedTheme);
                const theme = this.themes.find(item => item.id === allowedTheme);
                window.showAppToast(`目前成員尚未解鎖原主題，已切換為「${theme.name}」。`, 'error');
            }
            this.renderModal(data, level, { shieldUsed, animateQuote, newlyUnlockedBadges });
        } catch (error) {
            console.error('無法顯示遊戲資料：', error);
            document.getElementById('quote-display').textContent = '遊戲資料目前無法讀取，請確認瀏覽器儲存設定。';
        }
    },

    renderModal(data, level, { shieldUsed = false, animateQuote = null, newlyUnlockedBadges = [] } = {}) {
        const records = this.getRecords(this.currentMember);
        const progress = level.max === level.min
            ? 100
            : Math.min(100, Math.max(0, ((data.xp - level.min) / (level.max - level.min)) * 100));
        const xpWithinLevel = Math.max(0, data.xp - level.min);
        const xpForLevel = level.max - level.min;
        const fill = document.getElementById('progress-bar-fill');
        const progressBar = fill.parentElement;
        document.getElementById('current-level-text').textContent = `Lv. ${level.level} ${level.name}`;
        document.getElementById('xp-text').textContent = xpForLevel === 0
            ? `已達最高等級 · ${data.xp} XP`
            : `${xpWithinLevel} / ${xpForLevel} XP`;
        document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
        fill.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
        document.getElementById('coin-count').textContent = String(data.coins);
        const shieldCount = document.getElementById('shield-count');
        shieldCount.textContent = String(data.shields);
        if (shieldUsed) this.playAnimation(shieldCount, 'shield-used-animation');
        document.getElementById('streak-count').textContent = String(data.streakDays);

        this.setBadge('badge-first', records.length > 0, newlyUnlockedBadges.includes('first'));
        this.setBadge('badge-streak', data.streakDays >= 7 || this.getLongestStreak(records) >= 7, newlyUnlockedBadges.includes('streak'));
        this.setBadge('badge-rich', data.coinsEarned >= 100, newlyUnlockedBadges.includes('rich'));
        const quoteDisplay = document.getElementById('quote-display');
        quoteDisplay.textContent = data.lastQuote || '點擊下方按鈕抽取今日暖心小語...';
        if (animateQuote) this.playAnimation(quoteDisplay, 'quote-reveal-animation');
        this.renderQuoteCollection(data, animateQuote);
        this.renderThemes(data, level);
    },

    renderQuoteCollection(data, animateQuote = null) {
        const collection = document.getElementById('quote-collection');
        const quotes = Array.isArray(data.unlockedQuotes) ? data.unlockedQuotes : [];
        const quoteTabs = document.getElementById('quote-category-tabs');
        const categorizedQuotes = quotes.map(text => {
            const quote = this.quotes.find(entry => entry.text === text);
            return {
                text,
                category: quote?.category || ([
                    '慢慢來也沒關係，每一次照顧自己都值得肯定。',
                    '今天的你，已經比昨天更懂得照顧自己。',
                    '休息不是停下來，而是為下一段路補充力量。',
                    '願意記錄與關心自己，就是一份很棒的勇氣。',
                    '深呼吸，給自己一點空間，也給心情一點溫柔。'
                ].includes(text) ? 'mindful' : 'daily')
            };
        });
        const counts = {
            all: categorizedQuotes.length,
            mindful: categorizedQuotes.filter(quote => quote.category === 'mindful').length,
            jokes: categorizedQuotes.filter(quote => quote.category === 'jokes').length,
            daily: categorizedQuotes.filter(quote => quote.category === 'daily').length
        };
        document.getElementById('quote-collection-count').textContent = `${counts.all} 句`;
        this.quoteCategories.forEach(category => {
            const count = document.getElementById(`quote-tab-count-${category.id}`);
            const button = document.getElementById(`quote-tab-${category.id}`);
            count.textContent = String(counts[category.id]);
            button.setAttribute('aria-selected', String(this.quoteFilter === category.id));
            button.classList.toggle('active', this.quoteFilter === category.id);
        });
        collection.replaceChildren();
        const visibleQuotes = this.quoteFilter === 'all'
            ? this.interleaveQuotes(categorizedQuotes)
            : categorizedQuotes.filter(quote => quote.category === this.quoteFilter);
        if (visibleQuotes.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'quote-library-empty';
            empty.textContent = categorizedQuotes.length === 0
                ? '解鎖的收藏會永久保存在這裡。'
                : '這個分類還沒有收藏，解鎖新卡片後就會出現在這裡。';
            collection.appendChild(empty);
            return;
        }

        visibleQuotes.forEach(({ text, category: categoryId }) => {
            const item = document.createElement('article');
            item.className = 'quote-library-item';
            const quote = this.quotes.find(entry => entry.text === text);
            const category = document.createElement('span');
            category.textContent = this.quoteCategories.find(entry => entry.id === categoryId)?.label || '已收藏';
            const content = document.createElement('div');
            content.textContent = text;
            if (text === animateQuote) item.classList.add('quote-reveal-animation');
            item.append(category, content);
            collection.appendChild(item);
        });
    },

    interleaveQuotes(quotes) {
        const groups = this.quoteCategories
            .filter(category => category.id !== 'all')
            .map(category => quotes.filter(quote => quote.category === category.id));
        const interleaved = [];
        for (let index = 0; groups.some(group => index < group.length); index += 1) {
            groups.forEach(group => {
                if (group[index]) interleaved.push(group[index]);
            });
        }
        return interleaved;
    },

    selectQuoteCategory(category) {
        if (!this.quoteCategories.some(item => item.id === category)) return;
        this.quoteFilter = category;
        this.renderQuoteCollection(this.getData());
    },

    setBadge(id, unlocked, newlyUnlocked = false) {
        const badge = document.getElementById(id);
        badge.classList.toggle('locked', !unlocked);
        badge.classList.toggle('unlocked', unlocked);
        badge.setAttribute('aria-label', `${badge.textContent}，${unlocked ? '已解鎖' : '未解鎖'}`);
        if (newlyUnlocked && unlocked) this.playAnimation(badge, 'badge-unlock-animation');
    },

    playAnimation(element, className) {
        element.classList.remove(className);
        void element.offsetWidth;
        element.classList.add(className);
        element.addEventListener('animationend', () => element.classList.remove(className), { once: true });
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
            window.showAppToast('金幣不足，記錄血壓即可獲得更多金幣。', 'error');
            return;
        }
        data.coins -= 50;
        data.shields += 1;
        this.saveData(data);
        this.refreshUI();
        window.showAppToast('已將 1 枚保護盾放入背包。');
    },

    drawQuote() {
        const data = this.getData();
        const availableQuotes = this.quotes.filter(quote => !data.unlockedQuotes.includes(quote.text));
        if (availableQuotes.length === 0) {
            window.showAppToast('心靈圖書館的語錄已全數收藏，隨時都能回來翻閱。');
            return;
        }
        if (data.coins < 20) {
            window.showAppToast('金幣不足，記錄血壓即可獲得更多金幣。', 'error');
            return;
        }
        data.coins -= 20;
        const quote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        data.unlockedQuotes.push(quote.text);
        data.lastQuote = quote.text;
        this.saveData(data);
        this.refreshUI({ animateQuote: quote.text });
        window.showAppToast(`已收藏一則${quote.category}，可在心靈圖書館隨時重讀。`);
    }
};

window.GameSystem = GameSystem;

let appToastTimeout;
window.showAppToast = (message, type = 'success', duration = 3200) => {
    const region = document.getElementById('app-toast-region');
    if (!region) return;

    window.clearTimeout(appToastTimeout);
    region.replaceChildren();
    const toast = document.createElement('div');
    toast.className = `app-toast${type === 'error' ? ' error' : type === 'shield' ? ' shield' : ''}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.textContent = message;
    region.appendChild(toast);
    window.requestAnimationFrame(() => toast.classList.add('visible'));
    appToastTimeout = window.setTimeout(() => {
        toast.classList.remove('visible');
        window.setTimeout(() => toast.remove(), 220);
    }, duration);
};

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('game-modal-overlay');
    const openButton = document.getElementById('open-modal-btn');
    const closeButton = document.getElementById('close-modal-btn');
    let closeModalTimeout;
    const closeModal = () => {
        if (overlay.style.display === 'none') return;
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        window.clearTimeout(closeModalTimeout);
        const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
        closeModalTimeout = window.setTimeout(() => {
            overlay.style.display = 'none';
            openButton.focus();
        }, closeDelay);
    };

    openButton.addEventListener('click', () => {
        window.clearTimeout(closeModalTimeout);
        GameSystem.setMember(GameSystem.currentMember);
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        window.requestAnimationFrame(() => overlay.classList.add('is-open'));
        closeButton.focus();
    });
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', event => {
        if (event.target === overlay) closeModal();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && overlay.style.display !== 'none') closeModal();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') GameSystem.setMember(GameSystem.currentMember);
    });
    document.getElementById('buy-shield-btn').addEventListener('click', () => GameSystem.buyShield());
    document.getElementById('draw-quote-btn').addEventListener('click', () => GameSystem.drawQuote());
});