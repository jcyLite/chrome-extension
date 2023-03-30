<template>
  <div class="home">
    <a-form layout="horizontal" labelAlign="left" class="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item
        label="开关："
      >
        <a-checkbox  v-model:checked="isValid"></a-checkbox>
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
         <a-input  style="width:calc(100% - 90px);" v-model:value="urls[index]" placeholder="请输入生效地址" /> 
         <span style="margin-left:10px;">
            <plus-circle-outlined @click="addLine"/>
            <minus-circle-outlined style="margin-left:10px;" @click="deleteLine(item)"/>
         </span>
        
        </div>
      </a-form-item>
      <a-form-item
        label="请输入手机号码："
      >
        <a-input v-model:value="phone" placeholder="请输入手机号码" />
      </a-form-item>
      <a-form-item
        label="请输入token-key:"
      >
        <a-input  v-model:value="tokenKey" placeholder="请输入获得的token作为header中的哪个key" />
      </a-form-item>
      <a-button @click="getToken">获取token</a-button>
    </a-form>
  </div>
</template>

<script>
 
 import {PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons-vue'
import { getCurrentInstance,reactive, ref, toRefs,watch, watchEffect } from 'vue';

export default {
  components:{PlusCircleOutlined,MinusCircleOutlined},
  setup(){
    const app = getCurrentInstance().proxy
    let tokenInfo = {}
    try{
      tokenInfo = JSON.parse(localStorage.getItem('tokenInfo')||'{}')
    }catch(err){}
    const state = reactive({
      formLayout: 'horizontal',
      role:tokenInfo.role||'shipper',
      isValid:(tokenInfo.isValid=='1')?true:false,
      labelCol: { flex: 6},
      wrapperCol: { flex: 18 },
      env:tokenInfo.env||'dev',
      phone:tokenInfo.phone,
      tokenKey:tokenInfo.tokenKey||'authorization',
      urls:tokenInfo.urls||['http://localhost:8080'],
    })
    console.log(state)
    watch(()=>[state.isValid,state.role,state.env,state.phone,state.tokenKey,state.urls],(v)=>{
      localStorage.setItem('tokenInfo',JSON.stringify({
        ...tokenInfo,
        ...state
      }))
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
      },
      getToken(){
        chrome.runtime.sendMessage({greeting:'getTokenInfo' });
      }
    };
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
