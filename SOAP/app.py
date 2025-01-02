from spyne import Application
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from views import OrderService
from wsgiref.simple_server import make_server

application = Application(
    [OrderService],
    tns='api.orders',
    in_protocol=Soap11(),
    out_protocol=Soap11()
)

wsgi_application = WsgiApplication(application)

if __name__ == '__main__':
    server = make_server('127.0.0.1', 8000, wsgi_application)
    print("SOAP server running on http://localhost:8000")
    server.serve_forever()