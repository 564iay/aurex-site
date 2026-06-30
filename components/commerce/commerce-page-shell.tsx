import { Navbar } from "@/components/ui/navbar";

export function CommercePageShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <div className="page-container">
          <section className="page-hero mb-8">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="section-title max-w-4xl">{title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-white/68">{description}</p>
          </section>
          {children}
        </div>
      </main>
    </>
  );
}
