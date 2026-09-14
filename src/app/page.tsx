export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="careflow-title">
        <div className="eyebrow">Candidate frontend demonstrator</div>
        <h1 id="careflow-title">CareFlow</h1>
        <p className="subtitle">Patient Reservation Frontend Lab</p>
        <p className="summary">
          Pass 0 establishes the repository and quality toolchain only. Product
          features intentionally start in later approved passes.
        </p>
        <div className="status" role="status">
          <span className="statusDot" aria-hidden="true" />
          Repository foundation initialized
        </div>
      </section>

      <aside className="disclaimer" aria-label="Project disclaimer">
        <strong>Independent candidate project.</strong> CareFlow uses synthetic
        data only. It is not an official product of Počítače a Programovanie and
        does not represent or reproduce its internal systems, architecture, APIs,
        or data.
      </aside>
    </main>
  );
}
