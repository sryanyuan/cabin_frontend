<template>
    <div id="editor-container" v-loading="loading">
        <mk-editor :ishowTitle="showTitle" @save="saveContent" ref="editor"></mk-editor>
    </div>
</template>

<script>
import MkEditor from '@/components/MkEditor.vue'
import api from "@/assets/js/api.js";

export default {
  data() {
    return {
      mkcontent: "",
      loading: true,
      showTitle: false
    };
  },
  mounted() {
      let self = this
    this.$nextTick(() => {
        self.loading = true
        self.getResumeContent()
    })
  },
  methods: {
      getResumeContent() {
        let self = this;
        // Pull content from article
        api.getAbout(
            function(res) {
            self.loading = false
            if (res.success) {
                self.mkcontent = res.res.resume
                self.$refs.editor.updateEditorContent(self.title, self.mkcontent)
            } else {
                self.$message.warning(res.error);
            }
            }, 1);
      },
    saveContent(value, render) {
        if (value == "") {
            this.$message.warning("内容不能为空")
            return
        }
      let self = this;
      this.$confirm("是否确定保存？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.loading = true
          self.doCommit(value);
        })
        .catch(() => {});
    },
    doCommit(value) {
        let self = this
        api.putAboutResume(function(res) {
            self.loading = false
            if (!res.success) {
                self.$message.warning(res.error)
            } else {
                self.$message.success("保存成功")
                self.$router.push({name: "blogAbout"})
            }
        }, value)
    }
  },
  components: {
      MkEditor
  }
};
</script>

<style scoped>
.v-note-wrapper {
  z-index: 1;
  margin-top: 10px;
  height: 500px;
}

#editor-title {
  text-align: left;
  border-bottom: 1px solid rgba(160, 160, 160, 0.3);
}

h2 {
  margin-bottom: 2px;
  font-size: 14px;
}

#editor-buttons {
  margin-top: 20px;
}
</style>
