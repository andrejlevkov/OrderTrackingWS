from spyne import Unicode, Integer
from spyne.model.complex import ComplexModel, Array

class Order(ComplexModel):
    orderID = Integer
    status = Unicode
    location = Unicode
    departure = Unicode
    collected = Unicode

class ResponseData(ComplexModel):
    order = Order
    orders = Array(Order)
    success = Unicode
    message = Unicode