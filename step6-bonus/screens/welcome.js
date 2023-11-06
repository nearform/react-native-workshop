import { View, Text, StyleSheet, Button } from 'react-native'

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <Button
      title="Play"
      color="#000000"
      // Tell the navigator to `navigate` to the screen where `name` prop is "Game"
      onPress={() => navigation.navigate('Game')}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: -3
  }
})
