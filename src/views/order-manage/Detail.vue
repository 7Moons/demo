<template>
  <div class="order">
    <h3>
      <span v-if="!orderId">create</span>
      <span v-else>etit</span>
      order
    </h3>
    <div>details</div>
    <div>...</div>
    <div>...</div>

    <div>
      <a-button type="primary" @click="onSave(scope)">save</a-button>
      <a-button class="u-ml-10" @click="onCancel(scope)">cancel</a-button>
    </div>
  </div>
</template>

<script>
import { editInfo, createOrder } from '@/api/empower'

export default {
  name: 'orderDetail',

  data() {
    return {
      orderId: null
    }
  },

  mounted() {
    this.orderId = this.$route.params.id
  },

  methods: {
    // 保存
    onSave() {
      if (this.orderId) {
        this.editInfo()
        return
      }
      this.createOrder()
    },

    // 编辑订单
    editInfo() {
      return new Promise((resolve, reject) => {
        editInfo({ id: this.orderId })
          .then(res => {
            if (res.code == 200) {
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 创建订单
    createOrder() {
      return new Promise((resolve, reject) => {
        createOrder()
          .then(res => {
            if (res.code == 200) {
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}

.u-ml-10 {
  margin-left: 10px;
}
</style>
