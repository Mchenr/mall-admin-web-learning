<template>
  <el-dialog
    :title="operateType"
    :visible.sync="dialogFormVisible"
    width="480px"
  >
    <el-form
      :model="productAttrCate"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="productAttrCate.attrCateName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
        name: { required: true, message: '请输入类型名称', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  }
}
</script>

<style scoped>

</style>
