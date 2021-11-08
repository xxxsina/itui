<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rules" ref="thisForm" :label-width="this.G.getFormWidthSize()">
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
                <treeselect v-model="result.pid"
                placeholder='请选择父级'
                :searchable="false"
                :defaultExpandLevel="Infinity"
                :normalizer="normalizer"
                :options="options" />
            </el-form-item>
            <el-form-item label="规则" prop="rulelink">
                <el-input v-model="result.rulelink" clearable placeholder="父级菜单无需匹配控制器和方法,子级菜单请使用控制器名"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="result.title" clearable placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="权重" prop="weight">
                <el-input v-model="result.weight" clearable placeholder="权重即排序位子：数字越大越靠前"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-col :span="8" class="cls-input-icon">
                    <el-input v-model="result.icon" clearable placeholder="菜单前面的icon"></el-input>
                </el-col>
                <el-col :span="5" class="cls-input-sub">
                    <el-link class="cls-icon-search-link"
                        :underline="false"
                        @click="showIconToolDialog()">
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

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="data.visible = false">取 消</el-button>
        </div>
        <!-- icons view dialog -->
        <iconTool ref="iconTool" :data='iconToolDataDefault' @children="getIconToolData"></iconTool>
    </div>
</template>

<style scoped>

</style>

<script>

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  components: { Treeselect },
  mounted () {
    // 挂载方法 rule select option tree
    this.optionTree()
  },
  inject: ['reload'],
  methods: {
    // 重置表单数据
    reset () {
      this.$refs.thisForm.resetFields()
    },
    // 点击后调用此方法来显示Dialog
    showIconToolDialog () {
      // 通过这种方法来调用children里面的方法
      this.$refs.iconTool.showDialog()
    },
    // 子组件传值给父组件的获取函数
    getIconToolData (data) {
      // 获取到数据后传值给icon input
      this.result.icon = data.icon
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
    // 此方法为option tree数据整理，和下面的optionTree方法配合使用递归；此插件：vue-treeselect
    // getOptionTree (tree = []) {
    //   let arr = []
    //   if (tree.length !== 0) {
    //     tree.forEach(item => {
    //       if (item.ismenu) {
    //         let obj = {}
    //         obj.label = item.title
    //         obj.id = item.id
    //         if (item.childs && item.childs.length > 0) {
    //           obj.children = this.getOptionTree(item.childs)
    //         }
    //         arr.push(obj)
    //       }
    //     })
    //   }
    //   return arr
    // },
    // 挂载方法
    optionTree () {
      // console.log(this.G.menu)
      // this.options = this.G.menu
      this.options = [{
        id: 0,
        title: '无'
      // }].concat(this.getOptionTree(this.G.menu))
      }].concat(this.G.menu)
    },
    // 数据key的name不匹配 就用这个来纠正
    normalizer (node) {
      // 去掉children=[]的children属性
      if (node.childs && !node.childs.length) {
        delete node.childs
      }
      return {
        id: node.id,
        // 将name转换成必填的label键
        label: node.title,
        children: node.childs
      }
    },
    fresh () {
      this.reload() // 局部刷新
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
          console.log(err)
          console.log('error submit!!')
        })
    }
  },
  data () {
    return {
      // icon data default
      iconToolDataDefault: {
        icon: this.icon,
        visible: false
      },
      options: [],
      // 表单验证规则
      rules: {
        ismenu: [
          { required: true, message: '请选择菜单', trigger: 'change' }
        ],
        rulelink: [
          { required: true, message: '请输入规则', trigger: 'change' }
        ],
        // pid: [
        //   { required: true, message: '请选择父级', trigger: 'change' }
        // ],
        title: [
          { required: true, message: '请选择标题', trigger: 'change' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
