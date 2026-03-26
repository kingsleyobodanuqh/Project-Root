import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "prtg_logs.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    
    # Create logs table
    c.execute('''
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name TEXT,
            device TEXT,
            last_up TEXT,
            downtime TEXT,
            status TEXT,
            recorded_at TEXT
        )
    ''')
    
    # Create critical_logs table
    c.execute('''
        CREATE TABLE IF NOT EXISTS critical_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name TEXT,
            device TEXT,
            last_up TEXT,
            downtime TEXT,
            status TEXT,
            recorded_at TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database tables on module import
init_db()
