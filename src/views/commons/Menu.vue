<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="box-title">菜单管理</span>
            <el-button-group style="float: right;">
                <el-button :type="state.add" size="mini" @click="add">新增</el-button>
                <el-button :type="state.save" size="mini" @click="save">保存</el-button>
                <el-button :type="state.remove" size="mini" @click="remove">删除</el-button>
            </el-button-group>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-tree :data="menus" default-expand-all
                         @node-click="selectNode"
                         :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="10">
                 <el-form ref="form" :model="domain" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="domain.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单顺序">
                        <el-slider v-model="domain.order" :min="1" :max="100"></el-slider>
                    </el-form-item>    
                    <el-form-item label="空菜单夹">
                        <el-switch v-model="domain.container"></el-switch>
                    </el-form-item>
                    <el-form-item label="菜单样式">
                        <el-input v-model="domain.css"></el-input>
                    </el-form-item>
                    <el-form-item label="访问地址">
                        <el-input v-model="domain.url"></el-input>
                    </el-form-item>
                 </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import { async } from 'q'
import _ from 'lodash'

const axios = require('axios')

const props = ['id', 'css', 'name', 'order', 'url', 'path', 'parentId', 'container']

const create = function() {
    return {
        id: null,
        css: "",
        name: "",
        order: 10,
        url: "",
        path: "",
        parentId : 0,
        container: false
    }
}

export default {
    
    name : "Menu",

    data () {
        let domain = create()
        return {
            menus: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            domain,
            state: {
                add: "primary",
                save: "default",
                remove: "default"
            }
        }
    },

    mounted () {
        let self = this
        const findRoot = async function() {
            try {
                const resp = await axios.get('/common/menu/root')
                self.menus.push(resp.data)
            } catch(error) {
                console.log(error)
            }
        }
        findRoot()
    },

    methods: {

        selectNode (data) {
           let self = this
           _.forEach(props, prop => {
               self.domain[prop] = data[prop]
           })
        },

        add() {
            let domain = create()
            domain.parentId = this.domain.id
            domain.name = "新菜单"
            this.domain = domain
        },

        save() {
            let self = this
            let domain = create()
            _.forEach(props, prop => {
               domain[prop] = self.domain[prop]
            })
            axios.post('/common/menu/save', domain)
                 .then(resp => {
                    self.$set(self.menus, 0, resp.data)
                    this.$notify({
                        title: '操作成功',
                        message: '您已成功保存数据！',
                        type: 'success'
                    })
                 })
        },

        remove() {
            let id = this.domain.id
            let self = this
            if(!!id) {
                this.$confirm('此操作将永久删除数据, 是否继续?', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/common/menu/remove', {
                        id
                    })
                    .then(resp => {
                        self.$set(self.menus, 0, resp.data)
                        this.$notify({
                            title: '操作成功',
                            message: '您已成功删除数据！',
                            type: 'success'
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

                
            } else {
                this.$notify({
                    title: '操作警告',
                    message: '不能删除根节点或新节点！',
                    type: 'error'
                })
            }
        }
    }

}
</script>

