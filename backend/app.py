from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import List, Dict, Any
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="YVOO Credit Intelligence API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== INCOME VERIFICATION API ====================


@app.post("/api/income/analyze")
async def analyze_income(income_data: dict):

    try:
        # Convert string inputs to numbers
        annual_income = float(income_data.get("annualIncome", 0))
        energy_consumption = float(income_data.get("energyConsumption", 0))
        total_loan_amount = float(income_data.get("totalLoanAmount", 0))
        loan_tenure = float(income_data.get("loanTenure", 1))
        annual_water_bill = float(income_data.get("annualWaterBill", 0))
        household_members = max(
            float(income_data.get("householdMembers", 1)), 1)
        monthly_expenses = float(income_data.get("monthlyExpenses", 0))

        # Your analysis logic (ported from frontend)
        disposable_income = annual_income - monthly_expenses * 12 - annual_water_bill
        per_capita_income = annual_income / household_members
        debt_burden = total_loan_amount / annual_income if annual_income > 0 else 1

        # Calculate score (simplified version of your frontend logic)
        score = 0
        score += 40 if per_capita_income >= 380000 else 28 if per_capita_income >= 210000 else 16
        score += 26 if debt_burden <= 0.28 else 18 if debt_burden <= 0.55 else 10
        score += 18 if disposable_income >= 180000 else 12 if disposable_income >= 90000 else 8

        energy_intensity = energy_consumption / household_members
        score += 6 if energy_intensity <= 1200 else 4 if energy_intensity <= 2200 else 2

        tenure_factor = total_loan_amount / \
            loan_tenure if loan_tenure > 0 else total_loan_amount
        score += 10 if tenure_factor <= 90000 else 8 if tenure_factor <= 150000 else 6

        category = "High" if score >= 90 else "Medium" if score >= 65 else "Low"

        summary_map = {
            "High": "Household income and affordability indicators align with concessional lending criteria. Recommend fast-track appraisal and AI score sync.",
            "Medium": "Mixed affordability signals detected. Recommend deeper review of expenditure trails, support interventions, and blended finance options.",
            "Low": "Several risk factors identified across affordability and debt burden. Encourage financial counselling and inclusion readiness programmes."
        }

        insights = [
            f"Disposable income: ₹{max(disposable_income, 0):,.0f}",
            f"Debt burden: {debt_burden * 100:.1f}% of annual income",
            f"Per-capita income: ₹{per_capita_income:,.0f}",
            f"Energy usage per member: {energy_intensity:.0f} kWh"
        ]

        return {
            "category": category,
            "score": min(score, 100),
            "summary": summary_map[category],
            "insights": insights
        }

    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error analyzing income: {str(e)}")


@app.post("/api/income/upload-documents")
async def upload_documents(files: List[UploadFile] = File(...)):
    """Handle document uploads for income verification"""
    try:
        file_names = []
        for file in files:
            file_names.append(file.filename)
            # In production, you'd save the files: await file.read()

        return {
            "success": True,
            "uploaded_files": file_names,
            "message": f"Successfully uploaded {len(file_names)} documents"
        }
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error uploading documents: {str(e)}")

# ==================== CREDIT SCORE API ====================


@app.post("/api/credit/calculate")
async def calculate_credit_score(credit_data: dict):
    try:
        # Parse inputs
        timely_repayment = min(
            max(float(credit_data.get("timelyRepayment", 0)), 0), 100)
        total_loan_taken = max(float(credit_data.get("totalLoanTaken", 0)), 0)
        total_loan_repaid = max(
            float(credit_data.get("totalLoanRepaid", 0)), 0)
        annual_income = max(float(credit_data.get("annualIncome", 0)), 0)
        total_bank_accounts = min(
            max(float(credit_data.get("totalBankAccounts", 0)), 0), 20)
        total_balance = max(float(credit_data.get("totalBalance", 0)), 0)
        credit_utilization = min(
            max(float(credit_data.get("creditUtilization", 0)), 0), 100)
        age = min(max(float(credit_data.get("age", 0)), 18), 80)
        average_monthly_emi = max(
            float(credit_data.get("averageMonthlyEMI", 0)), 0)

        # Credit calculation logic
        repayment_ratio = total_loan_repaid / \
            total_loan_taken if total_loan_taken > 0 else 1
        debt_to_income = (average_monthly_emi * 12) / \
            annual_income if annual_income > 0 else 0
        liquidity_months = total_balance / \
            average_monthly_emi if average_monthly_emi > 0 else 0

        # Calculate score
        score = 300
        score += timely_repayment * 1.5
        score += min(repayment_ratio, 1.1) / 1.1 * 110
        score += (100 - credit_utilization) / 100 * 80
        score += min(total_balance / 1500000, 1) * 70
        score += min(annual_income / 1200000, 1) * 60
        score += max(0, 1 - debt_to_income) * 70
        score += min(total_bank_accounts, 8) / 8 * 30

        age_comfort = 1 - min(abs(age - 40) / 40, 1)
        score += age_comfort * 30

        score = min(max(score, 300), 900)

        # Determine category
        if score >= 800:
            category = "Excellent"
        elif score >= 730:
            category = "Good"
        elif score >= 670:
            category = "Average"
        else:
            category = "Needs Attention"

        recommendation_map = {
            "Excellent": "Prime-lender ready. Maintain diversified repayments and disciplined utilisation.",
            "Good": "Close to prime tier. Tighten utilisation and keep boosting repayment consistency.",
            "Average": "Strengthen repayment timelines and liquidity to unlock better underwriting tiers.",
            "Needs Attention": "Stabilise cash flows, reduce outstanding debt, and rebuild repayment regularity."
        }

        # Generate focus recommendation
        focus = "Continue compounding savings and diversify banking relationships."
        if timely_repayment < 85:
            focus = "Adopt automated reminders to lift on-time repayments above 90%."
        elif credit_utilization > 45:
            focus = "Reduce revolving balances to bring credit utilisation closer to 30%."
        elif debt_to_income > 0.45:
            focus = "Lower EMI load or boost documented income to keep debt-to-income below 40%."
        elif liquidity_months < 4:
            focus = "Build a higher liquid buffer to cover at least six months of EMIs."

        confidence = min(max(
            (timely_repayment / 100) * 30 +
            min(repayment_ratio, 1) * 30 +
            max(0, 1 - debt_to_income) * 20 +
            min(total_balance / 1500000, 1) * 20,
            0, 100
        ), 100)

        insights = [
            {
                "title": "Repayment discipline",
                "metric": f"{timely_repayment:.0f}% on-time",
                "description": "Your punctual repayments build strong trust with lenders." if timely_repayment >= 90 else "Lift on-time payments above 90% to signal consistent repayment behaviour."
            },
            {
                "title": "Debt coverage",
                "metric": f"{min(repayment_ratio, 1.1):.2f}x repaid",
                "description": "Healthy EMI-to-income ratio leaves room for new concessional credit." if debt_to_income <= 0.4 else "Optimise your EMI load to keep debt-to-income below 40%."
            },
            {
                "title": "Liquidity runway",
                "metric": f"{liquidity_months >= 12 and '12+' or f'{liquidity_months:.1f}'} months buffer",
                "description": "Adequate savings coverage supports resilience during income fluctuations." if liquidity_months >= 6 else "Grow liquid reserves to cover at least six months of EMIs for better resilience."
            },
            {
                "title": "Credit utilisation",
                "metric": f"{credit_utilization:.0f}% utilised",
                "description": "Balanced utilisation keeps your risk profile attractive to impact lenders." if credit_utilization <= 35 else "Pay down revolving balances to bring utilisation closer to 30%."
            }
        ]

        return {
            "score": score,
            "category": category,
            "confidence": confidence,
            "recommendation": recommendation_map[category],
            "focus": focus,
            "insights": insights,
            "metrics": {
                "repaymentRatio": repayment_ratio,
                "timelyRepayment": timely_repayment,
                "debtToIncome": debt_to_income,
                "liquidityMonths": liquidity_months,
                "utilization": credit_utilization
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error calculating credit score: {str(e)}")

# ==================== DASHBOARD API ====================


@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Get homepage statistics"""
    return {
        "households_analysed": "1.2M+",
        "loan_visibility": "₹4,800 Cr",
        "inclusion_uplift": "63%"
    }

# ==================== CONTACT FORM API ====================


@app.post("/api/contact/submit")
async def submit_contact_form(contact_data: dict):
    """Handle contact form submissions"""
    try:
        # In production, you'd save to database or send email
        print("Contact form received:", contact_data)

        return {
            "success": True,
            "message": "Contact form submitted successfully",
            "data": contact_data
        }
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error submitting contact form: {str(e)}")

# ==================== SCORE EXPLANATION API ====================


@app.get("/api/score/explanation")
async def get_score_explanation():
    """Get score explanation data (optional)"""
    return {
        "snapshot_data": [
            {"month": "Jan", "repayment": 82,
                "incomeIndex": 68, "consumptionIndex": 48},
            {"month": "Feb", "repayment": 88,
                "incomeIndex": 72, "consumptionIndex": 56},
            {"month": "Mar", "repayment": 90,
                "incomeIndex": 74, "consumptionIndex": 61},
            {"month": "Apr", "repayment": 93,
                "incomeIndex": 76, "consumptionIndex": 65},
            {"month": "May", "repayment": 95,
                "incomeIndex": 79, "consumptionIndex": 68},
            {"month": "Jun", "repayment": 97,
                "incomeIndex": 82, "consumptionIndex": 71}
        ],
        "metric_cards": [
            {
                "label": "Repayment consistency",
                "value": "97% on-time",
                "change": "+3.2% uplift"
            },
            {
                "label": "Income verification",
                "value": "Trusted tier",
                "change": "Composite coverage"
            },
            {
                "label": "Utility signals",
                "value": "Resilient",
                "change": "Electricity + telecom"
            }
        ]
    }

# ==================== HEALTH CHECK ====================


@app.get("/health")
async def health_check():
    return {
        "status": "OK",
        "message": os.getenv("PING_MESSAGE", "FastAPI Backend Running"),
        "service": "YVOO Credit Intelligence API"
    }

# ==================== STATIC FILE SERVING ====================

# Serve static files (your built React frontend)
frontend_dist = "../dist/spa"
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="static")

# SPA fallback - serve index.html for all non-API routes


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    if not full_path.startswith("api/") and os.path.exists(f"{frontend_dist}/index.html"):
        return FileResponse(f"{frontend_dist}/index.html")
    return {"error": "Route not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
