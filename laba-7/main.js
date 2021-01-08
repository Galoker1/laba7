const http = require('http');
const url = require('url');
const fs = require('fs')
let data = JSON.parse( fs.readFileSync('data.json','utf-8'));

let server = http.createServer((req,res) => {
    if (req.method == 'GET') {
        if (req.url == '/') {
            html_page = fs.readFileSync('index.html','utf-8');
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html_page);
        }
        else if (req.url == '/get_all') {
            res.end(JSON.stringify(data))
        } 
        else if (req.url.slice(0, 4) == "/get") {
            let id = url.parse(req.url, true).query.id;
            if (id < data.length) {
                res.end(data[id]);
            } else {
                res.end('Недопустимый индекс')
            }
        }
    } else if (req.method == 'POST') {
        if (req.url.slice(0, 7) == '/create') {
            let name = url.parse(req.url, true).query.name;
            let surname = url.parse(req.url, true).query.surname;
            let email = url.parse(req.url, true).query.email;
            let phone = url.parse(req.url, true).query.phone;
            let new_user = {
                "Имя": name,
                "Фамилия": surname,
                "Телефон": phone,
                "E-mail": email
            }
            data.push(new_user);
            fs.writeFileSync('data.json', JSON.stringify(data))
            res.end();
        }
        else if (req.url.slice(0, 7) == "/delete") {
            let id = url.parse(req.url, true).query.id;
            if (id < data.length) {
                data.splice(parseInt(id), 1);
                fs.writeFileSync('data.json', JSON.stringify(data))
                res.end();
            } else {
                res.end("Недопустимый индекс");
            }
        }
        else if (req.url.slice(0, 7) == '/update') {
            let id = url.parse(req.url, true).query.id;
            if (id < data.length) {
                let name = url.parse(req.url, true).query.name;
                let surname = url.parse(req.url, true).query.surname;
                let email = url.parse(req.url, true).query.email;
                let phone = url.parse(req.url, true).query.phone;

                data[id]["Имя"] = name;
                data[id]["Фамилия"] = surname;
                data[id]["E-mail"] = email;
                data[id]["Телефон"] = phone;


                fs.writeFileSync('data.json', JSON.stringify(data))
                res.end();
            } else {
                res.end("Недопустимый индекс");
            }
        }
    }
})
server.listen(8000,()=>{console.log('starting')})

