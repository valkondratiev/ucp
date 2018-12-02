webix.protoUI({ name:'activeTable'}, webix.ui.datatable, webix.ActiveContent );
var managers={
    rows: [
        {
            view: "toolbar",
            css:"header_user",
            height:30,
            cols: [
                {view: "label", label: "Менеджеры", align: "left", css: "header_font"},
                {},

            ]
        },
        {
            view: "activeTable",
            width:500,
            height:400,
            id:"active_user",
            scrollX: false,
            select:"row",
            columns:[
                { id:"login",    header:"Логин" ,width:100},
                { id:"fio",   header:"ФИО" ,width:300 },
                { id: "block", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
                { id: "up", header: "&nbsp;", template: "{common.up()}",  width:40,},
            ],
            activeContent: {
                yourButton: {
                    view: "button",
                    id:"blockButton",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-lock',
                    tooltip:"Заблокировать"
                    //click:delLine,
                },
                up:{
                    view: "button",
                    id:"upButton",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-arrow-up',
                    tooltip:"Повысить"
                    //click:delLine,

                }


            },
            data: [
                { login:"user123", fio:"Иванов Иван Иванович"},
                { login:"user777", fio:"Петров Петр Петрович"},
                { login:"vovka", fio:"Сидоров Владимир Сергеевич "},

            ]
        },

    ]
}
var senior={
    rows:[
        {
            view: "toolbar",
            css:"header_user",
            height:30,
            cols: [
                {view: "label", label: "Старшие менеджеры", align: "left", css: "header_font"},
                {},

            ]
        },
        {
            view: "activeTable",
            select:"row",
            width:460,
            height:200,
            id:"senior",
            scrollX: false,
            columns:[
                { id:"login",    header:"Логин" ,width:100},
                { id:"fio",   header:"ФИО" ,width:300 },
                { id: "unblock", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
            ],
            activeContent: {
                yourButton: {
                    view: "button",
                    id:"blButton",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-lock',
                    tooltip:"Заброкировать"
                    //click:delLine,
                },
            },
            data: [
                { login:"user3445", fio:"Иванов Иван Иванович"},
                { login:"valk20", fio:"Петров Петр Петрович"},
                { login:"qwe123", fio:"Сидоров Владимир Сергеевич "},

            ]
        },]
}
var block={
    rows:[
    {
        view: "toolbar",
        css:"header_blockuser",
        height:30,
        cols: [
            {view: "label", label: "Заблокированные", align: "left", css: "header_font"},
            {},

        ]
    },
    {
        view: "activeTable",
        select:"row",
        width:560,
        height:200,
        id:"block_user",
        scrollX: false,
        columns:[
            { id:"login",    header:"Логин" ,width:100},
            { id:"fio",   header:"ФИО" ,width:300 },
            { id:"status",header:"Должность" ,width:100},
            { id: "unblock", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
        ],
        activeContent: {
            yourButton: {
                view: "button",
                id:"unblockButton",
                width:"30",
                height:"32",
                type:'icon',
                icon:'fas fa-lock-open',
                tooltip:"Разблокировать"
                //click:delLine,
            },
        },
        data: [
            { login:"user3445", fio:"Иванов Иван Иванович",status:"manager"},
            { login:"valk20", fio:"Петров Петр Петрович",status:"senior"},
            { login:"qwe123", fio:"Сидоров Владимир Сергеевич ",status:"manager"},

        ]
    },]

}
webix.ready(function() {
    webix.ui({
        rows:[
            {
                view:"toolbar",
                id:"myToolbar",
                height:40,
                cols:[
                    { view:"label",
                        label:"Кабинет администратора системы",
                        align:"center",
                        css:'header_font',
                    },
                    {
                        view:"icon",
                        icon:"fas fa-power-off",
                        css:"exit",
                        tooltip:"Выход",
                    }
                ]

            },
            {
                type:"space",

                cols:[
                    {},
                    managers,
                    {},
                    senior,
                    {}
                ]
            },
            {
                type:"space",
                cols:[
                    {},
                    {view:"form", scroll:false,
                        width:300,
                        borderless:true,
                        elements:[
                            { view:"fieldset", label:"Добавить менеджера", body:{
                                    rows:[
                                        { view:"text", label:"Логин"},
                                        { view:"text", label:"Пароль",type:"password"},
                                        { view:"text", label:"Имя"},
                                        { view:"text", label:"Фамилия"},
                                    ]
                                }},
                            { view:"button", label:"Добавить" , type:"form" },

                        ]},
                        {width:50},
                        block,
                        {}
                ]},
            {type:"space",rows:[{}]},

        ]

    })
});


