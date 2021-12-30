<template>
    <div class="edit-form-remark">
      <el-dialog
          :title="title"
          :fullscreen="this.G.getFormFullWindow()"
          :visible.sync="dialogVisible"
          width="35%">
        <el-form :model="result" :rules="rules" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-input type="textarea" :rows="8" v-model="result.remark" clearable placeholder="用户的反馈信息、意见、拜访客户的信息等"></el-input>
        </el-form>

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edit-form-remark',
  inject: ['reload'],
  methods: {
    ...mapActions([
      'setRemark'
    ]),
    showDialog () {
      this.dialogVisible = true
    },
    // 创建完form后，重置参数
    setData (row) {
      this.title = '反馈信息 : ' + row.username + ' ' + row.profile.nickname

      this.result.id = row.id
      this.result.remark = row.profile.remark
    },
    fresh () {
      this.reload() // 局部刷新
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          // 提交接口
          this.setRemark(this.result).then((res) => {
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
      dialogVisible: false,
      vipConfig: [],
      title: '',
      expire_status: 0,
      result: {
        id: 0,
        remark: ''
      },
      // 表单验证规则
      rules: {
        remark: [
          // { required: true, message: '请选择填写反馈信息', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
