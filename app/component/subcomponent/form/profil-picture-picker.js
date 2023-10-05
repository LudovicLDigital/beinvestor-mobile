import React, {Component} from "react";
import {Alert, TouchableWithoutFeedback, View} from "react-native";
import {appColors} from "../../../shared/styles/global";
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from "@ui-kitten/components/ui/index";
import AuthService from "../../../shared/services/auth";
import UsersService from "../../../shared/services/entities/users-service";
import {showInfoAlert, showToast} from "../../../shared/util/ui-helpers";

/**
 * PROPS :
 * - isAbleToEdit : boolean to allow pic change on click
 * - size: size of the avatar
 */
export default class ProfilPicturePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picDisplay: null
        };
        this._chooseAPicture = this._chooseAPicture.bind(this);
        AuthService.getCurrentUser().then((user) => {
            this._currentUser = user;
        });
        this._userService = new UsersService();
    }
    componentDidMount() {
        this._recoverBackendImage();
    }
    _recoverBackendImage() {
        this._userService.getProfilPictureOfCurrent().then((picture) => {
            if (picture.info().status === 200) {
                this.setState({
                    picDisplay: {uri: 'data:image/jpeg;base64,' + picture.data}
                });
            } else {
                this.setState({
                    picDisplay: require('../../../assets/no-pic.png')
                });
            }
        }).catch((error) => {
            console.error(error);
            showToast('Erreur lors de la récupération de la photo de profil');
        })
    }
    render() {
        return (
            <View style={[{flex: 1}]}>
                <TouchableWithoutFeedback onPress={this._chooseAPicture}>
                    <Avatar style={{borderWidth: 1, borderColor: appColors.secondary, alignSelf: 'center'}} size={'giant'} source={this.state.picDisplay}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    _chooseAPicture() {
        if (this.props.isAbleToEdit) {
            const imgPickerOpts = {
                width: 300,
                height: 300,
                mediaType: "photo",
                cropping: true,
                cropperToolbarTitle: 'Ajuster votre photo',
                cropperCircleOverlay: true
            };
            Alert.alert(
                "Choisir votre photo de profil depuis...",
                "",
                [
                    {
                        text: 'Annuler',
                        onPress: () => {}
                    },
                    {
                        text: 'Galerie',
                        onPress: () => {
                            ImagePicker.openPicker(imgPickerOpts).then(image => {
                                this._savePicture(image);
                            });
                        }
                    },
                    {
                        text: 'Camera',
                        onPress: () => {
                            ImagePicker.openCamera(imgPickerOpts).then(image => {
                                this._savePicture(image);
                            });
                        }
                    }
                ]
            )
        }
    }

    _savePicture(image) {
        if (this._currentUser && this._currentUser.user) {
            this._userService.changeUserProfilPicture(image, this._currentUser.user.id).then(() => {
                this._recoverBackendImage();
            }).catch((error) => {
                console.error(error);
                showInfoAlert('La photo de profil n\'a pas pu être sauvegardé');
            });
        } else {
            showInfoAlert('La photo de profil n\'a pas pu être sauvegardé');
        }
    }
}