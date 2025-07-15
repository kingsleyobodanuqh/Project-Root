// frontend/src/api/api.js
const BASE_URL = "http://localhost:8000";

export async function fetchFullReport() {
  const response = await fetch(`${BASE_URL}/reports/full`);
  return response.json();
}

export async function fetchCriticalReport() {
  const response = await fetch(`${BASE_URL}/reports/critical`);
  return response.json();
}

export async function fetchSummaryStats() {
  const response = await fetch(`${BASE_URL}/reports/stats`);
  return response.json();
}

export async function triggerReportGeneration() {
  const response = await fetch(`${BASE_URL}/generate-report`, {
    method: "POST"
  });
  return response.json();
}
