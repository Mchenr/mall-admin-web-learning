<template>
  <el-card shadow="never" class="form-container">
    <el-form
      ref="brand"
      :model="brand"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="brand.name" />
      </el-form-item>
      <el-form-item label="品牌首字母：">
        <el-input v-model="brand.firstLetter" />
      </el-form-item>
      <el-form-item label="品牌LOGO：" prop="logo">
        <el-input v-model="brand.logo" />
      </el-form-item>
      <el-form-item label="品牌专区大图：">
        <el-input v-model="brand.bigPic" />
      </el-form-item>
      <el-form-item label="品牌故事：">
        <el-input
          v-model="brand.brandStory"
          type="textarea"
          autosize
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="brand.sort" />
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="brand.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌制造商：">
        <el-radio-group v-model="brand.factoryStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brand')">提交</el-button>
        <el-button @click="resetForm('brand')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getBrand, createBrand, updateBrand } from '@/api/brand'
const defaultBrand = {
  name: '',
  firstLetter: '',
  logo: '',
  bigPic: '',
  brandStory: '',
  sort: 0,
  showStatus: 0,
  factoryStatus: 0
}
export default {
  name: 'BrandDetails',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brand: Object.assign({}, defaultBrand),
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请输入品牌logo', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', message: '排序必须为数字', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      getBrand(this.$route.query.id).then(response => {
        console.log(response.data)
        this.brand = response.data
      })
    } else {
      this.brand = Object.assign({}, defaultBrand)
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认是否提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateBrand(this.$route.query.id, this.brand).then(response => {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                console.log(response.data)
              })
            } else {
              createBrand(this.brand).then(response => {
                console.log(response.data)
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.$refs[formName].resetFields()
                this.brand = Object.assign({}, defaultBrand)
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$confirm('是否重置输入?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          getBrand(this.$route.query.id).then(response => {
            console.log(response.data)
            this.brand = response.data
          })
        } else {
          this.$refs[formName].resetFields()
          this.brand = Object.assign({}, defaultBrand)
        }
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
