<template>
  <div class="order">
    <div>
      <a-button type="primary" class="u-mt-10" @click="onCreate()">create order</a-button>
    </div>

    <a-table rowKey="orderId" bordered :columns="tableColumn" :loading="tableLoad" :data-source="tableData" :pagination="pagination" @change="tableChange">
      <template slot="fulfillmentStatus" slot-scope="scope">
        <span>{{ scope.name }}</span>
      </template>
      <template slot="channel" slot-scope="scope">
        <span>{{ scope.name }}({{ scope.code }})</span>
      </template>
      <template slot="shippingUnits" slot-scope="scope">
        <span v-if="scope.shippingUnitStatus">{{ scope.shippingUnitStatus.name }}</span>
        <span v-else>--</span>
        <span class="u-ml-8">
          <a-popover title="shipping information">
            <template slot="content">
              <div>
                <label class="u-label">shipment number: </label>
                <span v-if="scope.shipment">{{ scope.shipment.shipmentNumber }}</span>
                <span v-else>--</span>
              </div>
              <div>
                <label class="u-label">shipping unit number: </label><span>{{ scope.shippingUnitNumber }}</span>
              </div>
              <div>
                <label class="u-label">shipping tracking number: </label><span>{{ scope.shippingTrackingNumber }}</span>
              </div>
              <div>
                <label class="u-label">company: </label>
                <span v-if="scope.company">{{ scope.company.name }}</span>
                <span v-else>--</span>
              </div>
              <div>
                <label class="u-label">shipping tracking url: </label><a target="_blank" :href="scope.shippingTrackingUrl">{{ scope.shippingTrackingUrl }}</a>
              </div>
            </template>
            <a href="javascript:;">details</a>
          </a-popover>
        </span>
      </template>
      <template slot="operate" slot-scope="scope">
        <a-button type="link" size="small" @click="openOrderDetail(scope)">edit</a-button>
        <a-button type="link" size="small" @click="openSaveComment(scope)">comment</a-button>
        <a-button type="link" size="small" style="color: red" @click="onCancel(scope)">cancel</a-button>
      </template>
    </a-table>

    <a-modal title="comment" :visible="commentVisible" @ok="saveComment" @cancel="onCancelComment">
      <a-input placeholder="Basic usage" :allowClear="true" v-model="currentComment" />
    </a-modal>
  </div>
</template>
<script>
import { cancelOrder, commentOrder } from '@/api/empower'

export default {
  name: 'orderManage',
  components: {},
  data() {
    return {
      tableLoad: false,
      tableColumn: [
        {
          title: 'status',
          dataIndex: 'fulfillmentStatus',
          scopedSlots: { customRender: 'fulfillmentStatus' }
        },
        {
          title: 'order id',
          dataIndex: 'orderId',
          scopedSlots: { customRender: 'orderId' }
        },
        {
          title: 'marketplace',
          dataIndex: 'channel',
          scopedSlots: { customRender: 'channel' }
        },
        {
          title: 'shipping information',
          dataIndex: 'shippingUnits',
          scopedSlots: { customRender: 'shippingUnits' }
        },
        {
          title: 'operate',
          width: 220,
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      tableData: [
        {
          'orderId': 690903,
          'fulfillmentStatus': {
            '@id': '/api/reference-codes/2',
            '@type': 'ReferenceCode',
            'id': 2,
            'category': 'FULFILLMENT_STATUS',
            'code': '10',
            'name': 'Pending',
            'description': 'The order has been created and released',
            'createdAt': '2021-07-20T03:24:05+00:00',
            'updatedAt': '2021-07-20T03:24:05+00:00'
          },
          'channel': {
            '@id': '/api/channels/25',
            '@type': 'Channel',
            'code': 'XIAOHONGSHU',
            'name': '小红书',
            'createdAt': '2024-05-27T13:01:32+00:00',
            'updatedAt': '2024-05-27T13:01:32+00:00'
          },
          'shippingUnits': {
            'id': 690906,
            'shipment': {
              '@id': '/api/shipments/41862',
              '@type': 'Shipment',
              'id': 41862,
              'shipmentNumber': '00056230',
              'createdAt': '2024-05-29T10:05:03+00:00',
              'updatedAt': '2024-05-29T10:05:03+00:00'
            },
            'shippingUnitNumber': '24203784000',
            'shippingTrackingNumber': '123456789000',
            'shippingTrackingUrl': 'https://api.kuaidi100.com/tools/map/XXX',
            'company': {
              '@id': '/api/companies/10',
              '@type': 'Company',
              'id': 10,
              'name': 'Brand',
              'code': 'BRAND',
              'createdAt': '2022-01-18T10:54:21+00:00',
              'updatedAt': '2023-02-08T17:06:44+00:00'
            },
            'shippingUnitStatus': {
              '@id': '/api/reference-codes/408',
              '@type': 'ReferenceCode',
              'id': 408,
              'category': 'SHIPPING_UNIT_STATUS',
              'code': '20',
              'name': 'In transit',
              'description': 'The shipping unit is in transit',
              'createdAt': '2022-02-21T02:18:49+00:00',
              'updatedAt': '2022-02-21T02:18:49+00:00'
            },
            'createdAt': '2024-05-29T10:05:03+00:00',
            'updatedAt': '2024-05-29T15:14:33+00:00'
          }
        },
        {
          'orderId': 690908,
          'fulfillmentStatus': {
            '@id': '/api/reference-codes/3',
            '@type': 'ReferenceCode',
            'id': 3,
            'category': 'FULFILLMENT_STATUS',
            'code': '20',
            'name': 'Processing',
            'description': 'The order has been accepted by warehouse',
            'createdAt': '2021-07-20T03:24:05+00:00',
            'updatedAt': '2021-07-20T03:24:05+00:00'
          },
          'channel': {
            '@id': '/api/channels/25',
            '@type': 'Channel',
            'code': 'XIAOHONGSHU',
            'name': '小红书',
            'createdAt': '2024-05-27T13:01:32+00:00',
            'updatedAt': '2024-05-27T13:01:32+00:00'
          },
          'shippingUnits': {
            'id': 264750,
            'shipment': {
              '@id': '/api/shipments/41862',
              '@type': 'Shipment',
              'id': 41862,
              'shipmentNumber': '00056230',
              'createdAt': '2024-05-29T10:05:03+00:00',
              'updatedAt': '2024-05-29T10:05:03+00:00'
            },
            'shippingUnitNumber': '24203784000',
            'shippingTrackingNumber': '123456789000',
            'shippingTrackingUrl': 'https://api.kuaidi100.com/tools/map/XXX',
            'company': {
              '@id': '/api/companies/10',
              '@type': 'Company',
              'id': 10,
              'name': 'Brand',
              'code': 'BRAND',
              'createdAt': '2022-01-18T10:54:21+00:00',
              'updatedAt': '2023-02-08T17:06:44+00:00'
            },
            'shippingUnitStatus': {
              '@id': '/api/reference-codes/408',
              '@type': 'ReferenceCode',
              'id': 408,
              'category': 'SHIPPING_UNIT_STATUS',
              'code': '20',
              'name': 'In transit',
              'description': 'The shipping unit is in transit',
              'createdAt': '2022-02-21T02:18:49+00:00',
              'updatedAt': '2022-02-21T02:18:49+00:00'
            },
            'createdAt': '2024-05-29T10:05:03+00:00',
            'updatedAt': '2024-05-29T15:14:33+00:00'
          }
        },
        {
          'orderId': 102,
          'fulfillmentStatus': {
            '@id': '/api/reference-codes/5',
            '@type': 'ReferenceCode',
            'id': 5,
            'category': 'FULFILLMENT_STATUS',
            'code': '30',
            'name': 'Waved',
            'description': 'The order has been selected in a wave',
            'createdAt': '2021-07-20T03:24:05+00:00',
            'updatedAt': '2021-07-20T03:24:05+00:00'
          },
          'channel': {
            '@id': '/api/channels/25',
            '@type': 'Channel',
            'code': 'XIAOHONGSHU',
            'name': '小红书',
            'createdAt': '2024-05-27T13:01:32+00:00',
            'updatedAt': '2024-05-27T13:01:32+00:00'
          },
          'shippingUnits': {
            'id': 264750,
            'shipment': {
              '@id': '/api/shipments/41862',
              '@type': 'Shipment',
              'id': 41862,
              'shipmentNumber': '00056230',
              'createdAt': '2024-05-29T10:05:03+00:00',
              'updatedAt': '2024-05-29T10:05:03+00:00'
            },
            'shippingUnitNumber': '24203784000',
            'shippingTrackingNumber': '123456789000',
            'shippingTrackingUrl': 'https://api.kuaidi100.com/tools/map/XXX',
            'company': {
              '@id': '/api/companies/10',
              '@type': 'Company',
              'id': 10,
              'name': 'Brand',
              'code': 'BRAND',
              'createdAt': '2022-01-18T10:54:21+00:00',
              'updatedAt': '2023-02-08T17:06:44+00:00'
            },
            'shippingUnitStatus': {
              '@id': '/api/reference-codes/408',
              '@type': 'ReferenceCode',
              'id': 408,
              'category': 'SHIPPING_UNIT_STATUS',
              'code': '20',
              'name': 'In transit',
              'description': 'The shipping unit is in transit',
              'createdAt': '2022-02-21T02:18:49+00:00',
              'updatedAt': '2022-02-21T02:18:49+00:00'
            },
            'createdAt': '2024-05-29T10:05:03+00:00',
            'updatedAt': '2024-05-29T15:14:33+00:00'
          }
        }
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: false
      },

      commentVisible: false,
      currentComment: null,
      currentId: null
    }
  },
  methods: {
    // 跳转详情页
    openOrderDetail(record) {
      if (!record.orderId) return
      this.$router.push(`/organize/order-detail/${record.orderId}`)
    },

    // 取消
    onCancel(row) {
      // const that = this
      this.$confirm({
        title: 'Confirm to cancel?',
        okType: 'danger',
        onOk() {
          return new Promise((resolve, reject) => {
            cancelOrder({ id: row.orderId })
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

    // 创建订单
    onCreate() {
      this.$router.push({ name: 'OrderDetail' })
    },

    // 打开保存评论弹窗
    openSaveComment(row) {
      this.commentVisible = true
      this.currentId = row.orderId
      this.currentComment = null
    },

    // 保存评论
    saveComment() {
      const that = this
      return new Promise((resolve, reject) => {
        commentOrder({ comment: this.currentComment })
          .then(res => {
            if (res.code == 200) {
              that.commentVisible = false
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 关闭保存评论弹窗
    onCancelComment() {
      this.commentVisible = false
    },

    tableChange(pagination, filters, sorter) {
      this.pagination = pagination
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

.u-ml-8 {
  margin-left: 8px;
}

.u-label {
  width: 170px;
  font-weight: bold;
  text-align: left;
  display: inline-block;
}

.u-mt-10 {
  margin-bottom: 10px;
}
</style>
