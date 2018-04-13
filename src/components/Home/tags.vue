<template>
    <div>
        <ul class="bb-taglist">
            <li v-for="tag in taglist" class="">
                <span :tgid="{{tag.id}}">{{tag.tagname}}</span>

            </li>
        </ul>
    </div>

</template>
<script>
    export default{
        props:['taglist']
    }

</script>