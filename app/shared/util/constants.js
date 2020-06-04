import {DEV_API_URL, PROD_API_URL, DEV_SOCKET_URL, PROD_SOCKET_URL} from 'react-native-dotenv';
import { TestIds } from '@react-native-firebase/admob';

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
export const SOCKET_URL = __DEV__ ? DEV_SOCKET_URL : PROD_SOCKET_URL;
export const BANNER_AD = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2958560476723238/5081525111';

export const USER_TOKEN_KEY = "LOGGED_TOKEN";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
export const USER_PICTURE_KEY = "user profil picture";

// ROUTE NAMES IDENTIFIER
export const ROUTE_USER_PROFIL = 'UserProfil';
export const ROUTE_USER_PROFIL_INVEST = 'UserProfilInvestor';
export const ROUTE_HOME = 'Home';
export const ROUTE_MAP = 'Map';
export const ROUTE_SIMULATOR = 'Simulator';
export const ROUTE_SIMULATOR_RESULT = 'SimulatorResult';
export const ROUTE_FAV_GRP = 'FavoritesGroups';
export const ROUTE_SEARCH_GRP = 'SearchGroups';
export const ROUTE_DETAIL_GRP = 'DetailGroups';
export const ROUTE_MEMBERS_LIST = 'GroupMembers';
export const ROUTE_USERS_LIST = 'UsersList';
export const ROUTE_SETTING = 'Settings';
export const ROUTE_INFO = 'AppInfo';
export const ROUTE_LOGIN = 'Login';
export const ROUTE_REGISTER = 'Register';
export const ROUTE_RESET_PASSWORD = 'ResetPassword';

// utilitary
export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 3600 * SECOND;
export const DAY = 86400 * SECOND;
export const PAGINATION_SIZE = 15;

// FIELD LIST
export const FIRST_NAME = 'first name';
export const LAST_NAME = 'last name';
export const BIRTH = 'birth';
export const MAIL = 'mail';
export const PHONE = 'phone number';
export const LOGIN = 'login';
export const OLD_PASS = 'old password';
export const NEW_PASS = 'new password';
// SIMULATOR
export const ESTATE = 'formulaire bien';
export const FISCALITY = 'formulaire fiscalité';
export const BANK = 'formulaire banque';
export const TX_BANK = '1.5';
export const BANK_GARANTY_PERCENT = 0.013;
export const BANK_FOLDER_COST = 500;
// citation array
export const CITATIONS = [
    "« Les propriétaires deviennent riche pendant leur sommeil » . John Stuart Mill.",
    "« Personne n’est trop vieux pour se fixer un nouvel objectif ou réaliser de nouveaux rêves. » – Les Brown",
    "« Pour réussir, votre désir de réussite doit être plus grand que votre peur de l’échec.  » Bill Cosby",
    "« Un pessimiste voit la difficulté dans chaque opportunité, un optimiste voit l’opportunité dans chaque difficulté.  » Winston Churchill",
    "« Celui qui attend que tout danger soir écarté pour mettre les voiles ne prendra jamais la mer.  » Thomas Fuller"
];