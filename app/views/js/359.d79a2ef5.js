"use strict";(self["webpackChunkcritter_frontend"]=self["webpackChunkcritter_frontend"]||[]).push([[359],{1359:function(e,s,a){a.r(s),a.d(s,{default:function(){return B}});var t=a(3396),r=a(7139);const d=e=>((0,t.dD)("data-v-72ed3588"),e=e(),(0,t.Cn)(),e),n={class:"container col-md-12"},i={key:0,id:"userName"},o={class:"mx-0 my-3 text-center"},l={key:0,class:"card card-container py-3"},c={class:"card card-container"},u=d((()=>(0,t._)("img",{class:"rounded mx-auto mb-3",src:"hedgehogMagician.jpg",style:{width:"75%",height:"75%"}},null,-1))),m={class:"form-group"},h=d((()=>(0,t._)("label",{for:"username"},"New Username",-1))),p={class:"form-group"},g=d((()=>(0,t._)("label",{for:"password"},"New Password",-1))),b={class:"form-group mb-0"},w=["disabled"],y={class:"form-group mt-3"},_={class:"card card-container"},v=d((()=>(0,t._)("img",{class:"rounded mx-auto mb-3",src:"rabbitMoon.jpg",style:{width:"50%",height:"50%"}},null,-1))),f={class:"form-group"},k=["disabled"],D={class:"form-group mt-3"},M={key:0,class:"alert alert-danger",role:"alert"};function U(e,s,a,d,U,x){const S=(0,t.up)("AdminPanel"),C=(0,t.up)("Field"),L=(0,t.up)("ErrorMessage"),q=(0,t.up)("Form");return(0,t.wg)(),(0,t.iD)("div",n,[(0,t._)("header",null,[x.currentUser?((0,t.wg)(),(0,t.iD)("div",i,[(0,t._)("h4",o,"𐂊 - "+(0,r.zw)(x.currentUser.alias)+" - 𐂊",1)])):(0,t.kq)("",!0)]),x.currentUser&&"ADMIN"===x.currentUser.role?((0,t.wg)(),(0,t.iD)("div",l,[(0,t.Wm)(S)])):(0,t.kq)("",!0),(0,t._)("div",c,[u,(0,t.Wm)(q,{onSubmit:x.handleUpdate,"validation-schema":U.schema},{default:(0,t.w5)((()=>[(0,t._)("div",m,[h,(0,t.Wm)(C,{name:"username",type:"text",class:"form-control"}),(0,t.Wm)(L,{name:"username",class:"error-feedback"})]),(0,t._)("div",p,[g,(0,t.Wm)(C,{name:"password",type:"password",class:"form-control"}),(0,t.Wm)(L,{name:"password",class:"error-feedback"})]),(0,t._)("div",b,[(0,t._)("button",{class:"btn btn-bosco btn-block",disabled:U.updLoading}," Update Profile ",8,w)]),(0,t._)("div",y,[U.updMessage?((0,t.wg)(),(0,t.iD)("div",{key:0,class:(0,r.C_)(["alert",U.updSuccess?"alert-success":"alert-danger"]),role:"alert"},(0,r.zw)(U.updMessage),3)):(0,t.kq)("",!0)])])),_:1},8,["onSubmit","validation-schema"])]),(0,t._)("div",_,[v,(0,t.Wm)(q,{onSubmit:x.handleDelete},{default:(0,t.w5)((()=>[(0,t._)("div",f,[(0,t._)("button",{class:"btn btn-bosco btn-block",disabled:U.delLoading}," Delete Profile ",8,k)]),(0,t._)("div",D,[U.delMessage?((0,t.wg)(),(0,t.iD)("div",M,(0,r.zw)(U.delMessage),1)):(0,t.kq)("",!0)])])),_:1},8,["onSubmit"])])])}var x=a(5708),S=a(9242);const C=e=>((0,t.dD)("data-v-a550b22c"),e=e(),(0,t.Cn)(),e),L=C((()=>(0,t._)("h4",{class:"text-center",id:"title"},"Admin panel",-1))),q={class:"mb-0"},E={class:"ml-auto"},I=["onClick","disabled"],N=["onClick","disabled"],P=["onClick","disabled"],A={key:0,class:"alert alert-danger m-0",role:"alert"};function F(e,s,a,d,n,i){return(0,t.wg)(),(0,t.iD)(t.HY,null,[L,(0,t._)("div",q,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(this.users,(e=>((0,t.wg)(),(0,t.iD)("div",{class:"row mx-0 my-3 userCtrl",key:e.userId},[(0,t.wy)((0,t._)("span",{class:"mr-auto my-auto"},(0,r.zw)(e.username),513),[[S.F8,"ADMIN"!==e.role]]),(0,t.wy)((0,t._)("div",E,[(0,t.wy)((0,t._)("button",{class:"btn btn-success mr-2 px-2 py-1",onClick:s=>this.approve(e.id),disabled:this.loading},"Approve",8,I),[[S.F8,"PENDING"===e.role]]),(0,t.wy)((0,t._)("button",{class:"btn btn-warning mr-2 px-2 py-1",onClick:s=>this.suspend(e.id),disabled:this.loading},"Suspend",8,N),[[S.F8,"USER"===e.role]]),(0,t._)("button",{class:"btn btn-danger px-2 py-1",onClick:s=>this.delete(e.id),disabled:this.loading},"Delete",8,P)],512),[[S.F8,"ADMIN"!==e.role]])])))),128))]),n.message?((0,t.wg)(),(0,t.iD)("div",A,(0,r.zw)(n.message),1)):(0,t.kq)("",!0)],64)}var Z=a(1458),W={name:"AdminPanel",data(){return{message:"",users:"",loading:!1}},methods:{getUsers(){Z.Z.getUsers().then((e=>{this.users=e.data})).catch((e=>{this.displayError(e)}))},approve(e){this.loading=!0,Z.Z.approve(e).then((()=>{this.loading=!1,this.getUsers()})).catch((e=>{this.loading=!1,this.displayError(e)}))},suspend(e){this.loading=!0,Z.Z.suspend(e).then((()=>{this.loading=!1,this.getUsers()})).catch((e=>{this.loading=!1,this.displayError(e)}))},delete(e){confirm("Do you really want to permanently delete current user?")&&(this.loading=!0,Z.Z["delete"](e).then((()=>{this.loading=!1,this.getUsers()})).catch((e=>{this.loading=!1,this.displayError(e)})))},displayError(e){this.message=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()}},mounted(){this.getUsers()}},$=a(89);const z=(0,$.Z)(W,[["render",F],["__scopeId","data-v-a550b22c"]]);var j=z,H=a(6542),R={name:"Profile",components:{Form:x.l0,Field:x.gN,ErrorMessage:x.Bc,AdminPanel:j},data(){const e=H.Ry().shape({username:H.Z_().required("Username is required!").min(3,"Must be at least 3 characters!").max(20,"Must be maximum 20 characters!"),password:H.Z_().required("Password is required!").min(6,"Must be at least 6 characters!").max(40,"Must be maximum 40 character")});return{updLoading:!1,updMessage:"",updSuccess:!1,delLoading:!1,delMessage:"",schema:e}},computed:{currentUser(){return this.$store.state.auth.user}},updated(){if(!this.$store.state.auth.status.loggedIn)return this.$router.push("/Landing")},methods:{handleUpdate(e){this.updLoading=!0,this.updMessage="",this.updSuccess=!1,this.$store.dispatch("auth/update",{user:e,userId:this.currentUser.id}).then((e=>{this.updLoading=!1,this.updMessage="Successfully updated user info!",this.updSuccess=!0}),(e=>{this.updLoading=!1,this.updMessage=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()}))},handleDelete(){confirm("Do you really want to permanently delete current user?")&&(this.delLoading=!0,this.$store.dispatch("auth/delete",this.currentUser.id).then((()=>{this.$router.push("/home")}),(e=>{this.delLoading=!1,this.delMessage=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()})))}}};const Y=(0,$.Z)(R,[["render",U],["__scopeId","data-v-72ed3588"]]);var B=Y}}]);
//# sourceMappingURL=359.d79a2ef5.js.map