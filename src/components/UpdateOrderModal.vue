<template>
  <div
    class="modal fade modal-xl"
    id="UpdateOrderModal"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="myModal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <span>修改訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-5">
              <h5>訂單資訊</h5>
              <div class="mb-3">
                <label class="form-label" for="orderDate">訂單成立日期</label>
                <input
                  class="form-control"
                  id="orderDate"
                  type="date"
                  readonly
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderContent">訂單內容</label>
                <div class="input-group">
                  <input class="form-control" type="text" id="orderContent" />
                  <input class="form-control" type="number" />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderTotal">總金額</label>
                <input
                  class="form-control"
                  id="orderTotal"
                  min="0"
                  type="number"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderDescription">附註</label>
                <textarea class="form-control" id="orderDescription"></textarea>
              </div>
            </div>
            <div class="col-sm-7">
              <h5>客戶資訊</h5>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label" for="orderName">姓名</label>
                    <input class="form-control" type="text" id="orderName" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderEmail">信箱</label>
                    <input class="form-control" type="email" id="orderEmail" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderPayment">付款方式</label>
                    <select class="form-select" id="orderPayment">
                      <option value="credit_card">信用卡</option>
                      <option value="atm">ATM轉帳</option>
                      <option value="cash">貨到付款</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label" for="orderTel">電話</label>
                    <input class="form-control" type="tel" id="orderTel" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderAddress">地址</label>
                    <input class="form-control" type="text" id="orderAddress" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderPaidDate">付款日期</label>
                    <input class="form-control" type="date" id="orderPaidDate" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    付款／未付款
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary">取消</button>
          <button type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  mixins: [modalMixin]
  // mounted() {
  //   this.showModal()
  // }
}
</script>
