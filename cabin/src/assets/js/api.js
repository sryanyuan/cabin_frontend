import { formatError } from "@/assets/js/util.js";
import axios from "axios";

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

export default {
  getCategoryList(callback) {
    axios
      .get("/api/category")
      .then(function(response) {
        let body = JSON.parse(response.data.message);
        callback(successResult(body.categories));
      })
      .catch(function(error) {
        callback(errorResult(formatError(error)));
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
        callback(errorResult(formatError(error)));
      });
  },
  getArticle(callback, articleId, summary) {
    let url = "/api/article/" + articleId + "?summary=" + summary;

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
        callback(errorResult(formatError(error)));
      });
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
        callback(errorResult(formatError(error)));
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
  }
};
