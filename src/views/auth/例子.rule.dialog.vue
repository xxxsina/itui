<template>
    <div class="rule-dialog">
        <el-dialog
            class="cls-dialog-rule"
            title="添加"
            :visible.sync="data.visible"
            >
            <el-form :model="result" :rules="rules" ref="thisForm" label-width="100px">
                <el-form-item label="" prop="id" style="margin:0;">
                    <input type="hidden" :value="result.id" />
                </el-form-item>
                <el-form-item label="菜单" prop="ismenu">
                    <el-radio-group v-model="result.ismenu">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="父级" prop="pid">
                    <el-select v-model="result.pid" clearable>
                        <el-option label="区域一" :value="1"></el-option>
                        <el-option label="区域二" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则" prop="name">
                    <el-input v-model="result.name" clearable placeholder="父级菜单无需匹配控制器和方法,子级菜单请使用控制器名"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="result.title" clearable placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-col :span="21" class="cls-input-icon">
                        <el-input v-model="result.icon" clearable placeholder="菜单前面的icon"></el-input>
                    </el-col>
                    <el-col :span="3" class="cls-input-sub">
                        <el-link class="cls-icon-search-link"
                         :underline="false"
                         @click="showIconToolsDialog()">
                            搜索图标
                        </el-link>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="result.status">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
                <el-button @click="data.visible = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- icons view dialog -->
        <iconTools ref="iconTool" :data='iconToolsDialogData' @children="getChildrenData"></iconTools>
    </div>
</template>

<style scoped>
.cls-dialog-rule >>> .el-dialog {
    font-size: 12px;
    background-color: #f1f4f6;
}
.cls-dialog-rule >>> .el-dialog__header {
    background-color:#2c3e50 !important;
    height: 20px;
    padding: 15px 15px;
}
.cls-dialog-rule >>> .el-dialog__title {
    color: #fff;
    float: left;
    font-size: 14px;
}
.cls-dialog-rule >>> .el-dialog__close {
    color: #fff;
}
.cls-dialog-rule >>> .el-dialog__headerbtn {
    top: 18px;
}
.cls-dialog-rule >>> .cls-input-sub {
    border: 1px solid #DCDFE6;
    background-color: #fff;
    height: 32px;
    text-align: center;
    border-radius:0 2px 2px 0;
    border-left: 0;
}
.cls-dialog-rule >>> .cls-input-icon {
    border: 1px solid #DCDFE6;
    background-color: #fff;
    height: 32px;
    text-align: center;
    border-radius: 2px 0 0 2px;
}
.cls-dialog-rule >>> .cls-input-icon .el-input__inner{
    border: 0;
    height: 27px;
    line-height: 26px;
}
.cls-dialog-rule >>> .cls-icon-search-link {
    display: block;
    color: #606266;
    line-height: 30px;
}
.cls-dialog-rule >>> .cls-icon-search-link .el-link--inner {
    font-size: 10px;
    font-weight: normal;
}
.cls-dialog-rule >>> .el-radio__label {
    font-weight: unset;
    font-size: 13px;
    color: #606266;
}
</style>

<script>
export default {
  name: 'rule-dialog',
  props: ['data'],
  methods: {
    // 创建完form后，设置参数
    setData (row) {
      // 重试挨个赋值，这种方式就可以不绑定父组件了
      if (row) {
        for (let key in row) {
          this.result[key] = row[key]
        }
      } else if (row === false && this.result.id !== 'add') {
        // 修改数据之后立即使用这个方法，获取更新后的 DOM
        this.$nextTick(() => {
          // 清楚表单上的验证
          this.$refs.thisForm.clearValidate()
        })
        for (let key in this.result) {
          this.result[key] = ''
        }
        this.result.id = 'add'
      }
    },
    // 本dialog显示，供父组件调用
    showDialog () {
      this.data.visible = true
    },
    // 点击后调用此方法来显示Dialog
    showIconToolsDialog () {
      // 通过这种方法来调用children里面的方法
      this.$refs.iconTool.showDialog()
    },
    // 重置表单数据
    resetForm () {
      this.$refs.thisForm.resetFields()
    },
    // 子组件传值给父组件的获取函数
    getChildrenData (data) {
      // 获取到数据后传值给icon input
      this.result.icon = data.icon
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          console.log(this.result)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.log('error submit!!')
        })
    }
  },
  created () {
    // console.log('xxxxxx')
  },
  data () {
    return {
      iconToolsDialogData: {
        icon: this.icon,
        visible: false
      },
      result: {
        id: 'add',
        title: '',
        icon: '',
        name: '',
        weight: '',
        ismenu: '',
        pid: '',
        status: ''
      },
      // 表单验证规则
      rules: {
        ismenu: [
          { required: true, message: '请选择菜单', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入规则', trigger: 'change' }
        ],
        pid: [
          { required: true, message: '请选择父级', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请选择标题', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
