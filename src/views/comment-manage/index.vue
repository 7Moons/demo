<template>
  <div class="comment">
    <a-table rowKey="orderId" bordered :columns="tableColumn" :loading="tableLoad" :data-source="tableData" :pagination="pagination" @change="tableChange">
      <template slot="operate" slot-scope="scope">
        <a-button type="link" size="small" @click="onReply(scope)">reply</a-button>
        <a-button type="link" size="small" style="color: red" @click="onDelete(scope)">delete</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { deleteComment } from '@/api/empower'

export default {
  name: 'CommentManage',
  data() {
    return {
      tableColumn: [
        {
          title: 'order id',
          dataIndex: 'orderId',
          scopedSlots: { customRender: 'orderId' }
        },
        {
          title: 'comment',
          dataIndex: 'comment',
          scopedSlots: { customRender: 'comment' }
        },
        {
          title: 'operate',
          width: 160,
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      tableLoad: false,
      tableData: [
        { 'orderId': '690903', 'comment': 'can we change carrier to SF?' },
        { 'orderId': '690906', 'comment': 'can we change carrier to SF?' },
        { 'orderId': '690908', 'comment': 'can we change carrier to SF?' }
      ],

      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: false
      }
    }
  },

  methods: {
    // 回复
    onReply() {},

    // 删除
    onDelete(row) {
      // const that = this
      this.$confirm({
        title: 'Confirm to delete?',
        okType: 'danger',
        onOk() {
          return new Promise((resolve, reject) => {
            deleteComment({ id: row.orderId })
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
      })
    },

    tableChange(pagination, filters, sorter) {
      this.pagination = pagination
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>
