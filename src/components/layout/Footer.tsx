export function Footer() {
    return (
        <footer className="py-8 border-t border-border bg-background/50">
            <div className="container mx-auto px-6 text-center text-muted-foreground">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} Abdulmajeed Al-Ashwal. All rights reserved.
                </p>
                <p className="text-sm">
                    Built with Next.js, Tailwind CSS, and Framer Motion.
                </p>
            </div>
        </footer>
    );
}
