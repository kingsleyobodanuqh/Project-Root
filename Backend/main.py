# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection
import subprocess

app = FastAPI()

# Allow requests from frontend (e.g. localhost:3000 or deployed domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reports can be generated via the /generate-report endpoint
# The global calls were removed to prevent blocking startup

@app.get("/")
def root():
    return {"message": "PRTG Monitoring API is running"}

@app.post("/generate-report")
def generate_report():
    try:
        subprocess.run(["python", "report.py"], check=True)  # Corrected path
        return {"status": "success", "message": "Report generated and stored in Supabase"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": str(e)}

@app.get("/reports/full")
def get_full_report():
    conn = get_db_connection()
    data = conn.execute("SELECT * FROM logs ORDER BY recorded_at DESC").fetchall()
    conn.close()
    return [dict(row) for row in data]

@app.get("/reports/critical")
def get_critical_report():
    conn = get_db_connection()
    all_data = conn.execute("SELECT * FROM logs ORDER BY recorded_at DESC").fetchall()
    conn.close()
    critical = [dict(d) for d in all_data if "d" in dict(d)["downtime"] and int(dict(d)["downtime"].split()[0]) <= 15]
    return critical

@app.get("/reports/stats")
def get_summary_stats():
    conn = get_db_connection()
    all_rows = conn.execute("SELECT * FROM logs ORDER BY recorded_at DESC").fetchall()
    conn.close()
    
    all_data = [dict(row) for row in all_rows]
    total = len(all_data)
    critical = len([d for d in all_data if "d" in d["downtime"] and int(d["downtime"].split()[0]) <= 15])

    if total > 0:
        avg_downtime_days = sum([int(d["downtime"].split()[0]) for d in all_data if "d" in d["downtime"]]) / total
    else:
        avg_downtime_days = 0

    return {
        "total_devices": total,
        "critical_devices": critical,
        "average_downtime_days": round(avg_downtime_days, 2),
        "last_updated": all_data[0]["recorded_at"] if total > 0 else "No data"
    }
