# Vue 3 作品：電商購物網站「茶友道」

#### 框架／函式庫：Vue 3(Vue cli, Vue router), Bootstrap
#### 套件：[axios](https://github.com/axios/axios), [vee-validate](https://vee-validate.logaretm.com/v4/), [Vue Loading Overlay Component](https://github.com/moyoujun/vue3-loading-overlay)
#### 語言及技術：JavaScript(ES6), SCSS, HTML, CSS
#### 素材來源：
+ 圖標：Google Material Icons, Bootstrap Icons
+ 圖片：unsplash, pixaby, pexels
+ 插圖：[Toptal Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/), vecteezy, freepik
#### 部分文字來源：
+ 維基百科
+ [行政院農委會茶葉改良場](https://www.tres.gov.tw/ws.php?id=1495)
----
## 網頁結構及功能
+ #### 主頁：
  + [首頁](#首頁)
  + [產品列表](#產品列表與個別產品詳細介紹)：下分「所有產品」、「茶葉」、「茶具」、「茶點」、「包裝」小類
  + [個別產品詳細介紹](#產品列表與個別產品詳細介紹)
  + 文章列表
  + 我的最愛
  + 建立訂單
  + 結帳
  + 「找不到」頁面
+ #### 後台
  + 登入
  + [管理介面](#管理介面)：下分「產品管理」、「訂單管理」、「優惠券管理」、「文章管理」

-----
## 網頁特色
#### 1. 首頁視差滾動效果
<img src="https://upload.cc/i1/2022/10/16/btQgHn.gif" width="500px">

#### 2. 手機版導覽列根據滑動方向展開／收合
<img src="https://upload.cc/i1/2022/11/01/YK9PjC.gif" width="300px">

#### 3. 彈出視窗通知
<img src="https://upload.cc/i1/2022/10/16/4Kb3wG.gif" width="500px">

#### 4. 倒數條幅
<img src="https://upload.cc/i1/2022/10/16/vNYuwM.gif" width="500px">

#### 5. 讀取視覺提示
<img src="https://upload.cc/i1/2022/10/16/ciZm8t.gif" width="500px">

#### 6. 翻轉效果
<img src="https://upload.cc/i1/2022/10/16/KCs6Mn.gif" width="500px">

#### 7. 內容修改視窗（後台管理）
<img src="https://upload.cc/i1/2022/10/16/PJEfgR.gif" width="500px">

#### 8. 多圖上傳（後台管理）
<img src="https://upload.cc/i1/2022/10/16/FKTcko.gif" width="500px">

-----
### 首頁
+ **導覽列**：除導覽外，亦含有顯示購物車功能
  + 在購物車內可調整商品數量，更新購物車內容
  + 購物車無內容時按鈕為 disabled 避免誤觸並提升使用者體驗
+ **領取優惠券**：優惠券碼存在 session storage 中，並在建立訂單時以文字提示
  + 利用 Date 物件與 session storage 進行倒數計時，即使跳開網頁或重新整理皆不會重新計算（但是因為此專案並非正式專案，所以還是可以透過關掉瀏覽器、手動點擊按鈕重新計時）
+ **隨機推薦商品**：取得所有商品後，隨機（shuffle）呈現商品，搭配可以右滑提示
### 產品列表與個別產品詳細介紹
+ 巢狀路由
+ 透過 vue v-bind 設定 class，加上CSS 偽元素，篩選取回的產品資料，加上特價的標示
+ **設定我的最愛**：以 local storage 長期保存。有一頁面集中呈現所有「我的最愛」，在個別產品詳細介紹中亦會反映出「我的最愛」
### 管理介面
+ 巢狀路由
+ **更新／新增／刪除**：小視窗 component 搭配 props, emit 傳遞資料，方便使用者更新或新增內容
+ 以 URL.createObjectURL() 預覽本地上傳的圖片，使用者確認圖片無誤後再透過 FormData 物件上傳至後端
+ 訂單修改深層監聽
```js
watch: {
    products: {
      handler(n, o) {
      // 監聽變動，重新計算總金額後再傳回後端
        for (const i in n) {
          ...
          this.order.total += n[i].final_total
        }
      },
      deep: true
    }
```
