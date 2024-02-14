import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

interface Props {
  label: string;
  value?: string;
  onPress: () => void;
}

export function NavigationButton({label, value, onPress}: Props) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  width: '100%',
  gap: 5,
  alignItems: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 15,
};

const labelStyle: TextStyle = {
  fontSize: 12,
  opacity: 0.7,
};
const valueStyle: TextStyle = {
  fontSize: 16,
};
