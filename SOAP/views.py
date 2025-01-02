from spyne import ServerBase, rpc, Unicode, Array, Integer
from models import Order, ResponseData
import controllers

class OrderService(ServerBase):
    @rpc(Unicode, Unicode, Unicode, _returns=Integer)
    def add_order(ctx, status, location, departure, collected):
        return controllers.add_order(status, location, departure, collected)
    
    @rpc(Unicode, _returns=ResponseData)
    def delete_order(ctx, orderID):
        rows_affected = controllers.delete_order(orderID)
        message = "Order deleted successfully" if rows_affected!=0 else "Order not found"
        return ResponseData(order=Order(), success='1' if rows_affected!=0 else '0', message=message)
    
    @rpc(Unicode, Integer, _returns=ResponseData)
    def change_location(ctx, orderID, location):
        rows_affected = controllers.change_location(location, orderID)
        message = "Location changed successfully" if rows_affected!=0 else "Order not found"
        return ResponseData(order=Order(), success='1' if rows_affected!=0 else '0', message=message)