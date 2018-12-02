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
                    width:460,
                    height:400,
                    id:"active_user",
                    scrollX: false,
                    select:"row",
                    columns:[
                        { id:"login",    header:"Логин" ,width:100},
                        { id:"fio",   header:"ФИО" ,width:300 },
                        { id: "block", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
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
                    },
                    data: [
                        { login:"user123", fio:"Иванов Иван Иванович"},
                        { login:"user777", fio:"Петров Петр Петрович"},
                        { login:"vovka", fio:"Сидоров Владимир Сергеевич "},

                    ]
                },

    ]
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
                width:460,
                height:200,
                id:"block_user",
                scrollX: false,
                columns:[
                    { id:"login",    header:"Логин" ,width:100},
                    { id:"fio",   header:"ФИО" ,width:300 },
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
                    { login:"user3445", fio:"Иванов Иван Иванович"},
                    { login:"valk20", fio:"Петров Петр Петрович"},
                    { login:"qwe123", fio:"Сидоров Владимир Сергеевич "},

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
                      label:"Кабинет старшего менеджера",
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
                    block,
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

                    {},
            ]},
            {type:"space",rows:[{}]},

        ]

    })
});