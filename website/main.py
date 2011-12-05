import tornado.httpserver
import tornado.ioloop
import tornado.web
import os
import sqlite3

connection = sqlite3.connect(os.getcwd() + "/contacts.db")
cursor = connection.cursor()
try:
    cursor.execute("""create table contact
                    (lastname text, firstname text, phone text, email text)""")
except sqlite3.OperationalError:
    pass

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("home.html")

class RegisterHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            lastname = self.get_argument("lastname")
            firstname = self.get_argument("firstname")
            phone = self.get_argument("phone")
            email = self.get_argument("email")
            cursor.execute("""insert into contact values(?,?,?,?)""",
                            [lastname, firstname, phone, email])
            connection.commit()
            self.render("register.html", message="The contact has been registered successfully.", text="")
        except:
            self.render("message.html", title="Register contact", message="Uno o mas campos son necesarios para el registro.", text="")

class SearchHandler(tornado.web.RequestHandler):
    def get(self):
        try:
            text = self.get_argument("text")
        except:
            text = ""
        cursor.execute("""select rowid, lastname, firstname, phone, email from contact
                        where lastname like '%{0}%' or firstname like '%{0}%' or
                        phone like '%{0}%' or email like '%{0}%'
                        order by 2, 3 ,4, 5""".format(text))
        self.render("search.html", cursor = cursor.fetchall(), text = text)

class DeleteHandler(tornado.web.RequestHandler):
    def get(self, idcontact):
        cursor.execute("select count(rowid) from contact where rowid = {0}".format(idcontact))
        if cursor.fetchone()[0] == 1:
            cursor.execute("delete from contact where rowid = {0}".format(idcontact))
            connection.commit()
            self.render("message.html", title="Delete contact", message="The contact has been deleted succesfully", text="")
        else:
            self.render("message.html", title="Delete contact", message="The contact don't exists.", text="")

class UpdateHandler(tornado.web.RequestHandler):
    def get(self, idcontact):
        cursor.execute("select count(rowid) from contact where rowid = {0}".format(idcontact))
        if cursor.fetchone()[0] == 1:
            cursor.execute("""select rowid, lastname, firstname, phone, email from contact
                            where rowid = {0}""".format(idcontact))
            contact = cursor.fetchone()
            self.render("update.html", idcontact=contact[0], lastname=contact[1], firstname=contact[2], phone=contact[3], email=contact[4], text="")
        else:
            self.render("message.html", title="Update contact", message="The contact don't exists.", text="")

class UpdateDataHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            lastname = self.get_argument("lastname")
            firstname = self.get_argument("firstname")
            phone = self.get_argument("phone")
            email = self.get_argument("email")
            idcontact = self.get_argument("idcontact")
            cursor.execute("select count(rowid) from contact where rowid = {0}".format(idcontact))
            if cursor.fetchone()[0] == 1:
                cursor.execute("""update contact set lastname='{1}', firstname='{2}',
                                phone='{3}', email='{4}'
                                where rowid = {0}""".format(idcontact, lastname, firstname, phone, email))
                connection.commit()
                self.render("message.html", title="Update contact", message="The contact has been updated succesfully", text="")
            else:
                self.render("message.html", title="Update contact", message="The contact don't exists.", text="")
        except:
            self.render("message.html", title="Update contact", message="Uno o mas campos son necesarios para el registro.")

settings = {
    "static_path": "static",
    "template_path": "templates"
}

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/register", RegisterHandler),
    (r"/search", SearchHandler),
    (r"/delete/([1-9][0-9]*)", DeleteHandler),
    (r"/update/([1-9][0-9]*)", UpdateHandler),
    (r"/update", UpdateDataHandler),
], **settings)

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
