import * as types from './mutations_types'

const mutations = {
    // 添加歌曲进播放列表，无播放地址
    [types.ADD_SONGS_LIST]: (state, newSong) => {
        let player = state.player
        let count = 0
        // 有重复的歌曲，count++， 当前歌曲索引为index
        player.PlaySongsList.forEach((song, index) => {
            if(song.songmid === newSong.songmid){
                player.CurrentIndex = index
                count++
            }
        })
        // 如果count > 0 ，跳出函数
        if(count > 0){
            return false
        }
        player.PlaySongsList.push(newSong)
        player.CurrentIndex = player.PlaySongsList.length - 1
    },

    // 设置当前播放歌曲播放地址
    [types.SET_CURRENT_SRC]: (state, src) => {
        let player = state.player
        player.PlaySongsList[player.CurrentIndex].src = src
    },

    [types.SET_CURRENT_INDEX]: (state, index) => {
        state.player.CurrentIndex = index
    },

    [types.SET_CURRENT_MODE]: (state, mode) =>{
        state.player.CurPlayMode = mode
    }
}
export default mutations