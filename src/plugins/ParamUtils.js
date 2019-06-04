
export default {

  analysParam (str) {
    // 吧多个空格替换成一个空格
    let regEx = /\s+/g
    str = str.replace(regEx, ' ')
    return this.getExpressionFromStr(str)
  },
  // 递归解析字符串生成后台需要的
  getExpressionFromStr (str) {
    str = str.trim()
    if (!str) {
      return
    }
    let expressionStr = this.getExpressionStrFromStr(str)
    console.log(expressionStr)
    let expressions = []
    let expression = {}
    if (expressionStr.type === '') {
      expression.unique = 1
      let strs = expressionStr.msgs[0].str.split(' ')
      expression.key = strs[0]
      expression.type = strs[1]
      expression.value = strs[2]
      expressions.push(expression)
      return expressions
    } else {
      let strs = expressionStr.msgs
      expression.joinType = expressionStr.type
      expression.unique = 0
      expression.expressions = []
      expressions.push(expression)
      strs.forEach(ele => {
        if (ele.type === 'sigin') {
          let obj = {}
          obj.unique = 1
          let strs1 = ele.str.split(' ')
          obj.key = strs1[0]
          obj.type = strs1[1]
          obj.value = strs1[2]
          expression.expressions.push(obj)
        } else {
          let temp = this.getExpressionFromStr(ele.str)
          if (temp) {
            expression.expressions.push(...temp)
          }
        }
      })
    }
    return expressions
  },

  getExpressionStrFromStr (str) {
    str = str.trim()
    console.log(str)
    let msg = {}
    let cuurStr = ''
    let msgs = []
    let flag = ''
    while (str && str.length > 0) {
      let unique = false
      let obj = {}
      if (str.search('\\(') === 0) {
        let bflag = 0
        let eflag = 0
        let eindex = 0
        for (let i = 0; i < str.length; i++) {
          let s = str.slice(i, i + 1)
          if (s === '(') {
            bflag += 1
          } else if (s === ')') {
            eflag += 1
          }
          eindex = i
          // 截取得到第一个子表达式
          if (bflag === eflag && bflag !== 0) {
            // 第一个表达式如果有括号是去最外层了括号的 如 ：
            // ( (field ge '' and  field le '')  or (field ge '' and  field ge'' ) )
            // => (field ge '' and  field le '')  or (field ge '' and  field ge'' )
            cuurStr = str.slice(1, eindex).trim()
            //  除去 第一个表达式，注意剩下的字符串如果有还有表达式，链接条件夜包含在其中
            str = str.slice(eindex + 1).trim()
            if (flag === '') {
              flag = str.startsWith('and') ? 'and' : 'or'
            }

            break
          }
        }
      } else {
        // 为单列
        if (str.search(' and ') === -1 && str.search(' or ') === -1) {
          unique = true
          cuurStr = str
          str = undefined
        } else {
          let andIndex = str.search(' and ')
          let orIndex = str.search(' or ')
          if (((andIndex !== -1 && orIndex !== -1) && andIndex < orIndex) ||
          (andIndex !== -1 && orIndex === -1)) {
            let tempstr = 'and'
            cuurStr = str.slice(0, str.search(tempstr)).trim()
            str = str.slice(str.search(tempstr)).trim()
            if (flag === '') {
              flag = 'and'
            }
          } else {
            let tempstr = 'or'
            cuurStr = str.slice(0, str.search(tempstr)).trim()
            str = str.slice(str.search(tempstr)).trim()
            if (flag === '') {
              flag = 'or'
            }
          }
        }
      }
      obj.str = cuurStr
      if (unique) {
        obj.type = 'sigin'
      }
      msgs.push(obj)
      if (str) {
        str = str.slice(flag.length).trim()
      }
    }
    msg.msgs = msgs
    msg.type = flag
    return msg
  },

  searchParamsBuild (str, searchObj) {
    let params = this.analysParam(str)
    return this.delEmpty(params, searchObj)
  },
  delEmpty (params, searchObj) {
    let newParams = []
    for (var i = 0; i < params.length; i++) {
      var ele = params[i]
      if (ele.unique === 0) {
        let expressions = this.delEmpty(ele.expressions, searchObj)
        if (expressions.length > 0) {
          ele.expressions = expressions
          newParams.push(ele)
        }
      } else {
        if (searchObj[ele.key]) {
          let vaue = searchObj[ele.key]
          ele.value = vaue
          newParams.push(ele)
        }
      }
    }
    return newParams
  }
}
