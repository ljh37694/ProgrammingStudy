export default function Home(): JSX.Element {
  const name: string = "Lee";

  return (
    <main className="main-page">
      <h3 className="main-title">Apple Fresh</h3>
      <p className="sub-title">by dev {name}</p>
    </main>
  );
}
