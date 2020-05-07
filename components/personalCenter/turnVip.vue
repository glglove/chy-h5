
<!--
  User: gaol
  Date: 2020/01/26
  功能： 成为vip
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_turnVip
    min-height calc(100vh - 110px)
    p.tip
        text-align left 
        margin-top 20px
        margin-left 30px
</style>

<template>
    <div :class="['page_turnVip']">
        <div class="head">
            <el-row>
                <h3>升级为vip</h3>
                <el-form label-width="100px" class="marginT10">
                    <el-form-item label="用户名">
                        <el-col :span="12" style="text-align: left">
                            <el-button type="text">331319344@qq.com</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="会员积分">
                        <el-col :span="12" style="text-align: left">
                            <el-select v-model="selectPoint">
                                <el-option
                                    v-for="(item, key) in points"
                                    :key="key"
                                    :label="item.name"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>

                    <p class="tip">
                        VIP用户,系统每日邮件推送适合的私活,普通用户每3日进行一次推送
                    </p>
                    <p class="tip">
                        VIP用户身份,一次购买终身拥有
                    </p>
                    <p class="tip">
                        每次查看私活联系方式消耗 <em>3</em> 积分
                    </p>
                    <p class="tip">
                        积分有效期为 <em>12</em> 个月
                    </p>
                    <p class="tip">
                        虚拟商品不支持退款
                    </p>
                    <el-button type="primary" @click.native="handlerPay">
                        立即支付
                    </el-button>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    export default {
        components:{
            MenuCmp
        },
        data() {
            return {
                noData: true,
                selectPoint: '2',
                points: [
                    {
                        name: '20积分',
                        value: '1'
                    },                    
                    {
                        name: '30积分',
                        value: '2'
                    },
                    {
                        name: '60积分',
                        value: '3'
                    },
                    {
                        name: '90积分',
                        value: '4'
                    },
                    {
                        name: '120积分',
                        value: '5'
                    },   
                    {
                        name: '150积分',
                        value: '6'
                    }                              
                ]
            }
        },
        methods: {
            handlerPay(){
                this.$router.push({
                    path: '/personalCenter/pay'
                })
            }
        }
    }
</script>
