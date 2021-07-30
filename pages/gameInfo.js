/* 
Name : Shoban Raj
Admin Num : p1909407
Class : DIT/FT/1B/04
*/
import React, {Component} from 'react'
import { Text, View, ScrollView, Alert, TouchableOpacity ,Image,Linking} from 'react-native'    
import Icon from 'react-native-vector-icons/MaterialIcons';









const info = {
    borderWidth: 3,
    borderColor: "#5a2e98",
    borderRadius: 6,
    marginLeft: 25,
    marginRight: 20,
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,


}

const imageStyle = {
    width: 400,
    height: 250,
    borderRadius: 10
  }

const trailer = {
    borderWidth: 3,
    borderColor: "#5a2e98",
    borderRadius: 6,
    marginLeft: 25,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    marginBottom:20
}

const meta_critic_img = {
height:90,
width:250
}

const rating = {
fontSize : 50,
marginTop:8,
marginLeft : 10
}

const downloadButtonStyle = {
    width: 150,
    marginLeft: 25,
    backgroundColor: "#ce2e4e",
    height: 50,
    borderRadius: 10
}

const downloadButtonText = {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    paddingTop: 10
}
const gameInfo = ({ navigation, route }) => {

    const openTrailer = () => {
        Linking.openURL(route.params.gameDetails.trailer).catch(err => console.error("Couldn't load page", err));
    }

        return(
<ScrollView style={{ backgroundColor: "white", flex: 1 }}>

<TouchableOpacity onPress={()=> navigation.navigate("selectGame")}>
    <View >
        <Icon name="arrow-back" size={30} color="#ce2e4e" style={{ paddingTop: 15, paddingLeft: 10 }} />
    </View>
</TouchableOpacity>


<Text style={{ color: "black", fontSize: 30, paddingTop: 5, textAlign: 'left' ,paddingLeft:20}}>{route.params.gameDetails.name}</Text>
<View style={{ width: 400, borderRadius: 10, marginLeft: 15 }}>

<Image source={{ uri: route.params.gameDetails.image}} style={imageStyle} />
</View>



<View style={info}>
    <Text style={{ fontSize: 17 }}>Release Date : {route.params.gameDetails.release_date}</Text>
    <Text style={{ fontSize: 17 }}>Made by : {route.params.gameDetails.made_by}</Text>
    <Text style={{ fontSize: 17 }}>Genre : {route.params.gameDetails.genre}</Text>
    <Text style={{ fontSize: 17 }}>Available on platforms : {route.params.gameDetails.platform}</Text>
    <Text style={{ fontSize: 17 }}>price : {route.params.gameDetails.price}</Text>
    <Text style={{ fontSize: 20,textAlign:'center',textDecorationLine:'underline',color:'#5a2e98',fontWeight:'bold' }}>Game Description</Text>
    <Text style={{ fontSize: 17 }}>{route.params.gameDetails.synopsis}</Text>
</View>


<View style={trailer}>

    <Text style={{ fontSize: 17, paddingTop: 10 }}>Watch the trailer here : </Text>
    <TouchableOpacity style={downloadButtonStyle} onPress={openTrailer}>
        <View>
            <Text style={downloadButtonText}>Watch</Text>
        </View>
    </TouchableOpacity>
</View>

<View style={trailer}>
<Image source={{ uri: "https://seekvectorlogo.com/wp-content/uploads/2020/06/metacritic-vector-logo.png"}} style={meta_critic_img} />
<Text style={rating}>{route.params.gameDetails.ratings}</Text>
 

</View>





</ScrollView>

        )
    

}

export default gameInfo;



