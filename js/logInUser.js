webix.ready(function(){
    webix.ui({
        type:"space",
        cols:[{},{
        rows:[
            {
                type:"clean",
                rows:[{height:200},
                    {
                        borderless:true, view:"tabbar", id:'tabbar', value:'logIn', multiview:true, options:[
                            { value:'Войти', id:'logIn'},
                            { value:'Регистрация', id:'reg'}
                        ]
                    },
                    {
                        cells:[

                            {
                                id:"logIn",
                                view:"form",
                                scroll:false,
                                width:500,
                                elements:[
                                    { view:"text",  label:"Логин:"},
                                    { view:"text", type:'password', label:"Пароль:"},
                                    { view:"button", value:"Войти" , type:"form" },
                                            ]
                            },
                            {
                                id:"reg",
                                view:"form",
                                scroll:false,
                                width:500,
                                elements:[
                                    { view:"text",label:"Фамилия"},
                                    { view:"text",label:"Имя"},
                                    { view:"text",label:"Отчество"},
                                    { view:"text",label:"Email"},
                                    { view:"text",label:"Телефон"},
                                    { view:"text",label:"Адрес"},
                                    { view:"text",label:"Логин"},
                                    { view:"text", type:'password', label:"Пароль"},
                                    { view:"button", value:"Зарегистрироваться" , type:"form" },
                                ]


                            }

                        ]
                    },
                ]
            }
        ]},{}]

    });

});