<template>
  <div class="app-container">
    <el-card shadow="never" class="operator-container">
      <div>
        <i class="el-icon-tickets" />
        <span>数据列表</span>
        <el-button style="float: right" size="small" @click="addItem">添加</el-button>
      </div>
    </el-card>
    <el-table
      ref="attrCateTable"
      v-loading="listLoading"
      class="table-container"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="属性名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="110" align="center">
        <template>
          <span>{{ cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性是否可选" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.selectType|selectTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="属性值的录入方式" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.inputType|inputTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="可选值列表" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.inputList }}
        </template>
      </el-table-column>
      <el-table-column label="排序" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-select v-model="operateType" clearable placeholder="批量操作" size="small" style="width: 190px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin-left: 15px" size="small" type="primary" @click="handleBatchOperate">确定</el-button>
      <div class="pagination-container">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="listQuery.pageNum"
          :page-sizes="[5, 10, 15]"
          :page-size="listQuery.pageSize"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAttr, productAttrList } from '@/api/productAttr'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    inputTypeFilter(value) {
      if (value === 1) {
        return '从列表中选取'
      } else {
        return '手工录入'
      }
    },
    selectTypeFilter(value) {
      if (value === 1) {
        return '单选'
      } else if (value === 2) {
        return '多选'
      } else {
        return '唯一'
      }
    }
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        cid: null,
        type: 0
      },
      total: null,
      list: null,
      listLoading: true,
      cname: null,
      options: [{
        value: '1',
        label: '删除'
      }],
      multipleSelection: [],
      operateType: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.listQuery.cid = this.$route.query.cid
      this.listQuery.type = this.$route.query.type
      productAttrList(this.listQuery).then(response => {
        this.list = response.data.list
        this.cname = this.$route.query.cname
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.pageNum = response.data.pageNum
        console.log(this.list)
        this.listLoading = false
      })
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
    addItem() {
      console.log('添加操作')
    },
    handleEdit(index, row) {
      console.log('编辑操作')
      console.log(index, row.id)
    },
    handleBatchOperate() {
      const ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      console.log(ids)
      deleteAttr(ids).then(response => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.clearTableSelection()
        this.fetchData()
        console.log(response.data)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clearTableSelection() {
      this.$refs.brandTable.clearSelection()
    },
    handleDelete(index, row) {
      console.log('删除操作')
      this.$confirm('此操作将永久删除该数据,一旦删除无法恢复， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAttr(row.id).then(response => {
          console.log(response.data)
          this.fetchData()
        })
        console.log(index, row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
