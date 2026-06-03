import React from 'react'
import Login from '../../components/user/formularios/Login';

const LoginPage = () => {
    return (
        <>
            <div className="fondo-completo"></div>

            <main className="contenedor-flex">
                {/* Panel Izquierdo (Banner) */}
                <div className="banner">
                    <div className="logo-grande">
                        IRON<span className="acento">LOG</span>
                    </div>
                    <h1>
                        Transformá tu<br />esfuerzo en<br />progreso.
                    </h1>
                    <p>Registrá tus entrenamientos, seguí tu evolución y superá tus límites.</p>
                </div>

                <Login />
            </main>
        </>
    );
};

export default LoginPage;