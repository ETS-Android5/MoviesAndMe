// Navigation/Navigation.js
import React from 'react' // N'oubliez pas l'import de  ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from 'react-native';
import { createAppContainer  } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator }from 'react-navigation-tabs';
import Search from '../Components/Search'
import FilmDetail from'../Components/FilmDetail'
import Favorites from'../Components/Favorites'
import News from '../Components/News'
import FilmsVus from "../Components/FilmsVus";

const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})
const FavoritesStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Favorites,
        navigationOptions: {
            title: 'Favorites'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})
const NewsStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: News,
        navigationOptions: {
            title: 'News'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})
const FilmsVusStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: FilmsVus,
        navigationOptions: {
            title: 'FilmsVus'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../Images/ic_search.png')}
                        style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_favorite.png')}
                        style={styles.icon}/>
                }
            }
        },
        News: {
            screen: NewsStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../Images/ic_fiber_new.png')}
                        style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
        FilmsVus: {
            screen: FilmsVusStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../Images/image1.png')}
                        style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})
export default createAppContainer(MoviesTabNavigator)