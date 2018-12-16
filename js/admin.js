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
            id:"active_managers",
            name:"active_managers",
            url:function(){
                return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allActiveManagers").then(function(data){
                    return data.json();
                });
            },
            scrollX: false,
            select:"row",
            columns:[
                { id:"login", name:"login",    header:"Логин" ,width:100},
                { id:"fio",name:"fio",   header:"ФИО" ,width:300 },
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
                    tooltip:"Заблокировать",
                    click:lockManager,
                },
                up:{
                    view: "button",
                    id:"upButton",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-arrow-up',
                    tooltip:"Повысить",
                    click:up,

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
function up() {
    row=this.data.$masterId.row;
    var login=$$("active_managers").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/upManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_managers").clearAll(true);
            $$("senior").clearAll(true);
            $$("active_managers").loadNext(-1,0);
            $$("senior").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})
}
function lockManager() {
    row=this.data.$masterId.row;
    var login=$$("active_managers").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/blockManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_managers").clearAll(true);
            $$("block_managers").clearAll(true);
            $$("active_managers").loadNext(-1,0);
            $$("block_managers").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

}
function lockSeniorManager() {
    row=this.data.$masterId.row;
    var login=$$("senior").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/blockManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("senior").clearAll(true);
            $$("block_managers").clearAll(true);
            $$("senior").loadNext(-1,0);
            $$("block_managers").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})
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
            name:"senior",
            url:function(){
                return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allSeniorManagers").then(function(data){
                    return data.json();
                });
            },
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
                    tooltip:"Заброкировать",
                    click:lockSeniorManager,
                },
            },
            data: [
                { login:"user3445", fio:"Иванов Иван Иванович"},
                { login:"valk20", fio:"Петров Петр Петрович"},
                { login:"qwe123", fio:"Сидоров Владимир Сергеевич "},

            ]
        },]
}
function unlock() {
    row=this.data.$masterId.row;
    var login=$$("block_managers").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/unblockManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_managers").clearAll(true);
            $$("block_managers").clearAll(true);
            $$("senior").clearAll(true);
            $$("active_managers").loadNext(-1,0);
            $$("block_manager").loadNext(-1,0);
            $$("senior").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

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
        id:"block_managers",
        name:"block_managers",
        url:function(){
            return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allStatusBlockManagers").then(function(data){
                return data.json();
            });
        },
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
                tooltip:"Разблокировать",
                click:unlock,
            },
        },
        data: [
            { login:"user3445", fio:"Иванов Иван Иванович",status:"manager"},
            { login:"valk20", fio:"Петров Петр Петрович",status:"senior"},
            { login:"qwe123", fio:"Сидоров Владимир Сергеевич ",status:"manager"},

        ]
    },]

}
function addManager(){
    if( $$("form").validate()){
        var formData=$$("form").getValues();
        var manager = JSON.stringify(formData, "", "\t");
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/addManager", manager).then(function (result) {
            if (result.json().success == true) {
                webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
                $$("active_managers").clearAll(true);
                $$("active_managers").loadNext(-1,0);
            } else {
                webix.message({type: 'error', text: result.json().message});
            };});
    };
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
                        click:"webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get('http://localhost:8080/adminExit');"
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
                        id:"form",
                        name:"form",
                        width:300,
                        borderless:true,
                        elements:[
                            { view:"fieldset", label:"Добавить менеджера", body:{
                                    rows:[
                                        { view:"text", label:"Логин",id:"login",name:"login",required:true},
                                        { view:"text", label:"Пароль",type:"password",id:"pas",name:"pas",type:"password",required:true},
                                        { view:"text", label:"Имя",id:"name",name:"name",required:true},
                                        { view:"text", label:"Фамилия",id:"lastName",name:"lastName",required:true},
                                    ]
                                }},
                            { view:"button", label:"Добавить" , type:"form",click:addManager },

                        ]},
                        {width:50},
                        block,
                        {}
                ]},
            {type:"space",rows:[{}]},

        ]

    })
});


