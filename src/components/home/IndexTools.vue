<template>
  <div>
    <!--天气，公告，日历-->
    <div id="weather-view-he"></div>
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>
<script>

  export default {
    name: 'IndexTools',
    created () {
      window.WIDGET = { ID: 'npWAhIzJqg' };
      (function (d) {
        var cs = d.createElement('link')
        cs.rel = 'stylesheet'
        cs.href = 'https://apip.weatherdt.com/view/static/js/r.js?v=1111'
        var s = d.createElement('script')
        s.src = 'https://apip.weatherdt.com/view/static/js/r.js?v=1111'
        var sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(cs, sn)
        sn.parentNode.insertBefore(s, sn)
      })(document)
    }
  }
</script>

<style scoped>

</style>
