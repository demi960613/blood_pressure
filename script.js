let storageLoadFailed = false;
let storageWarningShown = false;
let db = loadDatabase();
let currentMember = db.currentMember || "平平";
let chartInstance = null;
let currentChartRange = '30';
let shouldCollapseAfterSave = false;
let memberModalReturnFocus = null;

function createRecordId() {
    return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createDefaultDatabase() {
    return { members: Object.assign(Object.create(null), { "平平": [] }), currentMember: "平平" };
}

function loadDatabase() {
    try {
        const saved = localStorage.getItem('blood_pressure_db');
        if (!saved) return createDefaultDatabase();

        const parsed = JSON.parse(saved);
        if (!parsed || typeof parsed !== 'object' || !parsed.members || typeof parsed.members !== 'object' || Array.isArray(parsed.members)) {
            throw new Error('無效的資料格式');
        }

        const members = Object.create(null);
        Object.entries(parsed.members).forEach(([name, records]) => {
            if (!Array.isArray(records)) return;
            members[name] = records.filter(record => record && typeof record === 'object').map(record => ({
                ...record,
                id: typeof record.id === 'string' ? record.id : createRecordId()
            }));
        });
        if (Object.keys(members).length === 0) members['平平'] = [];

        const activeMember = Object.hasOwn(members, parsed.currentMember) ? parsed.currentMember : Object.keys(members)[0];
        return { members, currentMember: activeMember };
    } catch (error) {
        storageLoadFailed = true;
        console.error('無法讀取本機血壓資料：', error);
        return createDefaultDatabase();
    }
}

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseLocalDateString(dateStr) {
    const parts = dateStr.split(/[-/]/);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function isValidDateString(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = parseLocalDateString(value);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

window.onload = function() {
    let savedTheme = 'slate';
    try {
        savedTheme = localStorage.getItem('blood_pressure_theme') || 'slate';
    } catch (error) {
        console.error('無法讀取主題設定：', error);
    }
    document.getElementById('themeSelector').value = savedTheme;
    applyTheme(savedTheme);

    const todayStr = getLocalDateString();
    document.getElementById('recordDate').max = todayStr;
    document.getElementById('recordDate').valueAsDate = new Date();

    if (storageLoadFailed) alert('本機資料格式無法讀取，已載入空白資料。請先確認備份，避免覆蓋原有資料。');
    
    initMembers();
    render();
};

function setDeviceView(mode) {
    const container = document.getElementById('appViewportContainer');
    container.classList.remove('viewport-mobile', 'viewport-desktop');

    if (mode === 'mobile') {
        container.classList.add('viewport-mobile');
    } else {
        container.classList.add('viewport-desktop');
    }

    if (chartInstance) {
        setTimeout(() => { chartInstance.resize(); }, 350);
    }
}

function setChartRange(range) {
    currentChartRange = range;
    const ranges = ['7', '30', '90', 'all'];
    ranges.forEach(r => {
        const btn = document.getElementById(`btnChart${r === 'all' ? 'All' : r}`);
        if (btn) {
            if (r === range) {
                btn.className = "px-2 py-0.5 rounded-lg font-bold transition cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs";
            } else {
                btn.className = "px-2 py-0.5 rounded-lg font-medium transition cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
            }
        }
    });

    const records = db.members[currentMember] || [];
    updateChart(records);
}

// 控制歷史紀錄清單收合與展開
function toggleRecordList() {
    const container = document.getElementById('recordCardContainer');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');

    const isCollapsed = container.classList.toggle('collapsed');

    if (isCollapsed) {
        toggleText.textContent = '展開';
        toggleIcon.style.transform = 'rotate(180deg)';
        document.getElementById('toggleListBtn').setAttribute('aria-expanded', 'false');
    } else {
        toggleText.textContent = '折疊';
        toggleIcon.style.transform = 'rotate(0deg)';
        document.getElementById('toggleListBtn').setAttribute('aria-expanded', 'true');
    }
}

function toggleBackupMenu() {
    document.getElementById('backupDropdown').classList.toggle('hidden');
}

function toggleMemberDropdown() {
    document.getElementById('memberDropdown').classList.toggle('hidden');
}

document.addEventListener('click', function(e) {
    const backupMenu = document.getElementById('backupDropdown');
    const backupBtn = e.target.closest('button[onclick="toggleBackupMenu()"]');
    if (!backupBtn && backupMenu && !backupMenu.contains(e.target) && !backupMenu.classList.contains('hidden')) {
        backupMenu.classList.add('hidden');
    }

    const memberMenu = document.getElementById('memberDropdown');
    const memberBtn = e.target.closest('button[onclick="toggleMemberDropdown()"]');
    if (!memberBtn && memberMenu && !memberMenu.contains(e.target) && !memberMenu.classList.contains('hidden')) {
        memberMenu.classList.add('hidden');
    }
});

function openMemberModal() {
    renderModalMemberList();
    const modal = document.getElementById('memberModal');
    memberModalReturnFocus = document.activeElement;
    modal.classList.remove('hidden');
    document.getElementById('newMemberInputModal').focus();
}

function closeMemberModal() {
    const modal = document.getElementById('memberModal');
    modal.classList.add('hidden');
    memberModalReturnFocus?.focus();
}

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('memberModal');
    if (modal.classList.contains('hidden')) return;
    if (event.key === 'Escape') {
        closeMemberModal();
        return;
    }
    if (event.key === 'Tab') {
        const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

function toggleForm(forceOpen = false) {
    const container = document.getElementById('formContainer');
    const icon = document.getElementById('toggleFormIcon');
    const text = document.getElementById('toggleFormText');

    if (forceOpen || container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        icon.className = "fa-solid fa-minus text-[10px]";
        text.textContent = "收合";
        document.getElementById('toggleFormButton').setAttribute('aria-expanded', 'true');
    } else {
        container.classList.add('hidden');
        icon.className = "fa-solid fa-plus text-[10px]";
        text.textContent = "新增";
        document.getElementById('toggleFormButton').setAttribute('aria-expanded', 'false');
    }
}

function changeTheme(themeName) {
    applyTheme(themeName);
    updateChart(db.members[currentMember] || []);
    try {
        localStorage.setItem('blood_pressure_theme', themeName);
    } catch (error) {
        console.error('無法儲存主題設定：', error);
    }
}

function applyTheme(themeName) {
    const htmlRoot = document.getElementById('htmlRoot');
    const body = document.getElementById('appBody');
    const icon = document.getElementById('themeIcon');
    const memberNameSpan = document.getElementById('currentMemberName');
    const themes = ['slate', 'rose', 'blue', 'emerald', 'amber', 'dark'];
    const activeTheme = themes.includes(themeName) ? themeName : 'slate';

    themes.forEach(theme => htmlRoot.classList.toggle(`theme-${theme}`, theme === activeTheme));
    body.classList.remove('bg-slate-100', 'bg-rose-50', 'bg-blue-50', 'bg-teal-50', 'bg-emerald-50', 'bg-amber-50');
    
    if (memberNameSpan) {
        memberNameSpan.classList.remove('text-slate-600', 'dark:text-slate-300', 'text-rose-600', 'text-blue-600', 'text-teal-700', 'text-emerald-600', 'text-amber-600', 'text-indigo-400');
    }

    if (activeTheme === 'dark') {
        htmlRoot.classList.add('dark');
        body.classList.add('bg-slate-900');
        icon.className = "fa-solid fa-moon text-indigo-400";
        if (memberNameSpan) memberNameSpan.classList.add('text-indigo-400');
    } else {
        htmlRoot.classList.remove('dark');
        icon.className = "fa-solid fa-palette text-slate-500";
        switch(activeTheme) {
            case 'rose': 
                body.classList.add('bg-rose-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-rose-600');
                break;
            case 'blue': 
                body.classList.add('bg-blue-50');
                if (memberNameSpan) memberNameSpan.classList.add('text-blue-700');
                break;
            case 'emerald': 
                body.classList.add('bg-emerald-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-emerald-600');
                break;
            case 'amber': 
                body.classList.add('bg-amber-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-amber-600');
                break;
            case 'slate': 
            default: 
                body.classList.add('bg-slate-100'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-slate-600', 'dark:text-slate-300');
                break;
        }
    }
}

window.addEventListener('beforeunload', function (e) {
    const sysVal = document.getElementById('sysInput').value;
    const diaVal = document.getElementById('diaInput').value;
    const editRecordId = document.getElementById('editRecordId').value;
    if ((sysVal !== '' || diaVal !== '') && editRecordId === '') {
        e.preventDefault();
        e.returnValue = '';
    }
});

function initMembers() {
    const dropdownList = document.getElementById('memberDropdownList');
    dropdownList.innerHTML = '';

    if (!db.members[currentMember]) {
        const firstKey = Object.keys(db.members)[0];
        currentMember = firstKey || "平平";
        db.currentMember = currentMember;
    }

    document.getElementById('selectedMemberLabel').textContent = currentMember;
    document.getElementById('currentMemberName').textContent = currentMember;

    for (const member of Object.keys(db.members)) {
        let isSelected = (member === currentMember);
        let btn = document.createElement('button');
        btn.type = "button";
        btn.className = `w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/50 transition cursor-pointer ${
            isSelected ? 'text-slate-800 dark:text-white font-bold bg-slate-100 dark:bg-slate-700/80' : 'text-slate-700 dark:text-slate-200'
        }`;
        const memberLabel = document.createElement('span');
        memberLabel.className = 'flex items-center gap-1.5 truncate';
        const memberIcon = document.createElement('i');
        memberIcon.className = `fa-solid fa-user text-[10px] ${isSelected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'}`;
        const memberName = document.createElement('span');
        memberName.textContent = member;
        memberLabel.append(memberIcon, memberName);
        btn.appendChild(memberLabel);
        if (isSelected) {
            const checkIcon = document.createElement('i');
            checkIcon.className = 'fa-solid fa-check text-[10px]';
            btn.appendChild(checkIcon);
        }
        btn.onclick = () => {
            currentMember = member;
            db.currentMember = currentMember;
            saveDB();
            resetForm();
            initMembers();
            initMonthFilter(db.members[currentMember] || []);
            render();
            toggleMemberDropdown();
        };
        dropdownList.appendChild(btn);
    }
}

function renderModalMemberList() {
    const listContainer = document.getElementById('modalMemberList');
    listContainer.innerHTML = '';

    for (const member of Object.keys(db.members)) {
        let div = document.createElement('div');
        div.className = "flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700/60";
        const memberLabel = document.createElement('span');
        memberLabel.className = 'text-xs font-semibold flex items-center gap-1.5 truncate';
        const memberIcon = document.createElement('i');
        memberIcon.className = 'fa-solid fa-user text-slate-400 text-[10px]';
        const memberName = document.createElement('span');
        memberName.textContent = member;
        memberLabel.append(memberIcon, memberName);

        const actions = document.createElement('div');
        actions.className = 'flex items-center gap-1 shrink-0';
        const renameButton = document.createElement('button');
        renameButton.type = 'button';
        renameButton.className = 'p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer text-xs';
        renameButton.title = '重新命名';
        renameButton.setAttribute('aria-label', `重新命名 ${member}`);
        renameButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
        renameButton.addEventListener('click', () => renameMember(member));
        actions.appendChild(renameButton);

        if (Object.keys(db.members).length > 1) {
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer text-xs';
            deleteButton.title = '刪除';
            deleteButton.setAttribute('aria-label', `刪除 ${member}`);
            deleteButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
            deleteButton.addEventListener('click', () => deleteMember(member));
            actions.appendChild(deleteButton);
        }
        div.append(memberLabel, actions);
        listContainer.appendChild(div);
    }
}

function addMemberFromModal() {
    const input = document.getElementById('newMemberInputModal');
    const name = input.value.trim();
    if (!name) return alert('請輸入名字！');
    if (name.length > 50) return alert('名字不可超過 50 個字！');
    if (db.members[name]) return alert('此成員已存在！');

    db.members[name] = [];
    currentMember = name;
    db.currentMember = currentMember;
    saveDB();
    input.value = '';
    initMembers();
    renderModalMemberList();
    initMonthFilter(db.members[currentMember]);
    render();
}

function renameMember(oldName) {
    const newName = prompt(`請輸入「${oldName}」的新名字：`, oldName);
    if (!newName) return;
    const trimmedNewName = newName.trim();
    if (trimmedNewName === "") return alert("名字不能為空白！");
    if (trimmedNewName.length > 50) return alert('名字不可超過 50 個字！');
    if (db.members[trimmedNewName]) return alert("此名字已存在！");

    db.members[trimmedNewName] = db.members[oldName];
    delete db.members[oldName];

    if (currentMember === oldName) currentMember = trimmedNewName;
    db.currentMember = currentMember;
    saveDB();
    initMembers();
    renderModalMemberList();
    render();
}

function deleteMember(member) {
    if (confirm(`確定要刪除「${member}」及其所有紀錄嗎？`)) {
        delete db.members[member];
        const remaining = Object.keys(db.members);
        if (currentMember === member) currentMember = remaining[0];
        db.currentMember = currentMember;
        saveDB();
        resetForm();
        initMembers();
        renderModalMemberList();
        initMonthFilter(db.members[currentMember] || []);
        render();
    }
}

function saveDB() {
    if (storageLoadFailed) {
        if (!storageWarningShown) {
            alert('本機原始資料無法讀取，已暫停儲存以避免覆蓋舊資料。請先檢查備份或瀏覽器資料。');
            storageWarningShown = true;
        }
        return false;
    }
    try {
        localStorage.setItem('blood_pressure_db', JSON.stringify(db));
        return true;
    } catch (error) {
        console.error('無法儲存血壓資料：', error);
        if (!storageWarningShown) {
            alert('資料無法儲存，可能是瀏覽器儲存空間不足。請先匯出備份。');
            storageWarningShown = true;
        }
        return false;
    }
}
function clearFormInputs() {
    document.getElementById('sysInput').value = '';
    document.getElementById('diaInput').value = '';
    document.getElementById('pulseInput').value = '';
}

function saveAndCollapseRecord(e) {
    const form = document.getElementById('recordForm');
    shouldCollapseAfterSave = false;
    if (!form.reportValidity()) return;
    shouldCollapseAfterSave = true;
    form.requestSubmit();
}

function saveRecord(e) {
    e.preventDefault();
    const date = document.getElementById('recordDate').value;
    const sys = Number(document.getElementById('sysInput').value);
    const dia = Number(document.getElementById('diaInput').value);
    const pulseValue = document.getElementById('pulseInput').value;
    const pulse = pulseValue === '' ? 0 : Number(pulseValue);
    const editRecordId = document.getElementById('editRecordId').value;

    if (!isValidDateString(date)) return rejectRecordSave('請輸入有效的測量日期！');
    if (!Number.isInteger(sys) || !Number.isInteger(dia)) return rejectRecordSave('血壓數值必須是整數！');
    if (sys <= dia) return rejectRecordSave("⚠️ 收縮壓（SYS）必須大於舒張壓（DIA）！");
    if (sys < 50 || sys > 250 || dia < 30 || dia > 150) return rejectRecordSave('血壓數值超出可輸入範圍！');
    if (pulse !== 0 && (pulse < 30 || pulse > 200 || !Number.isInteger(pulse))) return rejectRecordSave('脈搏需介於 30 至 200 之間！');
    const todayStr = getLocalDateString();
    if (date > todayStr) return rejectRecordSave("⚠️ 不能選擇未來的日期！");

    if (pulse > 0 && (pulse < 40 || pulse > 180)) {
        if (!confirm(`⚠️ 脈搏為 ${pulse} bpm 似乎偏離常人範圍。確定儲存嗎？`)) {
            shouldCollapseAfterSave = false;
            return;
        }
    }

    if (!db.members[currentMember]) db.members[currentMember] = [];
    const records = db.members[currentMember];
    const editedIndex = editRecordId ? records.findIndex(record => record.id === editRecordId) : -1;

    if (editRecordId && editedIndex === -1) return rejectRecordSave('找不到要編輯的紀錄，請重新整理後再試。');
    if (editRecordId && records.some(record => record.date === date && record.id !== editRecordId)) {
        return rejectRecordSave('這個日期已經有另一筆紀錄，請先編輯或刪除原紀錄。');
    }

    if (!editRecordId) {
        const existRecord = records.find(r => r.date === date);
        if (existRecord) {
            if (!confirm(`⚠️ 「${currentMember}」在 ${date} 已有紀錄，要直接覆蓋嗎？`)) {
                shouldCollapseAfterSave = false;
                return;
            }
            existRecord.sys = sys; existRecord.dia = dia; existRecord.pulse = pulse;
            records.sort((a, b) => parseLocalDateString(a.date) - parseLocalDateString(b.date));
            saveDB(); resetForm(); initMonthFilter(records); render(); 
            
            toggleForm(false);
            shouldCollapseAfterSave = false;
            alert("🎉 更新成功！");
            return;
        }
    }

    if (editRecordId) {
        records[editedIndex] = { id: editRecordId, date, sys, dia, pulse };
    } else {
        records.push({ id: createRecordId(), date, sys, dia, pulse });
    }

    records.sort((a, b) => parseLocalDateString(a.date) - parseLocalDateString(b.date));
    saveDB(); resetForm(); initMonthFilter(records); render(); 

    if (shouldCollapseAfterSave) {
        toggleForm(false);
        shouldCollapseAfterSave = false;
    }
}

function rejectRecordSave(message) {
    shouldCollapseAfterSave = false;
    alert(message);
}

function editRecord(index) {
    const records = db.members[currentMember] || [];
    const selectedMonth = document.getElementById('monthFilter').value;
    const selectedStatus = document.getElementById('statusFilter').value;
    
    let filteredRecords = records;
    if (selectedMonth !== 'all') filteredRecords = filteredRecords.filter(r => r.date && r.date.startsWith(selectedMonth));
    if (selectedStatus !== 'all') filteredRecords = filteredRecords.filter(r => getStatusCode(r.sys, r.dia) === selectedStatus);

    const target = filteredRecords[index];
    if (!target) return;

    document.getElementById('recordDate').value = target.date;
    document.getElementById('sysInput').value = target.sys;
    document.getElementById('diaInput').value = target.dia;
    document.getElementById('pulseInput').value = target.pulse;
    document.getElementById('editRecordId').value = target.id;

    document.getElementById('formTitleText').textContent = "編輯";
    document.getElementById('submitBtn').textContent = "更新";
    document.getElementById('cancelEditBtn').classList.remove('hidden');
    toggleForm(true);
    document.getElementById('recordForm').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('recordForm').reset();
    document.getElementById('editRecordId').value = "";
    document.getElementById('formTitleText').textContent = "記錄";
    document.getElementById('submitBtn').textContent = "儲存記錄";
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('recordDate').valueAsDate = new Date();
    shouldCollapseAfterSave = false;
}

function deleteRecord(index) {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
        const records = db.members[currentMember] || [];
        const target = getFilteredRecords(records)[index];
        const realIndex = records.indexOf(target);
        if (realIndex > -1) {
            db.members[currentMember].splice(realIndex, 1);
            saveDB(); resetForm(); initMonthFilter(records); render();
        }
    }
}

function getFilteredRecords(records) {
    const selectedMonth = document.getElementById('monthFilter').value;
    const selectedStatus = document.getElementById('statusFilter').value;
    return records.filter(record => {
        const matchesMonth = selectedMonth === 'all' || (record.date && record.date.startsWith(selectedMonth));
        const matchesStatus = selectedStatus === 'all' || getStatusCode(record.sys, record.dia) === selectedStatus;
        return matchesMonth && matchesStatus;
    });
}

function initMonthFilter(records) {
    const select = document.getElementById('monthFilter');
    const currentVal = select.value;
    const months = [...new Set(records.map(r => r.date ? r.date.substring(0, 7) : null).filter(Boolean))].sort().reverse();
    select.innerHTML = `<option value="all">全部月份 (${records.length})</option>`;
    months.forEach(m => {
        let opt = document.createElement('option');
        opt.value = m;
        let [y, mo] = m.split('-');
        opt.textContent = `${y}/${parseInt(mo)}`;
        select.appendChild(opt);
    });
    if ([...select.options].some(o => o.value === currentVal)) select.value = currentVal;
    else select.value = "all";
}

function getStatusCode(sys, dia) {
    if (sys < 90 || dia < 60) return "low";
    if (sys < 120 && dia < 80) return "normal";
    if (sys < 130 && dia < 85) return "normal-high";
    if (sys < 140 || dia < 90) return "stage1";
    return "danger";
}

function getStatus(sys, dia) {
    const code = getStatusCode(sys, dia);
    switch(code) {
        case "low": return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-400">低血壓</span>';
        case "normal": return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400">正常</span>';
        case "normal-high": return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400">正常高值</span>';
        case "stage1": return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-400">輕度高血壓</span>';
        case "danger": default: return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400">偏高/危險</span>';
    }
}

function render() {
    const records = db.members[currentMember] || [];
    const monthSelect = document.getElementById('monthFilter');

    if (monthSelect.options.length <= 1) initMonthFilter(records);

    const displayRecords = getFilteredRecords(records);

    const count = displayRecords.length;
    let avgSys = 0, avgDia = 0, avgPulse = 0;
    if (count > 0) {
        avgSys = Math.round(displayRecords.reduce((acc, r) => acc + r.sys, 0) / count);
        avgDia = Math.round(displayRecords.reduce((acc, r) => acc + r.dia, 0) / count);
        avgPulse = Math.round(displayRecords.reduce((acc, r) => acc + (r.pulse || 0), 0) / count);
    }

    const statsContainer = document.getElementById('monthlyStats');
    statsContainer.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400"><i class="fa-solid fa-calendar-days text-slate-500 mr-1"></i> 測量次數：</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">${count} 次</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400"><i class="fa-solid fa-chart-pie text-slate-500 mr-1"></i> 平均血壓：</span>
            <span class="font-bold">${count > 0 ? `${avgSys} /${avgDia} mmHg` : '尚無資料'}</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400"><i class="fa-solid fa-heart-pulse text-slate-500 mr-1"></i> 平均脈搏：</span>
            <span class="font-bold">${count > 0 && avgPulse > 0 ? `${avgPulse} bpm` : '-'}</span>
        </div>
    `;

    // 卡片式清單渲染邏輯
    const container = document.getElementById('recordCardContainer');
    container.innerHTML = '';

    if (displayRecords.length === 0) {
        container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-400 text-xs">無符合條件之血壓紀錄</div>`;
    } else {
        displayRecords.forEach((r, idx) => {
            let card = document.createElement('div');
            card.className = "bg-slate-50 dark:bg-slate-700/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-600/60 flex items-center justify-between transition hover:shadow-sm gap-2";
            
            card.innerHTML = `
                <div class="space-y-1 min-w-0 flex-1">
                    <div class="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                        <span><i class="fa-regular fa-calendar text-slate-500 mr-1"></i>${escapeHTML(r.date)}</span>
                        ${r.pulse ? `<span class="text-slate-500 dark:text-slate-400"><i class="fa-solid fa-heart-pulse text-slate-400 mr-1"></i>${escapeHTML(r.pulse)} bpm</span>` : ''}
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-base font-bold text-slate-800 dark:text-slate-100">${escapeHTML(r.sys)} / ${escapeHTML(r.dia)} <span class="text-[10px] font-normal text-slate-400">mmHg</span></span>
                        <div>${getStatus(r.sys, r.dia)}</div>
                    </div>
                </div>
                <div class="flex items-center gap-1 shrink-0 border-l pl-2 border-slate-200 dark:border-slate-600/60">
                    <button onclick="editRecord(${idx})" class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer text-xs" title="編輯">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteRecord(${idx})" class="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer text-xs" title="刪除">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    updateChart(records);
}

function updateChart(records) {
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    
    let filteredRecords = [...records];
    if (currentChartRange !== 'all') {
        const days = Number(currentChartRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const cutoffStr = getLocalDateString(cutoffDate);
        
        filteredRecords = filteredRecords.filter(r => r.date >= cutoffStr);
    }

    const labels = filteredRecords.map(r => r.date);
    const sysData = filteredRecords.map(r => r.sys);
    const diaData = filteredRecords.map(r => r.dia);
    const themeStyles = getComputedStyle(document.getElementById('htmlRoot'));
    const sysColor = themeStyles.getPropertyValue('--chart-sys').trim() || '#64748b';
    const diaColor = themeStyles.getPropertyValue('--chart-dia').trim() || '#94a3b8';

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: '收縮壓', data: sysData, borderColor: sysColor, backgroundColor: sysColor, tension: 0.3, pointRadius: 3 },
                { label: '舒張壓', data: diaData, borderColor: diaColor, backgroundColor: diaColor, tension: 0.3, pointRadius: 3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: false } }
        }
    });
}

function exportSingleMemberCSV() {
    const records = db.members[currentMember] || [];
    if (records.length === 0) return alert(`目前「${currentMember}」沒有資料！`);
    let csvContent = "\uFEFF日期,收縮壓(mmHg),舒張壓(mmHg),脈搏(bpm)\r\n";
    records.forEach(record => {
        csvContent += [record.date, record.sys, record.dia, record.pulse].map(escapeCSVField).join(',') + '\r\n';
    });
    downloadCSV(csvContent, `${safeFilename(currentMember)}_血壓紀錄.csv`);
}

function escapeCSVField(value) {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function safeFilename(value) {
    return String(value).replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').slice(0, 50) || '紀錄';
}

function downloadCSV(content, filename) {
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function parseCSVRows(text) {
    const rows = [];
    let row = [];
    let field = '';
    let insideQuotes = false;
    const source = String(text).replace(/^\uFEFF/, '');

    for (let index = 0; index < source.length; index++) {
        const character = source[index];
        if (insideQuotes) {
            if (character === '"' && source[index + 1] === '"') {
                field += '"';
                index++;
            } else if (character === '"') {
                insideQuotes = false;
            } else {
                field += character;
            }
        } else if (character === '"' && field === '') {
            insideQuotes = true;
        } else if (character === ',') {
            row.push(field);
            field = '';
        } else if (character === '\n' || character === '\r') {
            if (character === '\r' && source[index + 1] === '\n') index++;
            row.push(field);
            if (row.some(value => value.trim() !== '')) rows.push(row);
            row = [];
            field = '';
        } else {
            field += character;
        }
    }

    if (insideQuotes) throw new Error('CSV 引號沒有成對');
    if (field !== '' || row.length > 0) {
        row.push(field);
        if (row.some(value => value.trim() !== '')) rows.push(row);
    }
    return rows;
}

function assertCSVHeader(rows, expectedHeader) {
    if (!rows.length || rows[0].length !== expectedHeader.length ||
        !expectedHeader.every((header, index) => rows[0][index].trim() === header)) {
        throw new Error('CSV 欄位標題不符合匯出格式');
    }
}

function normalizeImportedDate(value) {
    const text = value.trim();
    const match = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/i) ||
        text.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日?$/);
    if (!match) return null;

    const [, year, month, day] = match;
    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return isValidDateString(date) ? date : null;
}

function parseImportedRecord(dateValue, sysValue, diaValue, pulseValue) {
    const date = normalizeImportedDate(dateValue);
    const sys = Number(sysValue);
    const dia = Number(diaValue);
    const pulse = pulseValue.trim() === '' ? 0 : Number(pulseValue);
    if (!isValidDateString(date) || date > getLocalDateString()) throw new Error('日期無效或在未來');
    if (!Number.isInteger(sys) || sys < 50 || sys > 250) throw new Error('收縮壓需為 50 至 250 的整數');
    if (!Number.isInteger(dia) || dia < 30 || dia > 150) throw new Error('舒張壓需為 30 至 150 的整數');
    if (sys <= dia) throw new Error('收縮壓必須大於舒張壓');
    if (pulse !== 0 && (!Number.isInteger(pulse) || pulse < 30 || pulse > 200)) throw new Error('脈搏需為 30 至 200 的整數');
    return { date, sys, dia, pulse };
}

function showImportErrors(errors) {
    const details = errors.slice(0, 5).join('\n');
    const more = errors.length > 5 ? `\n另有 ${errors.length - 5} 筆錯誤` : '';
    alert(`匯入取消，請修正以下資料後重試：\n${details}${more}`);
}

function upsertImportedRecord(records, incoming) {
    const existing = records.find(record => record.date === incoming.date);
    if (existing) {
        Object.assign(existing, incoming);
        return;
    }
    records.push({ ...incoming, id: createRecordId() });
}

function importSingleMemberCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const input = e.target;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const rows = parseCSVRows(event.target.result);
            assertCSVHeader(rows, ['日期', '收縮壓(mmHg)', '舒張壓(mmHg)', '脈搏(bpm)']);
            const imported = [];
            const errors = [];
            rows.slice(1).forEach((columns, index) => {
                try {
                    if (columns.length !== 4) throw new Error('欄位數量錯誤');
                    imported.push(parseImportedRecord(columns[0], columns[1], columns[2], columns[3]));
                } catch (error) {
                    errors.push(`第 ${index + 2} 列：${error.message}`);
                }
            });
            if (errors.length) return showImportErrors(errors);
            if (!imported.length) return alert('檔案中沒有可匯入的紀錄。');

            const records = db.members[currentMember] || (db.members[currentMember] = []);
            imported.forEach(record => upsertImportedRecord(records, record));
            records.sort((a, b) => a.date.localeCompare(b.date));
            saveDB(); resetForm(); initMonthFilter(records); render();
            alert(`成功匯入 ${imported.length} 筆紀錄；相同日期的資料已更新。`);
        } catch (error) {
            alert(`讀取失敗：${error.message}`);
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}

function exportAllMembersCSV() {
    let total = 0;
    for (let m in db.members) total += (db.members[m] || []).length;
    if (total === 0) return alert('沒有資料可供匯出！');
    let csvContent = "\uFEFF成員名稱,日期,收縮壓(mmHg),舒張壓(mmHg),脈搏(bpm)\r\n";
    for (const member of Object.keys(db.members)) {
        (db.members[member] || []).forEach(record => {
            csvContent += [member, record.date, record.sys, record.dia, record.pulse].map(escapeCSVField).join(',') + '\r\n';
        });
    }
    downloadCSV(csvContent, '全家總表_血壓紀錄.csv');
}

function importAllMembersCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const input = e.target;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const rows = parseCSVRows(event.target.result);
            assertCSVHeader(rows, ['成員名稱', '日期', '收縮壓(mmHg)', '舒張壓(mmHg)', '脈搏(bpm)']);
            const imported = [];
            const errors = [];
            rows.slice(1).forEach((columns, index) => {
                try {
                    if (columns.length !== 5) throw new Error('欄位數量錯誤');
                    const name = columns[0].trim();
                    if (!name || name.length > 50) throw new Error('成員名稱不能空白或超過 50 個字');
                    imported.push({ name, record: parseImportedRecord(columns[1], columns[2], columns[3], columns[4]) });
                } catch (error) {
                    errors.push(`第 ${index + 2} 列：${error.message}`);
                }
            });
            if (errors.length) return showImportErrors(errors);
            if (!imported.length) return alert('檔案中沒有可匯入的紀錄。');

            imported.forEach(({ name, record }) => {
                if (!Object.hasOwn(db.members, name)) db.members[name] = [];
                upsertImportedRecord(db.members[name], record);
            });
            Object.values(db.members).forEach(records => records.sort((a, b) => a.date.localeCompare(b.date)));
            saveDB(); resetForm(); initMembers(); initMonthFilter(db.members[currentMember]); render();
            alert(`成功匯入 ${imported.length} 筆紀錄；相同成員與日期的資料已更新。`);
        } catch (error) {
            alert(`總表讀取失敗：${error.message}`);
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}