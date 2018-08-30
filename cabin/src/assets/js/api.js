import { formatError } from "@/assets/js/util.js";
import axios from "axios";
import store from '@/assets/js/store.js'

function wrapResult(success, res, error) {
  return {
    success: success,
    res: res,
    error: error
  };
}

function successResult(res) {
  return wrapResult(true, res, null);
}

function errorResult(error) {
  return wrapResult(false, null, error);
}

function onApiFailed(error, callback) {
  let nerr = errorResult(formatError(error))
  if (typeof(nerr.error) == "object") {
    if (nerr.error.login) {
      router.push({name: "login"})
    } else {
      callback(JSON.stringify(nerr))
    }
  } else {
    callback(nerr)
  }
}

let router = null

export default {
  initRouter(rt) {
    router = rt
  },
  getCategoryList(callback) {
    axios
      .get("/api/category")
      .then(function(response) {
        let body = JSON.parse(response.data.message);
        callback(successResult(body.categories));
      })
      .catch(function(error) {
        onApiFailed(error, callback)
      });
  },
  getAbout(callback) {
    axios
      .get("/api/about")
      .then(function(response) {
        let body = JSON.parse(response.data.message);
        callback(successResult(body));
      })
      .catch(function(error) {
        onApiFailed(error, callback)
      });
  },
  getArticle(callback, articleId, summary, mk) {
    let url = "/api/article/" + articleId + "?summary=" + summary;
    if (mk != null) {
      url += "&mk=1"
    }

    axios
      .get(url)
      .then(function(response) {
        let body = JSON.parse(response.data.message);
        let res = {
          title: body.title,
          content: body.content,
          category: body.category,
          datetime: body.postDatetime,
          categoryId: body.categoryId,
          top: body.top,
          comments: body.replyCount,
          authorId: body.authorId,
          authorName: body.authorName
        };
        callback(successResult(res));
      })
      .catch(function(error) {
        onApiFailed(error, callback)
      });
  },
  putArticle(callback, articleId, content, title) {
    let url = "/api/article/" + articleId
    axios.put(url, {articleId: articleId, content: content, title: title})
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postArticle(callback, categoryId, title, content) {
    axios.post("/api/article", {category: categoryId, title: title, content: content})
    .then(function(response) {
      let body = JSON.parse(response.data.message);
      callback(successResult(body))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  deleteArticle(callback, articleId) {
    axios.delete("/api/article/" + articleId)
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  getArticleIds(callback, category, mode, page, limit) {
    axios
      .get(
        "/api/article?category=" +
          category +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&mode=" +
          mode
      )
      .then(function(response) {
        let res = {
            articles: [],
            totalPage: 0
        }
        let body = JSON.parse(response.data.message);
        for (let item of body.articles) {
          res.articles.push({
            id: item.articleId,
            articleId: item.articleId
          });
        }
        res.totalPage = body.pages;
        callback(successResult(res))
      })
      .catch(function(error) {
        onApiFailed(error, callback)
      });
  },
  getArticleIdsByCategory(callback, category, page, limit) {
    this.getArticleIds(callback, category, 2, page, limit)
  },
  getArticleIdsSummary(callback, page, limit) {
    this.getArticleIds(callback, 0, 0, page, limit)
  },
  postReply(callback, uri, toUid) {
      let res = {
          code: 1,
          captcha: "zzzz"
      }
      callback(successResult(res))
  },
  getLoginCaptcha(callback) {
    axios.get("/api/login/captcha")
    .then(function(response) {
      callback(successResult(JSON.parse(response.data.message)))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  getLoginStatus(callback) {
    axios.get("/api/login/status")
    .then(function(response) {
      let status = JSON.parse(response.data.message)
      callback(successResult(status))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postLogin(callback, ld) {
    axios.post("/api/login", ld)
    .then(function(response) {
      callback(successResult())
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postRegister(callback, ld) {
    axios.post("/api/register", ld)
    .then(function(response) {
      callback(successResult())
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postLogout(callback) {
    axios.post("/api/logout")
    .then(function(response) {
      callback(successResult())
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postComment(callback, uri, content, parentId, toUser, captchaId, solution) {
    // Get user first
    let user = store.state.userInfo
    if (user.uid == 0) {
      callback(errorResult("请先登录"))
      return
    }
    let args = {
      uri: uri,
      content: content,
      subRefId: parentId,
      toUser: toUser,
      captchaId: captchaId,
      solution: solution
    }
    let url = ""
    if (uri.indexOf("article:") == 0) {
      url = "/api/article/" + uri.split(":")[1] + "/comment"
    } else if (uri == "guestbook") {
      url = "/api/guestbook/comment"
    }
    if ("" == url) {
      callback(errorResult("无效的评论页面"))
      return
    }
    axios.post(url, args)
      .then(function(response) {
        callback(successResult())
      })
      .catch(function(error) {
        onApiFailed(error, callback)
      })
  },
  getComments(callback, uri) {
    let url = ""
    if (uri.indexOf("article:") == 0) {
      url = "/api/article/" + uri.split(":")[1] + "/comment"
    } else if (uri == "guestbook") {
      url = "/api/guestbook/comment"
    }
    if ("" == url) {
      callback(errorResult("无效的评论页面"))
      return
    }
    axios.get(url)
    .then(function(response) {
      let comments = JSON.parse(response.data.message)
      callback(successResult(comments))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  getCommentsReview(callback) {
    axios.get("/api/comments/review")
    .then(function(response) {
      let comments = JSON.parse(response.data.message)
      callback(successResult(comments))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  getComment(callback, uri, commentId) {
    let url = ""
    if (uri.indexOf("article:") == 0) {
      url = "/api/article/" + uri.split(":")[1] + "/comment/" + commentId
    } else if (uri == "guestbook") {
      url = "/api/guestbook/comment/" + commentId
    }
    if ("" == url) {
      callback(errorResult("无效的评论页面"))
      return
    }
    axios.get(url)
    .then(function(response) {
      let comments = JSON.parse(response.data.message)
      callback(successResult(comments))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  deleteComment(callback, commentId) {
    axios.delete("/api/comment/" + commentId)
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  putCommentReview(callback, commentId) {
    axios.put("/api/comment/" + commentId + "/review")
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  getCommentsReviewCount(callback) {
    axios.get("/api/comments/review/count")
    .then(function(response) {
      let res = JSON.parse(response.data.message)
      callback(successResult(res))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  postCategory(callback, name, desc) {
    axios.post("/api/category", {name: name, desc: desc})
    .then(function(response) {
      let category = JSON.parse(response.data.message)
      callback(successResult(category))
    })
    .catch(function(error) {
      onApiFailed(error, callback)
    })
  },
  putArticleTop(callback, articleId) {
    axios.put("/api/article/" + articleId + "/top")
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(response) {
      onApiFailed(error, callback)
    })
  },
  getArticleDownload(callback, articleId) {
    axios.get("/api/article/" + articleId + "/download")
    .then(function(response) {
      callback(successResult(null))
    })
    .catch(function(response) {
      onApiFailed(error, callback)
    })
  },
  getSuperAdmin(callback) {
    axios.get("/api/superadmin")
    .then(function(response) {
      let res = JSON.parse(response.data.message)
      callback(successResult(res))
    })
    .catch(function(response) {
      onApiFailed(error, callback)
    })
  }
};
