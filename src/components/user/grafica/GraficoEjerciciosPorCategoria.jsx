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
import { useEffect, useState } from "react";
import api from "../../../api/api";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoEjerciciosPorCategoria = ({ actualizar }) => {
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTodosLosEjercicios = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/ejercicios?limit=1000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEjercicios(res.data.ejercicios.ejercicios || []);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error al cargar datos del grafico",
        );
      }
    };

    cargarTodosLosEjercicios();
  }, [actualizar]);

  const ejerciciosPorCategoria = {};

  ejercicios.forEach((ejercicio) => {
    const categoria = ejercicio.categoriaMusculo?.nombre || "Sin categoria";

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
        text: "Ejercicios por categoria muscular",
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
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default GraficoEjerciciosPorCategoria;
