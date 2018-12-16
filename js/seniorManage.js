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
                    id:"active_managers",
                    name:"active_managers",
                    scrollX: false,
                    select:false,
                    url:function(){
                        return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allActiveManagers").then(function(data){
                            return data.json();
                        });
                    },
                    columns:[
                        { id:"login",name:"login", header:"Логин" ,width:100},
                        { id:"fio", name:"fio", header:"ФИО" ,width:300 },
                        { id: "block",name:"block", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
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
                    },
                    data: [
                        { login:"user123", fio:"Иванов Иван Иванович"},
                        { login:"user777", fio:"Петров Петр Петрович"},
                        { login:"vovka", fio:"Сидоров Владимир Сергеевич "},

                    ]
                },

    ]
}
function lockManager() {
    row=this.data.$masterId.row;
    var login=$$("active_managers").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/blockManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_managers").clearAll(true);
            $$("block_manager").clearAll(true);
            $$("active_managers").loadNext(-1,0);
            $$("block_manager").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

}
function unlockManager() {
    row=this.data.$masterId.row;
    var login=$$("block_manager").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/unblockManager/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_managers").clearAll(true);
            $$("block_manager").clearAll(true);
            $$("active_managers").loadNext(-1,0);
            $$("block_manager").loadNext(-1,0);
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
                select:false,
                width:460,
                height:200,
                id:"block_manager",
                name:"block_manager",
                url:function(){
                    return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allBlockManagers").then(function(data){
                        return data.json();
                    });
                },
                scrollX: false,
                columns:[
                    { id:"login",name:"login",    header:"Логин" ,width:100},
                    { id:"fio", name:"fio",   header:"ФИО" ,width:300 },
                    { id: "unblock",name: "unblock", header: "&nbsp;", template: "{common.yourButton()}",  width:40,},
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
                        click:unlockManager,
                    },
                },
                data: [
                    { login:"user3445", fio:"Иванов Иван Иванович"},
                    { login:"valk20", fio:"Петров Петр Петрович"},
                    { login:"qwe123", fio:"Сидоров Владимир Сергеевич "},

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
                      label:"Кабинет старшего менеджера",
                      align:"center",
                      css:'header_font',
                    },
                    {
                      view:"icon",
                      icon:"fas fa-power-off",
                      css:"exit",
                      tooltip:"Выход",
                      click:"webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get('http://localhost:8080/managerExit');"
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
                        id:'form',
                        name:"form",
                     width:300,
                     borderless:true,
                     elements:[
                     { view:"fieldset", label:"Добавить менеджера", body:{
                     rows:[
                            { view:"text", label:"Логин",id:"login",name:"login",required:true},
                            { view:"text", label:"Пароль",id:"pas",name:"pas",type:"password",required:true},
                            { view:"text", label:"Имя",id:"name",name:"name",required:true},
                            { view:"text", label:"Фамилия",id:"lastName",name:"lastName",required:true},
                                    ]
                                }},
                            { view:"button", label:"Добавить" , type:"form",click:addManager },

                        ]},

                    {},
            ]},
            {type:"space",rows:[{}]},

        ]

    })
});