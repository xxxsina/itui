<template>
    <div class="dialog-tool">
        <el-dialog
            class="cls-dialog-rule"
            :fullscreen="this.G.getFormFullWindow()"
            :title="data.title"
            :visible.sync="data.visible"
            @closed="cancel"
            >
        <slot name="slotEditForm"></slot>
        </el-dialog>
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
.cls-dialog-rule >>> .form-footer {
    text-align: right;
}
.cls-dialog-rule >>> .vue-treeselect__control{
  border-radius: 2px;
  padding: 0 10px;
}
</style>

<script>
export default {
  name: 'dialog-tool',
  props: ['data'],
  methods: {
    // 本dialog显示，供父组件调用
    showDialog () {
      this.data.visible = true
    },
    cancel () {
      this.$parent.cancel()
    }
  },
  data () {
    return {
    }
  }
}
</script>
