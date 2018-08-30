<template>
  <div id="wrapper">
    <nav-header @showReview="showReview" ref="nav">Header</nav-header>
    <div id="main">
      <router-view></router-view>
    </div>
    <sidebar></sidebar>
    <el-dialog title="审核回复" :visible.sync="reviewVisible">
      <el-table :data="reviewGridData">
        <el-table-column property="date" label="日期" width="180"></el-table-column>
        <el-table-column property="name" label="昵称" width="120"></el-table-column>
        <el-table-column property="comment" label="评论"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleReview(scope.row, true)" type="text" size="small">通过</el-button>
            <el-button @click="handleReview(scope.row, false)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue"
import Sidebar from "@/components/Sidebar.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"
import api from '@/assets/js/api.js'

export default {
    name: "Index",
    components: {
        NavHeader,
        Sidebar,
        ArticleContainer,
    },
    data: function() {
      return {
        reviewVisible: false,
        reviewGridData: []
      }
    },
    methods: {
      showReview() {
        let self = this
        this.reviewVisible = true
        api.getCommentsReview(function(res) {
          if (!res.success) {
            self.$message.warning(res.error)
          } else {
            self.reviewGridData = []
            for (let rpl of res.res.replys) {
              self.reviewGridData.push({id: rpl.id, date: rpl.time, name: rpl.name, comment: rpl.content})
            }
          }
        })
      },
      handleReview(row, pass) {
        let self = this
        if (pass) {
          api.putCommentReview(function(res) {
            if (!res.success) {
              self.$message.warning(res.error)
            } else {
              let final = []
              for (let rpl of self.reviewGridData) {
                if (rpl.id == row.id) {
                  continue
                }
                final.push(rpl)
              }
              self.reviewGridData = final
              self.$message.success("审核成功")
              self.$refs.nav.decReviewTipCount()
            }
          }, row.id)
        } else {
          api.deleteComment(function(res) {
            if (!res.success) {
              self.$message.warning(res.error)
            } else {
              let final = []
              for (let rpl of self.reviewGridData) {
                if (rpl.id == row.id) {
                  continue
                }
                final.push(rpl)
              }
              self.reviewGridData = final
              self.$message.success("删除成功")
              self.$refs.nav.decReviewTipCount()
            }
          }, row.id)
        }
      }
    },
    created: function() {
    }
}
</script>

<style scoped>
.el-dialog {
  text-align: left;
}

.cell {
  text-align: left;
}
</style>
