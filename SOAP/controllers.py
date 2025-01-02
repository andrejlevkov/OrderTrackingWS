import sqlite3

conn = sqlite3.connect('../data.db')
cursor = conn.cursor()

def add_order(status, location, departure=None, collected=None):
    cursor.execute("INSERT INTO orders VALUES(%s, %s, %s, %s)", (status, location, departure, collected))
    conn.commit()
    return cursor.lastrowid

def delete_order(id):
    cursor.execute("DELETE FROM orders WHERE orderID = %d", (id,))
    conn.commit()
    return cursor.rowcount

def change_location(location, id):
    cursor.execute("UPDATE orders SET location = %s WHERE orderID = %d", (location, id))
    conn.commit()
    return cursor.rowcount

# def leave_review():
#     return

conn.close()