/**
 * ・undefined対策 ・localStorageからmemoExportへ(必要があれば変換してから)出力する
 */
const startScript = () => {
  if (localStorage.memo0 == undefined) {
    localStorage.memo0 = "";
    startScript();
  } else if (
    /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/g.test(localStorage.memo0)
  ) {
    const memoExport = document.getElementById("memoExport");
    memoExport.textContent = "";

    const memoStr = localStorage.memo0;

    const splits = memoStr.split(
      /(https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+)/g
    );

    for (const str of splits) {
      if (/https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/g.test(str)) {
        const anchor = document.createElement("a");
        anchor.href = str;
        anchor.innerText = str;

        memoExport.insertAdjacentElement("beforeend", anchor);
      } else if (/\r\n|\n|\r/g.test(str)) {
        for (const e of str.split(/\r\n|\n|\r/g)) {
          memoExport.insertAdjacentText("beforeend", e);
          memoExport.insertAdjacentHTML("beforeend", "<br>");
        }
      } else {
        memoExport.insertAdjacentText("beforeend", str);
      }
    }
  } else {
    document.getElementById("memoExport").innerText = localStorage.memo0;
  }

  document.getElementById("memo0").value = localStorage.memo0;
};

/**
 * memo0(テキストエリア) の内容を localStorage.memo0 に保存して再読み込みする
 */
const save0 = () => {
  localStorage.memo0 = document.getElementById("memo0").value;
  startScript();
};

/**
 * ・テキストエリアに文字がある時→同期する内容を上書きする・テキストエリアになにもない時→登録されている文字を読み込む、なければはじめの文を登録して再帰
 */
const sync0 = () => {
  if (document.getElementById("memo0").value === "") {
    chrome.storage.sync.get("syncedNote", (result) => {
      if (!result.syncedNote) {
        chrome.storage.sync.set(
          {
            syncedNote:
              "syncは約10KB, saveは約5MBまで保存できます\n10KBは約5000文字です",
          },
          () => {
            sync0();
          }
        );
      } else {
        localStorage.memo0 = result.syncedNote;
        startScript();
        console.log("syncedNoteを読み込みました");
      }
    });
  } else {
    save0();

    let setObj = { syncedNote: localStorage.memo0 };

    chrome.storage.sync.set(setObj, () => {
      if (chrome.runtime.lastError) {
        alert(
          "データが大きすぎます。saveなら5MB以下, syncなら10KB以下 におさめてください"
        );
        console.warn(
          "データが大きすぎます。saveなら5MB以下, syncなら10KB以下 におさめてください"
        );
      }
      chrome.storage.sync.get("syncedNote", (r) => {
        console.log('同期する内容を"' + r.syncedNote + '"に変更しました');
      });
    });
  }
};

/**
 * localStorage.memo0 と､フォームの内容を削除する
 */
const reset0 = () => {
  localStorage.removeItem("memo0");
  document.getElementById("memo0").value = "";
  startScript();
};

/**
 * memo0(テキストエリア) を範囲選択してコピーする
 */
const copy0 = () => {
  document.getElementById("memo0").select();
  document.execCommand("copy");
};

startScript();

document.getElementById("save").addEventListener("click", save0);
document.getElementById("sync").addEventListener("click", sync0);
document.getElementById("reset").addEventListener("click", reset0);
document.getElementById("copy").addEventListener("click", copy0);
