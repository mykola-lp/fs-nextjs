const Home = () => {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">
        Blogs App
      </h1>

      <p>
        A simple blog application built with Next.js for learning full stack
        development.
      </p>

      <p>
        Course:{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          className="text-blue-600 hover:underline"
        >
          Full Stack Open Next.js
        </a>
      </p>
    </main>
  )
}

export default Home