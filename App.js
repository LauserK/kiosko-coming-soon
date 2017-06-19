import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      image: "http://10.10.2.20/kioskos/1.jpg",      
    };
  }

  render() {
    let m = this.state.image.toString().match(/.*\/(.+?)\./)
    var number = parseInt(m[1])  
    let base = "http://10.10.2.20/kioskos/"
    let images = 2

    if (number + 1 > images) {
      number = 0
    }

    setTimeout(()=>{
      number = number + 1
      var image = base + number + ".jpg"
      this.setState({
        image: image
      })
    }, 5000);

    return (
      <Image source={{uri: this.state.image}} style={styles.backgroundImage} />
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