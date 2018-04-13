<template>
    <div class="bc-form-outer">
        <div class="bc-login-form ">

            <div class="bc-form-control bc-login-top">
                <input  class="bc-control-input" type="username" placeholder="请输入用户名" v-model="user.username" >
            </div>

            <div  class="bc-form-control">
                <input type="password"  class="bc-control-input" placeholder="请输入密码" v-model="user.password"/>
            </div>
            <div  class="bc-form-control">
                <button type="submit" @click="login"  class="bc-control-btn">提交</button>
            </div>

        </div>

    </div>
</template>
<style>
    .bc-form-outer{
        position:fixed;
        top:0;
        bottom:0;
        right:0;
        left:0;
    }
    .bc-login-form{
        margin: auto;
        width: 400px;
        position: absolute;
        height: 220px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 30px 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        background: white;
        text-align: center;
    }

    .bc-login-top{
        margin-top: 40px;
    }
    body{
        background: #f0f9f0;
    }

    .bc-control-btn{
        background: #efd30b;
        padding: 6px 0px 8px 0px;
        width: 250px;
        border: 1px solid #eee;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 14px;
        cursor:pointer;
    }
</style>
<script>

export default {
  data(){
      return {user:{}}
  },
   methods:{
       login(){
           console.log('点击提交')
           console.log(this.user)
           if(!this.user.username||!this.user.password){
               return;
           }
           //分发到action
           var that = this;
          this.$store.dispatch('signin',this.user).then(function(results){
              if(results.success){//此处文件编辑页
                  that.$router.push({path:'/admin'})
              }
          })
       }
   }
}
</script>