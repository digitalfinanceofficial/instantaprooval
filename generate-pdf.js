function downloadPDF() {
  const name = localStorage.getItem("name") || "N/A";
  const mobile = localStorage.getItem("mobile") || "N/A";
  const aadhaar = localStorage.getItem("aadhaar") || "N/A";
  const pan = localStorage.getItem("pan") || "N/A";
  const dob = localStorage.getItem("dob") || "N/A";
  const profession = localStorage.getItem("profession") || "N/A";
  const company = localStorage.getItem("company") || "N/A";
  const salary = localStorage.getItem("salary") || "N/A";
  const experience = localStorage.getItem("experience") || "N/A";
  const loanAmount = localStorage.getItem("loanAmount") || "N/A";
  const months = localStorage.getItem("months") || "N/A";
  const accountNumber = localStorage.getItem("accountNumber") || "N/A";
  const ifsc = localStorage.getItem("ifsc") || "N/A";
  const bank = localStorage.getItem("bank") || "N/A";

  // EMI और Processing Fee कैलकुलेशन
  const interestRate = 12 / 100 / 12; // 12% yearly -> monthly
  const n = parseInt(months);
  const p = parseFloat(loanAmount);
  const emi = p && n ? ((p * interestRate * Math.pow(1 + interestRate, n)) / (Math.pow(1 + interestRate, n) - 1)).toFixed(2) : "N/A";
  const totalPayment = (emi * n).toFixed(2);
  const processingFee = p ? (p * 0.02).toFixed(2) : "N/A";
  const disbursedAmount = p ? (p - processingFee).toFixed(2) : "N/A";

  const content = `
  --- Loan Summary: Digital Finance ---
  
  👤 Personal Details:
  Name: ${name}
  Mobile: ${mobile}
  Aadhaar: ${aadhaar}
  PAN: ${pan}
  DOB: ${dob}
  Profession: ${profession}
  Company: ${company}
  Salary: ₹${salary}
  Experience: ${experience} Years

  💰 Loan Details:
  Approved Amount: ₹${loanAmount}
  Selected Tenure: ${months} months
  EMI (approx.): ₹${emi}
  Total Payable: ₹${totalPayment}
  Processing Fee (2%): ₹${processingFee}
  Disbursed Amount: ₹${disbursedAmount}

  🏦 Bank Details:
  Bank Name: ${bank}
  Account Number: ${accountNumber}
  IFSC Code: ${ifsc}

  ✅ Status: Loan Process Completed
  Note: Amount will be credited in 1 to 3 hours.

  ------------------------------
  Registered under RBI Guidelines.
  Digital Finance © 2025
  `;

  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/\s+/g, "_")}_Loan_Summary.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}