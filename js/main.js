var list=["Минск"];
var menu_data_multi  = [
    {id: "orders", icon: "wxi-check",value:"Заказы"},
    {id: "way", icon: "fas fa-globe", value:"Маршруты"},
    {id: "new_way", icon: "fas fa-location-arrow",value:"Создать маршрут"},
    {id:"new_point", icon:"fas fa-map-marked-alt", value:"Добавить точку"},
    {id:"user_manage", icon:"fas fa-users", value:"Управление пользователями"},
];
webix.protoUI({ name:'activeTable'}, webix.ui.datatable, webix.ActiveContent );
function addToWay() {
    $$("form").markInvalid("point2", "");
    $$("form").markInvalid("distance", "");
    if ($$("form").validate()) {
        var idItem=$$("way_table").add($$('form').getValues());
        var position=$$("way_table").getIndexById(idItem)+1;
        $$("way_table").updateItem(idItem,{pos:position});
        $$('point1').setValue($$('form').getValues().point2);
        $$("point1").define("readonly", true);
        $$('point2').setValue("");
        $$('distance').setValue("");
    }
};

function delLine(){
    var row=(this.data.$masterId.row);
    var curId="";
    if(row==$$("way_table").getLastId())
        $$("way_table").remove(row);
    else {
        while (row!=curId) {
            $$("way_table").remove($$("way_table").getLastId());
            curId=$$("way_table").getLastId();
        }
        $$("way_table").remove(row);
    }
    if($$("way_table").getLastId()==undefined){
        $$("point1").define("readonly", false);
        $$('point2').setValue("");
        $$('point1').setValue("");
    }
    else {
        $$('point1').setValue($$("way_table").getItem($$("way_table").getLastId()).point2);
    }
}

function saveWay() {
    if($$("way_table").getLastId()!=undefined){
        //var data = JSON.stringify($$("way_table").serialize(), "", "\t");
        var data = JSON.stringify($$("way_table").serialize(), "", "\t");
        var sendData='{"data":'+data+'}';
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/addway", sendData );
    }
    else
        webix.message({type: "error", text: "Заполните маршрут!!!"});
}
var add= {id:"new_way",type: "space", rows:[

        {

            view: "form",
            id: "form",
            name: "form",
            margin: 20,

            elements: [
                {
                    view: "combo",
                    required:true,
                    align: "center",
                    label: "Точка А :",
                    id: "point1",
                    name: "point1",
                    width: 500,
                    value: "Минск",
                    options: list,
                    on:{
                        'onItemClick':function () {
                            webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allPoints", function(text,data){
                                var options = data.json().data;
                                var list = $$("point1").getPopup().getList();
                                list.clearAll();
                                list.parse(options);
                            });

                        }
                    }

                },
                {
                    view: "combo",
                    align: "center",
                    label: "Точка B :",
                    required:true,
                    id: "point2",
                    name: "point2",
                    bottomPadding: 18,
                    width: 500,
                    value: "Минск",
                    options: list,
                    on:{
                        'onItemClick':function () {
                            webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allPoints", function(text,data){
                                var options = data.json().data;
                                var list = $$("point2").getPopup().getList();
                                list.clearAll();
                                list.parse(options);
                            });

                        }
                    }
                },
                {
                    view: "text",
                    align: "center",
                    id: "distance",
                    attributes: {maxlength: 5},
                    name: "distance",
                    label: "Расстояние :",
                    validate: webix.rules.isNumber,
                    invalidMessage: "Введите чило",
                    labelWidth: 95,
                    width: 200,
                    bottomPadding: 18,
                },
                {
                    options: [
                        {id: "Авто", value: " <span class='fas fa-truck'></span> Авто",},
                        {id: "Самолет", value: "<span class='fas fa-plane'></span> Самолет",},
                        {id: "ЖД", value: "<span class='fas fa-train'></span> ЖД"},
                        {id: "Судно", value: "<span class='fas fa-ship'></span> Судно"},
                    ],
                    view: "segmented",
                    id: "transport",
                    name: "transport",
                    align: "center",
                    width: 350,
                    value: "ЖД"
                },

                {
                    label: "Добавить в маршрут",
                    align: "center",
                    view: "button",
                    width: 500,
                    click: addToWay,
                },

            ],
            rules: {

                point2: function (value) {
                    if (value == $$('point1').getValue() && value!="" && ($$('point1').getValue())!="" ) {
                        $$("form").markInvalid("point2", "Точки должны быть разные");
                        return false;
                    }
                    return true;

                },
                distance: function (value) {
                    if (value > 20000) {
                        $$("form").markInvalid("distance", "< 20000км");
                        return false;
                    }
                    return true;

                },

            }
        },
        {
            view: "activeTable",
            id:"way_table",
            scrollX: false,
            columns:[
                { id:"pos",    header:"Позиция" ,width:100},
                { id:"point1",   header:"Точка А" ,width:300 },
                { id:"point2",    header:"Точка B" ,width:300  } ,
                { id:"distance",   header:"Расстояние",width:155 },
                { id:"transport",   header:"Транспорт" ,width:100},
                { id: "del", header: "&nbsp;", template: "{common.yourButton()}",  width:50,},
            ],
            activeContent: {
                yourButton: {
                    view: "button",
                    id:"delite1",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'wxi-trash',
                    click:delLine,
                },
            },
            data: [
                // { pos:1, pointA:"Минск", pointB:"Москва", dist:600, transport:"Авто"},
                // { pos:2, pointA:"Москва", pointB:"Новосибирск", dist:5000, transport:"Самолет"},
                // { pos:3, pointA:"Новосибирск", pointB:"Владивосток", dist:8790, transport:"Самолет"},
            ]
        },
        {
            view: "button",
            label: "Сохранить маршрут",
            click:saveWay,

        },
    ],};


function addPoint() {
    if( $$("point_form").validate()){
        var formData=$$("point_form").getValues();
        var pointdata = JSON.stringify(formData, "", "\t");
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/addpoin", pointdata).then(function (result) {
            if (result.json().success == true) {
                webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            } else {
                webix.message({type: 'error', text: result.json().message});
            };});
    };
}
function trash() {
    if( $$("point_form").clear());
}
var point= {
    id:"new_point",
    rows:[
        {   view: "button",
            type: "image",
            image: "img/logistic.png",
            width:600,
            height:350,
            align:"center",
            css: "logo",
        },
        {
            cols:[
                {},
                {
                    view:"form",
                    css:"border_form",
                    id:"point_form",
                    margin:20,
                    width:600,
                    elements:[
                        {
                            view: "text",
                            width: 400,
                            id:"country",
                            name:"country",
                            align:"center",
                            attributes: {maxlength: 50},
                            required:true,
                            label:"Страна:",
                            bottomPadding: 18,
                        },
                        {
                            view: "text",
                            width: 400,
                            id:"region",
                            name:"region",
                            attributes: {maxlength: 50},
                            align:"center",
                            label:"Область:",
                            bottomPadding: 18,
                        },
                        {
                            view: "text",
                            width: 400,
                            id:"city",
                            name:"city",
                            align:"center",
                            attributes: {maxlength: 50},
                            required:true,
                            label:"Город:",
                            bottomPadding: 18,
                        },

                        {
                            cols:[{},
                                {
                                    label: "Очистить",
                                    view: "button",
                                    type: "iconButton",
                                    icon:"wxi-trash",
                                    width:200,
                                    click:trash,
                                },
                                {width:20},
                                {
                                    label: "Сохранить",
                                    view: "button",
                                    type: "iconButton",
                                    icon:"far fa-save",
                                    width:200,
                                    click:addPoint,
                                },{},
                            ]
                        },
                    ],

                    rules: {

                        country: function (value) {
                            if (!(/^[.а-яА-ЯёЁ\s]{0,}$/i.test(value))) {
                                $$("point_form").markInvalid("country", "Только буквы русского алфавита");
                                return false;
                            }
                            $$("point_form").markInvalid("country", "");
                            return true;
                        },
                        city: function (value) {
                            if (!(/^[.а-яА-ЯёЁ\s]{0,}$/i.test(value))) {
                                $$("point_form").markInvalid("city", "Только буквы русского алфавита");
                                return false;
                            }
                            $$("point_form").markInvalid("city", "");
                            return true;
                        },
                        region: function (value) {
                            if (!(/^[.а-яА-ЯёЁ\s]{0,}$/i.test(value))) {
                                $$("point_form").markInvalid("region", "Только буквы русского алфавита");
                                return false;
                            }
                            $$("point_form").markInvalid("region", "");
                            return true;
                        }
                    }

                },
                {},
            ]},
        {},
    ]
};
function deleteWay() {
    row=this.data.$masterId.row;
    var idWay=$$("way_inf").getItem(row).id;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).delete("http://localhost:8080/way/"+idWay).then(function (result) {
        if (result.json().success == true) {
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            $$("way_inf").remove($$("way_inf").getSelectedId());
            //если нужно очистить нижнюю таблицу
        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

}
var ways={
    id: "way",
    type:"space",
    rows:[

        {
            view: "activeTable",
            id:"way_inf",
            scrollX: false,
            select: "row",
            url:function(){
                return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/allways").then(function(data){
                    return data.json();
                });
            },
            columns:[
                { id:"id",header:"№" ,width:70},
                { id:"pointA",   header:"Начальная точка" ,width:300 },
                { id:"pointB",    header:"Конечная точка" ,width:300  } ,
                { id:"dist",   header:"Длина",width:155 },
                { id:"cost",   header:"Стоимость",width:155 },
                { id:"time",   header:"Время",width:155 },
                { id: "del", header: "&nbsp;", template: "{common.yourButton()}",  width:50,},
            ],
            activeContent: {
                yourButton: {
                    view: "button",
                    id:"delite1",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'wxi-trash',
                    click:deleteWay,
                },
            },
            on: {
                onItemClick: function () {
                    var me = this,
                        obj = me.getSelectedItem(),
                        id = obj.id;
                    webix.ajax().headers({"Accept": "application/json"}).get("http://localhost:8080/way/"+id).then(function (result) {
                        if (result.json().success == true) {
                            $$("way_info").clearAll();
                            const lines = result.json().data;
                            $$("way_info").parse({
                                pos: $$("way_info").count(),
                                data: lines,
                            });
                            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
                        } else {
                            webix.message({type: 'error', text: result.json().message});
                        }
                        ;
                    }).fail(function (xhr) {
                        var response = JSON.parse(xhr.response);
                        webix.message({type: 'error', text: response.message});
                        $$("main").hideProgress();
                    });

                }
            },
            data: [
                { id:1, pointA:"Минск", pointB:"Владивосток", dist:14390,cost:12300,time:"3-5 дней"},
                { id:2, pointA:"Москва", pointB:"Берлин", dist:1800,cost:8300,time:"1 день"},

            ]
        },

        {
            view: "datatable",
            id:"way_info",
            name:"way_info",
            scrollX: false,
            columns:[
                { id:"pos",    header:"Позиция" ,width:100},
                { id:"pointA",   header:"Точка А" ,width:300 },
                { id:"pointB",    header:"Точка B" ,width:300  } ,
                { id:"dist",   header:"Расстояние",width:155 },
                { id:"transport",   header:"Транспорт" ,width:100},
            ],
            data: [
                { pos:1, pointA:"Минск", pointB:"Москва", dist:600, transport:"Авто"},
                { pos:2, pointA:"Москва", pointB:"Новосибирск", dist:5000, transport:"Самолет"},
                { pos:3, pointA:"Новосибирск", pointB:"Владивосток", dist:8790, transport:"Самолет"},
            ]
        },
    ]

};
function confirmOrder() {
    row=this.data.$masterId.row;
    var idOrder=$$("order_inf").getItem(row).Id;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/order/"+idOrder+"/confirm").then(function (result) {
        if (result.json().success == true) {
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            $$("order_inf").remove(row);
        } else {
            webix.message({type: 'error', text: result.json().message});
        };

    })
}
function failOrder() {
    row=this.data.$masterId.row;
    var idOrder=$$("order_inf").getItem(row).Id;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/order/"+idOrder+"/fail").then(function (result) {
        if (result.json().success == true) {
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            $$("order_inf").remove(row);
        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

}
function blolckUser() {
    row=this.data.$masterId.row;
    var login=$$("active_user").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/blockUser/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_user").clearAll(true);
            $$("block_user").clearAll(true);
            $$("active_user").loadNext(-1,0);
            $$("block_user").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})

}
function unblockUser() {
    row=this.data.$masterId.row;
    var login=$$("block_user").getItem(row).login;
    webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/unblockUser/"+login).then(function (result) {
        if (result.json().success == true) {
            $$("active_user").clearAll(true);
            $$("block_user").clearAll(true);
            $$("active_user").loadNext(-1,0);
            $$("block_user").loadNext(-1,0);
            webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});

        } else {
            webix.message({type: 'error', text: result.json().message});
        };})
}
var orders ={
    id:"orders",
    type:"space",
    rows:[

        {
            view: "activeTable",
            id:"order_inf",
            scrollX: false,
            tooltip:true,
            url:function(){
                return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/orders").then(function(data){
                    return data.json();
                });
            },
            columns:[
                { id:"Id",header:"№" ,width:70,tooltip:false,},
                { id:"Time",   header:"Время",width:200,tooltip:false, },
                { id:"idWay",   header:"ID маршрута",width:120 ,tooltip:false,},
                { id:"Price",   header:"Стоимость",width:155 ,tooltip:false,},
                { id:"Client",   header:"Клиент",width:155 ,tooltip:false,},
                { id: "ok", header: "&nbsp;", template: "{common.yourButton()}",  width:50,tooltip: "Подтвердить"},
                { id: "del", header: "&nbsp;", template: "{common.del()}",  width:50,tooltip: "Отказ"},

            ],
            activeContent: {
                yourButton: {
                    view: "button",
                    id:"ok_order",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-check-double',
                    click:confirmOrder,
                },
                del:{
                    view: "button",
                    id:"del_order",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-times',
                    click:failOrder,

                }
            },
            data: [
                { Id:1, Time:"25-10-2018 10:42:35 AM", idWay:10, Price:14600, Client:"ООО Продторг"},
                { Id:2, Time:"25-10-2018 10:42:35 AM", idWay:10, Price:14600, Client:"ООО Продторг"},
                { Id:3, Time:"25-10-2018 10:42:35 AM", idWay:10, Price:14600, Client:"ООО Продторг"},

            ]
        },],

}
var us={
    id:"user_manage",
    type:'space',
    cols:[{},{
    rows:[
        {
            view: "toolbar",
            css:"header_user",
            height:30,
            cols: [
                {view: "label", label: "Пользователи", align: "left", css: "header_font"},
                {},

            ]
        },
        {
            view: "activeTable",
            width:460,
            height:400,
            id:"active_user",
            scrollX: false,
            url:function(){
                return webix.ajax().headers({'Accept':'application/json;charset=utf-8'}).get("http://localhost:8080/activeUsers").then(function(data){
                    return data.json();
                });
            },
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
                    tooltip:"Заблокировать",
                    click:blolckUser,
                },
            },
            data: [
                 { login:"user123", fio:"Иванов Иван Иванович"},
                 { login:"user777", fio:"Петров Петр Петрович"},
                 { login:"vovka", fio:"Сидоров Владимир Сергеевич "},

            ]
        },
        {height:20},
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
            width:460,
            height:200,
            id:"block_user",
            scrollX: false,
            url:function() {
                return webix.ajax().headers({'Accept': 'application/json;charset=utf-8'}).get("http://localhost:8080/blockUsers").then(function (data) {
                    return data.json();
                });
            },
            dataFeed:function() {
                return webix.ajax().headers({'Accept': 'application/json;charset=utf-8'}).get("http://localhost:8080/blockUsers").then(function (data) {
                    return data.json();
                });
            },
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
                    tooltip:"Разблокировать",
                    click:unblockUser,
                },
            },
            data: [
                { login:"user3445", fio:"Иванов Иван Иванович"},
                { login:"valk20", fio:"Петров Петр Петрович"},
                { login:"qwe123", fio:"Сидоров Владимир Сергеевич "},

            ]
        },
    ]},{}]
}
webix.ready(function(){
    webix.ui({
        rows: [
            { view: "toolbar", padding:3, elements: [
                    {view: "button", type: "icon", icon: "fas fa-bars", width: 40, align: "left", css: "app_button",
                        click: function(){
                            $$("$sidebar1").toggle();
                        }
                    },
                    { view: "label", label: "Меню"},

                ]},
            {

                cols:[
                    { view: "sidebar", width:300,  data: menu_data_multi, on:{
                            onAfterSelect: function(id){
                                webix.message("Selected: "+this.getItem(id).value)
                                $$("mview").setValue(id)
                            }
                        }},


                    {
                        view:"multiview",
                        fitBiggest:true,
                        id:"mview",
                        cells:[
                            add,
                            point,
                            ways,
                            orders,
                            us,
                        ]
                    },
                ]},
        ]
    });


});