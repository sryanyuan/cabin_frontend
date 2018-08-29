<template>
    <div id="editor-wrapper">
        <!--div id="editor-title" v-if="showTitle">
            <el-input id="input-title" v-model="title" placeholder="请输入标题"></el-input>
        </div-->
        <mavon-editor :value="mkcontent" @save="saveContent"></mavon-editor>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: false,
      mkcontent: "",
      title: ""
    };
  },
  created() {
    if (null != this.ishowTitle) {
      this.showTitle = this.ishowTitle
    }
  },
  methods: {
    saveContent(value, render) {
        this.$emit("save", value, this.title)
    },
    updateEditorContent(title, content) {
      this.title = title
      this.mkcontent = content
    }
  },
  props: ["ishowTitle"]
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

#editor-buttons .button {
}
</style>
