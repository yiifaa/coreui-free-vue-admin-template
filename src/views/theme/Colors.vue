<template>
  <div class="row">
    <div class="col-sm-4">
        <el-tree :data="menus" :props="defaultProps"></el-tree>
    </div>
    <div class="col-sm-8">
      other
    </div>
  </div>
</template>

<script>
import { async } from 'q';
const axios = require('axios');

export default {
  name: 'colors',

  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  mounted () {
    var self = this
    const findRoot = async function() {
      try {
        const resp = await axios.get('/common/menu/root')
        self.menus.push(resp.data)
      } catch(error) {
        console.log(error)
      }
    }
    findRoot()
    console.log(this.menus)
  }
}
</script>
<style lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
