<template>
    <div>

            <Navbar v-if="!islogining"  ></Navbar>

        <div :class="{'main-content':!islogining}">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    require('mavon-editor/resources/markdown/github-markdown.min.css');

    import {mapState,mapActions} from 'vuex'
    import Navbar from './Navbar.vue'

    export default {
        components:{Navbar},
        computed:{
            ...mapState({
                islogining:state => state.user.islogining
            })
        }

    }
</script>
<style>
    .main-left{
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: 180px;
        background: white;

       /* display: flex;
        flex-direction: column;
        justify-content: center;*/
        /*justify-content: flex-start;*/
    }
    .main-content{
        position: absolute;
        margin-left: 220px;
        right: 20px;
        left: 0px;
    }
    ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: rgba(0,0,0,.2);
    }

    ::-webkit-scrollbar-corner {
        display: block;
    }
    ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
</style>