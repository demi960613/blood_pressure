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
        { category: 'mindful', text: '允許自己偶爾休息，那是為了走更長遠的路。' },
        { category: 'mindful', text: '今天的你，已經比昨天的自己更棒了。' },
        { category: 'mindful', text: '慢慢來，比較快。' },
        { category: 'mindful', text: '接納自己的不完美，才是完美的開始。' },
        { category: 'mindful', text: '生命中的每一場雨，都是為了滋養隨後的彩虹。' },
        { category: 'mindful', text: '溫柔對待自己，世界也會溫柔對你。' },
        { category: 'mindful', text: '今天的努力，是獻給未來最好的禮物。' },
        { category: 'mindful', text: '心中有光，何懼路長。' },
        { category: 'mindful', text: '呼吸，吐氣，把當下過好就是最大的成就。' },
        { category: 'mindful', text: '相信過程，時間會給出最好的答案。' },
        { category: 'mindful', text: '真正的強大，是懂得在累的時候抱抱自己。' },
        { category: 'mindful', text: '每一個平凡的日子，都值得被認真對待。' },
        { category: 'daily', text: '好的心情，從關心自己的身體開始。' },
        { category: 'mindful', text: '不必追隨別人的步調，你有自己的時區。' },
        { category: 'mindful', text: '讓過去過去，讓未來到來。' },
        { category: 'mindful', text: '生活不求完美，但求每天都有小驚喜。' },
        { category: 'mindful', text: '保持善良，好運總會不期而遇。' },
        { category: 'mindful', text: '你的存在本身，就是一份獨一無二的禮物。' },
        { category: 'mindful', text: '寧靜不是沒有風浪，而是心中有了錨。' },
        { category: 'mindful', text: '懂得放手，才能騰出雙手擁抱幸福。' },
        { category: 'mindful', text: '勇敢不是不害怕，而是帶著害怕依然前行。' },
        { category: 'mindful', text: '今天的辛苦，會化作明天的養分。' },
        { category: 'mindful', text: '笑容是世界上最美的語言。' },
        { category: 'mindful', text: '給自己一點時間，花開自然有時。' },
        { category: 'daily', text: '照顧好身體，是所有幸福的基石。' },
        { category: 'mindful', text: '生活的解藥，藏在每一個認真生活的瞬間。' },
        { category: 'mindful', text: '不張揚，不浮躁，默默發光就很美。' },
        { category: 'mindful', text: '走過的路，每一步都算數。' },
        { category: 'mindful', text: '把心放寬，天地自寬。' },
        { category: 'daily', text: '今天的放鬆，是為了明天更有力量。' },
        { category: 'mindful', text: '幸福不是擁有一切，而是珍惜當下。' },
        { category: 'mindful', text: '內心的平靜，是至高無上的財富。' },
        { category: 'mindful', text: '凡是過往，皆為序章。' },
        { category: 'daily', text: '照顧好自己的心，它比想像中更堅強。' },
        { category: 'mindful', text: '每一天的太陽都是新的，你也是。' },
        { category: 'daily', text: '善待身體，它會陪你走最長的路。' },
        { category: 'mindful', text: '心中有夢，眼裡有光。' },
        { category: 'mindful', text: '學習像樹一樣，靜靜紮根，默默成長。' },
        { category: 'mindful', text: '允許遺憾存在，也是生活的一種美。' },
        { category: 'mindful', text: '靜下心來，聽聽自己內心的聲音。' },
        { category: 'mindful', text: '溫柔是一種力量，無聲卻有無限希望。' },
        { category: 'mindful', text: '每一段經歷，都是生命送給你的禮物。' },
        { category: 'mindful', text: '把目光收回自己身上，花自然會開。' },
        { category: 'mindful', text: '保持熱愛，奔赴山海。' },
        { category: 'mindful', text: '哪怕只是一小步，也是向前的進步。' },
        { category: 'mindful', text: '用平常心，過不平凡的人生。' },
        { category: 'mindful', text: '你的努力，歲月都會為你記得。' },
        { category: 'mindful', text: '懂得感恩，生活就會處處充滿陽光。' },
        { category: 'mindful', text: '歇歇腳，路還長，不急於這一刻。' },
        { category: 'mindful', text: '成為自己的避風港。' },
        { category: 'mindful', text: '凡事順其自然，心裡自然安坦。' },
        { category: 'mindful', text: '每一次低頭，都是為了更沉穩地抬頭。' },
        { category: 'mindful', text: '讓心定下來，世界就不再喧囂。' },
        { category: 'mindful', text: '生活的甜，藏在微小的堅持裡。' },
        { category: 'mindful', text: '不必焦慮未來，只需把握現在。' },
        { category: 'mindful', text: '沉澱自己，迎接更好的遇見。' },
        { category: 'daily', text: '身心安康，就是最大的福氣。' },
        { category: 'mindful', text: '每一朵花都有它綻放的季節。' },
        { category: 'mindful', text: '內心溫暖，世界就不再冰冷。' },
        { category: 'mindful', text: '給生活留白，給心靈空間。' },
        { category: 'mindful', text: '相信自己，你遠比想像中優秀。' },
        { category: 'mindful', text: '平淡的日子裡，也能開出幸福的花。' },
        { category: 'mindful', text: '保持從容，優雅前行。' },
        { category: 'mindful', text: '每一次呼吸，都是生命的奇蹟。' },
        { category: 'mindful', text: '隨遇而安，也是一種智慧。' },
        { category: 'mindful', text: '懂得體恤自己，才懂得體恤他人。' },
        { category: 'mindful', text: '堅持很累，但成果很甜。' },
        { category: 'mindful', text: '擁抱變化，迎接每一個嶄新的自己。' },
        { category: 'daily', text: '健康的身體，是追夢最大的本錢。' },
        { category: 'mindful', text: '今天的你，依然閃耀著光芒。' },
        { category: 'mindful', text: '慢下來，才能看清路邊的風景。' },
        { category: 'mindful', text: '善待當下，就是善待未來。' },
        { category: 'mindful', text: '勇敢做自己，你本就獨一無二。' },
        { category: 'mindful', text: '順應生命的節奏，不急不躁。' },
        { category: 'mindful', text: '每一個微笑，都是對生活的熱愛。' },
        { category: 'mindful', text: '願你心中有愛，腳下有路。' },
        { category: 'mindful', text: '接納情緒，就像接納四季的交替。' },
        { category: 'mindful', text: '今天的耕耘，終將迎來豐收。' },
        { category: 'mindful', text: '保持一顆赤子之心，世界依然美好。' },
        { category: 'mindful', text: '靜候花開，歲月靜好。' },
        { category: 'mindful', text: '內心的強大，勝過外界的一切風浪。' },
        { category: 'mindful', text: '懂得休息的人，才懂得更好地工作。' },
        { category: 'mindful', text: '生活很美好，值得你溫柔相待。' },
        { category: 'mindful', text: '每一天都是限量版，好好珍惜。' },
        { category: 'mindful', text: '願你今夜好夢，明天神采奕奕。' },
        { category: 'mindful', text: '命里有時終須有，命里無時莫強求。' },
        { category: 'mindful', text: '心若向陽，無謂悲傷；心若憂傷，遍地蒼涼。' },
        { category: 'mindful', text: '人生豈能事事如願；自愛而後，才能愛可愛之人。' },
        { category: 'mindful', text: '人生百味，隨遇、隨喜、隨安。' },
        { category: 'mindful', text: '甘於平凡或勇敢嘗試，也許就在一念之間。' },
        { category: 'mindful', text: '天行健，君子以自強不息。' },
        { category: 'mindful', text: '面向陽光，陰影就在背後。' },
        { category: 'mindful', text: '夢想本不會發光，會發光的是追逐夢想的你。' },
        { category: 'mindful', text: '以智取勝，不以力壓人。' },
        { category: 'mindful', text: '態度決定高度，格局決定結局。' },
        { category: 'mindful', text: '慎言，以養其德；慎行，以堅其志。' },
        { category: 'mindful', text: '前路漫漫，願你一直保持本心，成為最好的自己。' },
        { category: 'mindful', text: '向陽而生，追光不止。' },
        { category: 'mindful', text: '成長雖伴隨疼痛和遺憾，磨難過後仍有更寬廣的路。' },
        { category: 'mindful', text: '莫愁千里路，自有到來風。' },
        { category: 'mindful', text: '不唯上，不唯書，只唯實。' },
        { category: 'mindful', text: '永遠不要回頭，大步向前走。' },
        { category: 'mindful', text: '長風破浪會有時，直掛雲帆濟滄海。' },
        { category: 'mindful', text: '人生之河奔騰向前，我心堅定，為夢前行。' },
        { category: 'mindful', text: '逐光而行，不負相遇。' },
        { category: 'mindful', text: '願我們在未來無數個不確定中，依然有勇氣做出不後悔的決定。' },
        { category: 'mindful', text: '所求皆所願，所行皆坦途。' },
        { category: 'mindful', text: '凡事不必完美無瑕，始終可以變得更好。' },
        { category: 'mindful', text: '已識乾坤大，猶憐草木青。' },
        { category: 'mindful', text: '廣闊天地，大有作為；珍惜春光，不負韶華。' },
        { category: 'mindful', text: '保持本心，驚濤之中也能走出自己的方向。' },
        { category: 'mindful', text: '願你自由如風，也願你心中常有星光。' },
        { category: 'mindful', text: '愛應讓人感到溫柔和勇敢，而不是委屈和妥協。' },
        { category: 'mindful', text: '歲月悠悠，願每份真摯情意都被好好珍惜。' },
        { category: 'mindful', text: '心平氣和，萬事順遂。' },
        { category: 'mindful', text: '當你開始愛自己，便更能看見世界的溫柔。' },
        { category: 'mindful', text: '心若無塵，清風自來。' },
        { category: 'mindful', text: '心的容器有多大，快樂就有多少。' },
        { category: 'mindful', text: '情留不住，轉眼成舊夢。' },
        { category: 'mindful', text: '情蝕骨，愛永恆。' },
        { category: 'mindful', text: '原諒我陪你走過情竇初開，還想陪你兩鬢斑白。' },
        { category: 'mindful', text: '歲月悠悠，情深意長；時光荏苒，唯愛永恆。' },
        { category: 'mindful', text: '之所鍾，雖醜不嫌；情之所厭，雖美何為？' },
        { category: 'mindful', text: '情不知所起，一往而情深。' },
        { category: 'mindful', text: '淺予深深，長樂未央。' },
        { category: 'mindful', text: '世事如棋，局局新，步步險。' },
        { category: 'mindful', text: '人生如戲，真假難辨，唯有心知。' },
        { category: 'mindful', text: '人生在世，各有其用。' },
        { category: 'mindful', text: '每個人都有自己的秘密；只要不傷害彼此，便留一份理解與尊重。' },
        { category: 'mindful', text: '萍水相逢，不過是故人緩緩歸。' },
        { category: 'mindful', text: '斗轉星移，歲月幾何？' },
        { category: 'mindful', text: '凡人瞬息之間，也能如星光般閃耀。' },
        { category: 'mindful', text: '桎梏與跨越，堅守與釋放；悲歡喜樂，我心由我。' },
        { category: 'mindful', text: '有趣的靈魂，值得被看見與珍惜。' },
        { category: 'mindful', text: '人的身體或許脆弱，意志卻能在困難中堅定。' },
        { category: 'mindful', text: '願你自在生長，最終燦爛生光。' },
        { category: 'mindful', text: '莫愁前路無知己，天下誰人不識君。' },
        { category: 'mindful', text: '霽月光風，不縈於懷；歲月繾綣，葳蕤生香。' },
        { category: 'mindful', text: '挽狂瀾於既倒，扶大廈之將傾。' },
        { category: 'mindful', text: '天將傾，願挽之，義不容辭。' },
        { category: 'mindful', text: '願我今生自由如風，願你心中燦若星河。' },
        { category: 'mindful', text: 'Life is full of predicaments, but there is always a solution.' },
        { category: 'mindful', text: 'The world is your oyster;願你把經歷化作色彩，畫出自己的天地。' },
        { category: 'jokes', text: '醫生說要多走路，我現在每天都走到冰箱前，來回好幾趟。' },
        { category: 'jokes', text: '我開始早睡了，現在只是把滑手機的地方從客廳搬到床上。' },
        { category: 'jokes', text: '今天做了伸展運動：伸手拿遙控器，拉筋效果……下次再說。' },
        { category: 'jokes', text: '朋友問我怎麼保持好心情？我說：先找找看，通常就在咖啡旁邊。' },
        { category: 'jokes', text: '我的運動計畫很有彈性，彈性大到每天都能延期。' },
        { category: 'jokes', text: '健康生活第一步：把餅乾放遠一點。第二步：練習走過去拿。' },
        { category: 'jokes', text: '我不是拖延運動，只是在等身體發出更有說服力的邀請。' },
        { category: 'jokes', text: '今天的待辦清單完成一項：成功把待辦清單寫好了。' },
        { category: 'jokes', text: '醫生叫我多運動，所以我每天都在「意念」中跑馬拉松。' },
        { category: 'jokes', text: '今天量血壓很正常，看來剛剛那杯珍珠奶茶沒被心臟發現。' },
        { category: 'jokes', text: '為什麼我這麼喜歡睡覺？因為夢裡什麼都有，還不用花錢。' },
        { category: 'jokes', text: '我不是懶，我只是在為地球節省能源。' },
        { category: 'jokes', text: '每天最認真做的伸展運動，就是早晨按掉鬧鐘的那一下。' },
        { category: 'jokes', text: '壓力大的時候就去吃甜點，因為甜點反過來寫就是「stressed」。' },
        { category: 'jokes', text: '剛才想去散步，腳說它還沒準備好，我決定尊重腳的意見。' },
        { category: 'jokes', text: '我以為我在養生，原來我只是在為吃下一頓大餐做準備。' },
        { category: 'jokes', text: '減肥是明天的差事，今天的我要先吃飽。' },
        { category: 'jokes', text: '人生就像量血壓，數值起起伏伏，放輕鬆就好了。' },
        { category: 'jokes', text: '我每天都在做高強度運動：試圖在床上找到最舒服的姿勢。' },
        { category: 'jokes', text: '醫生說要少吃鹽，看來我以後不能再看太辣的影片了。' },
        { category: 'jokes', text: '最浪漫的事，就是和你一起慢慢變老，而且血壓都很穩定。' },
        { category: 'jokes', text: '剛才量血壓突然飆高，仔細一看，原來是剛剛看到賬單了。' },
        { category: 'jokes', text: '為什麼錢包越來越瘦，我卻越來越胖？這不公平！' },
        { category: 'jokes', text: '每天堅持打卡，感覺自己離電競選手只差一個專業鍵盤了。' },
        { category: 'jokes', text: '聽說笑能讓心情放鬆，那我今天看這條笑話賺到了。' },
        { category: 'jokes', text: '世界上最遙遠的距離，是床與洗手間的距離。' },
        { category: 'jokes', text: '今天的熱量已經被我用智商抵銷掉了。' },
        { category: 'jokes', text: '剛才想跑步，突然下起了雨……謝天謝地。' },
        { category: 'jokes', text: '人生苦短，先吃甜點再量血壓。' },
        { category: 'jokes', text: '醫生問我有沒有運動？我說我有天天「運」氣。' },
        { category: 'jokes', text: '為什麼打卡會給金幣？因為健康就是最值錢的資產啊！' },
        { category: 'jokes', text: '每次量血壓前深呼吸，感覺自己像要發動氣功。' },
        { category: 'jokes', text: '我的睡眠品質很好，只要眼睛一閉……明早見。' },
        { category: 'jokes', text: '人生的路很長，但去冰箱的路我很熟。' },
        { category: 'jokes', text: '剛才肚子咕嚕叫，它是在提醒我：該補充快樂了。' },
        { category: 'jokes', text: '世界上最動聽的話不是「我愛你」，而是「血壓很正常」。' },
        { category: 'jokes', text: '減肥太難了，我決定先從「減少思想包袱」開始。' },
        { category: 'jokes', text: '每天量血壓，感覺自己像在開定期健康記者會。' },
        { category: 'jokes', text: '剛剛跑了一下下，心跳快得像初戀。' },
        { category: 'jokes', text: '只要我吃得夠快，熱量就追不上我。' },
        { category: 'jokes', text: '鬧鐘的作用，就是讓我知道自己還能再睡五分鐘。' },
        { category: 'jokes', text: '我不是胖，我只是心靈太充實溢出來了。' },
        { category: 'jokes', text: '醫生叫我多喝水，我決定喝水的時候順便泡杯茶。' },
        { category: 'jokes', text: '今天的血壓很聽話，獎勵自己看一集喜劇片。' },
        { category: 'jokes', text: '為什麼週末過得比電梯還快？' },
        { category: 'jokes', text: '我每天都在做眼球運動：看手機、看電視、看冰箱。' },
        { category: 'jokes', text: '剛才量血壓，壓迫感強得像被小貓抱住手臂。' },
        { category: 'jokes', text: '堅持打卡 7 天，感覺自己快要拿到健康奧斯卡獎了。' },
        { category: 'jokes', text: '世界上最好的化妝品，就是昨晚那 8 小時的香甜睡眠。' },
        { category: 'jokes', text: '為什麼我要每天記血壓？因為我想當自己的健康 CEO。' },
        { category: 'jokes', text: '剛才吃了一塊餅乾，心靈得到了極大的修復。' },
        { category: 'jokes', text: '我跟脂肪是舊識了，它一直對我不離不捨。' },
        { category: 'jokes', text: '今天的運動量：成功把手機從桌上拿起來。' },
        { category: 'jokes', text: '醫生說要保持心情愉快，所以我把工作先推開了。' },
        { category: 'jokes', text: '為什麼這條笑話能抽到？因為你今天運氣特別好呀！' },
        { category: 'jokes', text: '每天打卡就像收房租，收的是健康的利息。' },
        { category: 'jokes', text: '剛才想去健身房，後來想想，心動不如行動……算了，心動就好。' },
        { category: 'jokes', text: '為什麼血壓會高？因為這個世界太有趣，讓人太激動了。' },
        { category: 'jokes', text: '今天的午睡很成功，差點直接睡到明天早餐。' },
        { category: 'jokes', text: '人生就像手搖飲，偶爾需要微糖去冰。' },
        { category: 'jokes', text: '剛才量血壓有點高，原來是剛剛在跟電視裡的壞人生氣。' },
        { category: 'jokes', text: '我不是在偷懶，我是在進行「深層大腦休眠技術試驗」。' },
        { category: 'jokes', text: '減肥這條路，我走走停停，主要是在路邊吃小吃。' },
        { category: 'jokes', text: '每天按時量血壓，感覺自己像個高科技機器人。' },
        { category: 'jokes', text: '世界上最溫柔的擁抱，是壓脈帶充氣那一刻的緊抱。' },
        { category: 'jokes', text: '剛才喝了一口熱水，感覺靈魂都被淨化了 1%。' },
        { category: 'jokes', text: '為什麼我這麼可愛？因為我每天都有認真記錄血壓啊！' },
        { category: 'jokes', text: '今天的目標：努力活著，順便量個血壓。' },
        { category: 'jokes', text: '剛才差點就忘了打卡，還好我的健康護衛盾提醒了我。' },
        { category: 'jokes', text: '醫生說要多吃蔬菜，那我吃抹茶冰淇淋算不算？' },
        { category: 'jokes', text: '最棒的運動就是「仰臥起坐」：仰臥著，然後起來吃東西。' },
        { category: 'jokes', text: '今天的血壓指數相當完美，值得一朵小紅花。' },
        { category: 'jokes', text: '我跟睡眠是絕配，可惜鬧鐘老是想當第三者。' },
        { category: 'jokes', text: '剛才量血壓，心跳 70，代表我現在極度平靜（且想吃洋芋片）。' },
        { category: 'jokes', text: '人生沒有過不去的坎，只有不想起床的早晨。' },
        { category: 'jokes', text: '為什麼要抽卡？因為心靈也需要補充維他命笑彈。' },
        { category: 'jokes', text: '剛才去公園散步，看到一隻狗比我還會享受生活。' },
        { category: 'jokes', text: '減肥是持久戰，我決定先休戰一週。' },
        { category: 'jokes', text: '今天的金幣收入不錯，感覺自己離富豪又近了一微米。' },
        { category: 'jokes', text: '醫生說不要熬夜，所以我決定改在凌晨睡覺。' },
        { category: 'jokes', text: '為什麼壓脈帶放氣時那麼舒服？因為那叫「釋放壓力」！' },
        { category: 'jokes', text: '每天記錄血壓，是我跟自己身體的秘密對話。' },
        { category: 'jokes', text: '剛才想生氣，想想血壓計，算了算了，原諒世界吧。' },
        { category: 'jokes', text: '我的記憶力很好，除了忘記帶鑰匙、忘記密碼之外。' },
        { category: 'jokes', text: '今天的努力打卡，是為了換取明天更多的笑聲。' },
        { category: 'jokes', text: '為什麼快樂的時間過得這麼快？因為它沒開限速啊。' },
        { category: 'jokes', text: '剛才喝了一杯溫水，感覺體內的細胞都在開派對。' },
        { category: 'jokes', text: '減肥的最佳時機是十年前，其次是……下個月。' },
        { category: 'jokes', text: '今天的血壓很穩定，這代表我的脾氣修養又進步了。' },
        { category: 'jokes', text: '為什麼我要買保護盾？因為我的記憶力偶爾會放假。' },
        { category: 'jokes', text: '我不是在發呆，我是在進行「大腦硬碟重組」。' },
        { category: 'jokes', text: '每天最期待的事，就是看看今天心靈圖書館抽到什麼。' },
        { category: 'jokes', text: '醫生說要多曬太陽，我決定在陽台上躺著曬。' },
        { category: 'jokes', text: '今天的打卡任務完成，給優秀的自己按個讚！' },
        { category: 'jokes', text: '為什麼壓脈帶綁這麼緊？因為它想給你的手臂一個深情的吻。' },
        { category: 'jokes', text: '剛才想去打球，球說它今天想休息。' },
        { category: 'jokes', text: '人生苦短，及時行樂，順便量量血壓。' },
        { category: 'jokes', text: '今天的努力，換來了一張超棒的心靈卡片！' },
        { category: 'jokes', text: '我跟健康的關係越來越好了，連血壓計都認得我。' },
        { category: 'jokes', text: '為什麼笑會讓人年輕？因為笑的時候皺紋都擠在一起看不出來了。' },
        { category: 'jokes', text: '剛才量血壓，感覺自己像在進行火箭發射倒數。' },
        { category: 'jokes', text: '減肥只是說說而已，健康才是真愛。' },
        { category: 'jokes', text: '今天的打卡獎勵真豐富，明天還要繼續來！' },
        { category: 'jokes', text: '看完這些笑話，希望你的心情也跟著亮起來！' },
        { category: 'jokes', text: '想減肥的時候就去量血壓，看到數值正常就知道自己只是「骨架大」。' },
        { category: 'jokes', text: '剛才量血壓，才發現血壓計比我更早看出我在緊張。' },
        { category: 'jokes', text: '醫生說要保持心情愉快，我決定先把待辦清單翻到背面。' },
        { category: 'jokes', text: '今天的血壓很穩定，感覺可以領一朵不存在的小紅花。' },
        { category: 'jokes', text: '剛才想去運動，後來決定先換上運動服，今天也算有進度。' },
        { category: 'jokes', text: '量血壓前深呼吸，感覺自己像在等待氣功師父點化。' },
        { category: 'jokes', text: '今天的午休只打算瞇一下，醒來時已經和下午重新認識了。' },
        { category: 'jokes', text: '我和鬧鐘約好各退一步：它響，我按掉，大家都有參與感。' },
        { category: 'jokes', text: '打卡不是在收集數字，是在收集「今天也有照顧自己」的證據。' },
        { category: 'daily', text: '固定時間測量並記下數值，有助於觀察自己的變化。' },
        { category: 'daily', text: '測量前安靜休息幾分鐘，讀值會更容易比較。' },
        { category: 'daily', text: '把手臂放在與心臟大約同高的位置，再開始測量。' },
        { category: 'daily', text: '單次數值只是參考；持續記錄能提供更完整的趨勢。' },
        { category: 'daily', text: '規律作息與日常活動，都是照顧健康的一部分。' },
        { category: 'daily', text: '工作或讀書一段時間後，起身活動一下、看看遠方。' },
        { category: 'daily', text: '覺得緊繃時，可以慢慢吸氣、吐氣幾次，讓自己稍作停頓。' },
        { category: 'daily', text: '喝水、吃飯、休息，這些小事也值得放進照顧自己的清單。' },
        { category: 'daily', text: '測量時請保持放鬆，雙腳平放地面，不要交叉雙腿。' },
        { category: 'daily', text: '減少飲食中的鈉鹽攝取，有助於維持心血管健康。' },
        { category: 'daily', text: '測量血壓前 30 分鐘內，避免吸菸、喝咖啡或劇烈運動。' },
        { category: 'daily', text: '規律進行快走等活動，逐步累積每週約 150 分鐘的中等強度運動；依自身狀況調整。' },
        { category: 'daily', text: '睡前留一段不看螢幕的時間，幫助自己放鬆準備入睡。' },
        { category: 'daily', text: '均衡飲食，多攝取蔬菜、水果、全穀與高纖食物。' },
        { category: 'daily', text: '測量時請勿說話或移動身體，以免影響讀值。' },
        { category: 'daily', text: '盡量維持規律作息，每天在相近時間入睡與起床。' },
        { category: 'daily', text: '戒菸並避免過量飲酒，有助降低心血管健康風險。' },
        { category: 'daily', text: '久坐一段時間後，起身活動幾分鐘、伸展筋骨。' },
        { category: 'daily', text: '定期回診，並與醫療人員討論血壓記錄。' },
        { category: 'daily', text: '測量血壓時，請穿著舒適、不會勒住上臂的衣物。' },
        { category: 'daily', text: '運動前後記得依活動狀況暖身與緩和。' },
        { category: 'daily', text: '學習安排休息，給身體足夠的恢復時間。' },
        { category: 'daily', text: '測量血壓時，手臂放鬆並支撐在桌面上，手掌朝上。' },
        { category: 'daily', text: '遇到煩心事時，試著寫下感受，為情緒找個出口。' },
        { category: 'daily', text: '少喝含糖飲料，可選擇白開水或無糖飲品。' },
        { category: 'daily', text: '定期檢查血壓計電量，並依照說明確認設備狀況。' },
        { category: 'daily', text: '每天留一點時間做自己喜歡的休閒活動。' },
        { category: 'daily', text: '與家人朋友保持聯繫，分享生活中的大小事。' },
        { category: 'daily', text: '若運動時感到胸悶、頭暈或不適，請先停止活動並尋求適當協助。' },
        { category: 'daily', text: '測量前先安靜坐好，避免剛爬樓梯或匆忙趕路後立刻測量。' },
        { category: 'daily', text: '依照醫囑服藥，切勿自行停藥或調整劑量。' },
        { category: 'daily', text: '每天記錄血壓，是用數據關心自己的方式。' },
        { category: 'daily', text: '隨身準備水壺，依口渴、活動與身體狀況適時補充水分。' },
        { category: 'daily', text: '散步是簡單易行的日常活動，從適合自己的速度開始。' },
        { category: 'daily', text: '定期健康檢查，並向醫療人員詢問適合自己的照護方式。' },
        { category: 'daily', text: '每天給自己一小段安靜、不被打擾的時間。' },
        { category: 'daily', text: '遇到問題時，先停下來深呼吸幾次，再決定下一步。' },
        { category: 'daily', text: '規律記錄身體感受，有助於回診時更清楚地描述近況。' },
        { category: 'daily', text: '避免長時間低頭看手機，適時讓肩頸休息。' },
        { category: 'daily', text: '適度到戶外走走，留意防曬與天氣變化。' },
        { category: 'daily', text: '睡前做些溫和伸展，讓緊繃一天的身體慢慢放鬆。' },
        { category: 'daily', text: '避免在極度疲勞時勉強自己進行高強度活動。' },
        { category: 'daily', text: '運動時依活動量與天氣適時補充水分。' },
        { category: 'daily', text: '測量血壓前，移除上臂厚重或緊繃的衣物。' },
        { category: 'daily', text: '睡前聆聽喜歡的輕柔音樂，讓心情逐漸沉靜。' },
        { category: 'daily', text: '避免長時間維持同一姿勢，記得適時休息和活動。' },
        { category: 'daily', text: '保持口腔清潔，並定期接受牙科檢查。' },
        { category: 'daily', text: '測量時將壓脈帶依設備說明正確繫在上臂，勿隔著衣物測量。' },
        { category: 'daily', text: '放鬆肩頸，別讓壓力悄悄累積在身上。' },
        { category: 'daily', text: '情緒激動或剛運動完時，先休息平穩後再測量。' },
        { category: 'daily', text: '把每天值得感謝的小事記下來，留意生活中的溫暖。' },
        { category: 'daily', text: '健康建議因人而異，有疑問時請詢問醫師或藥師。' },
        { category: 'daily', text: '家用血壓測量應依醫療人員建議的頻率與方式進行。' },
        { category: 'daily', text: '若讀值異常，先依正確姿勢安靜休息後重測，並按醫療人員指示處理。' },
        { category: 'daily', text: '選擇自己喜歡且能持續的活動，比一時勉強更容易養成習慣。' },
        { category: 'daily', text: '烹調時可用香草、檸檬或香料增添風味，逐步減少鹽的使用。' },
        { category: 'daily', text: '留意加工食品的營養標示，選擇較符合個人飲食需求的品項。' },
        { category: 'daily', text: '天氣寒冷時注意保暖，外出活動也要量力而為。' },
        { category: 'daily', text: '測量前若有排尿需求，先上洗手間再安靜坐下測量。' },
        { category: 'daily', text: '將常用物品收納整齊，讓生活空間更舒適好活動。' },
        { category: 'daily', text: '和醫療人員討論適合自己的飲食、運動與睡眠目標。' },
        { category: 'daily', text: '記錄測量時間、讀值及當時狀況，方便日後比較與回診討論。' },
        { category: 'daily', text: '一次測量無法代表長期狀況，依照建議持續記錄更有參考價值。' },
        { category: 'daily', text: '量血壓時背部靠著椅背，雙腳平放，保持安靜。' },
        { category: 'daily', text: '使用尺寸合適的壓脈帶，並依血壓計說明書操作。' },
        { category: 'daily', text: '開始新的運動計畫前，可先依自己的健康狀況諮詢醫療人員。' },
        { category: 'daily', text: '安排規律睡眠，白天也記得適度活動與休息。' },
        { category: 'daily', text: '少一點與別人比較，多一點留心自己今天的需要。' },
        { category: 'daily', text: '給自己幾分鐘緩慢呼吸，讓忙碌的節奏暫停一下。' },
        { category: 'daily', text: '健康管理不必一次做到完美，從容易維持的小改變開始。' },
        { category: 'daily', text: '把回診日期和用藥資訊整理好，讓每次就醫溝通更順利。' },
        { category: 'daily', text: '若忘記是否已服藥，不要自行加倍服用，先依藥袋指示或詢問醫療人員。' },
        { category: 'daily', text: '測量時選擇安靜、溫度舒適的環境，讓身體保持放鬆。' },
        { category: 'daily', text: '邀請親友一起散步，讓活動時間多一份陪伴與樂趣。' },
        { category: 'daily', text: '今天也記得給自己一點肯定，照顧健康是長期的旅程。' },
        { category: 'daily', text: '依照醫療人員建議的方式測量，讓不同日期的讀值更容易比較。' },
        { category: 'daily', text: '測量時坐在有靠背的椅子上，讓背部得到支撐。' },
        { category: 'daily', text: '測量前安靜休息約五分鐘，並避免交談。' },
        { category: 'daily', text: '依血壓計說明選擇適合上臂尺寸的壓脈帶。' },
        { category: 'daily', text: '測量期間將手臂放鬆支撐，避免自行用力握拳。' },
        { category: 'daily', text: '若需連續測量，依醫療人員或設備說明安排測量間隔。' },
        { category: 'daily', text: '把血壓記錄帶到回診時與醫療人員一起檢視。' },
        { category: 'daily', text: '若對血壓讀值有疑問，記下問題並在回診時提出。' },
        { category: 'daily', text: '選擇營養均衡、自己也能長期維持的飲食方式。' },
        { category: 'daily', text: '採買時留意食品標示，逐步找到適合自己的選擇。' },
        { category: 'daily', text: '讓蔬菜、水果與全穀類成為日常飲食的一部分。' },
        { category: 'daily', text: '用散步、伸展或其他喜歡的活動，為久坐生活加入活動時間。' },
        { category: 'daily', text: '把運動安排進行事曆，從短時間、容易做到的活動開始。' },
        { category: 'daily', text: '活動時穿著舒適、合腳且適合當天活動的鞋子。' },
        { category: 'daily', text: '在天氣炎熱或活動量較大時，留意休息並適度補充水分。' },
        { category: 'daily', text: '天氣或身體狀況不佳時，調整活動強度並優先照顧安全。' },
        { category: 'daily', text: '睡眠環境保持安靜、昏暗與舒適，幫助自己放鬆休息。' },
        { category: 'daily', text: '若睡眠問題持續影響生活，可與醫療人員討論。' },
        { category: 'daily', text: '為工作和休息安排清楚的界線，避免長時間不間斷忙碌。' },
        { category: 'daily', text: '試著在一天中安排幾次短暫起身活動的提醒。' },
        { category: 'daily', text: '找到適合自己的紓壓方法，例如散步、閱讀或與人談談。' },
        { category: 'daily', text: '整理用藥清單與過敏資訊，方便就醫時提供給醫療人員。' },
        { category: 'daily', text: '使用藥盒或提醒工具協助建立規律服藥習慣，並依醫囑用藥。' },
        { category: 'daily', text: '把血壓計放在容易取用的地方，讓日常測量更方便。' },
        { category: 'daily', text: '備妥血壓計使用說明，遇到操作問題時可先查閱或詢問醫療人員。' },
        { category: 'daily', text: '每一滴汗水，都是認真生活的印記。' },
        { category: 'daily', text: '健康是珍貴的禮物，值得每天用心照顧。' },
        { category: 'daily', text: '愛護自己，從依照建議記錄血壓開始。' },
        { category: 'daily', text: '健康不只是目標，也是一種日常生活方式。' },
        { category: 'daily', text: '留意身體發出的訊號；有疑慮時，請向醫療人員詢問。' },
        { category: 'daily', text: '持續記錄，是對自己健康的一份承諾。' },
        { category: 'daily', text: '照顧健康，也是關心自己與所愛之人的一種方式。' }
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
            description: '本月首次記錄可獲得「初次見面」徽章；每筆記錄都能獲得 XP 和金幣。當日首次記錄會自動獲得免費卡；若尚未抽卡，也可在心靈圖書館手動免費抽取。',
            action: '模擬健康正常紀錄',
            before: { xp: 0, coins: 0, shields: 0, streak: 0 },
            after: { xp: 20, coins: 10, shields: 0, streak: 1 },
            result: '獲得 +20 XP、+10 金幣，連續紀錄 1 天，並解鎖本月的「初次見面」徽章與當日免費卡；同月後續記錄不會再次解鎖徽章。'
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
            ensure('lastFreeDrawDate', '');
            ensure('hasImportedHistoricalRecords', false);
            existing.unlockedQuotes = Array.isArray(existing.unlockedQuotes)
                ? [...new Set(existing.unlockedQuotes.filter(quote => typeof quote === 'string'))]
                : [];
            const recordedDraws = Number.isFinite(existing.totalCardsDrawn) && existing.totalCardsDrawn >= 0
                ? existing.totalCardsDrawn
                : 0;
            const totalCardsDrawn = Math.max(recordedDraws, existing.unlockedQuotes.length);
            if (existing.totalCardsDrawn !== totalCardsDrawn) {
                existing.totalCardsDrawn = totalCardsDrawn;
                changed = true;
            }
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
            const libraryBadgeCount = Math.floor(existing.totalCardsDrawn / 10);
            if (existing.badgeCounts.library < libraryBadgeCount) {
                existing.badgeCounts.library = libraryBadgeCount;
                changed = true;
            }
            if (!Array.isArray(existing.unlockedBadges)) {
                existing.unlockedBadges = this.getUnlockedBadges(member, existing);
                changed = true;
            } else if (libraryBadgeCount > 0 && !existing.unlockedBadges.includes('library')) {
                existing.unlockedBadges.push('library');
                changed = true;
            }
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
            window.showAppToast(messages.join(' '), 'success', 3000);
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
                window.showAppToast(dailyMessage, 'success', 3000);
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
        if (scenario?.notice) window.showAppToast(scenario.notice, 'success', 3000);
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
window.showAppToast = (message, type = 'success', duration = 3000) => {
    const region = document.getElementById('app-toast-region');
    if (!region) return;

    const toast = document.createElement('div');
    toast.className = `app-toast${type === 'error' ? ' error' : type === 'shield' ? ' shield' : ''}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    const text = document.createElement('span');
    text.className = 'app-toast-message';
    text.textContent = message;
    toast.append(text);
    if (duration <= 0) {
        const dismissButton = document.createElement('button');
        dismissButton.type = 'button';
        dismissButton.className = 'app-toast-dismiss';
        dismissButton.textContent = '了解';
        dismissButton.setAttribute('aria-label', '關閉通知');
        dismissButton.addEventListener('click', () => dismissToast(toast));
        toast.append(dismissButton);
    }
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