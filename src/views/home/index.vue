<template>
  <div class="home">
    <a-form layout="horizontal" labelAlign="left" class="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item
        label="开关："
      >
        <a-checkbox  v-model="isValid"></a-checkbox>
      </a-form-item>
      <a-form-item
        label="请输入角色类型："
      >
        <a-radio-group v-model:value="role">
          <a-radio-button value="driver">
            司机
          </a-radio-button>
          <a-radio-button value="shipper">
            货主
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="请输入生效地址："
      >
        <div :key="index" v-for="(item,index) of urls">
         <a-input  style="width:calc(100% - 90px);" v-model="urls[index]" placeholder="请输入生效地址" /> 
         <span style="margin-left:10px;">
            <plus-circle-outlined @click="addLine"/>
            <minus-circle-outlined style="margin-left:10px;" @click="deleteLine(item)"/>
         </span>
        
        </div>
      </a-form-item>
      <a-form-item
        label="请输入手机号码："
      >
        <a-input v-model="phone" placeholder="请输入手机号码" />
      </a-form-item>
      <a-form-item
        label="请输入token-key:"
      >
        <a-input  v-model="tokenKey" placeholder="请输入获得的token作为header中的哪个key" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
 
 import {PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons-vue'
import { getCurrentInstance,reactive, toRefs,watch } from 'vue';
export default {
  components:{PlusCircleOutlined,MinusCircleOutlined},
  setup(){
    const app = getCurrentInstance().proxy
    localStorage.role = localStorage.role ||'shipper'
    localStorage.env = localStorage.env||'dev'
    localStorage.phone = localStorage.phone||''
    localStorage.tokenKey =localStorage.tokenKey||''
    localStorage.urls = localStorage.urls || JSON.stringify(['http://localhost:8080'])
    const state = reactive({
      formLayout: 'horizontal',
      labelCol: { flex: 6},
      wrapperCol: { flex: 18 },
      isValid:(localStorage.isValid=='1')?true:false,
      role:localStorage.role,
      env:localStorage.env,
      phone:localStorage.phone,
      tokenKey:localStorage.tokenKey,
      urls:JSON.parse(localStorage.urls),
    })
    watch(()=>[state.role],(v)=>{
      console.log('vvvvv',v)
    })
    return {
      ...toRefs(state),
      addLine(){
        console.log(12121212)
        app.urls.push('')
      },
      deleteLine(url){
        const index = app.urls.indexOf(url)
        app.urls.splice(index,1)
      }
    };
  },
  watch:{
    // isValid(v){
    //   localStorage.isValid = (v?'1':'0')
    // },
    // role(v){
    //   localStorage.role = v
    // },
    // env(v){
    //   localStorage.env = v
    // },
    // phone(v){
    //   localStorage.phone = v
    // },
    // tokenKey(v){
    //   localStorage.tokenKey = v
    // },
    // urls:{
    //   deep:true,
    //   handler(v){
    //     localStorage.urls = JSON.stringify(v)
    //   }
    // }
  }
};
</script>

<style lang="scss">
body{
  width:590px;
  padding:10px;
}
.home{
  width:100%;
  height:100%;
}
.form {
  width:100%;
  padding-bottom:10px;
}
</style>
