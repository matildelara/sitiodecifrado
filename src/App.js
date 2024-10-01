import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <Link to="/">Inicio</Link>
            <Link to="/cesar">Cifrado César</Link>
            <Link to="/escitala">Cifrado Escítala</Link>
            <Link to="/escitala">hass</Link>
          </nav>

          {/* Rutas */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cesar" element={<CifradoCesar />} />
            <Route path="/escitala" element={<CifradoEscitala />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}


// Pantalla principal con explicaciones
function Inicio() {
  return (
    <div className="container">
      <h1>Comparación entre el Cifrado César y el Cifrado Escítala</h1>

      <table>
        <thead>
          <tr>
            <th>Criterio</th>
            <th>Cifrado César</th>
            <th>Cifrado Escítala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Método de Cifrado:</strong></td>
            <td>Cifrado por sustitución. Cada letra del mensaje es desplazada un número fijo de posiciones en el alfabeto.</td>
            <td>Cifrado por transposición. El orden de las letras del mensaje es reorganizado en función de un patrón geométrico (el enrollado en una varilla).</td>
          </tr>
          <tr>
            <td><strong>Complejidad:</strong></td>
            <td>Muy simple y directo, fácil de implementar y comprender, pero fácil de descifrar si se conoce la lógica del desplazamiento.</td>
            <td>Relativamente simple, pero requiere una "clave" física (el diámetro de la varilla), lo que añade resistencia en ciertos contextos.</td>
          </tr>
          <tr>
            <td><strong>Clave:</strong></td>
            <td>Número de desplazamiento entre 1 y 25. Conociendo este valor, es trivial descifrar el mensaje.</td>
            <td>Diámetro de la varilla, que define cuántas columnas tendrá el mensaje. Requiere probar varias longitudes si no se conoce la longitud del cilindro.</td>
          </tr>
          <tr>
            <td><strong>Vulnerabilidad a Ataques:</strong></td>
            <td>Vulnerable a ataques de fuerza bruta (25 desplazamientos) y a análisis de frecuencia.</td>
            <td>Menos vulnerable al análisis de frecuencia, pero susceptible a ataques por permutaciones y a descifrado si se conocen las dimensiones de la varilla.</td>
          </tr>
        </tbody>
      </table>

      <h2>Análisis de Seguridad</h2>
      <p><strong>Cifrado César:</strong></p>
      <ul>
        <li><strong>Fuerza Bruta:</strong> Solo hay 25 posibles desplazamientos, por lo que un atacante puede probar todas las claves en cuestión de segundos.</li>
        <li><strong>Análisis de Frecuencia:</strong> Como las letras originales se mantienen y solo cambian su posición en el alfabeto, es susceptible al análisis de frecuencia. Letras comunes como "E" o "A" en un idioma son fáciles de identificar y decodificar.</li>
      </ul>

      <p><strong>Cifrado Escítala:</strong></p>
      <ul>
        <li><strong>Fuerza Bruta:</strong> Un ataque de fuerza bruta implicaría probar todas las posibles longitudes de la varilla, lo que requiere más tiempo que el cifrado César, pero no mucho si el mensaje no es muy largo.</li>
        <li><strong>Seguridad Limitada:</strong> Aunque la transposición complica el análisis de frecuencia, no añade una capa significativa de seguridad moderna. Un análisis detallado de permutaciones o la obtención de patrones a partir de mensajes largos puede descifrar el texto.</li>
      </ul>
    </div>
  );
}

// Componente para el cifrado César
function CifradoCesar() {
  const [mensaje, setMensaje] = useState('');
  const [desplazamiento, setDesplazamiento] = useState(0);
  const [resultado, setResultado] = useState('');
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const cifrar = () => {
    const desplazamientoInt = parseInt(desplazamiento);
    let resultado = '';
    for (let i = 0; i < mensaje.length; i++) {
      let charCode = mensaje.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        resultado += String.fromCharCode(((charCode - 65 + desplazamientoInt) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        resultado += String.fromCharCode(((charCode - 97 + desplazamientoInt) % 26) + 97);
      } else {
        resultado += mensaje[i];
      }
    }
    setResultado(resultado);
  };

  const descifrar = () => {
    const desplazamientoInt = parseInt(desplazamiento);
    let resultado = '';
    for (let i = 0; i < mensaje.length; i++) {
      let charCode = mensaje.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        resultado += String.fromCharCode(((charCode - 65 - desplazamientoInt + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        resultado += String.fromCharCode(((charCode - 97 - desplazamientoInt + 26) % 26) + 97);
      } else {
        resultado += mensaje[i];
      }
    }
    setResultado(resultado);
  };

  const copiarResultado = () => {
    navigator.clipboard.writeText(resultado);
  };

  const toggleInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };

  return (
    <div className="container">
      <h2>Cifrado César</h2>
      <input
        type="text"
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <input
        type="number"
        placeholder="Desplazamiento"
        value={desplazamiento}
        onChange={(e) => setDesplazamiento(e.target.value)}
      />
      <button onClick={cifrar}>Cifrar</button>
      <button onClick={descifrar}>Descifrar</button>
      <h3>Resultado:</h3>
      <textarea readOnly value={resultado}></textarea>
      <button onClick={copiarResultado}>Copiar</button>
      <button onClick={toggleInfo}>¿Cómo funciona el Cifrado César?</button>
      {mostrarInfo && (
        <div className="info">
          <h4>¿Cómo funciona el Cifrado César?</h4>
          <p>
            El cifrado César es un método de cifrado por sustitución que desplaza cada letra del alfabeto un número fijo de posiciones.
          </p>
          <ul className="aligned-list">
            <li>
              <strong>Desplazamiento:</strong> Se elige un número entero que determinará cuántas posiciones se desplazará cada letra.
            </li>
            <li>
              <strong>Alfabeto:</strong> Si se llega al final del alfabeto, el desplazamiento continúa desde el principio.
            </li>
            <li>
              <strong>Cifrado:</strong> Para cifrar un mensaje, se aplica el desplazamiento y se sustituye por la letra resultante.
            </li>
            <li>
              <strong>Descifrado:</strong> Para descifrar, se aplica el desplazamiento en la dirección opuesta.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Componente para el cifrado Escítala
function CifradoEscitala() {
  const [mensaje, setMensaje] = useState('');
  const [columnas, setColumnas] = useState(0);
  const [resultado, setResultado] = useState('');
  const [mostrarInfo, setMostrarInfo] = useState(false); // Estado para mostrar u ocultar la información

  // Función para cifrar
  const cifrar = () => {
    let resultado = '';
    const numCols = parseInt(columnas);
    if (numCols <= 0) return;
    const rows = Math.ceil(mensaje.length / numCols);
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < rows; row++) {
        let index = row * numCols + col;
        if (index < mensaje.length) {
          resultado += mensaje[index];
        }
      }
    }
    setResultado(resultado);
  };

  // Función para descifrar
  const descifrar = () => {
    let resultado = new Array(mensaje.length);
    const numCols = parseInt(columnas);
    const rows = Math.ceil(mensaje.length / numCols);
    let k = 0;
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < rows; row++) {
        let index = row * numCols + col;
        if (index < mensaje.length) {
          resultado[index] = mensaje[k];
          k++;
        }
      }
    }
    setResultado(resultado.join(''));
  };

  const copiarResultado = () => {
    navigator.clipboard.writeText(resultado);
  };

  const toggleInfo = () => {
    setMostrarInfo(!mostrarInfo); // Cambia el estado para mostrar u ocultar la información
  };

  return (
    <div className="container">
      <h2>Cifrado Escítala</h2>
      <input
        type="text"
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <input
        type="number"
        placeholder="Columnas"
        value={columnas}
        onChange={(e) => setColumnas(e.target.value)}
      />
      <button onClick={cifrar}>Cifrar</button>
      <button onClick={descifrar}>Descifrar</button>
      <h3>Resultado:</h3>
      <textarea readOnly value={resultado}></textarea>
      <button onClick={copiarResultado}>Copiar</button>
      <button onClick={toggleInfo}>¿Cómo funciona el Cifrado Escítala?</button>
      {mostrarInfo && (
        <div className="info">
          <h4>¿Cómo funciona el Cifrado Escítala?</h4>
          <p>
            El Cifrado Escítala es un método de cifrado por transposición de letras utilizado en la antigüedad.
          </p>
          <ul className="aligned-list">
            <li>
              <strong>Herramienta:</strong> Se requiere una varilla con un diámetro específico.
            </li>
            <li>
              <strong>Escritura:</strong> El mensaje se enrolla alrededor de la varilla y se escribe en filas.
            </li>
            <li>
              <strong>Lectura:</strong> Se lee verticalmente en lugar de horizontalmente.
            </li>
            <li>
              <strong>Descifrado:</strong> El receptor necesita una varilla del mismo diámetro para descifrar el mensaje.
            </li>
          </ul>

        </div>
      )}
    </div>
  );
}
export default App;
