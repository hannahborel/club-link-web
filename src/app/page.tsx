export default function HomePage() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Club Link</h1>
        <p className="text-muted-foreground mt-2">Next.js + Tailwind setup</p>

        <div className="mt-8 space-y-4">
          <a
            href="/test-api"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test API Connection
          </a>

          <div className="text-sm text-grey -500">
            <p>API Server: http://localhost:3000</p>
            <p>Web Server: http://localhost:3001</p>
          </div>
        </div>
      </div>
    </main>
  );
}
