webix.ready(function() {
    webix.ui({
        type:"space",
        cols:[
            {},
            {
        rows:[{height:200},{
        id: "logIn",
        view: "form",
        scroll: false,
        width: 500,
        elements: [
            {cols:[{view: "text", label: "Логин:"},{view: "checkbox",width:20}]},
            {view: "text", type: 'password', label: "Пароль:"},
            {view: "button", value: "Войти", type: "form"},
        ]}]},{}
        ]

    })
})