/* 
Name : Shoban Raj
Admin Num : p1909407
Class : DIT/FT/1B/04
*/
import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'





const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const selectGame = ({ navigation }) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSearchTerm("");
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const randomRes = () => {
    var rng = Math.floor(Math.random() * data.length);
    navigation.navigate("gameInfo", { gameDetails: data[rng] })
  }

  const selectStyle = {
    width: 400,
    marginLeft: 17,
    backgroundColor: '#6f4ca4',
    paddingBottom: 10,
    marginBottom: 40,
    borderRadius: 10

  }
  const textStyle = {
    fontSize: 15, marginLeft: 10, color: 'white'
  }

  const titleStyle = {
    color: "white",
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 5,
    marginLeft: 10
  }

  const searchStyle = {
    height: 50,
    width: 350,
    backgroundColor: "#6f4ca4",
    marginTop: 30,
    color: 'white',
    marginLeft: 17,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
    paddingTop: 15,
    paddingLeft: 17,
    marginBottom: 20
  }

  const imageStyle = {
    width: 400,
    height: 200,
    borderRadius: 10
  }
  const loginstyle = {
    marginTop: 8,
    marginLeft: 10,

  }


  const [searchTerm, setSearchTerm] = useState('')

  const [data, setData] = useState([])
  const getGameData = () => {
    axios.get("http://192.168.245.1:8080/api/getGames")
      .then((response) => {
        const gameData = response.data
        setData(gameData)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }
  useEffect(() => getGameData(), [])



  const [like, setLike] = useState([]);


  const getLikes = () => {
    axios.get("http://192.168.245.1:8080/api/getLikes")
      .then((response) => {
        const likeData = response.data
        setLike(likeData)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }


  useEffect(() => getLikes(), [])


 
  const postLikes = () => {
    axios.post("http://192.168.245.1:8080/api/postLikes")
      .then(() => {
        getLikes()
      })
      .catch((error) => {
        console.log("error", error)
      })
  }
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} style={{ backgroundColor: "white", flex: 1 }}>

      <View style={{ flexDirection: 'row' }}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 32, marginLeft: 50, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Can't Decide? Click Here !</Text>
          <View >
            <Icon name="arrow-forward" size={30} style={{ marginTop: 32, paddingLeft: 10 }} />
          </View>
          <TouchableOpacity style={loginstyle} onPress={randomRes} >
            <View>
              <Icon2 name="dice" size={30} color="#ce2e4e" style={{ marginTop: 25, paddingLeft: 10 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

  <View style={{ flexDirection: 'row' }}>

<View style={{ flexDirection: 'row' }}>
  <Text style={{ marginTop: 32, marginLeft: 50, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>pssst click here</Text>
  <View >
    <Icon name="arrow-forward" size={30} style={{ marginTop: 32, paddingLeft: 10 }} />
  </View>
  <View style={{ flexDirection: 'row' }}>
  <TouchableOpacity style={loginstyle} onPress={postLikes} >
      <Icon2  name="heart" size={30} color="#ce2e4e" style={{ marginTop: 25, paddingLeft: 10 }} />
      </TouchableOpacity>
      <Text style={{ marginTop: 25, paddingLeft: 20,fontSize:30 }}>{like}</Text>
    </View>
 
</View>
</View>

      <View style={{ flexDirection: 'row', }}>

        <TextInput
          editable={true}
          textAlignVertical="top"
          placeholder="Search by Name,Genre"//can search for name of restaurant as well as filter via cusine,ratings,location
          placeholderTextColor="white"
          style={searchStyle}
          onChangeText={event => { setSearchTerm(event) }}
          value={searchTerm}
        />
        <Icon name="search" size={40} color="#5a2e98" style={{ marginTop: 35 }} />
      </View>





      {data.filter((val) => {
        if (searchTerm == "") {
          return val
        }
        else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.genre.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).map((val, key) => {

        return (

          <TouchableOpacity style={selectStyle} onPress={() => { setSearchTerm(""); navigation.navigate("gameInfo", { gameDetails: val }) }} className="games" key={key}>


            <View>

              <Image source={{ uri: val.image }}
                style={imageStyle} />

              <Text style={titleStyle}>{val.name}</Text>
              <Text style={textStyle}>Made by : {val.made_by}</Text>
              <Text style={textStyle}>Platform : {val.platform}</Text>
              <Text style={textStyle}>Price : {val.price}</Text>
            </View>

          </TouchableOpacity>
        )
      })}

    </ScrollView>

  )
}
export default selectGame
