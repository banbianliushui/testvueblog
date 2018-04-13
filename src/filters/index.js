/**
 * Created by xiaozhu on 2017/8/19.
 */

 import Vue from 'vue'
 import filter from './filter'
 Object.keys(filter).forEach(k=>Vue.filter[k]);
