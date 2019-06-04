import Vue from 'vue'
import AnalysParam from './ParamUtils'
import { namespace } from 'vuex-class'
import { Component } from 'vue-property-decorator'

const Formstate = namespace('Formstate')

@Component
export default class TableBase extends Vue {
   @Formstate.Action('get')
   action
   @Formstate.Action('del')
   del
   @Formstate.Action('post')
   post
   @Formstate.Action('update')
   update
   tableData = []

   formData = {}

   totalPage = 0

   search (templateSearch, serchObj, params, tableName) {
     params.pageNum = 1
     params.expressions = AnalysParam.searchParamsBuild(templateSearch, serchObj)
     return this.action({url: tableName, params: {page: 'page', whereContext: JSON.stringify(params)}})
       .then(ele => {
         return ele
         }
       )
   }
  deleteRow (tableName, data) {
     if (data.id) {
      this.del({url: `${tableName}/${data.id}`, params: data}).then(ele => {
            if (ele && ele.code === 0) {
              let m = []
              this.tableData.forEach(els => {
                    if (els.id !== data.id) {
                        m.push(els)
                    }
                })
              this.tableData = m
            } else {
              alert(ele.msg)
            }
        })
     } else {
       alert('请传入正确的，数据')
     }
   }
  edit (name, data) {
    this.$router.push({name: name, params: {id: data.id}})
  }
  add (name) {
    let data = {id: 'new'}
    this.edit(name, data)
  }

  getFormData (tableName, id) {
     if (id !== 'new') {
       this.action({url: `${tableName}/${id}`})
         .then(ele => {
           if (ele.code === 0) {
             this.formData = ele.data
           } else {
             alert(ele.msg)
           }
         })
     }
  }
  submitForm (formName, id, url) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        if (id === 'new') {
          this.post({url: url, params: this.formData})
            .then(ele => {
              if (ele.code === 0) {
                this.formData = ele.data
                this.$router.go(-1)
              } else {
                alert(ele.msg)
              }
            })
        } else {
          this.update({url: url, params: this.formData})
              .then(ele => {
              if (ele.code === 0) {
                this.formData = ele.data
                this.$router.go(-1)
              } else {
                alert(ele.msg)
              }
            })
        }
      } else {
        return false
      }
    })
  }
  resetForm (formName) {
     this.$router.go(-1)
  }
}
