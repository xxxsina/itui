<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="用户账号" prop="username">
                <el-input v-model="result.username" placeholder="用户账号"></el-input>
            </el-form-item>
            <el-form-item label="表单名称" prop="name">
                <el-input v-model="result.name" placeholder="表单名称"></el-input>
            </el-form-item>
            <el-form-item label="短域名" prop="short_id">
                <el-radio-group v-model="result.short_id">
                    <el-radio
                     v-for="(val, k) in shortUrls"
                     :label="val.id"
                     :key="k">
                    {{ val.host }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否填写姓名" prop="is_realname">
                <el-radio-group v-model="result.is_realname">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否填写电话" prop="is_phone">
                <el-radio-group v-model="result.is_phone">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上传图片" prop="is_image">
                <el-radio-group v-model="result.is_image">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要验证码" prop="is_captcha">
                <el-radio-group v-model="result.is_captcha">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="访问上限" prop="total_limit">
                <el-input-number class="cls-input-number" v-model="result.total_limit" :min="0" :max="10000" placeholder="可以不填写"></el-input-number>
                <el-tag type="danger" size="mini">为0时不限制</el-tag>
            </el-form-item>
            <el-form-item label="跳转连接" prop="url">
                <el-input v-model="result.url" placeholder="连接地址,如: http://www...."></el-input>
            </el-form-item>
            <el-form-item label="跳转二维码" prop="image">
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
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="2" v-model="result.remark" clearable placeholder="可以不填写"></el-input>
            </el-form-item>
        </el-form>
        <el-alert
            :closable="false"
            title="注：填写跳转链接后，用户填写完表单后将跳转到填写的跳转链接；上传二维码后，用户填写完表单后将跳转到上传的二维码展示页；同时填写跳转链接和上传二维码，只生效跳转链接。"
            type="warning">
        </el-alert>
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
import baseUrl from '@/api/baseUrl'
import { mapActions } from 'vuex'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  mounted () {
    this.getShortHostsConfig().then((res) => {
      this.shortUrls = res.data
    })
  },
  methods: {
    ...mapActions([
      'getShortHostsConfig',
      'editForm'
    ]),
    // 重置表单数据
    reset () {
      this.$refs.thisForm.resetFields()
      this.imageUrl = ''
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
    // 上传图片成功回调
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
          this.editForm(this.result).then((res) => {
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
      disabled: true,
      shortUrls: {},
      params: {
        type: 'form'
      },
      // 表单验证规则
      rulesForm: {
        username: [
          { required: true, message: '请填写用户账号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写渠道连接', trigger: 'change' },
          { max: 15, message: '名称不能超过15个字符', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        short_id: [
          { required: true, message: '请选择短域名', trigger: 'change' }
        ],
        remark: { max: 60, message: '备注不能超过60个字符', trigger: 'change' },
        url: {
          // validator: (rule, value, callback) => {
          //   if (typeof value === 'undefined' || value === '') {
          //     if (this.result.image === '') {
          //       return callback(new Error('跳转连接和跳转二维码必选其一'))
          //     }
          //   }

          //   // 如果callback()代表验证通过
          //   return callback()
          // },
          // trigger: 'blur'
        }
      }
    }
  }
}
</script>
