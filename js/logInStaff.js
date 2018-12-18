webix.ready(function() {
    webix.ui({
        type:"space",
        cols:[
            {},
            {
        rows:[{height:200},{
        id: "logIn",
        name: "logIn",
        view: "form",
        scroll: false,
        width: 500,
        elements: [
            {cols:[{view: "text", label: "Логин:",id:"log",name:"log", required:true},{view: "checkbox",width:20,id:"flag",name:"flag",}]},
            {view: "text", type: 'password', label: "Пароль:",id:"pas",name:"pas", required:true},
            {view: "button", value: "Войти", type: "form",click:auth},
        ]}]},{}
        ]

    })
})
function auth() {
    if( $$("logIn").validate()){
        var formData=$$("logIn").getValues();
        var log = JSON.stringify(formData, "", "\t");
        console.log(log);
        webix.ajax().headers({'Content-Type':'application/json;charset=utf-8','Accept':'application/json;charset=utf-8'}).post("http://localhost:8080/staffAuth", log).then(function (result) {
            if (result.json().success == true) {
                webix.message({type: 'debug', text: "Зaпрос успешно добавлен"});
            } else {
                webix.message({type: 'error', text: result.json().message});
            };});
    };

}