'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi'
  }

  async getArticleList(){

    let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,"+
             'article.view_count as view_count ,'+
             'type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id'
 
     const results = await this.app.mysql.query(sql)
   
    this.ctx.body={data:results}
  }

  async getArticleById(){

    let id = this.ctx.parmas.id

    let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             'article.article_content as article_content,'+
             "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,"+
             'article.view_count as view_count ,'+
             'type.typeName as typeName '+
             'type.id as typeId '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id' +
             'WHERE article.id' + id

    const result = await this.app.mysql.query(sql)

    this.ctx.body = {data:result}
  }



 }

module.exports = HomeController;


// RESTful  App  前后端分离   简单和约束性
// 请求方式 get获取   post 新建 put 更新资源  delete 删除