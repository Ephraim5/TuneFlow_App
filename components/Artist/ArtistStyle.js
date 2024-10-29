import { StyleSheet } from "react-native";

export const ArtistStyle = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        alignItems: 'center',
        marginTop: 0,
      },
      moreIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      profileImage: {
        elevation:5,
        borderRadius:20,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap:10,
      },
      shuffleButton: {
        marginRight: 30,
        width:150,
        height:50,
        backgroundColor: 'green',
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center'
      },
      playButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center'
      },
      artistName: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"black",
        marginVertical: 0,
        marginHorizontal:0,
      },
      sectionTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10,
      },
      trackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
      },
      trackImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
      },
      trackTextContainer: {
        flex: 1,
      },
      trackTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'auto',
        textTransform:'uppercase',
        letterSpacing:2,
      },
      trackSubtitle: {
        color: 'gray',
        fontSize: 14,
      },
      squareTrackContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
      },
      squareTrackImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
      },
})