import { jsPDF } from 'jspdf';

const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;

resumeForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const school = (document.getElementById("school") as HTMLInputElement).value;
    const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
    const company = (document.getElementById("company") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;

    const resumeHTML = `
        <h1>Generated Resume</h1>
        <hr color="black" height="20px">
        <h2>Personal Information</h2>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br><hr height="20px" color="black"><br>

        <h2>Education</h2>
        <p><strong>Degree:</strong> ${education} at ${school}</p>
        <br><hr height="20px" color="black"><br>

        <h2>Work Experience</h2>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Company:</strong> ${company}</p>
        <br><hr height="20px" color="black"><br>

        <h2>Skills</h2>
        <p>${skills.split(",").map(skill => skill.trim()).join(", ")}</p>
        <br><hr height="20px" color="black"><br>

        <button id="edit" type="button">Edit Resume</button>
        <br><br>
        
        <button id="download-btn" type="button">Download as PDF <i class="fas fa-save fa-beat"></i></button>
        <br><br>
        
        <button id="share-icon">Share Link <i class="fas fa-share-alt"></i></button>
    `;

    resumeContent.innerHTML = resumeHTML;

    const edit = document.getElementById("edit") as HTMLButtonElement;
    const resume = document.getElementById("resume") as HTMLDivElement;

    if (resumeHTML) {
        resumeForm.style.display = "none";
    }
    edit.addEventListener("click", () => {
        resumeForm.style.display = "block";
        if (resume) {
            resume.style.display = "none";
        }
    });
    if (resume) {
        resume.style.display = "block";
    }

    const downloadBtn = document.getElementById("download-btn") as HTMLButtonElement;
    downloadBtn.addEventListener("click", () => {
        const doc = new jsPDF();

        doc.setFillColor('#295F98');
        doc.rect(0, 0, 800, 1100, 'F');

        doc.setFillColor('#CDC2A5');
        doc.rect(3, 3, 150, 250, 'F');

        doc.setTextColor('black');
        doc.setFontSize(18);
        doc.text("Curriculum Vitae", 10, 11);
        doc.setFillColor('#E1D7C6');
        doc.rect(5, 15, 100, 200, 'F');

        doc.setFontSize(14);
        doc.text("Personal Information", 10, 30);
        doc.setFontSize(12);
        doc.text(`Full Name: ${name}`, 10, 40);
        doc.text(`Email: ${email}`, 10, 50);

        doc.setFontSize(14);
        doc.text("Education", 10, 70);
        doc.setFontSize(12);
        doc.text(`Degree: ${education} at ${school}`, 10, 80);

        doc.setFontSize(14);
        doc.text("Work Experience", 10, 100);
        doc.setFontSize(12);
        doc.text(`Job Title: ${jobTitle}`, 10, 110);
        doc.text(`Company: ${company}`, 10, 120);

        doc.setFontSize(14);
        doc.text("Skills", 10, 140);
        doc.setFontSize(12);
        doc.text(`${skills}`, 10, 150);

        doc.save(`${name}_Resume.pdf`);
    });

    const shareIcon = document.getElementById("share-icon") as HTMLButtonElement;

    const url = `https://hassam-shareable-resume.vercel.app/${name}`;

    shareIcon.addEventListener("click", () => {
        navigator.clipboard.writeText(url);
        alert(`${url}\n\nLink Copied to Clipboard ♥`);
    });
});
