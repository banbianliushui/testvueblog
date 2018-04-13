<template>
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

</template>
<script>
    export default{
        props:['datelist']
    }

</script>