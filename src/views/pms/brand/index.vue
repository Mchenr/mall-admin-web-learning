<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" size="small" @click="handleQuerySubmit">查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="输入搜索：">
            <el-input style="width: 200px" placeholder="品牌名称/关键字" v-model="listQuery.keywords"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" class="operator-container">
      <div>
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button style="float: right" size="small">添加</el-button>
      </div>
    </el-card>
    <el-table
      class="table-container"
      v-loading="listLoading"
      ref="brandTable"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="品牌首字母" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firstLetter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column label="品牌制造商" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.factoryStatus"
            :active-value="1"
            :inactive-value="0"
            @change="handleFactoryStatusChange($event, scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            :active-value="1"
            :inactive-value="0"
            @change="handleShowStatusChange($event, scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="相关" width="180" align="center">
        <template slot-scope="scope">
          <span>商品：</span>
          <el-link :underline="false" type="primary">{{ scope.row.productCount }}</el-link>
          <span>评价：</span>
          <el-link :underline="false" type="primary">{{ scope.row.productCommentCount }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-select v-model="operateType" clearable placeholder="批量操作" size="small" style="width: 190px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 15px" size="small" type="primary" @click="handleBatchOperate">确定</el-button>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="listQuery.pageNum"
          :page-sizes="[5, 10, 15]"
          :page-size="listQuery.pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, changeFactoryStatus, changeShowStatus } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listQuery: {
        keywords: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: 'showBrand',
        label: '显示品牌'
      }, {
        value: 'hideBrand',
        label: '隐藏品牌'
      }],
      total: null,
      list: null,
      listLoading: true,
      operateType: null,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.pageNum = response.data.pageNum
        console.log(this.list)
        this.listLoading = false
      })
    },
    handleFactoryStatusChange(val, id) {
      console.log(val)
      console.log(id)
      changeFactoryStatus({ ids: id, factoryStatus: val }).then(response => {
        console.log(response.data)
      })
    },
    handleShowStatusChange(val, id) {
      console.log(val)
      console.log(id)
      changeShowStatus({ ids: id, showStatus: val }).then(response => {
        console.log(response.data)
      })
    },
    handleQuerySubmit() {
      console.log('submit!')
      this.fetchData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.listQuery.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.listQuery.pageNum = val
      this.fetchData()
    },
    handleBatchOperate() {
      let showStatus = 0
      if (this.operateType === 'showBrand') {
        showStatus = 1
      } else if (this.operateType === 'hideBrand') {
        showStatus = 0
      } else {
        this.$message({
          message: '请输入批量操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }
      const ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      const param = new URLSearchParams()
      param.append('ids', ids)
      param.append('showStatus', showStatus)
      console.log(param)
      changeShowStatus(param).then(reponse => {
        this.clearTableSelection()
        this.fetchData()
        console.log(reponse.data)
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clearTableSelection() {
      this.$refs.brandTable.clearSelection()
    }
  }
}
</script>
