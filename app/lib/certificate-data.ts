export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  category: "Frontend" | "Backend" | "Databases" | "Tools";
  skills: string[];
  description: string;
  curriculum: string;
  gradient: string;
}

export const certificates: Certificate[] = [
  {
    id: "meta-frontend-developer",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issueDate: "December 2024",
    credentialId: "META-FE-98319B",
    credentialUrl: "https://coursera.org/verify/specialization/META-FE-98319B",
    category: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "Figma", "HTML", "CSS", "Tailwind"],
    description: "A comprehensive 9-course professional program by Meta covering front-end development, UX/UI, user-interfaces, React development, testing, and professional portfolio development.",
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    curriculum: `### Program Overview
This professional certificate consists of 9 intensive courses covering modern front-end technologies. The curriculum was designed by Meta software engineers and UX designers to build job-ready web development capabilities.

### Courses Completed
- **Introduction to Front-End Development:** Understanding how the web works, building simple responsive pages using HTML, CSS, and structural design.
- **Programming with JavaScript:** Core ES6+ language fundamentals, object-oriented concepts, functional programming, and automated testing with Jest.
- **Version Control:** Professional Git workflows, branching strategies, collaborative features of GitHub, and managing repository histories via the CLI.
- **HTML and CSS in depth:** Advanced CSS grids, flexbox layouts, mobile-first design practices, responsive media queries, and framework utilization.
- **React Basics:** Virtual DOM mechanics, functional components, JSX rendering, component composition, props, and fundamental react state.
- **Advanced React:** Custom React hooks, useEffect cycles, Context API for global state management, render optimization, and unit testing react components.
- **Principles of UX/UI Design:** Figma wireframing, high-fidelity interactive prototyping, user personas, usability testing, and accessibility guidelines (WCAG).
- **Front-End Developer Capstone:** Designing and building a fully interactive booking website, integrating dynamic API validation and user responsive forms.
- **Coding Interview Preparation:** Essential data structures, algorithmic complexity, search and sorting algorithms, and problem-solving exercises.`
  },
  {
    id: "angular-advanced-state-management",
    title: "Advanced Angular & State Management",
    issuer: "Angular University",
    issueDate: "March 2025",
    credentialId: "ANG-ADV-248102",
    credentialUrl: "https://angular-university.org/verify/courses/ANG-ADV-248102",
    category: "Frontend",
    skills: ["Angular", "TypeScript", "RxJS", "NgRx", "State Management", "Web Components"],
    description: "Mastering advanced Angular architectures, Reactive Programming with RxJS, state management with NgRx store, and custom Web Components development.",
    gradient: "from-rose-600 via-pink-600 to-red-700",
    curriculum: `### Program Overview
An advanced architectural certification focused on building high-performance, maintainable enterprise Angular applications. The course explores reactive programming principles and decoupled global state.

### Key Skills Mastered
- **Advanced Angular Components:** Leveraging advanced content projection, custom structural and attribute directives, dynamic component instantiation, and change detection strategies (OnPush).
- **RxJS In-Depth:** Understanding reactive streams, hot vs. cold observables, mastering structural operators (switchMap, mergeMap, concatMap, exhaustMap), custom pipeable operators, and state management using BehaviorSubjects.
- **State Management with NgRx:** Designing unified single sources of truth. Implementing action creators, reducer stores, selectors, and side effects (NgRx Effects) for handling asynchronous tasks, as well as router store sync.
- **Performance Optimization:** Angular Server-Side Rendering (SSR), hydration mechanics, progressive web apps (PWA), route-level lazy loading, and asset prefetching strategies.
- **Custom Web Components:** Exporting Angular elements as standards-compliant custom elements/web components to be embedded framework-agnostically.`
  },
  {
    id: "supabase-professional-developer",
    title: "Supabase Professional Developer Certification",
    issuer: "Supabase Academy",
    issueDate: "January 2025",
    credentialId: "SUPA-DB-401294",
    credentialUrl: "https://supabase.com/academy/verify/SUPA-DB-401294",
    category: "Databases",
    skills: ["Supabase", "PostgreSQL", "SQL", "Prisma", "Database Security", "Node.js"],
    description: "Professional certification covering PostgreSQL database design, real-time subscriptions, Supabase Auth, Row Level Security (RLS) policies, and edge functions.",
    gradient: "from-emerald-600 via-teal-600 to-green-700",
    curriculum: `### Program Overview
A specialized backend and database certification validation skills in developing real-time serverless applications utilizing the Supabase ecosystem, PostgreSQL, and secure cloud runtimes.

### Key Core Modules
- **PostgreSQL Database Design:** Constructing normalized relational schemas, advanced constraint triggers, writing stored procedures/functions, and structuring custom database indexes (B-Tree, GIN) for performance.
- **Row Level Security (RLS):** Securing tables using granular Postgres RLS security policies. Integrating with Supabase Auth to filter rows dynamically based on the signed-in user's JWT metadata.
- **Supabase Edge Functions:** Developing serverless HTTP APIs using Deno and TypeScript. Deploying low-latency handlers closer to users for secure payment integrations and content processing.
- **Realtime Subscriptions:** Building live reactive feeds by listening to PostgreSQL replication streams. Implementing real-time broadcast and presence features.
- **ORM & Migrations Integration:** Linking Prisma schemas, generating clean models, and orchestrating database migrations locally and in production.`
  }
];
