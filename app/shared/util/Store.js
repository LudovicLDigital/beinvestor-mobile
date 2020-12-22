import {createStore, action, thunk} from 'easy-peasy';

import UserInvestorProfil from "../models/user-investor-profil";
import UserInvestorProfilService from "../services/entities/user-investor-profil-service";

export default () => {
    return createStore({
        userInvestorProfil: null,
        setInvestorProfil: action((state, payload) => {
            state.userInvestorProfil = payload;
        }),
        updateInvestorProfil: thunk(async (actions, payload) => {
            const userInvestorProfilService = new UserInvestorProfilService();
            let data;
            if (payload.id) {
                data = await userInvestorProfilService.updateCurrentInvestorProfil(payload);
            } else {
                data = await userInvestorProfilService.createCurrentInvestorProfil(payload);
            }
            actions.setInvestorProfil(data);
        })
    });
};