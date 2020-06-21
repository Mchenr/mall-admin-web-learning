<template>
  <el-card shadow="never" class="form-container">
    <el-form
      ref="brand"
      :model="brand"
      label-width="120px"
      :rules="rules">
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="brand.name" />
      </el-form-item>
      <el-form-item label="品牌首字母：">
        <el-input v-model="brand.firstLetter" />
      </el-form-item>
      <el-form-item label="品牌LOGO：" prop="logo">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="品牌专区大图：">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
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
export default {
  name: 'BrandDetails',
  data() {
    return {
      brand: {
        name: '',
        firstLetter: '',
        logo: '',
        bigPic: '',
        brandStory: '',
        sort: 0,
        showStatus: 0,
        factoryStatus: 0
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
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
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>

</style>
