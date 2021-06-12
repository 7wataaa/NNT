const linkRegExp = /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/g;

/**
 * メモ表示部分のHTMLElement
 */
const memoElement = document.getElementById("memoExport");

/**
 * メモ入力部分のHTMLElement
 */
const inputArea = document.getElementById("memoInput");

/**
 * @param str {string} リンクが含まれているか見たい文字列
 * @returns {boolean} [str]にリンクが含まれているか
 */
const isLinkContains = (str) => {
  linkRegExp.test(str);
};

/**
 * 同期ストレージに保存されているメモ内容を取得する
 * @type {string}
 */
const getSyncMemo = () => {
  let syncMemo;

  let debugFlag = false;

  chrome.storage.sync.get("syncMemo", (values) => {
    syncMemo = values.syncMemo ?? "";
    debugFlag = true;
  });

  console.assert(debugFlag, {
    errorMsg:
      "chrome.storage.syncが非同期でコールバックの前にこっちが呼ばれてるのかも",
  });

  return syncMemo + "";
};

/**
 * [newMemoValue]の内容で同期ストレージの内容を更新し､表示を更新する
 * @param newMemoValue {string} 新たな保存内容
 */
function updateSyncMemo(newMemoValue) {
  chrome.storage.sync.set({ syncMemo: newMemoValue + "" }, () => {
    if (chrome.runtime.lastError) {
      alert(
        "エラー: 入力データが大きすぎます。保存される文章は約10KB以下でなければいけません"
      );
      console.warn(
        "エラー: 入力データが大きすぎます。保存される文章は約10KB以下でなければいけません"
      );
      return;
    }

    displaySyncMemo();
    console.log(`同期する内容を${getSyncMemo()}に変更しました`);
  });
}

/**
 * 同期ストレージに保存されている内容を#memoExportに表示させる
 *
 * URLがある場合､aタグで飛べるようにして出力する
 * @returns {void}
 */
const displaySyncMemo = () => {
  /**
   * @type {string} 保存されているメモ内容
   */
  const memoValue = getSyncMemo();

  //入力エリアにも内容を入れる
  inputArea.value = memoValue;

  //メモ内容にリンクが存在しないときは単純に表示するだけ
  if (!isLinkContains(memoValue)) {
    memoElement.innerText = memoValue;
    return;
  }

  //メモ内容にリンクが存在した場合の表示

  memoElement.textContent = "";

  const linkAndNotLinkStrs = memoValue.split(linkRegExp);

  for (const str of linkAndNotLinkStrs) {
    if (isLinkContains(str)) {
      const anchor = document.createElement("a");
      anchor.href = str;
      anchor.innerText = str;

      memoElement.insertAdjacentElement("beforeend", anchor);
    } else if (/\r\n|\n|\r/g.test(str)) {
      for (const e of str.split(/\r\n|\n|\r/g)) {
        memoElement.insertAdjacentText("beforeend", e);
        memoElement.insertAdjacentHTML("beforeend", "<br>");
      }
    } else {
      memoElement.insertAdjacentText("beforeend", str);
    }
  }
};

/**
 * ・テキストエリアに文字がある時→同期する内容を上書きする・テキストエリアになにもない時→登録されている文字を読み込む、なければはじめの文を登録して再帰
 * @returns {void}
 */
const sync = () => {
  //入力エリアが空の場合はsyncMemoを表示させるだけ
  if (inputArea.value === "") {
    displaySyncMemo();
    console.log("syncMemoを読み込みました");

    return;
  }

  //入力エリアが空ではない場合

  updateSyncMemo(inputArea.value);
};

/**
 * フォームの内容を削除する
 * @returns {void}
 */
const reset = () => {
  inputArea.value = "";
  displaySyncMemo();
};

/**
 * memo0(テキストエリア) を範囲選択してコピーする
 * @returns {void}
 */
const copy = () => {
  inputArea.select();
  document.execCommand("copy");
};

displaySyncMemo();

document.getElementById("sync").addEventListener("click", sync);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("copy").addEventListener("click", copy);
