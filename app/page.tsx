export default function Home() {
  return (
    <>
      <div className="container">
        <h1>{process.env.NEXT_PUBLIC_ENV}</h1>
        <button className="btn btn-info">bt</button>
      </div>
    </>
  );
}
