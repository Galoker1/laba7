async function get_data(){
        let res = await fetch("http://127.0.0.1:8000/get_all",({method:'GET'}));
        let content = await res.text();
        let data = JSON.parse(content);
        return data

function get_all(){
        data=get_data()
        document.querySelector('.content').innerHTML= "<button type=\"button\" class=\"btn btn-success\" onclick='create()' style=\"float:left;\">Создать</button> <table class=\"table table-dark table-striped\" id=\"tabl\" style=\"width: 80%;margin-left: 1%;margin-top:80px;float:left;\">\n" +
            "        <tr>\n" +
            "            <td>Имя</td>\n" +
            "            <td>Фамилия</td>\n" +
            "            <td>E-mail</td>\n" +
            "            <td>Телефон</td>\n" +
            "			<td></td>\n" +
            "            <td></td>\n" 
            
            "        </tr>\n" +
            "\n" +
            "    </table>"
        for (let i=0;i < data.length;i++){
				document.querySelector('tbody').innerHTML+="<tr><td> "+ data[i]["Имя"] + " </td> <td>"+  data[i]["Фамилия"] + "</td> <td> " + data[i]["E-mail"] + " </td> <td> " + data[i]["Телефон"]+"</td>"+"<td><button type=\"button\" class=\"btn btn-danger\" style=\"float:left;margin-left:10px;\" onclick=\"del(" + i + ")\">Удалить</button></td>"+"<td><button type=\"button\" class=\"btn btn-warning\" style=\"float:left;margin-left:10px;\" onclick=\"edit(" + i + ")\">Редактировать</button></td></tr>";
			}}
function create(){
	document.querySelector('.content').innerHTML=
            "<button type=\"button\" class=\"btn btn-danger\" onclick='get_all()'>Отмена</button>"+
            "<div class=\"form-floating mb-3\" style='margin-top: 20px;'>\n" +
            "  <input type=\"email\" class=\"form-control\"  id=\"name\"  placeholder=\"name@example.com\">\n" +
            "  <label for=\"name\" class=\'name\'>Имя</label>\n" +
            "</div>"+
            "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\" id=\"surname\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"surname\" >Фамилия</label>\n" +
        "</div>"+
        "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\"  id=\"email\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"email\" id='email'>E-mail</label>\n" +
        "</div>"+
        "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\"  id=\"phone\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"phone\" id='phone'>Телефон</label>\n" +
          "<button type=\"button\" class=\"btn btn-success\" style=\"margin-top:20px;\" onclick='send_new(document.getElementById(\"name\").value,document.getElementById(\"surname\").value,document.getElementById(\"email\").value,document.getElementById(\"phone\").value)'>Создать</button>"+
        "</div>";
}
function send_new(name,surname,email,phone){
		let req = fetch("http://127.0.0.1:8000/create?name="+name+"&surname="+surname+"&email="+email+"&phone="+phone,({method: 'POST'}));
        get_all()
}
function del(i){
	let req = fetch("http://127.0.0.1:8000/delete?id="+i,({method:'POST'}));
	get_all();
}
function edit(i){
		data=get_data()
        document.querySelector('.content').innerHTML=
            "<button type=\"button\" class=\"btn btn-danger\" onclick='get_all()'>Отмена</button>"+
            "<div class=\"form-floating mb-3\" style='margin-top: 20px;'>\n" +
            "  <input type=\"email\" class=\"form-control\"  id=\"name\"  placeholder=\"name@example.com\">\n" +
            "  <label for=\"name\" class=\'name\'>Имя</label>\n" +
            "</div>"+
            "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\" id=\"surname\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"surname\" >Фамилия</label>\n" +
        "</div>"+
        "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\"  id=\"email\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"email\" id='email'>E-mail</label>\n" +
        "</div>"+
        "<div class=\"form-floating mb-3\">\n" +
        "  <input type=\"email\" class=\"form-control\"  id=\"phone\" placeholder=\"name@example.com\">\n" +
        "  <label for=\"phone\" id='phone'>Телефон</label>\n" +
          "<button type=\"button\" class=\"btn btn-warning\" style=\"margin-top:20px;\" onclick='true_edit("+ i +",document.getElementById(\"name\").value,document.getElementById(\"surname\").value,document.getElementById(\"email\").value,document.getElementById(\"phone\").value)'>Изменить</button>"+
        "</div>";
        document.getElementById("name").value=data[i]["Имя"];
        document.getElementById("surname").value=data[i]["Фамилия"];
        document.getElementById("email").value=data[i]["E-mail"];
        document.getElementById("phone").value=data[i]["Телефон"];
}
function true_edit(i,name,surname,email,phone){
        fetch("http://127.0.0.1:8000/update?name="+name+"&surname="+surname+"&email="+email+"&phone="+phone+"&id="+i,({method:"POST"}))
        get_all();

}
get_all();
