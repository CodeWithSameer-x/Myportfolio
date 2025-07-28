const classSelect = document.getElementById("classSelect");
const subjects = document.getElementById("subjects");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");

classSelect.addEventListener("change", () => {
  subjects.innerHTML = '<option value="">--Select Subject--</option>';
  let options = [];

  if (["11", "12"].includes(classSelect.value)) {
    options = ["Biology", "Chemistry", "NEET Biology", "NEET Chemistry", "Both"];
  } else if (["9", "10"].includes(classSelect.value)) {
    options = ["Science"];
  }

  options.forEach(subject => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    subjects.appendChild(opt);
  });
});

photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = event => {
      photoPreview.style.backgroundImage = `url('${event.target.result}')`;
      photoPreview.textContent = '';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("admissionForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277); // full page border

  doc.setFillColor(0, 255, 255);
  doc.rect(10, 10, 190, 20, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text("VISION INSTITUTE OF SCIENCE", 105, 23, { align: "center" });

  const photoSrc = photoPreview.style.backgroundImage;
  if (photoSrc && photoSrc.includes("data:image")) {
    const base64 = photoSrc.slice(5, -2); // remove url(' and ')
    doc.addImage(base64, "JPEG", 155, 35, 40, 50);
  } else {
    doc.rect(155, 35, 40, 50);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Paste Photo Here", 175, 60, { align: "center" });
  }

  doc.setFontSize(12);
  doc.setTextColor(0);
  let y = 45;
  const fields = [
    ["Full Name", "name"],
    ["Surname", "surname"],
    ["Father's Name", "fathername"],
    ["Father's Occupation", "fatherOccupation"],
    ["Father Mobile No", "fatherMobile"],
    ["Student Mobile No", "mobile"],
    ["Email", "email"],
    ["Student ID", "studentId"],
    ["Class", "classSelect"],
    ["Subjects Interested", "subjects"],
    ["Home Address", "address"]
  ];

  fields.forEach(([label, id]) => {
    const value = document.getElementsByName(id)[0]?.value || '';
    doc.text(`${label}: ${value}`, 15, y);
    y += 10;
  });

  doc.setFontSize(12);
  doc.text("Parent's Signature", 15, 260);
  doc.text("Student's Signature", 140, 260);
  doc.setFontSize(10);
  doc.text("Mr. Mohammad S.R (Founder / Director)", 105, 272, { align: "center" });

  doc.setFillColor(0, 0, 0);
  doc.rect(10, 280, 190, 7, "F");

  doc.save("Vision_Admission_Form.pdf");

  // Send to Formspree
  const form = e.target;
  const formData = new FormData(form);
  const res = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  });

  if (res.ok) {
    alert("Form submitted successfully!");
    form.reset();
    photoPreview.style.backgroundImage = "";
    photoPreview.textContent = "Photo";
  } else {
    alert("Submission failed.");
  }
});
