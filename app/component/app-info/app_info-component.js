import React, {Component} from "react";
import {
    ScrollView, View,
    StyleSheet
} from "react-native";
import {Text} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";
import {APP_INFO} from "../../shared/util/constants";

const appInfoStyle = StyleSheet.create({
    headerTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
    },
    paragraph: {
        padding: 10
    }
});
/**
 * Component to display user's friendly the "Information sur BeInvestor" section
 */
export default class AppInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{paddingBottom: 10}} style={[{flex: 1}]}>
                <Text category={'h6'} style={appInfoStyle.headerTitle}>Qu'est-ce que BeInvestor ? 🤔</Text>
                <Text style={appInfoStyle.paragraph}>BeInvestor est une application ayant pour objectif de rassembler et créer des communautés d’investisseurs immobiliers partout en France.
                    Tous cela en fournissant des outils facilitant la compréhension des marchés et projets immobiliers de chacun.</Text>

                <Text category={'h6'} style={appInfoStyle.headerTitle}>À qui s'adresse BeInvestor ? 👨‍👩‍👧‍👦</Text>
                <Text style={appInfoStyle.paragraph}>Investisseur débutant ou aguerris, personne souhaitant investir en immobilier et se créer un réseau, tous le monde peut utiliser BeInvestor !</Text>

                <Text category={'h6'} style={appInfoStyle.headerTitle}>Mais qu'est ce que ça m'apporte ? 🧰</Text>
                <Text style={appInfoStyle.paragraph}>L’application apporte des outils pour gérer et visualiser les détails d’un projet immobilier pour vous permettre de « détecter la bonne affaire »,
                    en plus de cela, BeInvestor vous permet de développer un réseau avec d’autres investisseurs et partager vos contacts, bon plan etc… et tout ça GRATUITEMENT ! {'\n'}{'\n'}
                    De plus terminé les longues feuilles de calculs Excel grâce à un simulateur simple et efficace.{'\n'}{'\n'}
                    C'est aussi la fin des dizaines de groupes immobiliers sur les réseaux sociaux en choisissant facilement les villes de votre choix depuis la carte ou la recherche de groupe !</Text>

                <Text category={'h6'} style={appInfoStyle.headerTitle}>Il existe d'autres outils, pourquoi utiliser BeInvestor ? 🌟 </Text>
                <Text style={appInfoStyle.paragraph}>BeInvestor permet de vous faire gagner du temps en analysant les informations d’un bien et vous permet de faire les meilleurs choix
                    (est-ce une bonne affaire ? la rentabilité est-elle élevée ? quel régime fiscal choisir ? et j’en passe).
                    En plus de cela, vous pouvez rencontrer plus facilement d’autres investisseurs avec la même vision et façon de penser (mindset) que vous,
                    et en plus vous aller pouvoir échanger sur vos projets, vos contacts, vos inquiétudes… Et BeInvestor est disponible sur smartphone, vous pouvez ainsi y accéder depuis n’importe où !</Text>

                <Text category={'h6'} style={appInfoStyle.headerTitle}>Quand est-ce que je dois utiliser l'application ? 🕒</Text>
                <Text style={appInfoStyle.paragraph}>Utiliser BeInvestor dès que vous trouvez un bien immobilier intéressant pour sécuriser votre investissement et appuyer votre dossier bancaire !
                    Vous pouvez poser des questions dans les groupes de chaque ville dès que l’envie vous prend, ou que vous avez des doutes par exemple !
                    Il y a toujours quelqu’un qui a vécu vos craintes 😉</Text>

                <Text category={'h6'} style={appInfoStyle.headerTitle}>Quel est l'avenir de BeInvestor ? ‍🚀 </Text>
                <Text style={appInfoStyle.paragraph}>BeInvestor va évoluer encore et toujours pour vous proposer encore plus d'outils pour vos projets immobiliers, et améliorer les existants !
                    Actuellement l'équipe n'est composée que d'une seule personne, avec le temps elle s'agrandira et permettra de vous fournir une meilleure application.
                    Dans les prochaines versions, vous pourrez vous connecter avec vos comptes de réseaux sociaux (Facebook, Google) mais aussi plein d'autres surprises 😄.{'\n'}{'\n'}
                    Les fonctionnalités telles que vous les connaissez actuellement resteront toujours gratuite, BeInvestor gagne de l'argent grâce aux publicités dans sa permières version.
                    Plus tard vous verrez arriver des fonctionnalités, disponibles par abonnement payant, beaucoup plus poussées pour visualiser et gérer vos projets immobiliers.{'\n'}{'\n'}
                    Vous en découvrirez plus en temps voulu ... 🤫</Text>

            </ScrollView>
        )
    }
}