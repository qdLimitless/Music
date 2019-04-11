<template>
    <div class="home">
        <div id = "warpper">
            <div id="warpper-con">
                <Banner :bannerList = "imgUrl"></Banner>
                <RankList :songsList = "blumbUrl"></RankList>
                <div class="loading-con">
                    <i class="loading-img"></i>
                    <p style="color:#fff;font-size:20px;text-align:center">{{stepTips[steps]}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
//插件
import iScroll from 'iscroll/build/iscroll-probe'
// 接口
import API from '@/api/abstract'
import HTTP from '@/Http/http'
//组件
import Banner from 'COMPONENTS/home/banner'
import RankList from 'COMPONENTS/home/rankList'

export default {
    data: () => {
        return {
            // iScroll 实例化
            iscroll: null,
            // banner数据
            imgUrl:[],
            // 排行榜数据
            rankListUrl: {},
            // 封面等数据
            blumbUrl: [],
            // 排行榜请求的开始值
            beginNum:0,
            // 是否为第一次请求
            isFirstFetch: true,
            // 加载状态显示
            stepTips:{
                ste1: "向上拉加载更多",
                ste2: "松开加 载更多",
                ste3: "加载中.....",
                ste4: "已加载完所有数据"
            },
            steps:'ste1',
            nowDate:''
        }
    },
    components: {
        Banner,
        RankList
    },    
    created(){        
        this.getBannerList()
        this.getRankListItem()
        // this.nowDate = this.getNowDay()
    },
    mounted(){
        setTimeout(() =>{            
            this.iscroll = new iScroll("#warpper", {
                mouseWheel: true,
                scrollbars: true,
                useTransfrom: true,
                disableMouse: true,
                disablePointer: true,
                disableTouch: false,
                tap: false,
                probeType: 2
            })
            // 监听滚动开始
            this.iscroll.on('scrollStart', () => {
                this.steps = 'ste1'
            })
            // 监听滚动移动
            this.iscroll.on('scroll', () => {
                if(this.iscroll.maxScrollY - this.iscroll.y >= 30){
                    this.steps = 'ste2'
                }else{
                    this.steps = 'ste1'
                }
            })
            // 监听滚动结束的事件
            this.iscroll.on('scrollEnd', () => {
                setTimeout(() => {
                    if(this.steps == 'ste2'){
                        console.log(this.beginNum, this.rankListUrl.total_song_num)
                        if(this.beginNum == this.rankListUrl.total_song_num) {
                            this.steps = "ste4";
                        }else{
                            this.steps = 'ste3';
                            this.getRankListItem();
                            this.iscroll.refresh();                      
                        }
                    }
                }, 100)
                if(this.iscroll.y != 0){
                    this.iscroll.scrollTo(0, this.iscroll.y + 30)
                }   
            })
        },500)
    },
    methods:{
        //获取banner列表
        getBannerList(){
            HTTP.get(API.home.banner, {param:'jsonpCallback'})
            .then(({code, data:{slider}}) => {
                this.imgUrl = slider
            })
        },
        // 加载更多排行榜数据
        getRankListItem(){            
            HTTP.get(API.home.rank+`&song_begin=${this.beginNum}&date=2019-04-09`, {param:'jsonpCallback'})
            .then(({code, songlist, total_song_num}) => {
                if(this.isFirstFetch){
                    this.blumbUrl = songlist;
                    this.beginNum = this.blumbUrl.length;
                    this.isFirstFetch = false;
                }else{
                    this.blumbUrl = this.blumbUrl.concat(songlist);
                    this.beginNum = this.blumbUrl.length;
                }
                this.rankListUrl = {code, songlist, total_song_num}
            })
        },
        // 获取当前日期
        getNowDay(){
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = month > 10 ? month : '0' + month
            day = day > 10 ? day : '0' + day
            let nowDate = year + '-' + month + '-' + day
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'SCSS/home'
</style>
