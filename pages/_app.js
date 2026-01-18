import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-[#003366]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
