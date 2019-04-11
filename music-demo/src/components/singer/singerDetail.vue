<template>
    <div class='singerDetail'>
        <div class="header">
            <span><i @click="goBack"></i></span>
            <h2 v-text="singerName"></h2>
        </div>
        
        <div class="con">
            <img :src="'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+singerMid+'.jpg?max_age=2592000'">
            <div id="songListWrapper">
                <ul>
                    <li v-for="song in songList" :key="song.musicData.songid" @click="goPlayer(song)">
                        <h2 v-text="song.musicData.songname"></h2>
                        <p>{{singerName}}--{{song.musicData.albumname}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HTTP from '@/Http/http'
import API from '@/api/abstract'
import iScroll from 'iscroll/build/iscroll-probe'

import {mapMutations, mapGetter} from 'vuex'
export default {
    data () {
        return {
            singerMid: '',
            singerName: '',
            songList:[],
            songListWrapper:null
        }
    },
    created(){
        this.singerMid = this.$route.params.id
        this.getSingerDetail()

        setTimeout(() => {
            this.songListWrapper.refresh()
        },0)
    },
    mounted(){
        this.songListWrapper = new iScroll("#songListWrapper", {
            mouseWheel: true,
            scrollbars: true,
            useTransfrom: true,
            disableMouse: true,
            disablePointer: true,
            disableTouch: false,
            tap: true,
            probeType: 2
        })
    },
    methods:{
        ...mapMutations([
            'ADD_SONGS_LIST'
        ]),
        // 获取歌手详细信息
        getSingerDetail(){
            let url = API.singer.singerDetail + this.singerMid
            HTTP.get(url, {param: 'jsonpCallback'})
            .then(({data:{list, singer_name}}) => {
                this.singerName = singer_name
                this.songList = list
                console.log(list)
            })
        },
        goBack(){
            this.$router.go(-1)
        },
        goPlayer({musicData:{albummid, singer, songmid, songname}}){
            this.$router.push(`/fullplayer/${albummid}`)
            this.ADD_SONGS_LIST({albummid, singer, songmid, songname})
        }
    }
}

</script>
<style lang='scss' scoped>
@import 'SCSS/singerDetail'
</style>