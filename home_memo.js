/**最初に読み込みたいものを放り込んでおく
 * 
 * localStrage.memo0 に保存されている文字列を memoExport と textarea#memo0 に出力する 
 */
const startScript = () => {
    if(localStorage.memo0 === ''){//ここの条件分岐はlocalstorageの内容を判定､memoExportかlocalstorageの書き換えを行う
        document.getElementById('memoExport').innerText = ''
    
    }else if(localStorage.memo0.match(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/)){

        const Exportreplace = localStorage.memo0.replace(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/, '<a href="$&">$&</a>')//memoExportのリンクに<a>を追加した文字列を出せる
        document.getElementById('memoExport').innerHTML = Exportreplace
        //TODO 改行がされない問題の解決
    }else{
        document.getElementById('memoExport').innerText = localStorage.memo0
    };

    document.getElementById('memo0').value = localStorage.memo0;//memo0(テキストエリア) に localStorage.memo0 を入力する
    if (document.getElementById('memo0').value === 'undefined') {
        document.getElementById('memo0').value = ''
    };
}
startScript();

const save0 = () => {
    localStorage.memo0 = document.getElementById('memo0').value;//memo0 の内容を localStorage.memo0 に保存する
    startScript()
}
const reset0 = () => {
    localStorage.removeItem('memo0');//localStorage.memo0 を削除する
    document.getElementById('memo0').value = '';//フォームの内容を削除する
    localStorage.memo0 = ''
    startScript()
}
const copy0 = str => {
    //todo コピーする処理
    document.getElementById('memo0').select();
    document.execCommand('copy');
    console.log('コピーしますた')
}
document.getElementById('save').addEventListener('click', save0)
document.getElementById('reset').addEventListener('click', reset0)
document.getElementById('copy').addEventListener('click', copy0)