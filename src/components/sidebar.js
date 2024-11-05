// Sidebar.js
import React, { useState , useEffect} from 'react';
import { Dialog } from 'primereact/dialog'; // Import de PrimeReact Dialog
import { InputText } from 'primereact/inputtext'; // Import pour le champ texte
import { Dropdown } from 'primereact/dropdown'; // Import pour le champ select
import { Button } from 'primereact/button';
import {BeatLoader } from 'react-spinners';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';
import 'primereact/resources/themes/saga-blue/theme.css'; // ou un autre thème de votre choix
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import '../App.css';
const Sidebar = ({ handleCloseSidebar, selectedPoint, fetchBasin, riviers }) => {
    const [loadingButton , setLoadingButton] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
     // State pour contrôler la visibilité du modal
    const [formData, setFormData] = useState({
      textInput: '',
      selectInput: null,
    });
    const chartData = {
      labels: [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      datasets: [
          {
              label: 'Débit du cours d\'eau (m³/s)',
              data: [2, 1, 5, 6, 4, 5, 4, 5, 9, 10, 7, 6],
              fill: false,
              borderColor: '#42A5F5',
              backgroundColor: '#42A5F5',
              tension: 0.4
          }
      ]
  };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Mois'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Débit (m³/s)'  // Unité fictive pour illustrer le débit du cours d'eau
          }
        }
      }
    };
  
    const options = [
        { label: 'Agriculture', value: 'option1' },
        { label: 'Energies', value: 'option2' },
        
      ];
      const options2 = [
        { label: 'Aduction en eau potable ', value: 'option1' },
        { label: 'Irragetion', value: 'option2' },
        { label: 'Mini Barrage', value: 'option2' },

        
      ];
    const sidebarStyle = {
        width: '30%',
        padding: '20px',
        background: '#fff',
        borderLeft: '1px solid #ccc',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
        overflowY: 'auto',
      };
      
      const closeButtonStyle = {
        padding: '5px 10px',
        background: '#f44336',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px'
      };
      
      const fetchButon = {
        padding: '5px 10px',
        background: '#4CAF50',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px'
      };
      const handleChartClick = () => {
        setVisible(true); // Ouvrir le modal
      };
      const handleSelectChange = (e) => {
        setFormData({ ...formData, selectInput: e.value });
      };
      const handleSelectChange1 = (e) => {
        setFormData({ ...formData, selectInput: e.value });
      };
      const handleSubmit = () => {
        setLoadingButton(true);
      
        setTimeout(() => {
          console.log('Pause terminée après 2 secondes');
          console.log('Form data submitted:', formData);
      
          // Fermer le modal après 2 secondes
          setModalVisible(false); 

          const link = document.createElement('a');
          link.href = '/assets/mini-barrage.pdf'; // Chemin vers votre fichier PDF dans le dossier public
          link.download = 'bulletin_information.pdf'; // Nom du fichier à télécharger
          document.body.appendChild(link);
          link.click();
          window.open('/assets/mini-barrage.pdf', '_blank');
          document.body.removeChild(link);
        setLoadingButton(false);

        }, 2000); // Pause de 2 secondes
      };
      
  return (
    <div style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button onClick={handleCloseSidebar} style={closeButtonStyle}>X</button>
      </div>

      <div>
      <img style={{width: '100%'}} src="/assets/Logo-MINTS_Rectangle.svg" alt="Logo MINTS" />

      </div>

      <h2>Point sélectionné</h2>
      <p>Latitude: {selectedPoint.lat}</p>
      <p>Longitude: {selectedPoint.lng}</p>

      <button onClick={fetchBasin} style={fetchButon}>Fetch</button>

      {riviers && riviers.length > 0 && (
        <div style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <div style={{ marginBottom: '10px' }}>
            <h2 style={{ color: '#000', fontSize: '16px' }}>Information Sur le cour d'eau</h2>
            </div>
            <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                <p style={{ margin: '0', color: '#000' }}>Mayo du nord</p>
                <small style={{ color: '#666' }}>Based on bands B4, B3, B2</small>
                </div>
                {/* <button style={{ border: 'none', background: 'none', color: '#007bff' }}>+ Add to </button> */}
            </li>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                <p style={{ margin: '0', color: '#000' }}>False color</p>
                <small style={{ color: '#666' }}>Based on bands B8, B4, B3</small>
                </div>
                {/* <button style={{ border: 'none', background: 'none', color: '#007bff' }}>+ Add to </button> */}
            </li>
            <li>
            <div>
      {/* Section avec le graphique et un clic pour agrandir */}
            <div style={{ width: '80%', margin: '0 auto', marginTop: '50px' }} onClick={handleChartClick}>
                <h4>Évolution du cours d'eau</h4>
                {chartData && (
                <Chart type="line" data={chartData} options={chartOptions} />
                )}
            </div>

            {/* Modal PrimeReact pour afficher le graphique en grand */}
            <Dialog
                header="Évolution du cours d'eau en détail"
                visible={visible}
                style={{ width: '80vw' }} // Largeur du modal en fonction de l'écran
                
                onHide={() => setVisible(false)} // Fermer le modal
            >
               {/* Graphique agrandi à l'intérieur du modal */}
              <div style={{ background: '#fff', width: '100%' }}>
                  {chartData && (
                      <Chart type="line" data={chartData} options={chartOptions} style={{ width: '100%', height:"50rem" }} />
                  )}
              </div>
            </Dialog>
            </div>
            </li>
            <li>
                <button onClick={() => setModalVisible(true)} style={fetchButon}>Analyser la zone</button>
            </li>
            </ul>
        </div>
        )}

     
       <Dialog
        header="Create New Product"
        visible={isModalVisible}
        style={{ width: '600px', borderRadius: '10px', color:'#000', backgroundColor: '#fff', padding: '20px' }} // Agrandir et ajouter un fond blanc
        modal
        onHide={() => setModalVisible(false)}
        className="custom-modal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> {/* Espace plus grand entre les éléments */}
          <div className="p-field">
            <label htmlFor="textInput" style={{ color: '#000', fontSize: '16px' }}>Name</label>
         
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexDirection:'column' }}>
            
          <div className="p-field" style={{ flex: 1 }}>
              <label htmlFor="selectInput" style={{ color: '#000', fontSize: '16px' }}>Category</label>
              <Dropdown
                id="selectInput"
                value={formData.selectInput}
                options={options}
                onChange={handleSelectChange}
                placeholder="Selectionner un secteur"
                style={{
                    backgroundColor: '#F7F7F7',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    color: '#000',
                    padding: '10px',
                    width: '100%'
                }}
                panelStyle={{
                    backgroundColor: '#fff', // Fond blanc pour le menu déroulant
                    border: '1px solid #ccc', // Bordure grise pour le menu
                }}
                />

            </div>
            <div className="p-field" style={{ flex: 1 }}>
              <label htmlFor="selectInput" style={{ color: '#000', fontSize: '16px' }}>Category</label>
              <Dropdown
            id="selectInput"
            value={formData.selectInput}
            options={options2}
            onChange={handleSelectChange}
            placeholder="Selectionner un usage"
            style={{
                backgroundColor: '#F7F7F7',
                borderRadius: '8px',
                border: '1px solid #ccc',
                color: '#000',
                padding: '10px',
                width: '100%'
            }}
            panelStyle={{
                backgroundColor: '#fff', // Fond blanc pour le menu déroulant
                border: '1px solid #ccc', // Bordure grise pour le menu
            }}
            />

            </div>
          </div>

         
        {
            loadingButton ?
            <div style={{display:'flex', justifyContent: 'center'}}>
            <BeatLoader color="#f44336"  title='Nous analysons votre demande' size={15} />
                
            </div>
            :
            <Button label="Save" onClick={handleSubmit} style={{ backgroundColor: '#007bff', border: 'none', borderRadius: '8px', padding: '10px 20px' }} />
        
        }
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
