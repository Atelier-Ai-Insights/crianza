import Quiz from '../components/Quiz';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900">Bienvenido al Test de Crianza</h1>
        <p className="text-gray-600 mt-2">Un momento para pensar en usted y en su familia</p>
      </div>
      <Quiz />
    </div>
  );
}
