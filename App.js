import React from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import VideoPlayer from 'react-native-video-controls'

export default class App extends React.Component {
  constructor() {
    super()
    //Seteamos el estado inicial
    this.state = {
      count: 0,
      len: 0,
      time: 5000,
      type: "image",
      load: false,
      image: "http://10.10.0.201/statik/0.jpg",
      video: "",
      images: []    
    };
  }

  _setRecurse(response){
    //Función para obtener los recursos desde el servidor.
    if (response.data[0].type == "video") {
      this.setState({
        video: response.data[0].video_url,
        type: "video",
        len:1,
        load: true
      })
    } else if (response.data[0].type == "image") {
      images = []
      response.data[0].images.map((item)=>{
        images.push(item)
      })      
      this.setState({        
        images: images,
        len:images.length,
        type: "image",
        load: true
      })
    }    
  }

  componentWillMount() {
    var pk = 1
    fetch(`http://10.10.0.201/kiosko/api/v1/get-ad/?pk=${pk}`)
      .then((response) => response.json())
      .then((responseJson) => {        
        if (responseJson.data) {
          this._setRecurse(responseJson)  
        }      
      })
      .catch((error)=> {
        console.error(error)
      })
  }

  render() {
    //Verificamos si cargo los recursos
    if (this.state.load) {
      // Verificamos que no este vacio la información
      if (this.state.len > 0) {
        //Verificamos el tipo de recurso
        if (this.state.type == "video") {
          // SI ES UN VIDEO LO CARGAMOS EN PANTALLA COMPLETA Y SIN CONTROLES CON LOOP INFINITO
          //Renderizamos el componente
          return (
            <VideoPlayer
              source={{ uri: this.state.video }} 
              navigator={ null }
              muted={ true }
              repeat={ true }
            />
          )
        } else {
          // Ciclo para que cada cinco segundos cambia la imagen
          setTimeout(()=> {
            let count = this.state.count + 1
            //Intentamos obtener la imagen
            try {
              var image = this.state.images[this.state.count].file
            } catch(err) {}

            if (this.state.len >= count) {
              // Si debe de seguir cambiando
              this.setState({image,count})  
            } else {
              // Si llego al final
              this.setState({count:0})
            }
          }, 5000)
          
        }
      }
    }

    return (
      //Renderizamos el componente
      <Image source={{uri:this.state.image}} style={styles.backgroundImage} />
    )
  }

}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
})