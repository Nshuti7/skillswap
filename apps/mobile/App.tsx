import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SkillLevel } from '@skillswap/shared';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkillSwap</Text>
      <Text style={styles.tagline}>Skills are the new currency.</Text>
      <Text style={styles.levels}>{Object.values(SkillLevel).join(' / ')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '600' },
  tagline: { color: '#666', fontStyle: 'italic', marginTop: 4 },
  levels: { marginTop: 16, color: '#444' },
});
