<template>
  <div class="app-container">
    <el-card shadow="never" class="operator-container">
      <div>
        <i class="el-icon-tickets" />
        <span>数据列表</span>
        <el-button style="float: right" size="small" @click="addItem">添加</el-button>
      </div>
    </el-card>
    <AttrNameOperateDialog
      ref="attrNameOperateDialog"
      :operate-type="operateType"
      @closeDialog="closeDialog"
    />
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
    >
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="类型名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="属性数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.attributeCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数数量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.paramCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="设置" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAttrList(scope.$index, scope.row)"
          >属性列表</el-button>
          <el-button
            size="mini"
            @click="handleParamList(scope.$index, scope.row)"
          >参数列表</el-button>
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
import { listAttrCate, deleteAttrCate } from '@/api/productAttr'
import AttrNameOperateDialog from './components/AttrCateNameOperateDialog'

export default {
  components: { AttrNameOperateDialog },
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
        pageNum: 1,
        pageSize: 10
      },
      total: null,
      list: null,
      listLoading: true,
      operateType: '添加类型',
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      listAttrCate(this.listQuery).then(response => {
        this.list = response.data.list
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
    handleAttrList(index, row) {
      console.log(index, row.id)
    },
    handleParamList(index, row) {
      console.log(index, row.id)
    },
    addItem() {
      this.operateType = '添加类型'
      this.$refs['attrNameOperateDialog'].dialogFormVisible = true
    },
    handleEdit(index, row) {
      this.operateType = '编辑类型'
      this.$refs['attrNameOperateDialog'].dialogFormVisible = true
      this.$refs['attrNameOperateDialog'].productAttrCate.attrCateName = row.name
      this.$refs['attrNameOperateDialog'].productAttrCate.id = row.id
      console.log(index, row.id)
    },
    closeDialog(flag) {
      if (flag) {
        this.fetchData()
      }
      this.dialogFormVisible = false
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该类型以及此类型下的所有属性和参数,一旦删除无法恢复， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAttrCate(row.id).then(response => {
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
