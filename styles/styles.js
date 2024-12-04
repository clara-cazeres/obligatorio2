import { StyleSheet } from 'react-native';

export const colors = {
  background: '#141519',
  containerBackground: '#242529',
  highlight: '#e3e553',
  text: '#ffffff',
  mutedText: '#cccccc',
  error: 'red',
  success: '#28a745',
  danger: '#dc3545',
  shadow: '#000',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.highlight,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.containerBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.highlight,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.background,
    fontWeight: 'bold',
  },
});

export const chartStyles = {
  chartConfig: {
    backgroundColor: colors.containerBackground,
    backgroundGradientFrom: colors.containerBackground,
    backgroundGradientTo: colors.containerBackground,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
};
