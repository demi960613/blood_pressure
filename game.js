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
        { id: 'dark', name: '靜謐墨黑', level: 1 },
        { id: 'rose', name: '柔和粉紅', level: 2 },
        { id: 'amber', name: '暖心琥珀', level: 3 },
        { id: 'blue', name: '清新天藍', level: 4 },
        { id: 'emerald', name: '薄荷翠綠', level: 5 }
    ],
    demoScenarioId: 'beginner',
    demoSimulated: false,
    demoScenarios: {
        beginner: {
            name: '新手小晴',
            description: '本月第一次記錄可獲得「初次見面」徽章；每筆記錄都能獲得 XP 和金幣，當天首次記錄還能免費抽卡。',
            action: '模擬健康正常紀錄',
            before: { xp: 0, coins: 0, shields: 0, streak: 0 },
            after: { xp: 20, coins: 10, shields: 0, streak: 1 },
            result: '獲得 +20 XP、+10 金幣，連續紀錄 1 天，並解鎖本月的「初次見面」徽章與當日免費抽卡；同月後續記錄不會再次解鎖。'
        },
        streak: {
            name: '連續打卡小安',
            description: '已累積 290 XP，今天是連續紀錄第 7 天。完成記錄後，XP 升級並領到七日獎勵。',
            action: '模擬偏高數值紀錄',
            before: { xp: 290, coins: 140, shields: 0, streak: 6 },
            after: { xp: 305, coins: 248, shields: 0, streak: 7 },
            result: '獲得 +15 XP、+8 金幣；升到 Lv.2，連續滿 7 天再獲得 +100 金幣與「七日之星」徽章。'
        },
        shield: {
            name: '保護盾小哲',
            description: '昨天忙到忘記記錄，但背包裡有 1 枚保護盾，系統會自動消耗它來延續紀錄。',
            action: '模擬漏記一天',
            before: { xp: 620, coins: 90, shields: 1, streak: 12 },
            after: { xp: 620, coins: 90, shields: 0, streak: 13 },
            result: '保護盾自動消耗 1 枚，連續紀錄延續到 13 天，並累計一次「守護天使」徽章；XP 與金幣不變。'
        },
        rebirth: {
            name: '轉生小林',
            description: '已到達 Lv.5 滿等（1,500 XP）。滿等後再獲得 XP 才會轉生。',
            action: '模擬滿等後獲得 XP',
            before: { xp: 1500, coins: 300, shields: 0, streak: 5 },
            after: { xp: 1510, coins: 505, shields: 0, streak: 6 },
            result: 'Lv.5 滿等時不會立刻轉生；再獲得 +10 XP 後轉生為 Lv.0 ★1，並獲得 +200 金幣與轉生徽章。'
        },
        historicalImport: {
            name: '匯入紀錄小芸',
            description: '示範匯入 7 筆連續歷史紀錄，開始前會先確認。新增日期會補發 XP、金幣；相同成員與日期的紀錄會更新，但不會重複發獎。',
            action: '模擬匯入 7 筆新紀錄',
            before: { xp: 280, coins: 100, shields: 0, streak: 0 },
            after: { xp: 350, coins: 235, shields: 0, streak: 7 },
            result: '新增 7 筆各得 +10 XP、+5 金幣，連續 7 天再獲得 +100 金幣並解鎖「七日之星」。同日期紀錄會更新但不重複發獎；完成後會顯示可手動關閉的通知。',
            confirmation: '這是匯入流程示範，不會讀取檔案或修改資料。要繼續查看模擬結果嗎？',
            notice: '匯入示範完成：相同成員與日期的紀錄會更新，但不會重複發放 XP 或金幣。'
        }
    },

    defaultData(xp = 0, coins = 0) {
        return {
            xp,
            coins,
            coinsEarned: coins,
            shields: 0,
            streakDays: 0,
            lastStreakBadgeDay: 0,
            unlockedBadges: [],
            badgeCounts: { first: 0, streak: 0, rich: 0, shield: 0, library: 0, reincarnation: 0 },
            unlockedQuotes: [],
            lastQuote: '',
            totalCardsDrawn: 0,
            lastFreeDrawDate: '',
            lastProcessedDate: '',
            hasImportedHistoricalRecords: false,
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
            let changed = false;
            const ensure = (key, value) => {
                if (existing[key] === undefined || existing[key] === null) {
                    existing[key] = value;
                    changed = true;
                }
            };
            if (!Number.isFinite(existing.coinsEarned)) {
                existing.coinsEarned = existing.coins;
                changed = true;
            }
            if (!Number.isFinite(existing.shields)) {
                existing.shields = 0;
                changed = true;
            }
            if (!Number.isFinite(existing.streakDays)) {
                existing.streakDays = 0;
                changed = true;
            }
            existing.lastProcessedDate = typeof existing.lastProcessedDate === 'string' ? existing.lastProcessedDate : '';
            existing.lastStreakBadgeDay = Number.isFinite(existing.lastStreakBadgeDay) ? existing.lastStreakBadgeDay : 0;
            if (!Number.isFinite(existing.totalCardsDrawn) || existing.totalCardsDrawn < 0) {
                existing.totalCardsDrawn = 0;
                changed = true;
            }
            ensure('lastFreeDrawDate', '');
            ensure('hasImportedHistoricalRecords', false);
            if (!existing.badgeCounts || typeof existing.badgeCounts !== 'object' || Array.isArray(existing.badgeCounts)) {
                existing.badgeCounts = {
                    first: 0,
                    streak: 0,
                    rich: 0,
                    shield: 0,
                    library: 0,
                    reincarnation: this.getReincarnationCount(existing.xp)
                };
                changed = true;
            }
            const legacyBadges = Array.isArray(existing.unlockedBadges) ? existing.unlockedBadges : [];
            ['first', 'streak', 'rich', 'shield', 'library', 'reincarnation'].forEach(id => {
                if (!Number.isFinite(existing.badgeCounts[id])) {
                    existing.badgeCounts[id] = legacyBadges.includes(id)
                        ? 1
                        : id === 'reincarnation' ? this.getReincarnationCount(existing.xp) : 0;
                    changed = true;
                } else if (existing.badgeCounts[id] < 0) {
                    existing.badgeCounts[id] = 0;
                    changed = true;
                }
            });
            if (!Array.isArray(existing.unlockedBadges)) {
                existing.unlockedBadges = this.getUnlockedBadges(member, existing);
                changed = true;
            }
            existing.unlockedQuotes = Array.isArray(existing.unlockedQuotes)
                ? [...new Set(existing.unlockedQuotes.filter(quote => typeof quote === 'string'))]
                : [];
            existing.lastQuote = typeof existing.lastQuote === 'string' ? existing.lastQuote : '';
            existing.activeTheme = typeof existing.activeTheme === 'string' ? existing.activeTheme : 'slate';
            if (changed) this.saveStore(store);
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
        const reincarnations = this.getReincarnationCount(initialData.xp);
        initialData.badgeCounts.first = this.countRecordedMonths(records);
        initialData.badgeCounts.streak = this.countRecordedStreakBadges(records);
        initialData.badgeCounts.reincarnation = reincarnations;
        const bonusCoins = initialData.badgeCounts.streak * 100 + reincarnations * 200;
        initialData.coins += bonusCoins;
        initialData.coinsEarned += bonusCoins;
        initialData.badgeCounts.rich = Math.floor(initialData.coinsEarned / 500);
        initialData.unlockedBadges = this.getUnlockedBadges(member, initialData, records);
        store.members[member] = initialData;
        this.saveStore(store);
        return initialData;
    },

    onHistoricalRecordsImported(member, addedRecordCount) {
        if (!Number.isInteger(addedRecordCount) || addedRecordCount <= 0) return null;

        const store = this.readStore();
        const existing = store.members[member];
        const isInitialCalculation = !existing;
        let data;
        let previousBadgeCounts;
        let newlyUnlocked = [];
        let previousXP = 0;
        let previousCoins = 0;
        let wasImportedBefore = false;

        if (existing && Number.isFinite(existing.xp) && Number.isFinite(existing.coins)) {
            data = this.getData(member);
            previousXP = data.xp;
            previousCoins = data.coins;
            wasImportedBefore = data.hasImportedHistoricalRecords === true;
            previousBadgeCounts = { ...data.badgeCounts };
            const previousStar = this.getReincarnationCount(data.xp);
            data.xp += addedRecordCount * 10;
            data.coins += addedRecordCount * 5;
            data.coinsEarned += addedRecordCount * 5;

            const reincarnations = this.getReincarnationCount(data.xp) - previousStar;
            if (reincarnations > 0) {
                const bonusCoins = reincarnations * 200;
                data.coins += bonusCoins;
                data.coinsEarned += bonusCoins;
                data.badgeCounts.reincarnation += reincarnations;
            }
            this.saveData(data, member);
        }

        const settlement = this.initializeMember(member, { notify: false });
        data = settlement.data;
        previousBadgeCounts = previousBadgeCounts || { ...data.badgeCounts };

        const historicalStreakBadges = this.countRecordedStreakBadges(this.getRecords(member));
        const additionalStreakBadges = Math.max(0, historicalStreakBadges - data.badgeCounts.streak);
        if (additionalStreakBadges > 0) {
            const bonusCoins = additionalStreakBadges * 100;
            data.badgeCounts.streak += additionalStreakBadges;
            data.coins += bonusCoins;
            data.coinsEarned += bonusCoins;
        }

        const currentBadges = this.getUnlockedBadges(member, data);
        newlyUnlocked = [...new Set([
            ...settlement.newlyUnlocked,
            ...currentBadges.filter(badge => (data.badgeCounts[badge] || 0) > (previousBadgeCounts[badge] || 0))
        ])];
        data.unlockedBadges = currentBadges;
        if (isInitialCalculation) wasImportedBefore = data.hasImportedHistoricalRecords === true;
        data.hasImportedHistoricalRecords = true;
        this.saveData(data, member);

        if (member === this.currentMember) this.refreshUI({ newlyUnlockedBadges: newlyUnlocked });
        const badgeNames = {
            first: '初次見面',
            streak: '七日之星',
            rich: '百寶箱',
            shield: '守護天使',
            library: '心靈富翁',
            reincarnation: '轉生重置與體驗'
        };
        const reportedBadges = isInitialCalculation ? currentBadges : newlyUnlocked;
        return {
            member,
            addedRecordCount,
            firstImport: !wasImportedBefore,
            isInitialCalculation,
            xpGained: isInitialCalculation ? data.xp : data.xp - previousXP,
            coinsGained: isInitialCalculation ? data.coins : data.coins - previousCoins,
            totalXP: data.xp,
            totalCoins: data.coins,
            badges: reportedBadges.map(badge => badgeNames[badge] || badge)
        };
    },

    countRecordedStreakBadges(records) {
        const dates = [...new Set(records.map(record => record.date).filter(date => this.isDate(date)))].sort();
        let total = 0;
        let streak = 0;
        let previousDate = '';
        dates.forEach(date => {
            streak = previousDate && this.shiftDate(previousDate, 1) === date ? streak + 1 : 1;
            if (streak % 7 === 0) total += 1;
            previousDate = date;
        });
        return total;
    },

    countRecordedMonths(records) {
        return new Set(records
            .map(record => record.date)
            .filter(date => this.isDate(date))
            .map(date => date.slice(0, 7))).size;
    },

    incrementBadge(data, id) {
        data.badgeCounts[id] = (data.badgeCounts[id] || 0) + 1;
    },

    awardStreakBadge(data) {
        this.incrementBadge(data, 'streak');
        data.coins += 100;
        data.coinsEarned += 100;
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
        let streakBonusCoins = 0;
        const shieldDates = [];
        let protectedStreakDays = data.streakDays;
        let streakReset = false;
        const previousBadgeCounts = { ...data.badgeCounts };
        const previousUnlockedBadges = Array.isArray(data.unlockedBadges) ? [...data.unlockedBadges] : [];
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
                this.incrementBadge(data, 'shield');
            } else if (data.streakDays > 0) {
                data.streakDays = 0;
                data.lastStreakBadgeDay = 0;
                streakReset = true;
            }
            if (data.streakDays > 0 && data.streakDays % 7 === 0 && data.lastStreakBadgeDay !== data.streakDays) {
                this.awardStreakBadge(data);
                streakBonusCoins += 100;
                data.lastStreakBadgeDay = data.streakDays;
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

        const unlockedBadges = this.getUnlockedBadges(member, data, records);
        const newlyUnlocked = unlockedBadges.filter(badge => (data.badgeCounts[badge] || 0) > (previousBadgeCounts[badge] || 0));
        if (newlyUnlocked.length || unlockedBadges.length !== previousUnlockedBadges.length) changed = true;
        data.unlockedBadges = unlockedBadges;
        if (changed) this.saveData(data, member);

        const settlement = {
            data,
            shieldsUsed,
            shieldDates,
            protectedStreakDays,
            streakReset,
            streakBonusCoins,
            shieldBadgeCount: data.badgeCounts.shield,
            newlyUnlocked
        };
        if (notify) this.notifyDailySettlement(settlement);
        return settlement;
    },

    notifyDailySettlement({
        shieldsUsed,
        shieldDates,
        protectedStreakDays,
        streakReset,
        streakBonusCoins,
        shieldBadgeCount,
        newlyUnlocked
    }) {
        if (shieldsUsed === 0 && !streakReset && newlyUnlocked.length === 0) return;
        const messages = [];
        if (shieldsUsed > 0) {
            const yesterday = this.shiftDate(this.getTodayDate(), -1);
            const missedDays = shieldsUsed === 1 && shieldDates[0] === yesterday
                ? '昨天'
                : `日期 ${shieldDates.join('、')}`;
            messages.push(`${missedDays}未記錄，系統已自動使用 ${shieldsUsed} 枚保護盾，延續連續 ${protectedStreakDays} 天的紀錄。`);
            if (shieldBadgeCount > 0) messages.push(`守護天使徽章累計 x${shieldBadgeCount}。`);
        }
        if (streakReset) {
            messages.push('有未受保護的漏記日，連續天數已歸零重新計算；不會扣除 XP、等級、金幣或主題權限。沒關係，健康管理是長久的旅程，我們今天一起重新出發！');
        }
        if (newlyUnlocked.includes('streak')) messages.push('解鎖徽章：七日之星！');
        if (streakBonusCoins > 0) messages.push(`七日之星獎勵 +${streakBonusCoins} 金幣`);
        if (shieldsUsed > 0) {
            window.showAppModal('🛡️ 保護盾自動救援', '已為您處理漏記，以下是本次結算：', messages);
        } else {
            window.showAppToast(messages.join(' '), 'success', 2500);
        }
    },

    getUnlockedBadges(member, data, records = this.getRecords(member)) {
        if (!data.badgeCounts || typeof data.badgeCounts !== 'object') {
            data.badgeCounts = { first: 0, streak: 0, rich: 0, shield: 0, library: 0, reincarnation: 0 };
        }
        data.badgeCounts.first = Math.max(data.badgeCounts.first || 0, this.countRecordedMonths(records));
        data.badgeCounts.rich = Math.max(data.badgeCounts.rich || 0, Math.floor((data.coinsEarned || 0) / 500));
        data.badgeCounts.library = Math.max(data.badgeCounts.library || 0, Math.floor((data.totalCardsDrawn || 0) / 10));
        return ['first', 'streak', 'rich', 'shield', 'library', 'reincarnation']
            .filter(badge => data.badgeCounts[badge] > 0);
    },

    getLevel(xp) {
        const star = this.getReincarnationCount(xp);
        const cycleXP = xp - star * 1500;
        if (cycleXP >= 1500) return { level: 5, star, name: '薄荷翠綠', min: 1500, max: 1500 };
        if (cycleXP >= 1000) return { level: 4, star, name: '清新天藍', min: 1000, max: 1500 };
        if (cycleXP >= 600) return { level: 3, star, name: '暖心琥珀', min: 600, max: 1000 };
        if (cycleXP >= 300) return { level: 2, star, name: '柔和粉紅', min: 300, max: 600 };
        if (cycleXP >= 100) return { level: 1, star, name: '靜謐墨黑', min: 100, max: 300 };
        return { level: 0, star, name: '沉靜灰階', min: 0, max: 100 };
    },

    getReincarnationCount(xp) {
        return xp > 0 ? Math.floor((xp - 1) / 1500) : 0;
    },

    getCycleXP(xp, level = this.getLevel(xp)) {
        return xp - level.star * 1500;
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
            let streakBonusCoins = 0;
            if (recordDate === today && data.lastProcessedDate < today) {
                data.streakDays += 1;
                data.lastProcessedDate = today;
                if (data.streakDays > 0 && data.streakDays % 7 === 0 && data.lastStreakBadgeDay !== data.streakDays) {
                    this.awardStreakBadge(data);
                    streakBonusCoins = 100;
                    data.lastStreakBadgeDay = data.streakDays;
                }
            }
            const previousStar = this.getReincarnationCount(data.xp);
            const previousLevel = this.getLevel(data.xp).level;
            const previousBadgeCounts = { ...data.badgeCounts };
            let earnedXP = 10;
            if (category === 'normal') earnedXP = 20;
            else if (category === 'normal-high') earnedXP = 15;
            else if (category === 'low') earnedXP = 15;
            else if (category === 'stage1' || category === 'mild-high') earnedXP = 12;

            const earnedCoins = Math.round(earnedXP * 0.5);
            data.xp += earnedXP;
            data.coins += earnedCoins;
            data.coinsEarned += earnedCoins;
            const newStar = this.getReincarnationCount(data.xp);
            const reincarnations = newStar - previousStar;
            if (reincarnations > 0) {
                const bonusCoins = reincarnations * 200;
                data.coins += bonusCoins;
                data.coinsEarned += bonusCoins;
                data.badgeCounts.reincarnation += reincarnations;
            }
            if (recordDate === today && data.lastFreeDrawDate !== today) {
                data.lastFreeDrawDate = today;
                this.awardQuote(data);
            }
            const currentBadges = this.getUnlockedBadges(member, data);
            const newlyUnlockedBadges = [...new Set([
                ...settlement.newlyUnlocked,
                ...currentBadges.filter(badge => (data.badgeCounts[badge] || 0) > (previousBadgeCounts[badge] || 0))
            ])];
            data.unlockedBadges = currentBadges;
            this.saveData(data, member);
            this.refreshUI({ shieldUsed: settlement.shieldsUsed > 0, newlyUnlockedBadges });
            const newLevel = this.getLevel(data.xp);
            const badgeNames = {
                first: '初次見面',
                streak: '七日之星',
                rich: '百寶箱',
                shield: '守護天使',
                library: '心靈富翁',
                reincarnation: '轉生重置與體驗'
            };
            const criticalDetails = [];
            criticalDetails.push(`本次記錄獲得 +${earnedXP} XP、+${earnedCoins} 金幣。`);
            if (recordDate === today) criticalDetails.push(`連續紀錄 ${data.streakDays} 天。`);
            if (newLevel.level > previousLevel && reincarnations === 0) {
                criticalDetails.push(`升級至 Lv.${newLevel.level}${newLevel.star ? ` ★${newLevel.star}` : ''} ${newLevel.name}。`);
            }
            if (settlement.shieldsUsed > 0) {
                criticalDetails.push(`已自動使用 ${settlement.shieldsUsed} 枚保護盾，延續連續 ${settlement.protectedStreakDays} 天的紀錄。`);
            }
            if (streakBonusCoins > 0) criticalDetails.push(`七日之星獎勵 +${streakBonusCoins} 金幣。`);
            newlyUnlockedBadges.forEach(badge => criticalDetails.push(`解鎖徽章：${badgeNames[badge]}`));
            if (reincarnations > 0) {
                criticalDetails.push(`已轉生至 Lv.${newLevel.level}${newLevel.star ? ` ★${newLevel.star}` : ''}。`);
                criticalDetails.push(`獲得轉生獎勵 +${reincarnations * 200} 金幣。`);
            }
            if (settlement.shieldsUsed > 0 || reincarnations > 0) {
                window.showAppModal(
                    reincarnations > 0 ? '🎉 轉生成功！' : '🛡️ 保護盾自動救援',
                    reincarnations > 0 && settlement.shieldsUsed > 0
                        ? '保護盾救援與轉生結算已完成。'
                        : reincarnations > 0 ? '恭喜達成 Lv.5 滿等轉生！' : '已為您處理漏記，連續紀錄獲得保護。',
                    criticalDetails
                );
            } else {
                const dailyMessage = `記錄完成 +${earnedXP} XP、+${earnedCoins} 金幣${recordDate === today ? `，連續 ${data.streakDays} 天` : ''}${newLevel.level > previousLevel ? `，升級至 Lv.${newLevel.level}${newLevel.star ? ` ★${newLevel.star}` : ''}` : ''}${streakBonusCoins ? `，七日獎勵 +${streakBonusCoins} 金幣` : ''}${settlement.streakReset ? '，連續天數已重新計算' : ''}${newlyUnlockedBadges.length ? `，解鎖 ${newlyUnlockedBadges.map(badge => badgeNames[badge]).join('、')}` : ''}`;
                window.showAppToast(dailyMessage, 'success', 2200);
            }
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
            badge.textContent = `Lv.${level.level}${level.star ? ` ★${level.star}` : ''}`;
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
        const cycleXP = this.getCycleXP(data.xp, level);
        const progress = level.max === level.min
            ? 100
            : Math.min(100, Math.max(0, ((cycleXP - level.min) / (level.max - level.min)) * 100));
        const fill = document.getElementById('progress-bar-fill');
        const progressBar = fill.parentElement;
        document.getElementById('current-level-label').textContent = `Lv. ${level.level}${level.star ? ` ★${level.star}` : ''} ${level.name}`;
        document.getElementById('total-xp-text').textContent = String(data.xp);
        document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
        fill.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
        document.getElementById('coin-count').textContent = String(data.coins);
        const shieldCount = document.getElementById('shield-count');
        shieldCount.textContent = String(data.shields);
        if (shieldUsed) this.playAnimation(shieldCount, 'shield-used-animation');
        document.getElementById('streak-count').textContent = String(data.streakDays);
        const isFreeDrawAvailable = data.lastFreeDrawDate !== this.getTodayDate();
        document.getElementById('draw-quote-btn').textContent = isFreeDrawAvailable
            ? '免費抽取今日首張卡片（重複卡返還 10 金幣）'
            : '消耗 20 金幣抽取卡片（重複卡返還 10 金幣）';

        this.setBadge('badge-first', data.badgeCounts.first, newlyUnlockedBadges.includes('first'));
        this.setBadge('badge-streak', data.badgeCounts.streak, newlyUnlockedBadges.includes('streak'));
        this.setBadge('badge-rich', data.badgeCounts.rich, newlyUnlockedBadges.includes('rich'));
        this.setBadge('badge-shield', data.badgeCounts.shield, newlyUnlockedBadges.includes('shield'));
        this.setBadge('badge-library', data.badgeCounts.library, newlyUnlockedBadges.includes('library'));
        this.setBadge('badge-reincarnation', data.badgeCounts.reincarnation, newlyUnlockedBadges.includes('reincarnation'));
        const quoteDisplay = document.getElementById('quote-display');
        quoteDisplay.textContent = data.lastQuote || '點擊下方按鈕抽取今日暖心小語...';
        if (animateQuote) this.playAnimation(quoteDisplay, 'quote-reveal-animation');
        this.renderQuoteCollection(data, animateQuote);
        this.renderThemes(data, level);
    },

    selectDemoScenario(id) {
        if (!Object.hasOwn(this.demoScenarios, id)) return;
        this.demoScenarioId = id;
        this.demoSimulated = false;
        this.renderDemoScenario();
    },

    simulateDemoScenario() {
        const scenario = this.demoScenarios[this.demoScenarioId];
        if (scenario?.confirmation && !window.confirm(scenario.confirmation)) return;
        this.demoSimulated = true;
        this.renderDemoScenario();
        if (scenario?.notice) window.showAppToast(scenario.notice, 'success', 0);
    },

    renderDemoScenario() {
        const scenario = this.demoScenarios[this.demoScenarioId];
        if (!scenario) return;
        const state = this.demoSimulated ? scenario.after : scenario.before;
        const level = this.getLevel(state.xp);
        const cycleXP = this.getCycleXP(state.xp, level);
        const progress = level.max === level.min
            ? 100
            : Math.min(100, Math.max(0, ((cycleXP - level.min) / (level.max - level.min)) * 100));
        const progressBar = document.querySelector('.game-demo-progress');

        document.querySelectorAll('[data-demo-person]').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.demoPerson === this.demoScenarioId));
        });
        document.getElementById('game-demo-title').textContent = `${scenario.name}的${this.demoSimulated ? '模擬結果' : '目前狀態'}`;
        document.getElementById('game-demo-level').textContent =
            level.level === 5
                ? `Lv.5${level.star ? ` ★${level.star}` : ''} ${level.name}・已滿等，再獲得 XP 即轉生`
                : `Lv.${level.level}${level.star ? ` ★${level.star}` : ''} ${level.name}・${Math.floor(cycleXP - level.min)} / ${level.max - level.min} XP`;
        document.getElementById('game-demo-xp').textContent = String(state.xp);
        document.getElementById('game-demo-coins').textContent = String(state.coins);
        document.getElementById('game-demo-shields').textContent = String(state.shields);
        document.getElementById('game-demo-streak').textContent = String(state.streak);
        document.getElementById('game-demo-description').textContent = scenario.description;
        document.getElementById('game-demo-action').textContent = this.demoSimulated ? '已完成示範' : scenario.action;
        document.getElementById('game-demo-action').disabled = this.demoSimulated;
        document.getElementById('game-demo-result').textContent = this.demoSimulated ? `示範結果：${scenario.result}` : '';
        document.getElementById('game-demo-progress-fill').style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
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
            if (text === animateQuote) item.classList.add('quote-pop-in');
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

    setBadge(id, count, newlyUnlocked = false) {
        const badge = document.getElementById(id);
        const unlocked = count > 0;
        badge.classList.toggle('locked', !unlocked);
        badge.classList.toggle('unlocked', unlocked);
        badge.querySelector('.badge-count').textContent = unlocked ? `x${count}` : '';
        badge.setAttribute('aria-label', `${badge.querySelector('.badge-name').textContent}，${unlocked ? `已獲得 ${count} 次` : '未解鎖'}`);
        if (newlyUnlocked && unlocked) this.playAnimation(badge, 'badge-unlock-animation');
    },

    playAnimation(element, className) {
        element.classList.remove(className);
        void element.offsetWidth;
        element.classList.add(className);
        element.addEventListener('animationend', () => element.classList.remove(className), { once: true });
    },

    renderThemes(data, level) {
        const themeSelector = document.getElementById('themeSelector');
        const activeTheme = localStorage.getItem('blood_pressure_theme') || data.activeTheme;
        [...themeSelector.options].forEach(option => {
            const theme = this.themes.find(item => item.id === option.value);
            if (theme) {
                const locked = theme.level > level.level;
                option.disabled = locked;
                option.textContent = `${theme.name}（Lv.${theme.level}）${locked ? ' 🔒 鎖定' : ''}`;
            }
        });
        themeSelector.value = this.getAllowedTheme(activeTheme, data);
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
        const today = this.getTodayDate();
        const isFreeDraw = data.lastFreeDrawDate !== today;
        if (!isFreeDraw && data.coins < 20) {
            window.showAppToast('金幣不足，記錄血壓即可獲得更多金幣。', 'error');
            return;
        }
        if (!isFreeDraw) data.coins -= 20;
        else data.lastFreeDrawDate = today;
        const previousBadgeCounts = { ...data.badgeCounts };
        const result = this.awardQuote(data);
        const currentBadges = this.getUnlockedBadges(this.currentMember, data);
        const newlyUnlockedBadges = currentBadges.filter(badge => data.badgeCounts[badge] > (previousBadgeCounts[badge] || 0));
        data.unlockedBadges = currentBadges;
        this.saveData(data);
        this.refreshUI({ animateQuote: result.quote.text, newlyUnlockedBadges });
        const categoryLabel = this.quoteCategories.find(category => category.id === result.quote.category)?.label || '心靈卡片';
        let message = result.duplicate
            ? `抽到重複卡片，已返還 10 金幣：${result.quote.text}`
            : `已${isFreeDraw ? '免費' : ''}收藏一張${categoryLabel}卡片，可在心靈圖書館隨時重讀。`;
        if (newlyUnlockedBadges.includes('library')) message += ' 解鎖徽章：心靈富翁！';
        window.showAppToast(message);
    },

    awardQuote(data) {
        const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        const duplicate = data.unlockedQuotes.includes(quote.text);
        if (duplicate) {
            data.coins += 10;
            data.coinsEarned += 10;
        } else {
            data.unlockedQuotes.push(quote.text);
        }
        data.totalCardsDrawn += 1;
        data.lastQuote = quote.text;
        data.badgeCounts.library = Math.max(data.badgeCounts.library || 0, Math.floor(data.totalCardsDrawn / 10));
        if (data.coinsEarned >= 500) {
            data.badgeCounts.rich = Math.max(data.badgeCounts.rich || 0, Math.floor(data.coinsEarned / 500));
        }
        return { quote, duplicate };
    }
};

window.GameSystem = GameSystem;

const appToastTimeouts = new Map();
window.showAppToast = (message, type = 'success', duration = 3200) => {
    const region = document.getElementById('app-toast-region');
    if (!region) return;

    const toast = document.createElement('div');
    toast.className = `app-toast${type === 'error' ? ' error' : type === 'shield' ? ' shield' : ''}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    const text = document.createElement('span');
    text.className = 'app-toast-message';
    text.textContent = message;
    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'app-toast-dismiss';
    dismissButton.textContent = '了解';
    dismissButton.setAttribute('aria-label', '關閉通知');
    dismissButton.addEventListener('click', () => dismissToast(toast));
    toast.append(text, dismissButton);
    region.appendChild(toast);
    window.requestAnimationFrame(() => toast.classList.add('visible'));
    if (duration > 0) appToastTimeouts.set(toast, window.setTimeout(() => dismissToast(toast), duration));
};

window.showAppModal = (title, message, details = []) => {
    const overlay = document.getElementById('app-modal-overlay');
    const confirmButton = document.getElementById('app-modal-confirm');
    const detailsList = document.getElementById('app-modal-details');
    if (!overlay || !confirmButton || !detailsList) {
        throw new Error('確認彈窗元件不存在，無法顯示重要通知。');
    }

    document.getElementById('app-modal-title').textContent = title;
    document.getElementById('app-modal-message').textContent = message;
    detailsList.replaceChildren();
    details.forEach(detail => {
        const item = document.createElement('li');
        item.textContent = detail;
        detailsList.appendChild(item);
    });
    detailsList.hidden = details.length === 0;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';

    const handleConfirm = () => closeModal();
    const closeModal = () => {
        overlay.hidden = true;
        document.body.style.overflow = previousOverflow;
        confirmButton.removeEventListener('click', handleConfirm);
        document.removeEventListener('keydown', handleKeydown);
        if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
    const handleKeydown = event => {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            confirmButton.focus();
        }
    };
    confirmButton.addEventListener('click', handleConfirm);
    document.addEventListener('keydown', handleKeydown);
    confirmButton.focus();
};

function dismissToast(toast) {
    const timeout = appToastTimeouts.get(toast);
    if (timeout !== undefined) {
        window.clearTimeout(timeout);
        appToastTimeouts.delete(toast);
    }
    toast.classList.remove('visible');
    window.setTimeout(() => toast.remove(), 220);
}

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
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        closeButton.focus();
        GameSystem.setMember(GameSystem.currentMember);
        window.requestAnimationFrame(() => overlay.classList.add('is-open'));
    });
    closeButton.addEventListener('click', closeModal);
    document.querySelectorAll('[data-demo-person]').forEach(button => {
        button.addEventListener('click', () => GameSystem.selectDemoScenario(button.dataset.demoPerson));
    });
    document.getElementById('game-demo-action').addEventListener('click', () => GameSystem.simulateDemoScenario());
    GameSystem.renderDemoScenario();
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