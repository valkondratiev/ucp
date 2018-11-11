webix.protoUI({ name:'activeTable'}, webix.ui.datatable, webix.ActiveContent );
var search={
    id:"search", rows:[{
        cols:[
                    {
                        view:"form",
                        id:"form",
                        margin:40,
                        width:600,
                        height:390,

                        elements:[
                        {
                            options: [
                                "One",
                                "Two"
                            ],
                            view: "select",
                            value: "One",
                            align:"center",
                            label: "Пункт отправления:",
                            width:500,
                            labelWidth:150,
                        },
                        {
                            options: [
                                "One",
                                "Two"
                            ],
                            view: "select",
                            align:"center",
                            value: "One",
                            label: "Пункт назначения:",
                            width:500,
                            labelWidth:150,
                        },
                        {
                            view: "text",
                            align:"center",
                            label: "Объем груза(м^3):",
                            width:300,
                            labelWidth:150,
                        },
                        {
                            view:"button",
                            align:"center",
                            label:"Найти",
                            type: "iconButton",
                            icon:"fas fa-search",
                            width:"200",
                        }

                    ]
            },

            {
                view: "activeTable",
                id:"way_inf",
                scrollX: false,
                select: "row",

                columns:[
                    { id:"number",header:"№" ,width:70},
                    { id:"cost",   header:"Стоимость",width:155 },
                    { id:"time",   header:"Время",width:155 },
                    { id: "ord", header: "&nbsp;", template: "{common.yourButton()}",  width:50,},
                ],
                activeContent: {
                    yourButton: {
                        view: "button",
                        id:"order_way",
                        width:"40",
                        height:"32",
                        type:'icon',
                        icon:'fas fa-shopping-cart',
                    },
                },
                data: [
                    { number:1, pointA:"Минск", pointB:"Владивосток", dist:14390,cost:12300,time:"3-5 дней"},
                    { number:2, pointA:"Москва", pointB:"Берлин", dist:1800,cost:8300,time:"1 день"},

                ]
            },

]
}]};

var orderHistory={
    id:"orderHistory",
    rows:[
        {
            view: "datatable",
            id:"order_inf",
            scrollX: false,
            select: "row",
            height:390,

            columns:[
                { id:"number",header:"№" ,width:30},
                { id:"pointA",   header:"Начальная точка" ,width:200 },
                { id:"pointB",    header:"Конечная точка" ,width:200  } ,
                { id:"dist",   header:"Длина",width:100 },
                { id:"cost",   header:"Стоимость",width:100 },
                { id:"weight",   header:"Масса груза",width:155 },
                { id:"date",   header:"Дата заказа",width:200 },
                { id:"date_1",   header:"Дата исполнения",width:200 },
                { id:"manager",   header:"Менеджер",width:155 },
                { id:"status",   header:"Статус",width:155 },
            ],

            data: [
                { number:1, pointA:"Минск", pointB:"Владивосток", dist:14390,cost:12300,time:"3-5 дней",weight:200,date:"20-07-2018 12:45",date_1:"20-07-2018 12:45", manager:"Иванов А.А.",status:"В работе"},
                { number:2, pointA:"Москва", pointB:"Берлин", dist:1800,cost:8300,time:"1 день",weight:200,date:"20-07-2018 12:45",date_1:"20-07-2018 12:45", manager:"Иванов А.А.",status:"В работе"},

            ]
        },
    ]

};
var userInfo={
    id:"userInfo",
    height: 390,

    rows:[{
        height: 390,
        cols: [{width: 200,},
            {
                view:"form", scroll:false,
                width:500,
                borderless:true,
                elements:[

                    { view:"fieldset", label:"Личные данные",

                        body:{
                            rows:[

                                { view:"text", label:"Фамилия"},
                                { view:"text", label:"Имя"},
                                { view:"text", label:"Отчество"},
                                { view:"text", label:"Адрес"},
                                { view:"text", label:"Телефон"},
                                { view:"text", label:"Email"},
                            ]
                        }},

                             { view:"button", label:"Изменить" }


                ]
            },
            {width:100},
            {
                view:"form", scroll:false,
                width:400,
                borderless:true,
                elements:[

                    { view:"fieldset", label:"Изменения пароля",
                        body:{
                            rows:[

                                { view:"text", label:"Старый пароль", labelWidth:150},
                                { view:"text", label:"Новый пароль", labelWidth:150},
                                { view:"text", label:"Новый пароль", labelWidth:150},

                            ]
                        }},
                     { view:"button", label:"Изменить пароль" }

                ]
            }
        ]
    },]
};

var cells = [
    { header:"О нас", body:{
            template:"<p>DPD в Беларуси - это один из крупнейших провайдеров по экспресс-доставке грузов не только по территории Беларуси, но и в Россию, Казахстан, а также на территорию Кыргызстана и Армении.\n" +
                "\n" +
                "DPD в Беларуси – это ответственный, надежный и своевременный партнер в области грузоперевозок по территории Беларуси и международных перевозок, который создаёт клиенту благоприятные условия для ведения успешного бизнеса.</p>" +
                "<p>Успешный опыт работы с 2000 года;</p>" +
                "<p>Международные перевозки любыми видами транспорта: автомобильным, железнодорожным, авиа, морским;</p>" +
                "<p>Перевозка различных типов груза: комплектных, сборных, опасных, негабаритных, наливных;</p>" +
                "<p>Широкая география, охватывающая 5 континентов: Северную Америку (США, Канада, Мексика); Южную Америку (Бразилия, Аргентина, Чили); Европу (Австрия, Бельгия, Болгария, Беларусь, Венгрия, Великобритания, Греция, Германия, Дания, Италия, Испания, Португалия, Кипр, Лихтенштейн, Люксембург, Литва, Латвия, Молдавия, Нидерланды, Норвегия, ОАЭ, Польша, Румыния, Россия, Словакия, Словения, Сербия, Украина, Турция, Франция, Финляндия, Хорватия, Черногория, Чехия, Швеция, Швейцария, Эстония), Азию (Сингапур, Китай, Гонконг, Япония, Индия, Корея, Индонезия, Малайзия, Пакистан, Таиланд, Тайвань); Африку (Египет, ЮАР); Австралию;</p>" +
                "<p>Наши сотрудники – команда профессионалов с большим опытом работы в сфере международной логистики.</p>" +
                "<p>Оказание дополнительных услуг по грузоперевозкам: оформление товарно-сопроводительной документации, консолидация и хранение грузов на транзитных терминалах, страхование грузов от всевозможных рисков в надежной страховой компании.</p>"

        }},
    { header:"Наши партнеры", body:{
            template:" <img class='img' src=\"/img/partners.jpg\">"
        }},
    { header:"Контакты", body:{
            template:"<table  style=\"width: 100%;\" class=\"table-responsive\">\n" +
                "<tbody>\n" +
                "<tr style=\"height: 100%;\">\n" +
                "<td style=\"width: 25%; text-align: center;\">\n" +
                "<h3 class=\"contact-branch-name\">Минск</h3>\n" +
                "<p class=\"contact-branch-info\" style=\"text-align: center;\">Бизнес-центр \"Порт\" <br />пр-т. Независимости, 177<br />Тел.:&nbsp;<a href=\"tel: +375 (17) 215-51-00\" class=\"target_phone\">+375 (17) 215-51-00</a><br />Факс:<a href=\"tel: +375 (17) 215-51-29\" class=\"target_phone\">+375 (17) 215-51-29&nbsp;</a><br />E-mail:<a href=\"mailto:%20office@asstra.by\" class=\"target_email\">office@asstra.by</a></p>\n" +
                "</td>\n" +
                "<td style=\"width: 25%; text-align: center;\">\n" +
                "<h3>Таможенное агентство</h3>\n" +
                "<p class=\"contact-branch-info\" style=\"text-align: center;\">ПТО \"Минск-СЭЗ\" <br />ул.Промышленная 6б, к.12<br /><span>Тел.:&nbsp;</span><a href=\"tel: +375 17 385 94 19\" class=\"target_phone\">+375 17 385 94 19</a><br />Факс:<a href=\"tel: +375 17 345 58 02\" class=\"target_phone\">+375 17 345 58 02</a><br />E-mail:<a href=\"mailto:%20office@asstra.by\" class=\"target_email\">office@asstra.by</a></p>\n" +
                "</td>\n" +
                "<td style=\"width: 25%; text-align: center;\">\n" +
                "<h3 class=\"contact-branch-name\">Брест</h3>\n" +
                "<p class=\"contact-branch-info\" style=\"text-align: center;\">Бизнес-центр \"Диагональ\" <br />ул. Московская, 275 А, оф. 520<br />Тел.:&nbsp;<a href=\"tel: +375 162 53 11 35\" class=\"target_phone\">+375 162 53 11 35</a><br />Факс:<a href=\"tel: +375 162 53 34 70\" class=\"target_phone\">+375 162 53 34 70</a><br />E-mail:<a href=\"mailto:%20office@asstra.by\" class=\"target_email\">office@asstra.by</a></p>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n"
        }}
];



webix.ready(function(){
    webix.ui({
        view:"scrollview", scroll:"xy", body:{
        rows: [
            { view: "toolbar", height:200,css:"header", elements: [

                    {},
                    {
                        paddingY:7,
                        rows:[
                            {
                                cols:[

                                    {
                                        css:"hi",
                                        view:"label",
                                        label:"Приветствуем Вас, user!",
                                        inputWidth:300,
                                        align:"right"
                                    },
                                    {width:20},
                                    {
                                        view:"icon", icon:"fas fa-power-off",
                                        css:"exit",
                                        tooltip:"Выход",
                                    }
                                ]
                            },
                        ]
                    },
                    { width:6 }

                ]},
            {
                view:"segmented",
                options:[{id:"search",value:" <span class='fas fa-truck'></span> Перевозки",},
                         {id:"orderHistory",value:"<span class='fas fa-file-contract'></span> Мои заказы",},
                          {id:"userInfo",value: "<span class='fas fa-user-edit'></span> Персональные данные"},],
                on: {
                    onAfterTabClick: function (id) {
                        $$("user_func").setValue(id)

                    }
                }
            },
            {height:5},
            {
                view:"multiview",
                height:400,
                id:"user_func",
                cells:[
                    search,
                    orderHistory,
                    userInfo,
                ]
            },{height:5},

            {
                view:"tabview",
                cells:cells,
                height:800,
            }


        ]}
    });

});