const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export const getTicketsByLevel = async (level) => {
    const response = await fetch(`${API_URL}/epreuves/by_level/?niveau_epreuve=${encodeURIComponent(level)}`);
    const data = await response.json();
    return data;
};
