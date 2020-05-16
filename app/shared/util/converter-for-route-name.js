import {
    ROUTE_FAV_GRP,
    ROUTE_HOME,
    ROUTE_INFO,
    ROUTE_LOGIN,
    ROUTE_SETTING,
    ROUTE_SIMULATOR,
    ROUTE_SEARCH_GRP,
    ROUTE_USER_PROFIL,
    ROUTE_USER_PROFIL_INVEST,
    ROUTE_DETAIL_GRP,
    ROUTE_MAP, ROUTE_MEMBERS_LIST, ROUTE_USERS_LIST, ESTATE, FISCALITY, BANK
} from "./constants";

export function convertRouteNameToLisible(routeName) {
    switch (routeName) {
        case ROUTE_HOME : return 'Accueil';
        case ROUTE_MAP : return 'Carte';
        case ROUTE_SIMULATOR : return 'Simulateur immobilier';
        case ROUTE_USER_PROFIL : return 'Mon profil';
        case ROUTE_SEARCH_GRP : return 'Recherche de groupe';
        case ROUTE_FAV_GRP : return 'Mes groupes';
        case ROUTE_DETAIL_GRP : return 'Page du groupe';
        case ROUTE_SETTING : return 'Paramètres';
        case ROUTE_INFO : return 'A propos de BeInvestor';
        case ROUTE_USERS_LIST : return 'Liste des utilisateurs';
        case ROUTE_MEMBERS_LIST : return 'Liste des membres';
        case ROUTE_LOGIN : return 'Espace de connexion';
        case ROUTE_USER_PROFIL_INVEST : return 'Profil investisseur';
        case ESTATE: return 'Bien analysé';
        case FISCALITY: return 'Fiscalité';
        case BANK: return 'Emprunt';
        default: return null;
    }
}