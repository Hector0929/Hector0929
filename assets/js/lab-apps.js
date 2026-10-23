// Hector's Lab 工具目錄：首頁卡片與子頁外框共用這一份資料。
// 新增工具時在 apps 加一筆；同一工具的多個版本用 modes 列出，外框會顯示切換。
window.LAB = {
  categories: [
    { id: 'learn', name: '學習', en: 'Learn', blurb: '孩子的數學與知識練習' },
    { id: 'play', name: '遊戲', en: 'Play', blurb: '純粹好玩的' },
    { id: 'music', name: '音樂', en: 'Music', blurb: '敬拜團與練琴用' },
    { id: 'faith', name: '信仰與社群', en: 'Faith', blurb: '教會與讀經相關' },
    { id: 'lab', name: '實驗室', en: 'Lab', blurb: 'AI 心得與還在試的東西' }
  ],
  apps: [
    {
      id: 'multiplication', cat: 'learn', glyph: '×', title: '九九乘法挑戰',
      desc: '同一組題庫，五種玩法。分數和排名存在這台裝置上。',
      modes: [
        { label: '倒數', href: 'multiplication_test.html' },
        { label: '排名', href: 'multiplication_test_with_rank.html' },
        { label: '鍵盤', href: 'multiplication_test2.html' },
        { label: '射擊', href: 'shooting_game.html' },
        { label: '射擊排名', href: 'shooting_game_adult.html' }
      ]
    },
    { id: 'addition', cat: 'learn', glyph: '+', title: '三位數加二位數', desc: '直式加法練習，用鍵盤輸入答案。', href: 'akila_plus_test.html' },
    { id: 'three-kingdoms', cat: 'learn', glyph: '國', title: '三國知識問答', desc: '200 道題目，從桃園結義到三分歸晉。', href: 'three_kingdoms_quiz.html', tags: ['200 題'] },

    { id: 'tetris', cat: 'play', glyph: '▦', title: '俄羅斯方塊', desc: '經典方塊，手機也能玩。', href: 'Tetris.html' },
    { id: '1a2b', cat: 'play', glyph: 'AB', title: '1A2B 猜數字', desc: '用推理找出四位不重複的數字。', href: 'guess_number_1A2B.html' },

    {
      id: 'chords', cat: 'music', glyph: '♪', title: '簡譜和弦移調', desc: '拍照辨識簡譜和弦，一鍵換調再匯出。',
      href: 'chords_tranport.html',
      also: ['pages/scan.html', 'pages/recognize.html', 'pages/transpose.html', 'pages/export.html']
    },
    { id: 'guitar-chords', cat: 'music', glyph: 'G', title: '吉他和弦查詢', desc: '查和弦按法，支援左手模式。', href: 'guitar_chords.html' },
    {
      id: 'library', cat: 'faith', glyph: '書', title: '領頭羊圖書借閱', desc: '掃描 QR Code 借書、還書。',
      modes: [
        { label: '借閱', href: 'apbolc-library.html' },
        { label: '使用說明', href: 'apbolc-library_intro.html' }
      ]
    },

    { id: 'ai-share', cat: 'lab', glyph: 'AI', title: 'AI 學習分享', desc: 'AI 實作、工具與探險心得。', href: 'ai-learning-share.html' },
    { id: 'chords-exp', cat: 'lab', glyph: '♫', title: '和弦辨識實驗版', desc: '和弦工具的新做法，還在測試。', href: 'chords_tranport_experimental.html' },
    { id: 'about', cat: 'lab', glyph: '人', title: '關於作者 (About Me)', desc: '劉于志 (Hector Liu) 14+ 年測試自動化實戰經歷與自傳。', href: 'about.html' }
  ]
};
