export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  event: string;
  date: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "hackathon-kickoff",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    title: "Hackathon Kickoff Pizza Feast",
    event: "Devcon Legazpi Hackathon",
    date: "June 8, 2024",
  },
  {
    id: "leadership-training",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    title: "Student Council Leadership Workshop",
    event: "Leadership Training 2024",
    date: "July 12, 2024",
  },
  {
    id: "night-meetup",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    title: "Developer Community Night Meetup",
    event: "Tech Meetup Manila",
    date: "August 20, 2024",
  },
  {
    id: "conference-audience",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    title: "Devcon Mainstage Technical Seminar",
    event: "Conference Speaker Panel",
    date: "September 5, 2024",
  },
  {
    id: "projector-demo",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    title: "Capstone Project Demo Presentation",
    event: "Tech Workshop & Showcase",
    date: "October 15, 2024",
  },
  {
    id: "volunteer-group",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    title: "Organizing & Support Volunteer Team",
    event: "Devcon Volunteer Summit",
    date: "November 3, 2024",
  },
  {
    id: "collaborative-lab",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    title: "Team Collaborative Code Sprints",
    event: "Co-working Collaboration Lab",
    date: "December 1, 2024",
  },
  {
    id: "vintage-group",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    title: "Retro Hackathon Cohort Archive",
    event: "Bicol Tech Summit",
    date: "June 8, 2024",
  },
  {
    id: "toast-celebration",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    title: "Teammates Pizza & Drink Toast",
    event: "Post-Event Celebration",
    date: "December 18, 2024",
  }
];
