export default function Footer() {
  return (
    <footer className="border-t bg-background px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground  ">
        <div>
          <p className="font-medium text-foreground">
            EduFlow AI LMS Platform
          </p>
 
          <p>
            Built by Shubham Shekhawat • MERN Stack Developer
          </p>
        </div>
 
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Shubham-Shekhawat"
            target="_blank"
            className="hover:text-foreground transition"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Shubham-Shekhawat/eduflow-ai"
            target="_blank"
            className="hover:text-foreground transition"
          >
            Get Code
          </a>
 
          <a
            href="https://www.linkedin.com/in/shubham-shekhawat-06b440223?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            className="hover:text-foreground transition"
          >
            LinkedIn
          </a>
 
          <p>
            © {new Date().getFullYear()} EduFlow AI
          </p>
        </div>
      </div>
    </footer>
  );
}
 