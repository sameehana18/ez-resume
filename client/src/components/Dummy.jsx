export default {
    title: "John Doe's Resume",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "1234 Elm Street, Springfield, USA",
      jobTitle: "Full Stack Developer",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/johndoe"
        },
        {
          name: "GitHub",
          url: "https://github.com/johndoe"
        }
      ]
    },
    education: [
      {
        institution: "Springfield University",
        location: "Springfield, USA",
        degreeType: "Bachelor's",
        fieldOfStudy: "Computer Science",
        startMonthYear: "August 2018",
        endMonthYear: "May 2022",
        cgpa: 3.8
      },
      {
        institution: "Vellore University",
        location: "Amaravathi, AP",
        degreeType: "Bachelor's",
        fieldOfStudy: "Computer Science",
        startMonthYear: "August 2018",
        endMonthYear: "May 2022",
        cgpa: 3.8
      }
    ],
    experience: [
      {
        employer: "TechCorp",
        jobTitle: "Software Engineer",
        startMonthYear: "June 2022",
        endMonthYear: "Present",
        location: "Remote",
        description: "Developed and maintained web applications using the MERN stack. Collaborated with cross-functional teams to deliver high-quality products."
      },
      {
        employer: "CodeStudio",
        jobTitle: "Intern",
        startMonthYear: "January 2022",
        endMonthYear: "May 2022",
        location: "Springfield, USA",
        description: "Assisted in designing and developing user-friendly interfaces for client projects."
      }
    ],
    projects: [
      {
        projectName: "Expense Tracker",
        techUsed: ["React", "Node.js", "MongoDB"],
        projectLink: "https://github.com/johndoe/expense-tracker",
        description: "A web application for tracking personal expenses with real-time data visualization."
      },
      {
        projectName: "E-commerce Platform",
        techUsed: ["Next.js", "Firebase", "Stripe"],
        projectLink: "https://github.com/johndoe/e-commerce-platform",
        description: "An e-commerce platform with payment integration and product management."
      }
    ],
    skillset: {
      programmingLanguages: ["JavaScript", "Python", "C++"],
      libraries: ["React", "Redux"],
      tools: ["Git", "Docker", "Webpack"],
      databases: ["MongoDB", "MySQL"]
    },
    certifications: [
      {
        certificateName: "Certified JavaScript Developer",
        certificateLink: "https://example.com/certificates/js-cert",
        issuedBy: "Programming Institute"
      },
      {
        certificateName: "AWS Certified Solutions Architect",
        certificateLink: "https://example.com/certificates/aws-cert",
        issuedBy: "Amazon Web Services"
      }
    ]
  };
  