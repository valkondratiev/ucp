function log(){
    if( $$("logIn").validate()){
        var formData=$$("logIn").getValues();
        console.log(formData);
        var log = JSON.stringify(formData, "", "\t");
        console.log(log);
        webix.storage.session.put('login', $$('login').getValue());
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/userAuth", log).then(function (result) {
            if (result.json().success == true) {
                webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            } else {
                webix.message({type: 'error', text: result.json().message});
            };});
    };
}
function reg(){
    if( $$("reg").validate()){
        var formData=$$("reg").getValues();
        console.log(formData);
        var reg = JSON.stringify(formData, "", "\t");
        console.log(reg);
        webix.storage.session.put('login', $$('log').getValue());
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/userReg", reg).then(function (result) {
            if (result.json().success == true) {
                webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            } else {
                webix.message({type: 'error', text: result.json().message});
            };});
    };

}

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
                                name:"logIn",
                                view:"form",
                                scroll:false,
                                width:500,
                                elements:[
                                    { view:"text",  label:"Логин:",id:"login",name:"login", required:true},
                                    { view:"text", type:'password', label:"Пароль:", required:true,id:"pas",name:"pas"},
                                    { view:"button", value:"Войти" , type:"form" ,click:log},
                                            ]
                            },
                            {
                                id:"reg",
                                name:"reg",
                                view:"form",
                                scroll:false,
                                width:500,
                                elements:[
                                    { view:"text",label:"Фамилия",id:"secondName",name:"secondName", required:true},
                                    { view:"text",label:"Имя",id:"firstName",name:"firstName", required:true},
                                    { view:"text",label:"Отчество",id:"lastName",name:"lastName", required:true},
                                    { view:"text",label:"Email",id:'email',name:'email', required:true},
                                    { view:"text",label:"Телефон",id:"phone",name:"phone", required:true},
                                    { view:"text",label:"Адрес",id:"address",name:"address", required:true},
                                    { view:"text",label:"Логин",id:"log",name:"log", required:true},
                                    { view:"text", type:'password', label:"Пароль",id:"pasword",name:"pasword", required:true},
                                    { view:"button", value:"Зарегистрироваться" , type:"form",click:"reg" },
                                ]


                            }

                        ]
                    },
                ]
            }
        ]},{}]

    });

});