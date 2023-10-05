import {action, createStore, thunk} from 'easy-peasy';
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
        }),
        userDeviceId: null,
        setUserDeviceId: action(((state, payload) => {
            state.userDeviceId = payload;
        }))
    });
};