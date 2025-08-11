document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
    });

    // --- Particle Animation for Hero Section ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 200, 83, 0.5)';
                ctx.strokeStyle = 'rgba(0, 200, 83, 0.8)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < 50; i++) {
                const size = Math.random() * 5 + 1;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const speedX = Math.random() * 3 - 1.5;
                const speedY = Math.random() * 3 - 1.5;
                particles.push(new Particle(x, y, size, speedX, speedY));
            }
        }
        createParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.3) {
                    particles.splice(i, 1);
                    i--;
                    const size = Math.random() * 5 + 1;
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const speedX = Math.random() * 3 - 1.5;
                    const speedY = Math.random() * 3 - 1.5;
                    particles.push(new Particle(x, y, size, speedX, speedY));
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


    // --- Typing Effect ---
    const typingEffectElement = document.getElementById('typing-effect');
    if (typingEffectElement) {
        const wordsToType = ["Creative Developer", "UI/UX Designer", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = wordsToType[wordIndex];
            let displayText = currentWord.substring(0, charIndex);
            typingEffectElement.textContent = displayText;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 150);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 100);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % wordsToType.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // --- Smooth Scroll Navigation ---
    const navLinks = document.querySelectorAll('.nav-link, .hero-btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Skills Data ---
    const skillsData = [
        { icon: '💻', title: 'Frontend Mastery', description: 'Crafting pixel-perfect UIs with React, Next.js, and Vue.js.' },
        { icon: '⚙️', title: 'Backend Engineering', description: 'Building robust APIs and services with Node.js, Express, and Python.' },
        { icon: '🗃️', title: 'Data Solutions', description: 'Designing efficient database architectures with SQL and MongoDB.' },
        { icon: '🎨', title: 'UI/UX Design', description: 'Creating intuitive user experiences with Figma and Adobe XD.' }
    ];

    // --- Resume Data ---
    const resumeData = {
      experience: [
        {
          date: "2023 - Present",
          company: "Tech Innovations Inc.",
          position: "Frontend Developer",
          description: "Developed responsive web applications using React and Next.js. Improved page load performance by 40% through code optimization."
        },
        {
          date: "2021 - 2023",
          company: "Digital Solutions LLC",
          position: "UI Developer Intern",
          description: "Collaborated with designers to implement pixel-perfect interfaces. Built reusable component library."
        }
      ],
      education: [
        {
          date: "2020 - 2024",
          company: "University of Computer Science",
          position: "B.S. in Computer Science",
          description: "Specialized in Web Technologies. GPA: 3.8/4.0"
        },
        {
          date: "2018 - 2020",
          company: "Tech High School",
          position: "Advanced Diploma",
          description: "Focus on Mathematics and Programming"
        }
      ],
      skills: [
        {
          category: "Frontend",
          skills: [
            { name: "React", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "HTML/CSS", level: 95 }
          ]
        },
        {
          category: "Backend",
          skills: [
            { name: "Node.js", level: 80 },
            { name: "Python", level: 75 }
          ]
        }
      ]
    };

    // --- Projects Data ---
    const projectsData = [
        { image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop', title: 'Project Alpha', description: 'A web application for project management and team collaboration.', tech: ['React', 'Node.js', 'MongoDB'], liveLink: '#', sourceLink: '#' },
        { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', title: 'Project Beta', description: 'A data visualization dashboard for analyzing market trends.', tech: ['Python', 'Plotly', 'Pandas'], liveLink: '#', sourceLink: '#' },
        { image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop', title: 'Project Gamma', description: 'A mobile app for tracking fitness goals and daily activity.', tech: ['React Native', 'Firebase'], liveLink: '#', sourceLink: '#' }
    ];

    const skillsGrid = document.querySelector('#skills .grid');
    const projectsGrid = document.getElementById('projects-grid');

    function renderSkills() {
        if (!skillsGrid) return;
        skillsGrid.innerHTML = '';
        skillsData.forEach((skill, index) => {
            skillsGrid.innerHTML += `
                <div class="skill-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="skill-icon">${skill.icon}</div>
                    <h3 class="text-xl font-bold text-black mb-2 heading-font">${skill.title}</h3>
                    <p class="text-gray-600">${skill.description}</p>
                </div>`;
        });
    }

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        projectsData.forEach((project, index) => {
            const techBadges = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
            projectsGrid.innerHTML += `
                <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-52 object-cover">
                    <div class="p-6">
                        <h3 class="project-title text-xl font-bold text-black mb-2 heading-font">${project.title}</h3>
                        <p class="project-description text-gray-600 mb-4">${project.description}</p>
                        <div class="project-tech mb-4 flex flex-wrap gap-2">${techBadges}</div>
                        <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div class="flex space-x-4">
                                <a href="${project.liveLink}" class="font-bold hover:underline text-green-600">Live Demo</a>
                                <a href="${project.sourceLink}" class="font-bold hover:underline text-green-600">Source Code</a>
                            </div>
                            <button class="generate-desc-btn text-xs font-semibold text-green-700 hover:text-green-900">✨ AI Description</button>
                        </div>
                    </div>
                </div>`;
        });
    }

    // --- Resume Tab Functionality (Wrapped in a check to prevent errors) ---
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
        document.getElementById('resume-experience-btn').addEventListener('click', () => loadResumeContent('experience'));
        document.getElementById('resume-education-btn').addEventListener('click', () => loadResumeContent('education'));
        document.getElementById('resume-skills-btn').addEventListener('click', () => loadResumeContent('skills'));

        function loadResumeContent(type) {
          const contentContainer = document.getElementById('resume-content');
          let html = '';
          
          document.querySelectorAll('.resume-tab-btn').forEach(btn => btn.classList.remove('resume-tab-active'));
          document.getElementById(`resume-${type}-btn`).classList.add('resume-tab-active');
          
          if (type === 'experience' || type === 'education') {
            resumeData[type].forEach(item => {
              html += `
                <div class="resume-item">
                  <div class="resume-date">${item.date}</div>
                  <div class="resume-company">${item.company}</div>
                  <div class="resume-position">${item.position}</div>
                  <p class="resume-description">${item.description}</p>
                </div>
              `;
            });
          } 
          else if (type === 'skills') {
            resumeData.skills.forEach(category => {
              html += `<h3 class="resume-skill-category">${category.category}</h3>`;
              category.skills.forEach(skill => {
                html += `
                  <div class="resume-skill-item">
                    <div class="resume-skill-name">${skill.name}</div>
                    <div class="resume-skill-bar">
                      <div class="resume-skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                  </div>
                `;
              });
            });
          }
          
          contentContainer.innerHTML = html;
        }

        loadResumeContent('experience');

        document.getElementById('download-resume-btn').addEventListener('click', (e) => {
          e.preventDefault();
          window.open('your-resume.pdf', '_blank');
        });
    }


    async function callGemini(prompt) {
        const apiKey = ""; // Leave empty
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Gemini API call error:", error);
            return "An error occurred while contacting the AI assistant.";
        }
    }

    const modal = document.getElementById('ai-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalBtnBottom = document.getElementById('close-modal-btn-bottom');
    const loadingIndicator = document.getElementById('loading-indicator');
    const generatedContent = document.getElementById('generated-content');
    const copyBtn = document.getElementById('copy-btn');

    function openModal() {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('.modal-content').classList.remove('scale-95');
    }

    function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('.modal-content').classList.add('scale-95');
    }

    function showLoading(state) {
        loadingIndicator.style.display = state ? 'flex' : 'none';
        generatedContent.style.display = state ? 'none' : 'block';
    }

    closeModalBtn.addEventListener('click', closeModal);
    closeModalBtnBottom.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedContent.innerText).then(() => {
            copyBtn.innerText = 'Copied!';
            setTimeout(() => { copyBtn.innerText = 'Copy Text'; }, 2000);
        });
    });

    projectsGrid.addEventListener('click', async function(e) {
        if (e.target && e.target.classList.contains('generate-desc-btn')) {
            const card = e.target.closest('.project-card');
            const title = card.querySelector('.project-title').innerText;
            const techSpans = card.querySelectorAll('.tech-badge');
            const technologies = Array.from(techSpans).map(span => span.innerText).join(', ');
            
            modalTitle.innerText = '✨ AI Project Description';
            openModal();
            showLoading(true);

            const prompt = `Write a professional and concise project description (around 30-40 words) for a portfolio. The project is called "${title}" and it was built using these technologies: ${technologies}. Focus on the project's purpose and key features.`;
            
            const description = await callGemini(prompt);
            generatedContent.innerText = description;
            showLoading(false);
        }
    });

    const coverLetterBtn = document.getElementById('cover-letter-btn');
    coverLetterBtn.addEventListener('click', async () => {
        modalTitle.innerText = '✨ AI Cover Letter Assistant';
        openModal();
        showLoading(true);

        const skills = skillsData.map(s => s.description).join(', ');
        const projectTitles = projectsData.map(p => p.title).join(', ');

        const prompt = `My name is Sridhar Raju. I am a student developer with skills in ${skills}. I have worked on several projects, including ${projectTitles}. Please write a professional, enthusiastic, and concise cover letter (around 150-200 words) for a generic software developer or web developer role. Highlight my passion for technology, my key skills, and my project experience. The tone should be confident but humble.`;

        const coverLetter = await callGemini(prompt);
        generatedContent.innerText = coverLetter;
        showLoading(false);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Initial renders
    renderSkills();
    renderProjects();
});
