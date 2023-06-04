export interface PropData{
    id:string
    label:string
    value:string | number | boolean
    type:string
    options?:string
    tip?:string
}

export interface CompConfig{
    id:'input'|'dropdown'|'textarea'
    label:string
    img:string
    props:PropData[]
}

export const comps:CompConfig[] = [
    {
        id:'input',
        label:'Input单行文本框',
        img:'/input.png',
        props:[
            {id:"title",label:"标题",value:"标题",type:"text"},
            {id:"placeholder",label:"Placeholder",value:"请输入",type:"text"},
            {id:"field",label:"对应字段",value:"",type:"text"},
            {id:"type",label:"类型",value:"text",type:"text",tip:'可输入类型 text, number, password, email, url, date, datetime, time, week, month, quarter, year'},
            {id:"required",label:"必填",value:true,type:"checkbox"}
        ]
    },
    {
        id:'dropdown',
        label:'Select下拉框',
        img:'/select.png',
        props:[
            {id:"title",label:"标题",value:"标题",type:"text"},
            {id:"placeholder",label:"Placeholder",value:"请选择",type:"text"},
            {id:"field",label:"对应字段",value:"",type:"text"},
            {id:"items",label:"选项",value:"选项1,选项2,选项3",type:"text",tip:"以逗号分隔"},
            {id:"selected",label:"默认选中",value:-1,type:"number", tip:"下标从0开始, -1为不选中"},
            {id:"required",label:"必填",value:"",type:"checkbox"}
        ]
    },
    {
        id:'textarea',
        label:'Textare多行文本框',
        img:'/textarea.png',
        props:[
            {id:"title",label:"标题",value:"标题",type:"text"},
            {id:"placeholder",label:"Placeholder",value:"请输入",type:"text"},
            {id:"field",label:"对应字段",value:"",type:"text"},
            {id:"required",label:"必填",value:"",type:"checkbox"}
        ]
    },
]

export const pageConfigTpl:PropData[]=[
    {id:"title",label:"报名表单",value:"活动标题",type:"text"},
    {id:"button",label:"按钮文字",value:"提交报名",type:"text"}
]