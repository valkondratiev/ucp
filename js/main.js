var menu_data_multi  = [
    {id: "orders", icon: "wxi-check",value:"Заказы"},
    {id: "way", icon: "fas fa-globe", value:"Маршруты"},
    {id: "new_way", icon: "fas fa-location-arrow",value:"Создать маршрут"},
    {id:"new_point", icon:"fas fa-map-marked-alt", value:"Добавить точку"},
];
webix.protoUI({ name:'activeTable'}, webix.ui.datatable, webix.ActiveContent );
function addToWay() {
    if (true/*$$("form").validate()*/) {
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
        var data = JSON.stringify($$("way_table").serialize(), "", "\t");
        webix.ajax().post("http://localhost:8080/mymarket/manager/addway", data );

    }
    else
        webix.message({type: "error", text: "Заполните маршрут!!!"});
}
var add= {id:"new_way",type: "space", rows:[

    {

        view:"form",
        id:"form",
        name:"form",
        margin:20,

        elements:[
            {
                options: [
                    "Минск",
                    "Москва",
                    "Брест",
                    "Витебск",
                    "Воронеж",
                    "Амстердам",
                    "Прага",
                    "Вашингтон",
                    "Владимир"
                ],
                view: "richselect",
                align:"center",
                label:"Точка А :",
                id:"point1",
                name:"point1",
                width: 500,
                value: "Минск"
            },
            {
                options: [
                    "Минск",
                    "Москва",
                    "Брест",
                    "Витебск",
                    "Воронеж",
                    "Амстердам",
                    "Прага",
                    "Вашингтон",
                    "Владимир"
                ],
                view: "richselect",
                align:"center",
                label:"Точка B :",
                id:"point2",
                name:"point2",
                width: 500,
                value: "Минск"
            },
            {
                view: "text",
                align:"center",
                id:"distance",
                name:"distance",
                label: "Расстояние :",
                labelWidth:95,
                width: 200
            },
            {
                options: [
                    {id:"Авто",value:" <span class='fas fa-truck'></span> Авто",},
                    {id:"Самолет",value:"<span class='fas fa-plane'></span> Самолет",},
                    {id:"ЖД",value: "<span class='fas fa-train'></span> ЖД"},
                    {id:"Судно",value:"<span class='fas fa-ship'></span> Судно"},
                ],
                view: "segmented",
                id:"transport",
                name:"transport",
                align:"center",
                width: 350,
                value: "ЖД"
            },

            {
                label: "Добавить в маршрут",
                align:"center",
                view: "button",
                width: 500,
                click:addToWay,
            },

        ]
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
                { id: "del", header: "&nbsp;", template: "{common.yourButton()}",  width:50, },
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
        margin:30,
        width:600,
        elements:[
        {
            view: "text",
            width: 400,
            align:"center",
            label:"Страна:",
        },
        {
            view: "text",
            width: 400,
            align:"center",
            label:"Область:"
        },
        {
            view: "text",
            width: 400,
            align:"center",
            label:"Город:"
        },
        {
            cols:[{},
                {
                label: "Очистить",
                view: "button",
                type: "iconButton",
                icon:"wxi-trash",
                width:200,
                },
                {width:20},
                {
                    label: "Сохранить",
                    view: "button",
                    type: "iconButton",
                    icon:"far fa-save",
                    width:200,
                },{},
            ]
        },
    ]},
                {},
            ]},
        {},
    ]
};
var ways={
    id: "way",
    type:"space",
    rows:[

        {
            view: "activeTable",
            id:"way_inf",
            scrollX: false,
            select: "row",

            columns:[
                { id:"number",header:"№" ,width:70},
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
                },
            },
            data: [
                { number:1, pointA:"Минск", pointB:"Владивосток", dist:14390,cost:12300,time:"3-5 дней"},
                { number:2, pointA:"Москва", pointB:"Берлин", dist:1800,cost:8300,time:"1 день"},

            ]
        },

        {
            view: "datatable",
            id:"way_info",
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
var orders ={
    id:"orders",
    type:"space",
    rows:[

        {
            view: "activeTable",
            id:"order_inf",
            scrollX: false,
            tooltip:true,
            columns:[
                { id:"number",header:"№" ,width:70,tooltip:false,},
                { id:"date",   header:"Время",width:200,tooltip:false, },
                { id:"way",   header:"ID маршрута",width:120 ,tooltip:false,},
                { id:"cost",   header:"Стоимость",width:155 ,tooltip:false,},
                { id:"customer",   header:"Клиент",width:155 ,tooltip:false,},
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
                },
                del:{
                    view: "button",
                    id:"del_order",
                    width:"30",
                    height:"32",
                    type:'icon',
                    icon:'fas fa-times',

                }
            },
            data: [
                { number:1, date:"25-10-2018 10:42:35 AM", way:10, cost:14600, customer:"ООО Продторг"},
                { number:2, date:"25-10-2018 10:42:35 AM", way:3, cost:200, customer:"ООО Продторг"},
                { number:3, date:"25-10-2018 10:42:35 AM", way:125, cost:300, customer:"ООО Продторг"},
                { number:4, date:"25-10-2018 10:42:35 AM", way:50, cost:7700, customer:"ООО Продторг"},
                { number:5, date:"25-10-2018 10:42:35 AM", way:8, cost:8500, customer:"ООО Продторг"},
                { number:6, date:"25-10-2018 10:42:35 AM", way:2, cost:1200, customer:"ООО Продторг"},
                { number:7, date:"25-10-2018 10:42:35 AM", way:8, cost:700, customer:"ООО Продторг"},
            ]
        },],

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
                        ]
                    },
                ]},
        ]
    });

});