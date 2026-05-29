export type ProjectCategory = "3d-art" | "graphic-design" | "vector-illustration" | "multimedia-apps" | "web-development" | "UI Design" | "programming";

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    thumbnail: string;
    abstract: string;
    description: string;
    details: string;
    tools: string[];
    year: number;
    objectives?: string[];
    limitations?: string[];
    swfUrl?: string;
    websiteUrl?: string;
    documentationPdf?: string;
    gallery?: {
        images?: string[];
        videos?: string[];
        sketchfabUrl?: string;
    };
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Brochure Design",
        category: "graphic-design",
        thumbnail: "projects/Ps/Mock Up.png",
        abstract: "Brochure design for Samsung Fold Phone showcasing its features and design.",
        description: "A creative graphic design project focused on designing a brochure for the Samsung Fold Phone.",
        details: "Designed a visually appealing brochure that highlights the unique features of the Samsung Fold Phone. The design main idea was to enable the customer to experience the foldable design through the brochure layout and visuals.",
        tools: ["Adobe Photoshop"],
        year: 2024,
        documentationPdf: "projects/pdfs/Brochure Doc.pdf",
        gallery: {
            images: [
                "projects/Ps/brochure copy.jpg",
                "projects/Ps/brochure pg2 copy.jpg",
            ],
        },
    },
    {
        id: "2",
        title: "3D stylized Street Food Stall Scene",
        category: "3d-art",
        thumbnail: "projects/3D/camera 1.png",
        abstract: "A detailed 3D environment depicting a vibrant street food stall.",
        description: "A comprehensive 3D modeling project showcasing a bustling street food scene.",
        details: "This project focuses on creating an stylized 3D Scene, with attention to detials, lighting, and props. The scene focuses on color compostion and storytelling.",
        tools: ["3DsMax", "Substance Painter", "Marmoset Toolbag"],
        year: 2024,
        documentationPdf: "projects/pdfs/3D Doc.pdf",
        gallery: {
            images: [
                "projects/3D/camera 3.png",
                "projects/3D/camera 5.png",
                "projects/3D/camera 6.png",
                "projects/3D/camera 7.png",
                "projects/3D/camera 9.png",
            ],
            videos: [
                "projects/3D/turntable.mp4",
                "projects/3D/model.mp4",
            ],
            sketchfabUrl: "https://sketchfab.com/models/7bced1dc5cbb4dd7b7923f449a766253/embed",
        },
    },
    {
        id: "3",
        title: "Sign Language Learning App",
        category: "multimedia-apps",
        thumbnail: "projects/Apps/SignBuddy.png",
        abstract: "A Pc-based application for learning sign language for children.",
        description: "An interactive application designed to teach sign language to young learners.",
        details: "This multimedia application combines engaging visuals, interactive exercises, and gamification elements to create an effective learning experience for children. The app includes video demonstrations, quizzes, and progress tracking to help users learn and practice sign language in a fun and educational way.",
        tools: ["Adobe Animate"],
        year: 2025,
        swfUrl: "projects/Apps/ICDAssignment 5.0 .swf",
    },
    {
        id: "4",
        title: "Tailora e-commerce website",
        category: "web-development",
        thumbnail: "projects/webDev/tailora.png",
        abstract: "An e-commerce website for the prototype application Tailora.",
        description: "A responsive e-commerce platform built with modern web technologies.",
        details: "This project involved designing and developing a full-featured e-commerce website with a focus on user experience and performance. Key features include product browsing, shopping cart functionality, and secure checkout. The Website inludes a hand-drawn and animated symbols to enhance the user experience and make it more engaging.",
        tools: ["HTML", "CSS", "JavaScript"],
        year: 2025,
        websiteUrl: "https://reinylo.github.io/Tailora.com/",
        gallery: {
            videos: [
                "projects/webDev/ARw.mp4",
                "projects/webDev/Createw.mp4",
            ],
        },
    },
    {
        id: "5",
        title: "Web-based hotel booking system UI Design",
        category: "UI Design",
        thumbnail: "projects/UI/Homepage.png",
        abstract: "A clean and intuitive UI design for a hotel booking web application.",
        description: "A user-friendly interface for a hotel booking system, designed to enhance the user experience.",
        details: "This UI design project focuses on creating a seamless and visually appealing user interface for a hotel booking system. The design emphasizes ease of navigation, clear information hierarchy, and a modern aesthetic to improve user engagement and satisfaction.",
        tools: ["Adobe Photoshop"],
        year: 2025,
        gallery: {
            images: [
                "projects/UI/ui2.png",
                "projects/UI/ui3.png",
                "projects/UI/ui4.png",
                "projects/UI/ui5.png",
                "projects/UI/allPages.png",
            ],
        },
    },
    {
        id: "6",
        title: "Tailors community website logo",
        category: "vector-illustration",
        thumbnail: "projects/Logos/Tailora.png",
        abstract: "Modern logo design for the Tailora e-commerce website.",
        description: "A sleek and modern logo that represents the Tailora brand.",
        details: "This logo design represents the Tailora brand perpose, by cobmining a scessor and a formal suit to give the idea of tailoring. The colors of the suit, the royal blue, deep pink and green symbolize trust, elegance, and that the brand is meant for both genders. ",
        tools: ["Adobe Illustrator"],
        year: 2025,
    },
    {
        id: "7",
        title: "Accurate Stylized Map SVG Illustrations",
        category: "vector-illustration",
        thumbnail: "projects/Logos/map.png",
        abstract: "Stylized SVG map illustrations with accurate geographic details for a website.",
        description: "A stylized SVG map illustration that combine artistic design with geographic accuracy.",
        details: "This project involved creating detailed SVG map illustrations that are both visually appealing and geographically accurate. The maps are designed to be used on a website, providing an engaging way to display geographic information while maintaining a unique artistic style.",
        tools: ["Adobe Illustrator"],
        year: 2025,
    },
    {
        id: "8",
        title: "Startup Logo",
        category: "vector-illustration",
        thumbnail: "projects/Logos/Esg.png",
        abstract: "Modern minimalist logo design for a sustainability company.",
        description: "A sleek, minimalist logo that represents sustainability with the ES litters",
        details: "This logo design combines geometric forms with modern design principles to create a memorable brand identity. The design works across multiple scales and mediums.",
        tools: ["Inkscape"],
        year: 2023,
    },
    {
        id: "9",
        title: "Hotel Logo Design",
        category: "vector-illustration",
        thumbnail: "projects/Logos/Reverie.png",
        abstract: "Modern logo design for a hotel brand.",
        description: "A sleek and professional logo that represents the hotel's brand identity.",
        details: "This logo represents a mountain cut in half with a river flowing through it, to give the idea of a peaceful and dreamy place to stay. The colors used are a compenation of cyan blue and and yellow green to give a calm and relaxing vibe, while highlighting modernity and freshness.",
        tools: ["Adobe Illustrator", "Adobe Photoshop"],
        year: 2024,
    },
    {
        id: "10",
        title: "Tree Gen organaization logo design",
        category: "vector-illustration",
        thumbnail: "projects/Logos/treeGenog.png",
        abstract: "Logo design for a tree planting organization.",
        description: "A sleek and professional logo that represents the organization's brand identity.",
        details: "This logo represents a mountain cut in half with a river flowing through it, to give the idea of a peaceful and dreamy place to stay. The colors used are a compenation of cyan blue and and yellow green to give a calm and relaxing vibe, while highlighting modernity and freshness.",
        tools: ["Adobe Illustrator", "Adobe Photoshop"],
        year: 2024,
    },
    {
        id: "11",
        title: ".Net Shopping system",
        category: "programming",
        thumbnail: "projects/programing/skatezone.png",
        abstract: "A modern e-commerce shopping system built with .NET framework.",
        description: "A comprehensive shopping system that includes product management, user authentication, and order processing.",
        details: "This project involved developing a full-featured e-commerce platform using the .NET framework, ensuring a seamless shopping experience for users.",
        tools: ["VB.NET", "SQL Server"],
        year: 2025,
        gallery: {
            images: [
                "projects/programing/SZ1.png",
                "projects/programing/SZ2.png",
                "projects/programing/SZ3.png",
                "projects/programing/SZ4.png",
                "projects/programing/SZ5.png",
                "projects/programing/SZ6.png",
                "projects/programing/SZ7.png",
                "projects/programing/SZ8.png",
            ],
            videos: [
                "projects/programing/skatezone.mp4",
            ],

        },
    },
    {
        id: "12",
        title: "portfolio logo design",
        category: "vector-illustration",
        thumbnail: "projects/Logos/sawsan.png",
        abstract: "Logo design for a personal portfolio.",
        description: "A sleek and modern logo that represents the individual's personal brand.",
        details: "This logo represents the iconic design of a female with a niqab represeing the designer self, along with a painting brush to represent the cretive work and artisitic skills. Colors used are a compenation of cyan blue and shades of purple to give a calm and creative vibe.",
        tools: ["Adobe Illustrator", "Adobe Photoshop"],
        year: 2025,
    },
    {
        id: "13",
        title: "e-portfolio website design and development",
        category: "web-development",
        thumbnail: "projects/webDev/e-portfolio.png",
        abstract: "Website design and development for a personal portfolio.",
        description: "A modern and responsive website that showcases the individual's work and skills.",
        details: "This project involved designing and developing a fully responsive e-portfolio website using modern web technologies, ensuring a seamless user experience across all devices.",
        tools: ["React", "TypeScript", "Tailwind CSS", "Vite", "GitHub"],
        year: 2026,
    },
];
