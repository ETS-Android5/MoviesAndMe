
// Components/Search.js
import React from 'react'
import { connect } from 'react-redux'
import { FlatList,Text,StyleSheet,View, TextInput, Button,ActivityIndicator, SafeAreaView  } from 'react-native'
import films from '../Helpers/filmsData'
import FilmList from "./FilmList";
import  Avatar from "./Avatar"
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
        this.state =
            { films: [],
            isLoading: false }
            this._loadFilms=this._loadFilms.bind(this)
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
                this.page=data.page
                this.totalPages=data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],
                    isLoading: false // Arrêt du chargement
                })
            })
        }
    }
    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }
    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
    }
        render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <TextInput style={styles.textinput}
                           placeholder='Titre du film'
                           onChangeText={(text) => this._searchTextInputChanged(text)}
                           onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Recherche' onPress={() => this._searchFilms() }/>
                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    favoriteList={false}
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                />
                {this._displayLoading()}
            </SafeAreaView>// Ici on rend à l'écran les éléments graphiques de notre component custom Search

        )
    }
}
    const styles = StyleSheet.create({
        main_container: {
            flex: 1},
        avatar_container: {
            alignItems: 'center'
        },
        textinput: {
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingLeft: 5
        },
        loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search)