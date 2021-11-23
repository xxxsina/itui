<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <!-- <el-form-item label="渠道二维码" prop="url">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="result.url" :src="result.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item> -->
            <el-form-item label="渠道二维码" prop="url">
              <el-col :sm="4">
                <el-upload
                class="avatar-uploader"
                name="image"
                list-type="picture-card"
                :data="params"
                :action="uploadLink"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :sm="4" class="cls-remove" v-if="imageUrl">
                <el-button icon="el-icon-delete" circle @click="handleRemove"></el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="访问上限" prop="total_limit">
                <el-input-number class="cls-input-number" v-model="result.total_limit" :min="0" :max="1000000000" placeholder="可以不填写"></el-input-number>
            </el-form-item>
            <el-form-item label="访问总量" prop="total">
                <el-input-number class="cls-input-number" v-model="result.total" :min="0" :max="1000000000" placeholder="可以不填写"></el-input-number>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="3" v-model="result.remark" clearable placeholder="可以不填写"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="data.visible = false">取 消</el-button>
        </div>
    </div>
</template>

<style scoped>
.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    text-align: center;
}
.avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
.avatar {
    width: 148px;
    height: 148px;
    display: block;
}
.cls-remove {
  margin-top: 110px;
  margin-left: 110px;
  position: absolute;
  opacity: 0.6;
}
.cls-remove button {
  border: 1px #c0c4cc dashed;
}
.cls-input-number {
    width: unset;
}
.form-footer {
    margin-top: 10px;
}
</style>

<script>
import { mapActions } from 'vuex'
import baseUrl from '@/api/baseUrl'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  methods: {
    ...mapActions([
      'editJumpUrl'
    ]),
    // 重置表单数据
    reset () {
      this.$refs.thisForm.resetFields()
    },
    // 创建完form后，重置参数
    setData (row) {
      this.$nextTick(() => {
        // 清除表单上的验证
        this.$refs.thisForm.clearValidate()
      })
      // 重试挨个赋值，这种方式就可以不绑定父组件了
      if (row) {
        for (let key in this.result) {
          this.result[key] = row[key]
        }
        if (this.result.url) {
          this.imageUrl = this.G.imgHost + this.result.url
        }
      } else if (row === false && this.result.id !== 'add') {
        // 修改数据之后立即使用这个方法，获取更新后的 DOM
        this.$nextTick(() => {
          // 清除表单上的验证
          this.$refs.thisForm.clearValidate()
        })
        for (let key in this.result) {
          this.result[key] = ''
        }
        this.result.id = 'add'
      }
      return this.result
    },
    fresh () {
      this.reload() // 局部刷新
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return (isPNG || isJPG) && isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.result.url = res.data.filePath
      this.result.image_id = res.data.id
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 移除图片
    handleRemove () {
      this.result.url = ''
      this.imageUrl = ''
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          // 提交接口
          this.editJumpUrl(this.result).then((res) => {
            this.$message.success(res.msg)
            this.fresh() // 局部刷新
          }).catch(() => {
            this.fresh()
          })
        })
    }
  },
  data () {
    return {
      uploadLink: baseUrl + '/file/upload',
      imageUrl: '',
      params: {
        type: 'qrcode'
      },
      // 表单验证规则
      rulesForm: {
        url: [
          { required: true, message: '请上传渠道二维码', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        remark: { max: 60, message: '备注不能超过60个字符', trigger: 'change' }
      }
    }
  }
}
</script>
