let db = JSON.parse(localStorage.getItem('blood_pressure_db')) || {
    members: { "平平": [] },
    currentMember: "平平"
};
let currentMember = db.currentMember || "平平";
let chartInstance = null;
let currentChartRange = '30';

window.onload = function() {
    const savedTheme = localStorage.getItem('blood_pressure_theme') || 'slate';
    document.getElementById('themeSelector').value = savedTheme;
    applyTheme(savedTheme);

    const todayStr = new Date().toISOString().split('T')[0];
    document.getElementById('recordDate').max = todayStr;
    document.getElementById('recordDate').valueAsDate = new Date();
    
    initMembers();
    render();
};

function setDeviceView(mode) {
    const container = document.getElementById('appViewportContainer');
    container.classList.remove('viewport-mobile', 'viewport-tablet', 'viewport-desktop');

    if (mode === 'mobile') {
        container.classList.add('viewport-mobile');
    } else if (mode === 'tablet') {
        container.classList.add('viewport-tablet');
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
                btn.className = "px-2 py-0.5 rounded-lg font-bold transition cursor-pointer bg-white dark:bg-slate-800 text-blue-500 shadow-xs";
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
    } else {
        toggleText.textContent = '折疊';
        toggleIcon.style.transform = 'rotate(0deg)';
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
    document.getElementById('memberModal').classList.remove('hidden');
}

function closeMemberModal() {
    document.getElementById('memberModal').classList.add('hidden');
}

function toggleForm(forceOpen = false) {
    const container = document.getElementById('formContainer');
    const icon = document.getElementById('toggleFormIcon');
    const text = document.getElementById('toggleFormText');

    if (forceOpen || container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        icon.className = "fa-solid fa-minus text-[10px]";
        text.textContent = "收合";
    } else {
        container.classList.add('hidden');
        icon.className = "fa-solid fa-plus text-[10px]";
        text.textContent = "新增";
    }
}

function changeTheme(themeName) {
    applyTheme(themeName);
    localStorage.setItem('blood_pressure_theme', themeName);
}

function applyTheme(themeName) {
    const htmlRoot = document.getElementById('htmlRoot');
    const body = document.getElementById('appBody');
    const icon = document.getElementById('themeIcon');
    const memberNameSpan = document.getElementById('currentMemberName');

    body.classList.remove('bg-slate-50', 'bg-rose-50', 'bg-blue-50', 'bg-emerald-50', 'bg-amber-50');
    
    if (memberNameSpan) {
        memberNameSpan.classList.remove('text-slate-700', 'dark:text-slate-300', 'text-rose-500', 'text-blue-500', 'text-emerald-600', 'text-amber-600', 'text-indigo-400');
    }

    if (themeName === 'dark') {
        htmlRoot.classList.add('dark');
        body.classList.add('bg-slate-900');
        icon.className = "fa-solid fa-moon text-indigo-400";
        if (memberNameSpan) memberNameSpan.classList.add('text-indigo-400');
    } else {
        htmlRoot.classList.remove('dark');
        icon.className = "fa-solid fa-palette text-rose-500";
        switch(themeName) {
            case 'rose': 
                body.classList.add('bg-rose-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-rose-500');
                break;
            case 'blue': 
                body.classList.add('bg-blue-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-blue-500');
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
                body.classList.add('bg-slate-50'); 
                if (memberNameSpan) memberNameSpan.classList.add('text-slate-700', 'dark:text-slate-300');
                break;
        }
    }
}

window.addEventListener('beforeunload', function (e) {
    const sysVal = document.getElementById('sysInput').value;
    const diaVal = document.getElementById('diaInput').value;
    const editIndex = document.getElementById('editIndex').value;
    if ((sysVal !== '' || diaVal !== '') && editIndex === '-1') {
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

    for (let member in db.members) {
        let isSelected = (member === currentMember);
        let btn = document.createElement('button');
        btn.type = "button";
        btn.className = `w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer ${
            isSelected ? 'text-rose-500 font-bold bg-rose-50/50 dark:bg-rose-950/30' : 'text-slate-700 dark:text-slate-200'
        }`;
        btn.innerHTML = `
            <span class="flex items-center gap-1.5 truncate">
                <i class="fa-solid fa-user text-[10px] ${isSelected ? 'text-rose-500' : 'text-slate-400'}"></i> ${member}
            </span>
            ${isSelected ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}
        `;
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

    for (let member in db.members) {
        let div = document.createElement('div');
        div.className = "flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60";
        div.innerHTML = `
            <span class="text-xs font-semibold flex items-center gap-1.5 truncate">
                <i class="fa-solid fa-user text-slate-400 text-[10px]"></i> ${member}
            </span>
            <div class="flex items-center gap-1 shrink-0">
                <button onclick="renameMember('${member}')" class="p-1 text-slate-400 hover:text-indigo-500 transition cursor-pointer text-xs" title="重新命名">
                    <i class="fa-solid fa-pen"></i>
                </button>
                ${Object.keys(db.members).length > 1 ? `
                    <button onclick="deleteMember('${member}')" class="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer text-xs" title="刪除">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                ` : ''}
            </div>
        `;
        listContainer.appendChild(div);
    }
}

function addMemberFromModal() {
    const input = document.getElementById('newMemberInputModal');
    const name = input.value.trim();
    if (!name) return alert('請輸入名字！');
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

function saveDB() { localStorage.setItem('blood_pressure_db', JSON.stringify(db)); }
function clearFormInputs() {
    document.getElementById('sysInput').value = '';
    document.getElementById('diaInput').value = '';
    document.getElementById('pulseInput').value = '';
}

function saveRecord(e) {
    e.preventDefault();
    const date = document.getElementById('recordDate').value;
    const sys = Number(document.getElementById('sysInput').value);
    const dia = Number(document.getElementById('diaInput').value);
    const pulse = Number(document.getElementById('pulseInput').value) || 0;
    const editIndex = Number(document.getElementById('editIndex').value);

    if (sys <= dia) return alert("⚠️ 收縮壓（SYS）必須大於舒張壓（DIA）！");
    const todayStr = new Date().toISOString().split('T')[0];
    if (date > todayStr) return alert("⚠️ 不能選擇未來的日期！");

    if (pulse > 0 && (pulse < 40 || pulse > 180)) {
        if (!confirm(`⚠️ 脈搏為 ${pulse} bpm 似乎偏離常人範圍。確定儲存嗎？`)) return;
    }

    if (!db.members[currentMember]) db.members[currentMember] = [];
    const records = db.members[currentMember];

    if (editIndex === -1) {
        const existRecord = records.find(r => r.date === date);
        if (existRecord) {
            if (!confirm(`⚠️ 「${currentMember}」在 ${date} 已有紀錄，要直接覆蓋嗎？`)) return;
            existRecord.sys = sys; existRecord.dia = dia; existRecord.pulse = pulse;
            records.sort((a, b) => new Date(a.date) - new Date(b.date));
            saveDB(); resetForm(); initMonthFilter(records); render(); toggleForm(false);
            alert("🎉 更新成功！");
            return;
        }
    }

    const selectedMonth = document.getElementById('monthFilter').value;
    const selectedStatus = document.getElementById('statusFilter').value;
    if (editIndex > -1) {
        let filteredRecords = records;
        if (selectedMonth !== 'all') filteredRecords = filteredRecords.filter(r => r.date && r.date.startsWith(selectedMonth));
        if (selectedStatus !== 'all') filteredRecords = filteredRecords.filter(r => getStatusCode(r.sys, r.dia) === selectedStatus);
        
        const target = filteredRecords[editIndex];
        const realIndex = records.indexOf(target);
        if (realIndex > -1) records[realIndex] = { date, sys, dia, pulse };
    } else {
        records.push({ date, sys, dia, pulse });
    }

    records.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveDB(); resetForm(); initMonthFilter(records); render(); toggleForm(false);
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
    document.getElementById('editIndex').value = index;

    document.getElementById('formTitleText').textContent = "編輯";
    document.getElementById('submitBtn').textContent = "更新";
    document.getElementById('cancelEditBtn').classList.remove('hidden');
    toggleForm(true);
    document.getElementById('recordForm').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('recordForm').reset();
    document.getElementById('editIndex').value = "-1";
    document.getElementById('formTitleText').textContent = "記錄";
    document.getElementById('submitBtn').textContent = "儲存記錄";
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('recordDate').valueAsDate = new Date();
}

function deleteRecord(index) {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
        const records = db.members[currentMember] || [];
        const selectedMonth = document.getElementById('monthFilter').value;
        const selectedStatus = document.getElementById('statusFilter').value;

        let filteredRecords = records;
        if (selectedMonth !== 'all') filteredRecords = filteredRecords.filter(r => r.date && r.date.startsWith(selectedMonth));
        if (selectedStatus !== 'all') filteredRecords = filteredRecords.filter(r => getStatusCode(r.sys, r.dia) === selectedStatus);

        const target = filteredRecords[index];
        const realIndex = records.indexOf(target);
        if (realIndex > -1) {
            db.members[currentMember].splice(realIndex, 1);
            saveDB(); resetForm(); initMonthFilter(records); render();
        }
    }
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
    const statusSelect = document.getElementById('statusFilter');

    if (monthSelect.options.length <= 1) initMonthFilter(records);
    
    const selectedMonth = monthSelect.value;
    const selectedStatus = statusSelect ? statusSelect.value : 'all';

    let displayRecords = records;
    if (selectedMonth !== 'all') {
        displayRecords = displayRecords.filter(r => r.date && r.date.startsWith(selectedMonth));
    }
    if (selectedStatus !== 'all') {
        displayRecords = displayRecords.filter(r => getStatusCode(r.sys, r.dia) === selectedStatus);
    }

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
            <span class="text-slate-400"><i class="fa-solid fa-calendar-days text-rose-500 mr-1"></i> 檢視比數：</span>
            <span class="font-bold text-rose-500">${count} 次</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-slate-400"><i class="fa-solid fa-chart-pie text-blue-500 mr-1"></i> 平均血壓：</span>
            <span class="font-bold">${count > 0 ? `${avgSys} /${avgDia} mmHg` : '尚無資料'}</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-slate-400"><i class="fa-solid fa-heart-pulse text-indigo-500 mr-1"></i> 平均脈搏：</span>
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
                        <span><i class="fa-regular fa-calendar text-rose-500 mr-1"></i>${r.date}</span>
                        ${r.pulse ? `<span class="text-slate-500 dark:text-slate-400"><i class="fa-solid fa-heart-pulse text-indigo-500 mr-1"></i>${r.pulse} bpm</span>` : ''}
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-base font-bold text-slate-800 dark:text-slate-100">${r.sys} / ${r.dia} <span class="text-[10px] font-normal text-slate-400">mmHg</span></span>
                        <div>${getStatus(r.sys, r.dia)}</div>
                    </div>
                </div>
                <div class="flex items-center gap-1 shrink-0 border-l pl-2 border-slate-200 dark:border-slate-600/60">
                    <button onclick="editRecord(${idx})" class="p-1.5 text-slate-400 hover:text-indigo-500 transition cursor-pointer text-xs" title="編輯">
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
        const cutoffStr = cutoffDate.toISOString().split('T')[0];
        
        filteredRecords = filteredRecords.filter(r => r.date >= cutoffStr);
    }

    const labels = filteredRecords.map(r => r.date);
    const sysData = filteredRecords.map(r => r.sys);
    const diaData = filteredRecords.map(r => r.dia);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: '收縮壓', data: sysData, borderColor: '#f43f5e', backgroundColor: '#f43f5e', tension: 0.3, pointRadius: 3 },
                { label: '舒張壓', data: diaData, borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.3, pointRadius: 3 }
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
    records.forEach(r => { csvContent += `${r.date},${r.sys},${r.dia},${r.pulse}\r\n`; });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${currentMember}_血壓紀錄.csv`);
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function importSingleMemberCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const lines = event.target.result.split(/\r\n|\n/);
            let count = 0;
            if (!db.members[currentMember]) db.members[currentMember] = [];
            for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(',');
                if (cols.length >= 3 && cols[0].trim() !== '') {
                    db.members[currentMember].push({ date: cols[0].trim(), sys: Number(cols[1]), dia: Number(cols[2]), pulse: Number(cols[3]) || 0 });
                    count++;
                }
            }
            db.members[currentMember].sort((a, b) => new Date(a.date) - new Date(b.date));
            saveDB(); resetForm(); initMonthFilter(db.members[currentMember]); render();
            alert(`🎉 成功匯入 ${count} 筆紀錄！`);
        } catch (error) { alert('讀取失敗！'); }
        e.target.value = '';
    };
    reader.readAsText(file);
}

function exportAllMembersCSV() {
    let total = 0;
    for (let m in db.members) total += (db.members[m] || []).length;
    if (total === 0) return alert('沒有資料可供匯出！');
    let csvContent = "\uFEFF成員名稱,日期,收縮壓(mmHg),舒張壓(mmHg),脈搏(bpm)\r\n";
    for (let member in db.members) {
        (db.members[member] || []).forEach(r => { csvContent += `${member},${r.date},${r.sys},${r.dia},${r.pulse}\r\n`; });
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `全家總表_血壓紀錄.csv`);
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function importAllMembersCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const lines = event.target.result.split(/\r\n|\n/);
            let count = 0;
            for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(',');
                if (cols.length >= 4 && cols[0].trim() !== '' && cols[1].trim() !== '') {
                    const name = cols[0].trim();
                    if (!db.members[name]) db.members[name] = [];
                    db.members[name].push({ date: cols[1].trim(), sys: Number(cols[2]), dia: Number(cols[3]), pulse: Number(cols[4]) || 0 });
                    count++;
                }
            }
            for (let m in db.members) db.members[m].sort((a, b) => new Date(a.date) - new Date(b.date));
            saveDB(); resetForm(); initMembers(); initMonthFilter(db.members[currentMember]); render();
            alert(`🎉 成功智慧匯入共 ${count} 筆！`);
        } catch (error) { alert('總表讀取失敗！'); }
        e.target.value = '';
    };
    reader.readAsText(file);
}