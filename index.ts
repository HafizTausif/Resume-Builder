interface Experience {
    title: string;
    company: string;
    duration: string;
}

interface Education {
    degree: string;
    institution: string;
    year: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    const experienceContainer = document.getElementById('experienceContainer') as HTMLDivElement;
    const educationContainer = document.getElementById('educationContainer') as HTMLDivElement;
    let uploadedImageURL = '';

    // Handle image upload
    document.getElementById('image')?.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImageURL = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    });

    // Add new experience fields
    document.getElementById('addExperience')?.addEventListener('click', () => {
        const experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = `
            <label>Title:</label>
            <input type="text" class="experience-title" placeholder="Job Title" required>
            <label>Company:</label>
            <input type="text" class="experience-company" placeholder="Company Name" required>
            <label>Duration:</label>
            <input type="text" class="experience-duration" placeholder="e.g., Jan 2020 - Dec 2021" required>
            <button type="button" class="remove-experience">Remove</button>
        `;
        experienceContainer.appendChild(experienceDiv);

        experienceDiv.querySelector('.remove-experience')?.addEventListener('click', () => {
            experienceContainer.removeChild(experienceDiv);
        });
    });

    // Add new education fields
    document.getElementById('addEducation')?.addEventListener('click', () => {
        const educationDiv = document.createElement('div');
        educationDiv.innerHTML = `
            <label>Degree:</label>
            <input type="text" class="education-degree" placeholder="Degree" required>
            <label>Institution:</label>
            <input type="text" class="education-institution" placeholder="Institution Name" required>
            <label>Year:</label>
            <input type="text" class="education-year" placeholder="Year of Graduation" required>
            <button type="button" class="remove-education">Remove</button>
        `;
        educationContainer.appendChild(educationDiv);

        educationDiv.querySelector('.remove-education')?.addEventListener('click', () => {
            educationContainer.removeChild(educationDiv);
        });
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;

        const experiences = Array.from(document.querySelectorAll('.experience-title')).map((el, index) => {
            const title = (el as HTMLInputElement).value;
            const company = (document.querySelectorAll('.experience-company')[index] as HTMLInputElement).value;
            const duration = (document.querySelectorAll('.experience-duration')[index] as HTMLInputElement).value;

            return { title, company, duration };
        });

        const educations = Array.from(document.querySelectorAll('.education-degree')).map((el, index) => {
            const degree = (el as HTMLInputElement).value;
            const institution = (document.querySelectorAll('.education-institution')[index] as HTMLInputElement).value;
            const year = (document.querySelectorAll('.education-year')[index] as HTMLInputElement).value;

            return { degree, institution, year };
        });

        // Generate resume content
        resumeContent.innerHTML = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            ${uploadedImageURL ? `<img src="${uploadedImageURL}" alt="Profile Image" style="max-width: 150px;"/>` : ''}
            <h4>Experience</h4>
            ${experiences.map(exp => `
                <div>
                    <h5>${exp.title}</h5>
                    <p>${exp.company} - ${exp.duration}</p>
                </div>
            `).join('')}
            <h4>Education</h4>
            ${educations.map(edu => `
                <div>
                    <h5>${edu.degree}</h5>
                    <p>${edu.institution} - ${edu.year}</p>
                </div>
            `).join('')}
        `;

        // Show the resume preview and download button, hide form
        document.querySelector('.resume-preview')?.classList.remove('hidden');
        document.getElementById('downloadResume')?.classList.remove('hidden');
        document.querySelector('.form-container')?.classList.add('hidden');
    });

    // Download resume as PDF using the browser's print dialog
    document.getElementById('downloadResume')?.addEventListener('click', () => {
        window.print();  // This opens the browser's print dialog, allowing users to save as PDF
    });
});
