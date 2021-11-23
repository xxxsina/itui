<template>
    <div class="edit-form-vip">
      <el-dialog
          :title="title"
          :fullscreen="this.G.getFormFullWindow()"
          :visible.sync="dialogVisible"
          width="35%">
          <el-form :model="result" ref="thisForm" :label-width="this.G.getFormWidthSize()">
              <el-form-item label="" prop="id" style="margin:0;">
                  <input type="hidden" :value="result.id" />
              </el-form-item>
              <el-form-item label="上次选择:">
                <span>{{ result.vip }}</span>
              </el-form-item>
              <el-form-item label="VIP选项" prop="vip_id">
                <el-select v-model="result.vip_id" placeholder="选项">
                  <el-option
                    v-for="item in vipConfig"
                    :key="item.id"
                    :label="'加 ' + item.period + '个月 时间 ['+ item.name +']'"
                    :value="item.id">
                  </el-option>
                </el-select>
                <br />
                <el-tag type="danger" size="mini">该选项是在用户原有VIP时间基础上加时间；</el-tag>
                <br />
                <el-tag>如原来没有，则从当前时间开始加 [ 一个月等于30天 ]</el-tag>
              </el-form-item>
              <el-form-item label="当前:">
                <span>
                  {{ result.expire }}
                  <el-tag size="small" type="success" v-if="expire_status==1">正常</el-tag>
                  <el-tag size="small" type="danger" v-if="expire_status==0">过期</el-tag>
                </span>
              </el-form-item>
              <el-form-item label="重置到期时间" prop="vip_time">
                  <el-date-picker
                    v-model="result.vip_expire"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                  <br />
                  <el-tag type="danger" size="mini">如果选择了日期，系统将重置VIP到期时间为选定时间；</el-tag>
                  <br />
                  <el-tag>注意：VIP到期时间和VIP选项，VIP到期时间优先级最高</el-tag>
              </el-form-item>
          </el-form>

          <div slot="footer" class="form-footer">
              <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edit-form-vip',
  inject: ['reload'],
  mounted () {
    this.getVipConfig().then((res) => {
      this.vipConfig = res.data
    })
  },
  methods: {
    ...mapActions([
      'getVipConfig',
      'setVip'
    ]),
    showDialog () {
      this.dialogVisible = true
    },
    setData (row) {
      this.title = 'VIP设置 : ' + row.username + ' ' + row.profile.nickname
      this.expire_status = row.profile.vip_expire_status

      this.result.id = row.id
      this.result.expire = row.profile.vip_expire_text
      this.result.vip = row.profile.vip
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
          this.setVip(this.result).then((res) => {
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
        vip: '无',
        vip_id: '',
        expire: '无',
        vip_expire: ''
      }
    }
  }
}
</script>
