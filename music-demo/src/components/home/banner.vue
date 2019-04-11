<template>
   <div class='banner'>
       <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="banner in bannerList" :key="banner.comment_num">
                    <img :src="banner.picUrl">
                </div>
            </div>
        </div>
            <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'


export default {
    name:'',
    props:{
        bannerList:{
            type: Array,
            default: function(){
                return []
            },
            required: true
        }
    },
    data () {
        return {
        };
    },
    mounted(){
        this.$nextTick(() => {
            new Swiper('.swiper-container', {
                // 是否开启循环
                loop: true,
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                }
            })
        })
    },
    created(){
    },
    components: {
    }
}

</script>
<style lang='scss' scoped>
.banner{
    .swiper-slide{
        img{
            width:100%
        }
    }
    .swiper-pagination-bullets{        
        width:100%;
        .swiper-pagination-bullet{
            margin:0 5px;
            background: #FFF;
        }
        .swiper-pagination-bullet-active{
            width: 15px;
            background: #fff;
            opacity: .3;
            border-radius: 5px;
        }
    }
       
}
</style>