/**
 * ・undefined対策 ・localStorageからmemoExportへ(必要があれば変換してから)出力する
 */
const startScript = () => {
    if (localStorage.memo0 == undefined) {
        localStorage.memo0 = ''
        startScript();
    };

    if (/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g.test(localStorage.memo0)) {
        const Exportreplace = localStorage.memo0.replace(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g, '<a href="$&">$&</a>').replace(/\r?\n/g, '<br>')

        document.getElementById('memoExport').innerHTML = Exportreplace
    } else {
        document.getElementById('memoExport').innerText = localStorage.memo0
    };

    document.getElementById('memo0').value = localStorage.memo0;
}

/**
 * memo0(テキストエリア) の内容を localStorage.memo0 に保存して再読み込みする
 */
const save0 = () => {
    localStorage.memo0 = document.getElementById('memo0').value;
    startScript()
}

/**
 * 同期する内容を上書きする
 */
const sync0 = () => {
    if (document.getElementById('memo0').value === '') {

        chrome.storage.sync.get("syncedNote", result => {
            localStorage.memo0 = result.syncedNote
            startScript()
            console.log('syncedNoteを読み込みました')
        })
    } else {
        save0()
        let obj = new Object()
        obj = { "syncedNote": localStorage.memo0 }
        if (!obj.syncedNote) {
            obj.syncedNote = 'syncは約10KB,saveは約5MBまで保存できます\n10KBは約5000文字です'
        }

        chrome.storage.sync.set(obj, () => {
            if (chrome.runtime.lastError) {
                alert('データが大きすぎます。saveなら5MB以下, syncなら10KB以下 におさめてください');
                console.warn('データが大きすぎます。save: 5MB以下, sync: 10KB以下 におさめてください')
            }
            chrome.storage.sync.get("syncedNote", r => { console.log('同期する内容を"' + r.syncedNote + '"に変更しました') })
        })

    }
}

/**
 * localStorage.memo0 と､フォームの内容を削除する
 */
const reset0 = () => {
    localStorage.removeItem('memo0');
    document.getElementById('memo0').value = '';
    startScript()
}

/**
 * memo0(テキストエリア) を範囲選択してコピーする
 */
const copy0 = () => {
    document.getElementById('memo0').select();
    document.execCommand('copy');
}

startScript()

document.getElementById('save').addEventListener('click', save0)
document.getElementById('sync').addEventListener('click', sync0)
document.getElementById('reset').addEventListener('click', reset0)
document.getElementById('copy').addEventListener('click', copy0)
