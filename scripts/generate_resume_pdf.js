import fs from 'fs';
import path from 'path';

function createPdf() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Two pages PDF with Madhan S resume
  const p1Content = `
BT
/F2 20 Tf
50 780 Td
(MADHAN S) Tj
/F1 10 Tf
0 -18 Td
(Chennai, India | Tel: +91 8248358213 | madhansridharmd@gmail.com) Tj
0 -14 Td
(GitHub: madhan0223 | LinkedIn: Madhan S) Tj

/F2 12 Tf
0 -26 Td
(CAREER OBJECTIVE) Tj
/F1 9 Tf
0 -14 Td
(Final-year B.Tech Artificial Intelligence and Data Science student with a strong foundation in Python, SQL,) Tj
0 -12 Td
(Data Analytics, and Machine Learning. Experienced in applying data analysis techniques, developing AI-based) Tj
0 -12 Td
(applications, and working with real-world datasets through internships and academic projects. Proficient in) Tj
0 -12 Td
(data manipulation, visualization, and exploratory data analysis using Python libraries.) Tj

/F2 12 Tf
0 -24 Td
(EDUCATION) Tj
/F2 10 Tf
0 -15 Td
(B.Tech - Artificial Intelligence and Data Science | CGPA: 8.0/10) Tj
/F1 9 Tf
0 -12 Td
(Loyola Institute of Technology, Chennai (2023 - 2027)) Tj
/F2 10 Tf
0 -15 Td
(Higher Secondary Certificate (HSC) - Class XII | 472/600 (78.67%)) Tj
/F1 9 Tf
0 -12 Td
(Govt. Boys Higher Secondary School, Sankarapuram (March 2023)) Tj
/F2 10 Tf
0 -15 Td
(Secondary School Leaving Certificate (SSLC) - Class X | Pass) Tj
/F1 9 Tf
0 -12 Td
(St. Joseph Academy Matric Hr. Sec. School, Mailamparai (March 2021)) Tj

/F2 12 Tf
0 -24 Td
(PROJECTS) Tj
/F2 10 Tf
0 -15 Td
(1. Nexa AI - Remote Work Assistant) Tj
/F1 9 Tf
0 -12 Td
(Technologies: Python, Streamlit, Ollama, RAG) Tj
0 -12 Td
(Developed a local-first AI workspace using Python, Streamlit, and Ollama. Implemented RAG for document) Tj
0 -12 Td
(question answering, multi-modal video/image analysis, audio transcription, and AI-generated meeting notes.) Tj

/F2 10 Tf
0 -16 Td
(2. AI Career Toolkit) Tj
/F1 9 Tf
0 -12 Td
(Technologies: Python, Machine Learning, Streamlit) Tj
0 -12 Td
(Interactive AI career guidance app for salary prediction, skill-gap analysis, interview performance prediction,) Tj
0 -12 Td
(and personalized career recommendations with a clean Streamlit interface.) Tj

/F2 10 Tf
0 -16 Td
(3. Smart Intruder Alert System) Tj
/F1 9 Tf
0 -12 Td
(Technologies: Python, OpenCV, LBPH Face Recognition) Tj
0 -12 Td
(Real-time intruder detection system with camera monitoring, face recognition, voice alerts, and automated snapshots.) Tj

/F2 10 Tf
0 -16 Td
(4. Restaurant Data Analysis) Tj
/F1 9 Tf
0 -12 Td
(Technologies: Python, Pandas, NumPy, Matplotlib, Jupyter Notebook) Tj
0 -12 Td
(EDA on restaurant datasets to analyze ratings, cuisines, price points, and delivery trends. GitHub: github.com/madhan0223) Tj

/F2 12 Tf
0 -24 Td
(PROFESSIONAL SKILLS) Tj
/F1 9 Tf
0 -14 Td
(Programming: Python, SQL, C++ (Basic)) Tj
0 -12 Td
(AI & Machine Learning: Machine Learning Fundamentals, OpenCV, LBPH Face Recognition) Tj
0 -12 Td
(Data Science & Analytics: NumPy, Pandas, Matplotlib, Seaborn, Excel, Power BI) Tj
0 -12 Td
(Tools: Jupyter Notebook, Git, GitHub) Tj
ET
`.trim();

  const p2Content = `
BT
/F2 14 Tf
50 780 Td
(MADHAN S - RESUME (PAGE 2)) Tj

/F2 12 Tf
0 -26 Td
(INTERNSHIP EXPERIENCE) Tj
/F2 10 Tf
0 -16 Td
(Data Analysis Intern | Cognifyz IT Solutions Pvt. Ltd.) Tj
/F1 9 Tf
0 -12 Td
(Completed an online internship focused on data analysis using Python. Worked with restaurant datasets) Tj
0 -12 Td
(and performed assigned data analysis tasks to explore data and identify useful insights. Applied data) Tj
0 -12 Td
(visualization techniques to present findings and gained practical experience in EDA.) Tj

/F2 10 Tf
0 -18 Td
(Data Management (MIS Executive) Intern | Shahnaz Bright Steel Industries Pvt. Ltd.) Tj
/F1 9 Tf
0 -12 Td
(Completed an internship focused on data management and MIS activities. Gained practical exposure to) Tj
0 -12 Td
(real-time projects and business data handling. Developed skills in managing assignments and data tasks.) Tj

/F2 10 Tf
0 -18 Td
(Python Programming Intern | YBI Foundation) Tj
/F1 9 Tf
0 -12 Td
(Completed a one-month online internship focused on Python programming. Strengthened programming) Tj
0 -12 Td
(fundamentals through practical coding exercises and hands-on learning activities.) Tj

/F2 12 Tf
0 -28 Td
(CERTIFICATIONS) Tj
/F1 9 Tf
0 -15 Td
(* SQL (Basic, Intermediate & Advanced) - HackerRank) Tj
0 -14 Td
(* Data Analytics and Machine Learning - GUVI) Tj
0 -14 Td
(* Artificial Intelligence Fundamentals - IBM SkillsBuild) Tj
0 -14 Td
(* Customer Engagement: Problem Solving and Process Controls - IBM SkillsBuild) Tj
0 -14 Td
(* Power BI Training) Tj
0 -14 Td
(* DevOps - Core Practices - Tamil Nadu Advanced Technical Training Institute) Tj
0 -14 Td
(* Advanced Drone Technology with IoT Integration, SolidWorks and 3D Printing - Airobo Infinity) Tj

/F2 12 Tf
0 -28 Td
(LANGUAGES) Tj
/F1 9 Tf
0 -14 Td
(* English (Professional)) Tj
0 -14 Td
(* Tamil (Native)) Tj

/F2 12 Tf
0 -28 Td
(CONTACT & CONNECT) Tj
/F1 9 Tf
0 -14 Td
(Email: madhansridharmd@gmail.com | Phone: +91 8248358213) Tj
0 -14 Td
(GitHub: https://github.com/madhan0223 | Location: Chennai, India) Tj
ET
`.trim();

  function buildStream(content) {
    return `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  }

  const objects = [];
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>`;
  objects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 7 0 R >>`;
  objects[4] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 8 0 R >>`;
  objects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
  objects[6] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  objects[7] = buildStream(p1Content);
  objects[8] = buildStream(p2Content);

  let pdf = `%PDF-1.4\n`;
  const offsets = [];

  for (let i = 1; i < objects.length; i++) {
    offsets[i] = Buffer.byteLength(pdf, 'utf8');
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const outputPath = path.join(publicDir, 'Madhan_S_Resume.pdf');
  fs.writeFileSync(outputPath, pdf, 'utf8');
  console.log(`Successfully generated valid PDF resume at: ${outputPath}`);
}

createPdf();
