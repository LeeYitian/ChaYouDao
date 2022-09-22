import Modal from 'bootstrap/js/dist/modal'
export default {
  data() {
    return {
      modal: {}
    }
  },
  methods: {
    createModal() {
      const myModal = new Modal(this.$refs.myModal, {
        backdrop: 'static',
        keyboard: false
      })
      this.modal = myModal
    },
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    }
  },
  mounted() {
    this.createModal()
  }
}
