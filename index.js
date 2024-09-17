document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    var form = document.getElementById('resumeForm');
    var resumeContent = document.getElementById('resumeContent');
    var experienceContainer = document.getElementById('experienceContainer');
    var educationContainer = document.getElementById('educationContainer');
    var uploadedImageURL = '';
    // Handle image upload
    (_a = document.getElementById('image')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                uploadedImageURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Add new experience fields
    (_b = document.getElementById('addExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var _a;
        var experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = "\n            <label>Title:</label>\n            <input type=\"text\" class=\"experience-title\" placeholder=\"Job Title\" required>\n            <label>Company:</label>\n            <input type=\"text\" class=\"experience-company\" placeholder=\"Company Name\" required>\n            <label>Duration:</label>\n            <input type=\"text\" class=\"experience-duration\" placeholder=\"e.g., Jan 2020 - Dec 2021\" required>\n            <button type=\"button\" class=\"remove-experience\">Remove</button>\n        ";
        experienceContainer.appendChild(experienceDiv);
        (_a = experienceDiv.querySelector('.remove-experience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            experienceContainer.removeChild(experienceDiv);
        });
    });
    // Add new education fields
    (_c = document.getElementById('addEducation')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        var _a;
        var educationDiv = document.createElement('div');
        educationDiv.innerHTML = "\n            <label>Degree:</label>\n            <input type=\"text\" class=\"education-degree\" placeholder=\"Degree\" required>\n            <label>Institution:</label>\n            <input type=\"text\" class=\"education-institution\" placeholder=\"Institution Name\" required>\n            <label>Year:</label>\n            <input type=\"text\" class=\"education-year\" placeholder=\"Year of Graduation\" required>\n            <button type=\"button\" class=\"remove-education\">Remove</button>\n        ";
        educationContainer.appendChild(educationDiv);
        (_a = educationDiv.querySelector('.remove-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            educationContainer.removeChild(educationDiv);
        });
    });
    // Handle form submission
    form.addEventListener('submit', function (event) {
        var _a, _b, _c;
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var experiences = Array.from(document.querySelectorAll('.experience-title')).map(function (el, index) {
            var title = el.value;
            var company = document.querySelectorAll('.experience-company')[index].value;
            var duration = document.querySelectorAll('.experience-duration')[index].value;
            return { title: title, company: company, duration: duration };
        });
        var educations = Array.from(document.querySelectorAll('.education-degree')).map(function (el, index) {
            var degree = el.value;
            var institution = document.querySelectorAll('.education-institution')[index].value;
            var year = document.querySelectorAll('.education-year')[index].value;
            return { degree: degree, institution: institution, year: year };
        });
        // Generate resume content
        resumeContent.innerHTML = "\n            <h3>".concat(name, "</h3>\n            <p>Email: ").concat(email, "</p>\n            <p>Phone: ").concat(phone, "</p>\n            ").concat(uploadedImageURL ? "<img src=\"".concat(uploadedImageURL, "\" alt=\"Profile Image\" style=\"max-width: 150px;\"/>") : '', "\n            <h4>Experience</h4>\n            ").concat(experiences.map(function (exp) { return "\n                <div>\n                    <h5>".concat(exp.title, "</h5>\n                    <p>").concat(exp.company, " - ").concat(exp.duration, "</p>\n                </div>\n            "); }).join(''), "\n            <h4>Education</h4>\n            ").concat(educations.map(function (edu) { return "\n                <div>\n                    <h5>".concat(edu.degree, "</h5>\n                    <p>").concat(edu.institution, " - ").concat(edu.year, "</p>\n                </div>\n            "); }).join(''), "\n        ");
        // Show the resume preview and download button, hide form
        (_a = document.querySelector('.resume-preview')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        (_b = document.getElementById('downloadResume')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        (_c = document.querySelector('.form-container')) === null || _c === void 0 ? void 0 : _c.classList.add('hidden');
    });
    // Download resume as PDF using the browser's print dialog
    (_d = document.getElementById('downloadResume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        window.print(); // This opens the browser's print dialog, allowing users to save as PDF
    });
});
