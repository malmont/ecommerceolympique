import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketsByCategory } from './api';
import Card from '../Carousel/components/card';
import styled from 'styled-components';

const EpreuvesByCategory = () => {
  const { category } = useParams();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTicketsByCategory(category);
      setTickets(data);
    };

    fetchTickets();
  }, [category]);

  return (
    <Wrapper>
      <h1>{category}</h1>
      <div className="tickets-list">
        {tickets.map(ticket => (
          <Card
            key={ticket.id}
            id={ticket.id}
            image={ticket.epreuve_sportive.image_url}
            catetypeEpreuveg={ticket.epreuve_sportive.type_epreuve_sportive}
            title={ticket.epreuve_sportive.name_epreuve_sportive}
            niveauEpreuve={ticket.epreuve_sportive.niveau_epreuve}
            nameComplexe={ticket.complexe_sportif.name_complexe}
            adressComplexe={ticket.epreuve_sportive.adresse_complexe}
            hallComplexe={ticket.hall.name}
            numberPlace={ticket.hall.number_place}
            heureDebut={ticket.start_time_epreuve}
            price={ticket.tarifs[0].tarif}  // Assuming there's at least one tariff and using the first one
            tarifType={ticket.tarifs[0].name_tarif}  // Add this line
          />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .tickets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export default EpreuvesByCategory;