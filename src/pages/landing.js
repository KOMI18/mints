
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#01497C', position: "fixed", width: "100%", zIndex:"10000" }}>
        <div className="container">
          <a className="navbar-brand" href="/">
      <img 
        src="/Logo-MINTS.png" 
        alt="MINTS Logo" 
        style={{ height: '50px', width: 'auto', color:'#f39723' }} 
        className="d-inline-block align-top"
      />
      
    </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#missions">Missions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">Qui sommes-nous</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <Link className="btn btn-warning" to="/demo">Essayer la Démo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
  {/* Carousel Background */}
  <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
    <div className="carousel-inner">
      {[1, 2, 3, 4].map((index) => (
        <div className={`carousel-item ${index === 1 ? 'active' : ''}`} key={index}>
          <img 
            src={`/${index}.jpg`} 
            className="d-block w-100" 
            alt={`Background ${index}`} 
            style={{ 
              filter: 'blur(0.5px)', 
              height: '100vh', 
              objectFit: 'cover',
              opacity: 0.7
            }} 
          />
        </div>
      ))}
    </div>
  </div>

  {/* Content Section */}
  <div className="container" style={{ zIndex: 1 }}>
    <div className="row align-items-center">
      <div className="col-md-6">
        <h1 className="display-4 fw-bold" data-aos="fade-up">MINTS</h1>
        <p className="lead">Découvrez comment notre plateforme révolutionne la gouvernance de l'eau en intégrant des modèles prédictifs avancés pour évaluer la disponibilité des ressources hydriques face aux défis du changement climatique.</p>
        <Link to="/demo" className="btn btn-light btn-lg mt-3">Essayer la Démo</Link>
      </div>
    </div>
  </div>
</section>


     {/* Missions Section */}
<section id="missions" className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center section-title" style={{ fontSize: "xxx-large" }} data-aos="fade-up">Nos Missions</h2>
    <div className="row" style={{gap:"100px"}} >
      {[3, 6, 9, 11, 12, 17].map((odd, index) => {
        const oddColors = {
          3: "#4C9F38",
          6: "#26BDE2",
          9: "#F26A2E",
          11: "#F89D2A",
          12: "#BF8B2E",
          17: "#19486A"
        };

        const backgroundColor = oddColors[odd];

        return (
          <div 
            className="col-md-5 mb-5 d-flex align-items-center" 
            key={odd} 
            data-aos="fade-up" 
            data-aos-delay={100 * index} 
            style={{  
              backgroundColor: backgroundColor, 
              color: "white", 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginBottom: '30px',
              marginTop: '30px',
            }}
          >
            <div 
              className="card" 
              style={{ 
                borderRadius: '8px', 
                padding: '10px', 
                backgroundColor: 'transparent', 
                color: '#FFFFFF'
              }}
            >
              <img 
                src={`https://www.un.org/sustainabledevelopment/fr/wp-content/uploads/sites/4/2018/07/F_SDG-goals_icons-individual-rgb-${odd < 10 ? `0${odd}` : odd}.png`} 
                alt={`ODD ${odd}`} 
                className="img-fluid rounded mx-auto d-block" 
                style={{ 
                  width: '100%', 
                  height: "auto", 
                  borderRadius: '8px' 
                }} 
              />
            </div>
            <p style={{ fontSize: '1.7rem', paddingLeft: '1rem', fontWeight: "bold",  }}>
              {odd === 3 && "Améliorer la santé en soutenant des ressources en eau propres et accessibles, essentielles pour prévenir les maladies liées à la pollution et à l’assainissement inadéquat."}
              {odd === 6 && "Favoriser un accès universel à l'eau propre et à l'assainissement. Notre mission est d'assurer une gestion durable de cette ressource pour tous les citoyens."}
              {odd === 9 && "Soutenir les infrastructures résilientes et l'innovation verte dans la gestion des ressources en eau pour assurer une réponse adéquate aux défis climatiques."}
              {odd === 11 && "Promouvoir des villes durables avec des ressources en eau gérées efficacement, réduisant ainsi les risques liés aux inondations et à la pollution."}
              {odd === 12 && "Encourager une utilisation responsable et durable des ressources en eau, afin de préserver cette ressource pour les générations futures."}
              {odd === 17 && "Renforcer les partenariats mondiaux pour atteindre les objectifs de développement durable et permettre une meilleure coopération pour la gestion des ressources en eau."}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>



{/* Section Services */}
<section id="services" className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center section-title mb-4" data-aos="fade-up">Nos Services</h2>
    <div className="row">
      {/* Support décisionnel basé sur les données */}
      <div className="col-md-4 mb-4" data-aos="fade-up">
        <div className="card p-4 text-center" style={{ backgroundColor: 'rgb(176, 236, 247)', borderRadius: '10px', minHeight: '250px' }}>
          <h4>Support décisionnel basé sur les données</h4>
          <p>
            Utilisation de données avancées pour fournir des recommandations précises et optimisées pour la gestion des ressources en eau. Ce service aide les gouvernements,  les ONG et les entreprises        à prendre des décisions basées sur des données réelles et fiables.
          </p>
        </div>
      </div>

      {/* Adaptation au changement climatique */}
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
        <div className="card p-4 text-center" style={{ backgroundColor: 'rgb(255, 128, 128)', borderRadius: '10px', minHeight: '250px' }}>
          <h4>Adaptation au changement climatique</h4>
          <p>
            Nos solutions visent à faciliter l'adaptation aux changements climatiques, en anticipant les risques liés aux phénomènes extrêmes et en développant des stratégies de résilience pour une gestion durable de l'eau dans divers environnements.
          </p>
        </div>
      </div>

      {/* Recommandations environnementales */}
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
        <div className="card p-4 text-center" style={{ backgroundColor: 'rgb(185, 247, 189)', borderRadius: '10px', minHeight: '250px' }}>
          <h4>Recommandations environnementales</h4>
          <p>
            Nous analysons l'impact environnemental des projets liés aux ressources en eau et proposons des recommandations pour minimiser les effets négatifs, en promouvant des pratiques écologiques qui contribuent à la préservation des écosystèmes.
          </p>
        </div>
      </div>

      {/* Compatibilité entre le projet et la zone */}
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
        <div className="card p-4 text-center" style={{ backgroundColor: 'rgb(253, 228, 168)', borderRadius: '10px', minHeight: '250px' }}>
          <h4>Compatibilité entre le projet et la zone</h4>
          <p>
            Grâce à une analyse approfondie des caractéristiques locales, nous évaluons la compatibilité des projets avec leur environnement, afin de garantir des initiatives durables et respectueuses des ressources naturelles spécifiques à chaque région.
          </p>
        </div>
      </div>

      {/* Recommandation de plans agricoles */}
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="400">
        <div className="card p-4 text-center" style={{ backgroundColor: 'rgb(176, 182, 255)', borderRadius: '10px', minHeight: '250px' }}>
          <h4>Recommandation de plans agricoles</h4>
          <p>
            En se basant sur des données climatiques et hydrologiques, nous proposons des plans agricoles adaptés aux conditions locales, afin de garantir une utilisation efficace et durable de l'eau, tout en augmentant les rendements agricoles.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      
      

      {/* Qui sommes-nous Section */}
      <section id="about" className="py-5" >
        <div className="col" >
          <h2 className="text-center section-title" data-aos="fade-up">Qui sommes-nous ?</h2>
          <p className="lead text-center mb-4">Nous sommes une jeune start-up dédiée à l'innovation pour relever les défis du changement climatique en utilisant des solutions avancées de gestion de l'eau.</p>
         
          <div className="row" style={{ background: 'url("/assets/img/IMG_1368.webp")', backgroundSize: 'cover', color: 'white', position: 'relative' }}>
            <div className="container" style={{ background: 'rgba(255, 255, 0, 0.3)', padding: '2rem', borderRadius: '8px', width:"90%", display:"flex", flexDirection:"row", flexWrap:"wrap", gap:"2rem", justifyContent:"center"}}>
        {[
              { name: "Tehem KOM PARFAIT", role: "Dev Full Stack", image: "/team2.jpeg" },
              { name: "IVANA MICHELLE", role: "UX / UI", image: "/team3.jpeg" },
              { name: "Hesed TAYAWALBA", role: "Data Analyst", image: "/team1.jpeg" },
              { name: "Serge NOAH", role: "Data Scientist", image: "/team4.jpeg" },
              { name: "Pacôme KENGALI ", role: "Project Manager", image: "/team5.jpeg" },
            ].map((member, index) => (
              <div className="col-md-4 mb-4" key={index} data-aos="fade-up" data-aos-delay={100 * index}>
                <div className="card bg-light text-center p-3" style={{ borderRadius: '8px' }}>
                  <img src={member.image} alt={member.name} className="card-img-top" style={{ borderRadius: '50%', width: '80px', height: '80px', margin: '0 auto' }} />
                  <div className="card-body">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4">Contactez-nous</h2>
          <div className="row">
            <div className="col-md-6" data-aos="fade-right">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input type="text" className="form-control" id="name" placeholder="Votre nom" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Votre email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Votre message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{left:"25%", position:"relative"}}>Envoyer</button>
              </form>
            </div>
            <div className="col-md-6 mt-4 ml-4" data-aos="fade-left">
              <h4>Informations de Contact</h4>
              <p>Email: contact@mints.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
              <p>Adresse: 123 Rue de l'Eau, Paris, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: '#01497C', color: 'white' }}>
        <p>&copy; 2024 MINTS. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
