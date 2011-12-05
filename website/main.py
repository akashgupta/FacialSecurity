import tornado.httpserver
import tornado.ioloop
import tornado.web
import os
import sqlite3

connection = sqlite3.connect(os.getcwd() + "/accesses.db")
cursor = connection.cursor()
try:
    cursor.execute("CREATE TABLE access (time text, photo text)")
except sqlite3.OperationalError:
    pass

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        cursor.execute("SELECT time, photo FROM access")
        self.render("index.html", cursor=cursor.fetchall())

class AddHandler(tornado.web.RequestHandler):
    def post(self):
        time = self.get_argument("time")
        photo = self.get_argument("photo")
        cursor.execute("INSERT INTO access (time, photo) VALUES (?,?)",
                       [time, photo])
        connection.commit()

class LoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("login.html")

class RejectedHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("rejected.html")

settings = {
    "static_path": "static",
    "template_path": "templates"
}

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/add", AddHandler),
    (r"/login", LoginHandler),
    (r"/rejected", RejectedHandler)
], **settings)

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
