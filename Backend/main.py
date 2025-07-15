# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .supabase_config import supabase
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

@app.get("/")
def root():
    return {"message": "PRTG Monitoring API is running"}

@app.post("/generate-report")
def generate_report():
    try:
        subprocess.run(["python", "backend/report.py"], check=True)
        return {"status": "success", "message": "Report generated and stored in Supabase"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": str(e)}

@app.get("/reports/full")
def get_full_report():
    response = supabase.table("logs").select("*").order("recorded_at", desc=True).execute()
    return response.data

@app.get("/reports/critical")
def get_critical_report():
    response = supabase.table("logs").select("*").gte("downtime", "0 d").lte("downtime", "15 d").order("recorded_at", desc=True).execute()
    return response.data

@app.get("/reports/stats")
def get_summary_stats():
    all_data = supabase.table("logs").select("*").execute().data

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
