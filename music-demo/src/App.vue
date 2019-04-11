<template>
    <div class="app">
        <Header></Header>
        <TabNav></TabNav>
        <MiniPlayer></MiniPlayer>
        <router-view></router-view>
    </div>
</template>

<script type="javascript">

// 导入头部组件
import Header from 'COMPONENTS/common/header'
import TabNav from 'COMPONENTS/common/tabNav'
import MiniPlayer from 'COMPONENTS/common/MiniPlayer'
  export default {
    name:'',
    props:[''],
    data () {
        return {

        };
    },
    components: {
        Header,
        TabNav,
        MiniPlayer
    }
}
</script>
<style lang='scss'>
@import 'SCSS/common.scss';

</style>
