/**最初に読み込みたいものを放り込んでおく
 * 
 * 1.localStrage.memo0 に保存されている文字列を memoExport と textarea#memo0 に出力する 
 * 
 */
const startScript = () => {
    if(localStorage.memo0 === ' '){//ここの条件分岐はlocalstorageの内容を判定､memoExportもしくはlocalstorageの書き換えを行う
        document.getElementById('memoExport').innerText = ''
    
    //}else if(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/,exec(localStorage.memo0)){
    //    const Exportreplace = localStorage.memo0.replace(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g, '<a href="$&">$&</a>').replace(/\r?\n/g, '<br>')
    //
    //    document.getElementById('memoExport').innerHTML = Exportreplace//memoExportのリンクにアンカー追加､改行を<br>に変更
    }else{
        document.getElementById('memoExport').innerText = localStorage.memo0
    };

    document.getElementById('memo0').value = localStorage.memo0;//memo0(テキストエリア) に localStorage.memo0 を入力する
    if (document.getElementById('memo0').value === 'undefined') {
        document.getElementById('memo0').value = ''
    };
}
startScript();
/**
 * memo0(テキストエリア) の内容を localStorage.memo0 に保存して再読み込みする
 */
const save0 = () => {
    localStorage.memo0 = document.getElementById('memo0').value;
    startScript()
}
/**
 * localStorage.memo0 と､フォームの内容を削除する
 */
const reset0 = () => {
    localStorage.removeItem('memo0');
    document.getElementById('memo0').value = '';
    localStorage.memo0 = ''
    startScript()
}
/**
 * memo0(テキストエリア) を範囲選択してコピーする
 */
const copy0 = () => {
    document.getElementById('memo0').select();
    document.execCommand('copy');
}
document.getElementById('save').addEventListener('click', save0)
document.getElementById('reset').addEventListener('click', reset0)
document.getElementById('copy').addEventListener('click', copy0)