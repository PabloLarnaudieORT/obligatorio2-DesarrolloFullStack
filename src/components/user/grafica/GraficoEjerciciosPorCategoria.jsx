import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoEjerciciosPorCategoria = () => {
  const { listaDeEjercicios } = useSelector((state) => state.ejerciciosStore);

  const ejerciciosPorCategoria = {};

  listaDeEjercicios.forEach((ejercicio) => {
    const categoria = ejercicio.categoriaMusculo?.nombre || "Sin categoría";

    ejerciciosPorCategoria[categoria] =
      (ejerciciosPorCategoria[categoria] || 0) + 1;
  });

  const data = {
    labels: Object.keys(ejerciciosPorCategoria),
    datasets: [
      {
        label: "Cantidad de ejercicios",
        data: Object.values(ejerciciosPorCategoria),
        backgroundColor: "#dfff24",
        borderColor: "#111",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Ejercicios por categoría muscular",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="tarjeta w-100 mt-4" style={{ maxWidth: 700 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoEjerciciosPorCategoria;