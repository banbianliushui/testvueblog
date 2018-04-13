<template>
   <aside>
       <div>
           <ul class="bb-datelist">
               <li v-for="dates in datelist" class="bb-year">
                   <div>{{dates.year}} </div>
                   <ul class="bb-month">
                       <li v-for="month in dates.month">
                           {{month}}
                       </li>
                   </ul>
               </li>
           </ul>
       </div>
       <div>
           <ul class="bb-taglist">
               <li v-for="tag in taglist" class="">
                 <span :tgid="{{tag.id}}">{{tag.tagname}}</span>

               </li>
           </ul>
       </div>
   </aside>
</template>
<script>
    export default{
        props:['datelist','taglist']
    }

</script>
<style>

</style>