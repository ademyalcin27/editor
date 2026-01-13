export default function HomePage() {
  return (
    <main>
      <header>
        <h1>YAML Config Studio</h1>
        <p>Edit the configuration with a live YAML editor and structured form.</p>
      </header>
       <div className="layout">
          <section className="panel">
            <h2>YAML Editor</h2>
            <!-- YAML editor component goes here -->
          </section>
          <section className="panel">
          <h2>Configuration Form</h2>
          <!-- Configuration form component goes here -->
        </section>
        </div>
    </main>
  );
}