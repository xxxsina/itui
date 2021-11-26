<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
                <el-input v-model="result.realname" placeholder="客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="result.phone" placeholder="客户手机号"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="image">
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
</style>

<script>
import baseUrl from '@/api/baseUrl'
import { mapActions } from 'vuex'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  methods: {
    ...mapActions([
      'editFormLog'
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
        if (this.result.image) {
          this.imageUrl = this.G.imgHost + this.result.image
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
      this.result.image = res.data.filePath
      this.result.image_id = res.data.id
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 移除图片
    handleRemove () {
      this.result.image = ''
      this.imageUrl = ''
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          // 提交接口
          this.editFormLog(this.result).then((res) => {
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
        type: 'formlog'
      },
      // 表单验证规则
      rulesForm: {
        realname: [
          { required: true, message: '客户姓名必须填写', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
                return callback(new Error('请填写正确的手机号码'))
              }
              // 如果callback()代表验证通过
              return callback()
            },
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>
