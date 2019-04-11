<template>
   <div class='mini-player' style="position:absolute;height:100px;z-index:6666">
       <audio :src="playerSrc" controls v-if="playerSrc" ref="curPlay" autoplay @ended="AutoCutSong"></audio> 
   </div>
</template>

<script>
import Tools from '@/mixins/cutSong'
import HTTP from '@/Http/http'
import {mapGetters, mapMutations} from 'vuex'
export default {
    mixins:[Tools],
    data () {
        return {
            songMid:'',
            vkey:'',
            playerSrc: '',
            curPlayMode: ''
        };
    },
    watch:{
        getCurPlayMode(newPlayMode){
            this.curPlayMode = newPlayMode
        },
        getCurrentSong(newCurrent){
            // 1、获取songMid
            this.songMid = newCurrent.songmid
            // 2、组装vkey
            this.getVKey()
            // 3、返回播地址
            .then(vKey => {
                // 4、得到播放地址
                this.setPlayerAdder(vKey)
            })
        }
    },
    computed:{
        ...mapGetters([
            'getCurPlayMode',
            'getCurrentSong'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_CURRENT_SRC'
        ]),
        // 获取VKey地址
        getVKey() {
            return new Promise((resolve, reject) =>{            
                let vKeyApi = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&cid=205361747&platform=yqq&hostUin=0&needNewCode=0&uin=0&songmid=${this.songMid}&filename=C400${this.songMid}.m4a&guid=7120953682`       
                HTTP.get(vKeyApi, {})
                .then(({data: {items}}) => {
                    if (items[0] && items[0].vkey) {
                        resolve(items[0].vkey)
                    } else {
                        reject(new Error('vKey获取失败'))
                    }
                })
            })
        },
        // 获取播放地址方法
        setPlayerAdder(vKey){
            this.playerSrc = `http://dl.stream.qqmusic.qq.com/C400${this.songMid}.m4a?vkey=${vKey}&guid=7120953682&uin=0&fromtag=66`
            this.SET_CURRENT_SRC(this.playSrc)
        },
        AutoCutSong(){
            this.cutSong(this.curPlayMode, 'next')
        }
    },
    mounted(){
        this.curPlayMode = this.getCurPlayMode
    },
}
</script>
<style lang='scss' scoped>
audio{
    opacity: 0;
}
</style>