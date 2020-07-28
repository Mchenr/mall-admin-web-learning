<template>
  <el-dialog
    :title="operateType"
    :visible.sync="dialogFormVisible"
    width="480px"
    @close="closeDialog(0)"
  >
    <el-form
      ref="dialogForm"
      :model="productAttrCate"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="类型名称" prop="attrCateName">
        <el-input v-model="productAttrCate.attrCateName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog(0)">取 消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { createAttrCate, updateAttrCate } from '@/api/productAttr'
export default {
  name: 'AttrNameOperateDialog',
  props: {
    operateType: {
      type: String,
      default: '添加类型'
    }
  },
  data() {
    return {
      productAttrCate: {
        attrCateName: '',
        id: null
      },
      rules: {
        attrCateName: { required: true, message: '请输入类型名称', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operateType === '添加类型') {
            console.log('添加操作')
            createAttrCate(this.productAttrCate.attrCateName).then(response => {
              console.log(response.data)
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.$refs[formName].resetFields()
              this.productAttrCate.attrCateName = ''
              this.closeDialog(1)
            })
          } else if (this.operateType === '编辑类型') {
            console.log('编辑操作')
            updateAttrCate(this.productAttrCate.id, this.productAttrCate.attrCateName).then(response => {
              console.log(response.data)
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.$refs[formName].resetFields()
              this.productAttrCate.attrCateName = ''
              this.productAttrCate.id = null
              this.closeDialog(1)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog(flag) {
      this.$refs['dialogForm'].resetFields()
      this.productAttrCate.attrCateName = ''
      this.productAttrCate.id = null
      this.dialogFormVisible = false
      this.$emit('closeDialog', flag)
    }
  }
}
</script>

<style scoped>

</style>
