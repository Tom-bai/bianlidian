let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')
function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'typeName': '@ctitle(3,4)',
        'menuContent|5-10':[{
          'name': '@ctitle(3,8)',
          'numb': 0,
          'price|10-58': 15,
          'rating|18-28': 0,
          'sales|18-28':0,
          'src': "@image('200x100', '#4A7BF7','#fff','pic')"
        }]
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
module.exports = {
  ajax: ajax
}