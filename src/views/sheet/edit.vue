<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="用户账号" prop="username">
                <el-input v-model="result.username" :disabled="true" placeholder="用户账号"></el-input>
            </el-form-item>
            <el-form-item label="表单名称" prop="name">
                <el-input v-model="result.name" placeholder="表单名称"></el-input>
            </el-form-item>
            <el-form-item label="访问上限" prop="total_limit">
                <el-input-number class="cls-input-number" v-model="result.total_limit" :min="0" :max="10000" placeholder="可以不填写"></el-input-number>
                <el-tag type="danger" size="mini">为0时不限制</el-tag>
            </el-form-item>
            <el-form-item label="短域名" prop="short_url">
                <el-radio-group v-model="result.short_url">
                    <el-radio
                     v-for="(val, k) in shortUrls"
                     :label="val"
                     :key="k">
                    {{ val }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否填写姓名" prop="is_realname">
                <el-radio-group v-model="result.is_realname">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否填写电话" prop="is_phone">
                <el-radio-group v-model="result.is_phone">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上传图片" prop="is_image">
                <el-radio-group v-model="result.is_image">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="跳转连接" prop="url">
                <el-input v-model="result.url" placeholder="连接地址,如: http://www...."></el-input>
            </el-form-item>
            <el-form-item label="跳转二维码" prop="image">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="result.image" :src="result.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
}
.avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.avatar {
    width: 60px;
    height: 60px;
    display: block;
}
.cls-input-number {
    width: unset;
}
.form-footer {
    margin-top: 10px;
}
</style>

<script>

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  methods: {
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
        for (let key in row) {
          this.result[key] = row[key]
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
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          console.log(this.result)
          this.fresh()
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          if (err.message) {
            this.$message.error(err.message)
          }
          console.log(err)
          console.log('error submit!!')
        })
    }
  },
  data () {
    return {
      shortUrls: {
        '1': 'http://i8jo.cn',
        '2': 'http://s0o2.cn'
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
        short_url: [
          { required: true, message: '请选择短域名', trigger: 'change' }
        ],
        remark: { max: 60, message: '备注不能超过60个字符', trigger: 'change' }
      }
    }
  }
}
</script>
